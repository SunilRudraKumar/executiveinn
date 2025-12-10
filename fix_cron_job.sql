-- 1. Remove the broken cron job
SELECT cron.unschedule('poll-hk-every-minute');

-- 2. Schedule the corrected cron job
SELECT cron.schedule(
    'poll-hk-every-minute',
    '* * * * *', -- Every minute
    $$
    SELECT net.http_get(
        url:='https://znzbapscmizueczsdsry.supabase.co/functions/v1/poll-hk',
        headers:=jsonb_build_object(
            'Content-Type', 'application/json',
            'Authorization', 'Bearer sb_secret_MGxuOQjDKRT8YTEn63dggg_jvHveqsZ'
        )
    ) as request_id;
    $$
);
