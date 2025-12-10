-- Create a table to log raw events from Hotel Key
create table if not exists public.hk_event_logs (
  id uuid primary key default gen_random_uuid(),
  receipt_handle text not null,
  payload jsonb not null,
  status text not null default 'pending', -- pending, processed, failed
  error_message text,
  created_at timestamptz not null default now(),
  processed_at timestamptz
);

-- Enable RLS
alter table public.hk_event_logs enable row level security;

-- Only authenticated users (service role) can view/insert
create policy "Service role can do everything on hk_event_logs"
  on public.hk_event_logs
  for all
  to service_role
  using (true)
  with check (true);

-- Optional: Allow admins to view logs (if you implement admin role)
-- For now, we'll keep it restricted to service_role (Edge Functions)
