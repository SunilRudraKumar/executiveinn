const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Load .env manually
const envPath = '.env';
let SUPABASE_URL, SERVICE_ROLE_KEY;

if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            if (key.trim() === 'VITE_SUPABASE_URL') SUPABASE_URL = value.trim();
            if (key.trim() === 'SERVICE_ROLE_KEY') SERVICE_ROLE_KEY = value.trim();
        }
    });
}

// Fallback if not in .env (User provided these earlier, using them just for this check)
if (!SUPABASE_URL) SUPABASE_URL = 'https://znzbapscmizueczsdsry.supabase.co';
if (!SERVICE_ROLE_KEY) SERVICE_ROLE_KEY = 'sb_secret_MGxuOQjDKRT8YTEn63dggg_jvHveqsZ';

async function checkDB() {
    console.log(`Connecting to ${SUPABASE_URL}...`);
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    // Check Event Logs
    const { data: events, error: logError } = await supabase
        .from('hk_event_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    if (logError) console.error('Error checking logs:', logError.message);
    else {
        console.log(`Recent Events (${events.length}):`);
        events.forEach(e => {
            console.log(`[${e.created_at}] Type: ${e.payload.type || 'Unknown'} | Payload: ${JSON.stringify(e.payload)}`);
        });
    }

    // Check Room Types
    const { data: roomTypes, error: rtError } = await supabase
        .from('room_types')
        .select('name, code, display_count');

    if (rtError) console.error('Error checking room_types:', rtError.message);
    else {
        console.log(`Room Types Mapping:`);
        roomTypes.forEach(rt => {
            console.log(`- Code: "${rt.code}" | Name: "${rt.name}" | Count: ${rt.display_count}`);
        });
    }
}

checkDB();
