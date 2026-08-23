create extension if not exists pgcrypto;

create table if not exists public.client_logos (
  id uuid primary key default gen_random_uuid(),
  image text not null,
  created_at timestamptz not null default now()
);

alter table public.client_logos replica identity full;
alter table public.client_logos enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on public.client_logos to anon, authenticated;

drop policy if exists "client_logos_all_public" on public.client_logos;
create policy "client_logos_all_public"
on public.client_logos
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
      and tablename = 'client_logos'
  ) then
    alter publication supabase_realtime add table public.client_logos;
  end if;
end $$;