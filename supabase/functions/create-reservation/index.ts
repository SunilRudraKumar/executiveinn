
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const HK_HOST = Deno.env.get('HK_HOST')
const HK_USERNAME = Deno.env.get('HK_USERNAME')
const HK_PASSWORD = Deno.env.get('HK_PASSWORD')
const HK_APP_ID = Deno.env.get('HK_APP_ID')
const HK_PROPERTY_ID = Deno.env.get('HK_PROPERTY_ID')
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
        if (!HK_HOST || !HK_USERNAME || !HK_PASSWORD || !HK_PROPERTY_ID) {
            throw new Error('Missing Supabase environment variables')
        }

        const body = await req.json()
        const { guest, roomType, dates, cost } = body

        if (!guest || !roomType || !dates) {
            throw new Error('Missing required reservation data')
        }

        console.log(`Creating reservation for ${guest.firstName} ${guest.lastName} - ${roomType.name}`)

        // 2. Construct Payload for HotelKey
        // Note: Payload structure is best-guess based on standard HK API fields. 
        // We might need to refine this if the API rejects it.
        const hkReservation = {
            Guest: {
                FirstName: guest.firstName,
                LastName: guest.lastName,
                Email: guest.email,
                Phone: guest.phone,
                Address: {
                    AddressLine1: guest.address || "",
                    City: guest.city || "",
                    State: guest.state || "",
                    ZipCode: guest.zip || "",
                    Country: "US"
                }
            },
            RoomTypeId: roomType.id, // Ensure this maps to HK RoomTypeId
            ArrivalDate: dates.checkIn,
            DepartureDate: dates.checkOut,
            Adults: parseInt(guest.adults) || 1,
            Children: parseInt(guest.children) || 0,
            RatePlanId: "RACK", // Defaulting to RACK if not specified
            Comments: guest.specialRequests,
            Source: "WEB_DIRECT"
        }

        // Endpoint: /v4/hotelbrand/properties/{propertyId}/reservations
        const reservationUrl = `${HK_HOST}/v4/hotelbrand/properties/${HK_PROPERTY_ID}/reservations`
        const authHeader = `Basic ${btoa(`${HK_USERNAME}:${HK_PASSWORD}`)}`

        console.log('Sending to HK:', reservationUrl)
        console.log('Payload:', JSON.stringify(hkReservation))

        const response = await fetch(reservationUrl, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
                'X-HotelKey-AppId': HK_APP_ID || '' // Sending AppID just in case
            },
            body: JSON.stringify(hkReservation)
        })

        let data;
        const responseText = await response.text()

        try {
            data = responseText ? JSON.parse(responseText) : {}
        } catch (e) {
            console.error("Failed to parse HK response:", responseText)
            data = { raw: responseText }
        }

        if (!response.ok) {
            console.error(`HK Error (${response.status}):`, responseText)
            // If 403, it might be permission or bad payload format. 
            // We pass the error back to frontend to see.
            throw new Error(`HotelKey API Error: ${response.status} - ${data.message || responseText}`)
        }

        console.log('Reservation created successfully:', data)

        // Return the HK confirmation number if available, else a generated one
        // HK usually returns 'ConfirmationNumber' or 'id'
        const confirmationNumber = data.ConfirmationNumber || data.id || `EI${Date.now().toString().slice(-8)}`

        return new Response(JSON.stringify({
            success: true,
            confirmationNumber,
            data
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

    } catch (error) {
        console.error('Edge Function Error:', error)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
})
