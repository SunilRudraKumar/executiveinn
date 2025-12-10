const fs = require('fs');
const https = require('https');

// Load .env manually to avoid dependencies
const envPath = '.env';
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
}

const { HK_HOST, HK_USERNAME, HK_PASSWORD, HK_APP_ID } = process.env;

if (!HK_HOST || !HK_USERNAME || !HK_PASSWORD) {
    console.error("Missing credentials in .env");
    process.exit(1);
}

console.log(`Using Host: ${HK_HOST}`);
console.log(`Using Username: ${HK_USERNAME}`);
// Not logging password

const authHeader = `Basic ${Buffer.from(`${HK_USERNAME}:${HK_PASSWORD}`).toString('base64')}`;

// We'll test with the poll endpoint if APP_ID is present, otherwise we'll try something else or just report potential success.
// POLL URL: ${HK_HOST}/thirdparty/hotelbrand/stream/${HK_APP_ID}/poll?num_of_messages=1
// The create-reservation used: ${HK_HOST}/reservations - this might not exist or be different.

// Let's try to just hit the HK_HOST root or a known safe endpoint to check auth if possible.
// Actually, without a known "whoami" endpoint, testing auth is tricky if we don't have the right path.
// But the user gave us a web URL: https://hkdemo.hotelkeyapp.com/hk-home/index.html#/home
// This suggests the API might be at https://hkdemo.hotelkeyapp.com/ ...
// Let's try the poll endpoint if we have an ID, or just Log that we are ready.

async function verify() {
    if (HK_APP_ID && HK_APP_ID !== 'placeholder_app_id') {
        const pollUrl = `${HK_HOST}/thirdparty/hotelbrand/stream/${HK_APP_ID}/poll?num_of_messages=1`;
        console.log(`Testing Poll Endpoint: ${pollUrl}`);

        try {
            const response = await fetch(pollUrl, {
                method: 'GET',
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/json'
                }
            });

            console.log(`Status: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.log(`Response: ${text.substring(0, 200)}...`);

            if (response.ok) {
                console.log("SUCCESS: Credentials and App ID appear valid.");
            } else {
                console.log("FAILURE: API request failed. Check credentials or App ID.");
            }

        } catch (e) {
            console.error("Error making request:", e.message);
        }
    } else {
        console.log("HK_APP_ID is missing or placeholder. Skipping Poll API test.");
        console.log("To verify full functionality, please update HK_APP_ID in .env.");

        // Test a generic endpoint to see if we can at least connect? 
        // Maybe just check if the host is reachable.
        try {
            const response = await fetch(HK_HOST);
            console.log(`Host ${HK_HOST} is reachable. Status: ${response.status}`);
        } catch (e) {
            console.error(`Failed to reach host ${HK_HOST}:`, e.message);
        }
    }
}

verify();
