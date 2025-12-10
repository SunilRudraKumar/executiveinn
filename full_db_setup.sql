-- ============================
-- FULL DATABASE SETUP SCRIPT
-- ============================
-- Run this entire script in your Supabase SQL Editor.

-- 1. Enable Extensions
create extension if not exists pgcrypto;

-- 2. Define Triggers
create or replace function public.set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end
$$ language plpgsql;

-- 3. Create Core Tables
create table if not exists public.room_types (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  description text,
  rate numeric not null default 0,
  occupancy int not null default 2,
  is_smoking boolean not null default false,
  amenities text[] not null default '{}',
  image_url text,
  display_count int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.rooms (
  id uuid primary key default gen_random_uuid(),
  room_number int not null,
  room_type_code text not null references public.room_types(code) on delete cascade,
  created_at timestamptz not null default now(),
  unique (room_number)
);

create table if not exists public.availability (
  id uuid primary key default gen_random_uuid(),
  room_type_code text not null references public.room_types(code) on delete cascade,
  date date not null,
  available_count int not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (room_type_code, date)
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- 4. Create HotelKey Logs Table
create table if not exists public.hk_event_logs (
  id uuid primary key default gen_random_uuid(),
  receipt_handle text not null,
  payload jsonb not null,
  status text not null default 'pending',
  error_message text,
  created_at timestamptz not null default now(),
  processed_at timestamptz
);

-- 5. Attach Triggers
drop trigger if exists trg_room_types_updated_at on public.room_types;
create trigger trg_room_types_updated_at before update on public.room_types for each row execute function public.set_updated_at();

drop trigger if exists trg_availability_updated_at on public.availability;
create trigger trg_availability_updated_at before update on public.availability for each row execute function public.set_updated_at();

drop trigger if exists trg_site_settings_updated_at on public.site_settings;
create trigger trg_site_settings_updated_at before update on public.site_settings for each row execute function public.set_updated_at();

-- 6. Enable RLS and Policies
alter table public.room_types enable row level security;
alter table public.rooms enable row level security;
alter table public.availability enable row level security;
alter table public.site_settings enable row level security;
alter table public.hk_event_logs enable row level security;

-- Public Read Policies
create policy "room_types read" on public.room_types for select using (true);
create policy "rooms read" on public.rooms for select using (true);
create policy "availability read" on public.availability for select using (true);
create policy "site_settings read" on public.site_settings for select using (true);

-- Authenticated Write Policies
create policy "room_types write" on public.room_types for all to authenticated using (true) with check (true);
create policy "rooms write" on public.rooms for all to authenticated using (true) with check (true);
create policy "availability write" on public.availability for all to authenticated using (true) with check (true);
create policy "site_settings write" on public.site_settings for all to authenticated using (true) with check (true);

-- Service Role Policy for Logs
create policy "Service role can do everything on hk_event_logs" on public.hk_event_logs for all to service_role using (true) with check (true);

-- 7. Seed Initial Data
insert into public.room_types (code, name, description, rate, occupancy, is_smoking, amenities, display_count)
select * from (
  values
    ('NSQ','Non-Smoking Queen','Comfortable queen bed in non-smoking room',79,2,false, array['Queen Bed','Wi-Fi','TV','Mini Fridge','Microwave','AC/Heat'], 0),
    ('SQ','Smoking Queen','Queen bed in smoking room',79,2,true, array['Queen Bed','Wi-Fi','TV','Mini Fridge','Microwave','AC/Heat'], 0),
    ('NSQQ','Non-Smoking Queen/Queen','Two queen beds',89,4,false, array['Two Queen Beds','Wi-Fi','TV','Mini Fridge','Microwave','AC/Heat'], 0),
    ('NSK','Non-Smoking King','King bed non-smoking',85,2,false, array['King Bed','Wi-Fi','TV','Mini Fridge','Microwave','AC/Heat'], 0),
    ('SK','Smoking King','King bed smoking',85,2,true, array['King Bed','Wi-Fi','TV','Mini Fridge','Microwave','AC/Heat'], 0)
) as t(code,name,description,rate,occupancy,is_smoking,amenities,display_count)
where not exists (select 1 from public.room_types);

notify pgrst, 'reload schema';
