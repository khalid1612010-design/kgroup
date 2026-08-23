-- =========================================================
-- K GROUP | Storage + printing methods patch
-- Run this in Supabase SQL Editor
-- =========================================================

create extension if not exists pgcrypto;

create table if not exists public.printing_methods (
  id text primary key,
  name_ar text not null,
  name_en text not null,
  created_at timestamptz not null default now()
);

alter table public.printing_methods replica identity full;
alter table public.printing_methods enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on public.printing_methods to anon, authenticated;

drop policy if exists "printing_methods_select_public" on public.printing_methods;
drop policy if exists "printing_methods_write_public" on public.printing_methods;

create policy "printing_methods_select_public"
on public.printing_methods
for select
to anon, authenticated
using (true);

create policy "printing_methods_write_public"
on public.printing_methods
for all
to anon, authenticated
using (true)
with check (true);

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'printing_methods'
  ) then
    alter publication supabase_realtime add table public.printing_methods;
  end if;
end $$;

insert into public.printing_methods (id, name_ar, name_en)
values
  ('uv', 'طباعة UV', 'UV Printing'),
  ('screen', 'سيلك سكرين', 'Screen Printing'),
  ('dtf', 'DTF', 'DTF'),
  ('dtg', 'DTG', 'DTG'),
  ('laser', 'ليزر', 'Laser'),
  ('embroidery', 'تطريز', 'Embroidery'),
  ('heat-transfer', 'هوت ترانسفير', 'Heat Transfer'),
  ('vinyl', 'فينيل', 'Vinyl')
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('kgroup-media', 'kgroup-media', true)
on conflict (id) do update set public = true;

create extension if not exists pgcrypto;

drop policy if exists "kgroup_media_read_public" on storage.objects;
drop policy if exists "kgroup_media_insert_public" on storage.objects;
drop policy if exists "kgroup_media_update_public" on storage.objects;
drop policy if exists "kgroup_media_delete_public" on storage.objects;

create policy "kgroup_media_read_public"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'kgroup-media');

create policy "kgroup_media_insert_public"
on storage.objects
for insert
to anon, authenticated
with check (bucket_id = 'kgroup-media');

create policy "kgroup_media_update_public"
on storage.objects
for update
to anon, authenticated
using (bucket_id = 'kgroup-media')
with check (bucket_id = 'kgroup-media');

create policy "kgroup_media_delete_public"
on storage.objects
for delete
to anon, authenticated
using (bucket_id = 'kgroup-media');