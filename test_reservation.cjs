const fs = require('fs');
const path = require('path');

// Load .env manually
const envPath = path.resolve(__dirname, '.env');
// Fallback setup if .env is missing vars
let SUPABASE_URL = 'https://znzbapscmizueczsdsry.supabase.co';
let SUPABASE_ANON_KEY = 'sb_secret_MGxuOQjDKRT8YTEn63dggg_jvHveqsZ'; // Using the key that worked for DB access, hope it works for auth

if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            // In case .env DOES have them in future
            if (key.trim() === 'VITE_SUPABASE_URL') SUPABASE_URL = value.trim();
            if (key.trim() === 'VITE_SUPABASE_ANON_KEY') SUPABASE_ANON_KEY = value.trim();
        }
    });
}

const payload = {
    guest: {
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        phone: "555-0199",
        specialRequests: "Testing reservation flow"
    },
    roomType: {
        code: "NSQ",
        name: "Non-Smoking Queen",
        rate: 100
    },
    dates: {
        checkIn: "2023-12-25",
        checkOut: "2023-12-27"
    },
    cost: {
        total: 226
    }
};

async function testReservation() {
    console.log("Testing create-reservation function...");
    const url = `${SUPABASE_URL}/functions/v1/create-reservation`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const text = await response.text();
        console.log(`Status: ${response.status}`);
        try {
            const json = JSON.parse(text);
            console.log("Response JSON:", JSON.stringify(json, null, 2));
        } catch (e) {
            console.log("Response Text:", text);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

testReservation();
