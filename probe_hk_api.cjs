const fs = require('fs');
const path = require('path');
const https = require('https');

// Load .env manually
const envPath = path.resolve(__dirname, '.env');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
}

const { HK_HOST, HK_USERNAME, HK_PASSWORD } = process.env;

if (!HK_HOST || !HK_USERNAME || !HK_PASSWORD) {
    console.error("Missing HK credentials in .env");
    process.exit(1);
}

const authHeader = `Basic ${Buffer.from(`${HK_USERNAME}:${HK_PASSWORD}`).toString('base64')}`;

const { HK_APP_ID } = process.env;
const PROPERTY_ID = "84626d8e-969c-4f06-b77a-a7a6dfc30cbf";

const endpoints = [
    `/v4/hotelbrand/properties/${PROPERTY_ID}/reservations`,
    `/v4/properties/${PROPERTY_ID}/reservations`,
    `/hotelbrand/properties/${PROPERTY_ID}/reservations`,
    `/api/v1/reservations`
];

async function probe() {
    console.log(`Probing host: ${HK_HOST}`);

    for (const ep of endpoints) {
        const url = `${HK_HOST}${ep}`;
        console.log(`Trying ${ep}...`);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({}) // Empty body just to check if 404 or 400
            });

            console.log(`  Status: ${response.status}`);
            if (response.status !== 404) {
                const text = await response.text();
                // console.log(`  Response: ${text.substring(0, 100)}`);
                console.log(`  >>> POTENTIAL MATCH: ${ep} returned ${response.status}`);
            }
        } catch (e) {
            console.log(`  Error: ${e.message}`);
        }
    }
}

probe();
