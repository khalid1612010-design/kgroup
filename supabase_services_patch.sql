-- =========================================================
-- K GROUP | Patch to add services_items table
-- Run this in Supabase SQL Editor
-- =========================================================

create table if not exists public.services_items (
  id text primary key,
  category text not null, -- 'prints', 'gifts', 'stands'
  image text not null,
  name text not null,
  created_at timestamptz not null default now()
);

alter table public.services_items replica identity full;
alter table public.services_items enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on public.services_items to anon, authenticated;

drop policy if exists "services_select_public" on public.services_items;
drop policy if exists "services_insert_public" on public.services_items;
drop policy if exists "services_update_public" on public.services_items;
drop policy if exists "services_delete_public" on public.services_items;

create policy "services_select_public" on public.services_items
  for select to anon, authenticated using (true);

create policy "services_insert_public" on public.services_items
  for insert to anon, authenticated with check (true);

create policy "services_update_public" on public.services_items
  for update to anon, authenticated using (true) with check (true);

create policy "services_delete_public" on public.services_items
  for delete to anon, authenticated using (true);

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'services_items'
  ) then
    alter publication supabase_realtime add table public.services_items;
  end if;
end $$;
