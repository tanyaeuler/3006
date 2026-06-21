-- Run this in your Supabase SQL editor to create the required table

create table if not exists businesses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  address text not null,
  phone text not null,
  website text,
  platform_statuses jsonb default '{}'::jsonb,
  checklist jsonb default '{}'::jsonb
);

-- Allow anonymous reads and inserts (no auth required for MVP)
alter table businesses enable row level security;

create policy "Anyone can insert" on businesses
  for insert with check (true);

create policy "Anyone can read their own row" on businesses
  for select using (true);

create policy "Anyone can update their own row" on businesses
  for update using (true);

-- Camper trailer booking system

create table if not exists camper_bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  start_date date not null,
  end_date date not null,
  pickup_time text not null
);

alter table camper_bookings enable row level security;

create policy "Anyone can insert bookings" on camper_bookings
  for insert with check (true);

create policy "Anyone can read bookings" on camper_bookings
  for select using (true);

create policy "Anyone can delete bookings" on camper_bookings
  for delete using (true);
