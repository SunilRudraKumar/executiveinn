#!/bin/bash

# Load env vars to get the anon key if possible, or just default to common local key
# For local supabase, usually the anon key is printed at startup. 
# We will try to read it from .env or .env.local if available.

echo "Testing Send Booking Notification..."

# 1. Check if Supabase functions are running
# Simple check on the port
if ! nc -z localhost 54321; then
    echo "❌ Error: Port 54321 is not accepting connections."
    echo "Make sure Supabase is running: 'supabase start' or 'supabase functions serve'"
    exit 1
fi

# 2. Extract Anon Key
ANON_KEY=$(grep VITE_SUPABASE_ANON_KEY .env | cut -d '=' -f2)

if [ -z "$ANON_KEY" ]; then
    echo "⚠️  Could not find VITE_SUPABASE_ANON_KEY in .env"
    echo "Please update the script with your ANON_KEY manually if needed."
    # Using a placeholder which might work if auth is disabled locally or strict verification is off
    ANON_KEY="placeholder"
fi

# 3. Send Request
echo "Sending request to http://localhost:54321/functions/v1/send-booking-notification"

curl -i --location 'http://localhost:54321/functions/v1/send-booking-notification' \
--header 'Content-Type: application/json' \
--header "Authorization: Bearer $ANON_KEY" \
--data '{
    "guest": {
        "firstName": "Test",
        "lastName": "User",
        "email": "test@example.com",
        "phone": "555-0199",
        "specialRequests": "Testing logging"
    },
    "roomType": {
        "name": "King Suite"
    },
    "dates": {
        "checkIn": "2024-01-01",
        "checkOut": "2024-01-05"
    },
    "cost": {
        "total": 500.00
    }
}'

echo ""
echo "Done."
