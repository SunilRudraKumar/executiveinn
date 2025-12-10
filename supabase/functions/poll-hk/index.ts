
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const HK_HOST = Deno.env.get('HK_HOST')
const HK_APP_ID = Deno.env.get('HK_APP_ID')
const HK_USERNAME = Deno.env.get('HK_USERNAME')
const HK_PASSWORD = Deno.env.get('HK_PASSWORD')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SERVICE_ROLE_KEY = Deno.env.get('SERVICE_ROLE_KEY')

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        if (!HK_HOST || !HK_APP_ID || !HK_USERNAME || !HK_PASSWORD || !SUPABASE_URL || !SERVICE_ROLE_KEY) {
            throw new Error('Missing environment variables')
        }

        const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

        // 1. Poll Hotel Key API
        const authHeader = `Basic ${btoa(`${HK_USERNAME}:${HK_PASSWORD}`)}`
        const pollUrl = `${HK_HOST}/thirdparty/hotelbrand/stream/${HK_APP_ID}/poll?num_of_messages=10`

        console.log(`Polling URL: ${pollUrl}`)

        const pollResponse = await fetch(pollUrl, {
            method: 'GET',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            }
        })

        if (!pollResponse.ok) {
            const text = await pollResponse.text()
            throw new Error(`Failed to poll: ${pollResponse.status} ${text}`)
        }

        // Parse response. Assuming it's an array based on "num_of_messages" param
        // Response might be empty string or empty array if no messages
        const responseText = await pollResponse.text()
        if (!responseText || responseText.trim() === '[]') {
            return new Response(JSON.stringify({ message: 'No new messages' }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            })
        }

        let messages = []
        try {
            messages = JSON.parse(responseText)
        } catch (e) {
            throw new Error(`Failed to parse poll response: ${responseText}`)
        }

        if (!Array.isArray(messages)) {
            // Handle single object case if api behaves differently than expected
            messages = [messages]
        }

        console.log(`Received ${messages.length} messages`)

        const results = []

        // 2. Process messages
        for (const msg of messages) {
            const receiptHandle = msg.receiptHandle || msg.receipt_handle // handling potential variations

            if (!receiptHandle) {
                console.error('Message missing receipt handle', msg)
                continue
            }

            // Log to database
            const { error: dbError } = await supabase
                .from('hk_event_logs')
                .insert({
                    receipt_handle: receiptHandle,
                    payload: msg,
                    status: 'processed'
                })

            if (dbError) {
                console.error('Failed to log message', dbError)
                results.push({ receiptHandle, status: 'error', error: dbError.message })
                continue
            }

            // Acknowledge message
            const ackUrl = `${HK_HOST}/thirdparty/hotelbrand/stream/${HK_APP_ID}/acknowledge`
            const ackResponse = await fetch(ackUrl, {
                method: 'POST',
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ receiptHandle: receiptHandle }) // check specific casing usually receiptHandle or receipt_handle
            })

            if (ackResponse.ok) {
                results.push({ receiptHandle, status: 'acknowledged' })
            } else {
                const ackText = await ackResponse.text()
                console.error(`Failed to acknowledge ${receiptHandle}: ${ackText}`)
                results.push({ receiptHandle, status: 'ack_failed', error: ackText })
            }

            // 3. (Optional) Sync to Application Inventory
            // ---------------------------------------------------------
            try {
                // Determine the actual event data (sometimes wrapped in 'payload')
                const eventData = msg.payload || msg; // Use a new variable to avoid 'const' redeclaration issues if 'msg' was different

                // Logic A: Availability Update (Absolute Count from Demo/Sandbox style)
                const roomTypeCode = eventData.roomTypeCode || eventData.RoomTypeId || eventData.code;
                const newCount = eventData.count || eventData.AvailableCount || eventData.quantity;
                const newRate = eventData.rate || eventData.Rate || eventData.BaseRate || eventData.Price || eventData.Amount;

                if (roomTypeCode) { // It's an explicit update event
                    const updateData: any = {};
                    if (newCount !== undefined) updateData.display_count = newCount;
                    if (newRate !== undefined) updateData.rate = newRate;

                    if (Object.keys(updateData).length > 0) {
                        const { error: updateError } = await supabase
                            .from('room_types')
                            .update(updateData)
                            .eq('code', roomTypeCode);

                        if (updateError) console.error(`Failed to update room ${roomTypeCode}`, updateError);
                        else console.log(`Updated ${roomTypeCode}:`, updateData);
                    }
                }
                // Logic B: Reservation Event (Delta Logic for Production)
                else if (eventData.event_type === 'RESERVATION' && eventData.reservation) {
                    const res = eventData.reservation;
                    const rCode = res.room_type_code || res.room_type; // 'DQ'
                    const rCount = res.room_count || 1;
                    const rStatus = res.booking_status || res.status; // 'BOOKED', 'CANCELLED'

                    if (rCode && (rStatus === 'BOOKED' || rStatus === 'CONFIRMED' || rStatus === 'HOLD')) {
                        console.log(`Processing New Booking for ${rCode} (-${rCount})`);

                        // 1. Get current count
                        const { data: currentRoom, error: fetchError } = await supabase
                            .from('room_types')
                            .select('display_count')
                            .eq('code', rCode)
                            .single();

                        if (currentRoom && !fetchError) {
                            const currentVal = currentRoom.display_count || 0;
                            const nextVal = Math.max(0, currentVal - rCount); // Don't go below 0

                            // 2. Update count
                            const { error: calcError } = await supabase
                                .from('room_types')
                                .update({ display_count: nextVal })
                                .eq('code', rCode);

                            if (calcError) console.error(`Failed to decrement inventory for ${rCode}`, calcError);
                            else console.log(`Decremented ${rCode} inventory to ${nextVal}`);
                        }
                    }
                    // Handle Cancellations (Increment)
                    else if (rCode && (rStatus === 'CANCELLED' || rStatus === 'No Show')) {
                        console.log(`Processing Cancellation for ${rCode} (+${rCount})`);
                        const { data: currentRoom, error: fetchError } = await supabase
                            .from('room_types')
                            .select('display_count')
                            .eq('code', rCode)
                            .single();

                        if (currentRoom && !fetchError) {
                            // Increment, capping at some reasonable max if needed, but for now just add back
                            const nextVal = (currentRoom.display_count || 0) + rCount;
                            await supabase.from('room_types').update({ display_count: nextVal }).eq('code', rCode);
                            console.log(`Incremented ${rCode} inventory to ${nextVal}`);
                        }
                    }
                }
            } catch (err) {
                console.error('Error syncing to inventory:', err)
            }
            // ---------------------------------------------------------
        } // End of for loop

        return new Response(JSON.stringify({ success: true, results }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
})

