
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const body = await req.json()
        const { guest, roomType, dates, cost } = body

        if (!guest || !roomType || !dates) {
            throw new Error('Missing required booking data')
        }

        console.log(`[Notification Service] Received booking request for ${guest.firstName} ${guest.lastName}`)

        // --- EMAIL NOTIFICATION LOGIC ---
        const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
        const adminEmailHtml = `
            <h2>New Booking Request!</h2>
            <p><strong>Guest:</strong> ${guest.firstName} ${guest.lastName}</p>
            <p><strong>Email:</strong> ${guest.email}</p>
            <p><strong>Phone:</strong> ${guest.phone}</p>
            <p><strong>Room:</strong> ${roomType.name}</p>
            <p><strong>Dates:</strong> ${dates.checkIn} to ${dates.checkOut}</p>
            <p><strong>Special Requests:</strong> ${guest.specialRequests || 'None'}</p>
            <p><strong>Total:</strong> $${cost?.total?.toFixed(2) || 'N/A'}</p>
        `

        const guestEmailHtml = `
            <h2>Booking Confirmation</h2>
            <p>Dear ${guest.firstName},</p>
            <p>Thank you for choosing Executive Inn! We have received your booking request.</p>
            <hr />
            <h3>Your Details:</h3>
            <p><strong>Room:</strong> ${roomType.name}</p>
            <p><strong>Dates:</strong> ${dates.checkIn} to ${dates.checkOut}</p>
            <p><strong>Total:</strong> $${cost?.total?.toFixed(2) || 'N/A'}</p>
            <p><strong>Confirmation Number:</strong> (Pending)</p>
            <hr />
            <p>We look forward to welcoming you!</p>
            <p>Executive Inn Team</p>
        `

        if (RESEND_API_KEY) {
            console.log(`Sending emails via Resend... Key Present: ${!!RESEND_API_KEY}`)

            // 1. Send to Admin
            console.log('Sending Admin Email...')
            const adminRes = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${RESEND_API_KEY}`
                },
                body: JSON.stringify({
                    from: 'Executive Inn Booking <onboarding@resend.dev>',
                    to: ['executiveinn1@gmail.com'],
                    subject: `New Booking: ${guest.firstName} ${guest.lastName}`,
                    html: adminEmailHtml
                })
            })
            const adminResData = await adminRes.json()
            console.log('Admin Email Response:', JSON.stringify(adminResData))

            // 2. Send to Guest
            console.log(`Sending Guest Email to ${guest.email}...`)
            const guestRes = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${RESEND_API_KEY}`
                },
                body: JSON.stringify({
                    from: 'Executive Inn <onboarding@resend.dev>',
                    to: [guest.email],
                    subject: `Booking Confirmation - Executive Inn`,
                    html: guestEmailHtml
                })
            })
            const guestResData = await guestRes.json()
            console.log('Guest Email Response:', JSON.stringify(guestResData))

            if (!adminRes.ok || !guestRes.ok) {
                console.error("Resend API Error (Admin):", adminResData)
                console.error("Resend API Error (Guest):", guestResData)
            } else {
                console.log("Emails sent successfully to Admin and Guest!")
            }
        } else {
            console.log('[MOCK EMAIL] RESEND_API_KEY not found.')
            console.log('Admin Content:', adminEmailHtml)
            console.log('Guest Content:', guestEmailHtml)
        }

        // --- SMS NOTIFICATION LOGIC ---
        // --- SMS NOTIFICATION LOGIC ---
        const TWILIO_ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID')
        const TWILIO_AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN')
        const TWILIO_MESSAGING_SERVICE_SID = Deno.env.get('TWILIO_MESSAGING_SERVICE_SID')
        const ADMIN_PHONE_NUMBER = Deno.env.get('ADMIN_PHONE_NUMBER')

        const smsContent = `New Booking!\nGuest: ${guest.firstName} ${guest.lastName}\nPhone: ${guest.phone}\nRoom: ${roomType.name}\nDates: ${dates.checkIn} to ${dates.checkOut}\nSpecial Requests: ${guest.specialRequests || 'None'}\nTotal: $${cost?.total?.toFixed(2)}`

        if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_MESSAGING_SERVICE_SID && ADMIN_PHONE_NUMBER) {
            console.log(`Sending SMS to ${ADMIN_PHONE_NUMBER}...`)

            const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`

            // Transform body to url-encoded form data
            const body = new URLSearchParams()
            body.append('To', ADMIN_PHONE_NUMBER)
            body.append('MessagingServiceSid', TWILIO_MESSAGING_SERVICE_SID)
            body.append('Body', smsContent)

            const smsRes = await fetch(twilioUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${btoa(TWILIO_ACCOUNT_SID + ':' + TWILIO_AUTH_TOKEN)}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: body
            })

            const smsResData = await smsRes.json()

            if (!smsRes.ok) {
                console.error("Twilio API Error:", smsResData)
            } else {
                console.log("SMS sent successfully!", smsResData.sid)
            }
        } else {
            console.log('[MOCK SMS] Twilio credentials missing.')
            console.log(`[MOCK SMS SENT] To: ADMIN_PHONE_NUMBER \nMessage: ${smsContent}`)
        }


        // Generate a simple confirmation number locally since we aren't depending on HK right now
        const confirmationNumber = `REQ-${Date.now().toString().slice(-6)}`

        return new Response(JSON.stringify({
            success: true,
            confirmationNumber,
            message: "Notification sent to admin"
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

    } catch (error: any) {
        console.error('Notification Service Error:', error)
        return new Response(JSON.stringify({ error: error.message || 'Unknown error' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
})
