-- =========================================================
-- K GROUP | Patch to remove customer dependency on Supabase Auth
-- Run this in Supabase SQL Editor
-- =========================================================

create extension if not exists pgcrypto;

create table if not exists public.customer_accounts (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null unique,
  password_text text not null,
  created_at timestamptz not null default now()
);

alter table public.customer_accounts replica identity full;
alter table public.customer_accounts enable row level security;

alter table public.orders add column if not exists account_id uuid references public.customer_accounts(id) on delete set null;
alter table public.orders alter column user_id drop not null;

alter table public.orders replica identity full;
alter table public.orders enable row level security;

create index if not exists idx_customer_accounts_phone on public.customer_accounts(phone);
create index if not exists idx_orders_account_id on public.orders(account_id);

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on public.customer_accounts to anon, authenticated;
grant select, insert, update, delete on public.orders to anon, authenticated;

drop policy if exists "customer_accounts_select_public" on public.customer_accounts;
drop policy if exists "customer_accounts_insert_public" on public.customer_accounts;
drop policy if exists "customer_accounts_update_public" on public.customer_accounts;
drop policy if exists "customer_accounts_delete_public" on public.customer_accounts;

drop policy if exists "orders_select_public" on public.orders;
drop policy if exists "orders_insert_public" on public.orders;
drop policy if exists "orders_update_public" on public.orders;
drop policy if exists "orders_delete_public" on public.orders;

drop policy if exists "orders_select_authenticated" on public.orders;
drop policy if exists "orders_insert_own" on public.orders;
drop policy if exists "orders_update_own" on public.orders;

create policy "customer_accounts_select_public"
on public.customer_accounts
for select
to anon, authenticated
using (true);

create policy "customer_accounts_insert_public"
on public.customer_accounts
for insert
to anon, authenticated
with check (true);

create policy "customer_accounts_update_public"
on public.customer_accounts
for update
to anon, authenticated
using (true)
with check (true);

create policy "customer_accounts_delete_public"
on public.customer_accounts
for delete
to anon, authenticated
using (true);

create policy "orders_select_public"
on public.orders
for select
to anon, authenticated
using (true);

create policy "orders_insert_public"
on public.orders
for insert
to anon, authenticated
with check (true);

create policy "orders_update_public"
on public.orders
for update
to anon, authenticated
using (true)
with check (true);

create policy "orders_delete_public"
on public.orders
for delete
to anon, authenticated
using (true);

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'customer_accounts'
  ) then
    alter publication supabase_realtime add table public.customer_accounts;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'orders'
  ) then
    alter publication supabase_realtime add table public.orders;
  end if;
end $$;