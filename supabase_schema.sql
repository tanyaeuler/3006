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
