const fs = require('fs');
const https = require('https');

// Load .env manually
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

// Hardcoding Production Credentials to bypass .env issue
const HK_HOST = 'https://api.hotelkeyapp.com';
const HK_APP_ID = '8b16823a-9e08-4aee-b822-392c09602871';
const HK_USERNAME = '0375navin';
const HK_PASSWORD = 'Np3306';

async function testUrl(url, label) {
    console.log(`\nTesting [${label}]: ${url}`);
    const authHeader = `Basic ${btoa(`${HK_USERNAME}:${HK_PASSWORD}`)}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
                'X-App-Id': HK_APP_ID,
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
                'Accept': 'application/json, text/plain, */*'
            }
        });
        console.log(`Status: ${response.status} ${response.statusText}`);
        // ... (rest same)
        if (response.ok) {
            const text = await response.text();
            console.log(`SUCCESS! Response: ${text.substring(0, 500)}...`);
            return true;
        } else {
            const text = await response.text();
            console.log(`Failed Response: ${text.substring(0, 200)}...`);
        }
    } catch (e) {
        console.error("Error:", e.message);
    }
    return false;
}

async function testInventory() {
    if (!HK_HOST || !HK_USERNAME || !HK_PASSWORD) return;

    const chains = ['hotelbrand', 'executiveinn', '0375', 'independent', 'hk'];

    // Pattern: /v4/{CHAIN}/properties/{ID}/room-inventory
    for (const chain of chains) {
        const url = `${HK_HOST}/v4/${chain}/properties/${HK_APP_ID}/room-inventory`;
        await testUrl(url, `Chain: ${chain}`);
    }

    // Also retry the v1 generic pattern one more time with correct headers from before
    await testUrl(`${HK_HOST}/api/v1/properties/${HK_APP_ID}/room-inventory`, 'Standard v1 Retry');
}

testInventory();
