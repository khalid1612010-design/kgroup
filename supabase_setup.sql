-- =========================================================
-- K GROUP | Supabase setup script
-- Run this entire file once in Supabase SQL Editor
-- =========================================================

create extension if not exists pgcrypto;

-- =========================================================
-- TABLES
-- =========================================================

create table if not exists public.categories (
  id text primary key,
  name_ar text not null,
  name_en text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key,
  category_id text not null references public.categories(id) on update cascade on delete restrict,
  name_ar text not null,
  name_en text not null,
  short_desc_ar text not null,
  short_desc_en text not null,
  full_desc_ar text not null,
  full_desc_en text not null,
  image text not null,
  methods text[] not null default '{}',
  project_image text not null,
  project_desc_ar text not null,
  project_desc_en text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.portfolio_items (
  id text primary key,
  title_ar text not null,
  title_en text not null,
  method_ar text not null,
  method_en text not null,
  image text not null,
  description_ar text not null,
  description_en text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id text references public.products(id) on update cascade on delete set null,
  product_name_ar text not null,
  product_name_en text not null,
  customer_name text not null,
  phone text not null,
  email text,
  quantity integer not null check (quantity > 0),
  printing_type text,
  notes text,
  request_type text not null check (request_type in ('quote', 'order')),
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists idx_products_category_id on public.products(category_id);
create index if not exists idx_orders_user_id on public.orders(user_id);
create index if not exists idx_orders_created_at on public.orders(created_at desc);
create index if not exists idx_profiles_created_at on public.profiles(created_at desc);

alter table public.categories replica identity full;
alter table public.products replica identity full;
alter table public.portfolio_items replica identity full;
alter table public.profiles replica identity full;
alter table public.orders replica identity full;

-- =========================================================
-- ENABLE RLS
-- =========================================================

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.portfolio_items enable row level security;
alter table public.profiles enable row level security;
alter table public.orders enable row level security;

-- =========================================================
-- DROP OLD POLICIES IF THEY EXIST
-- =========================================================

drop policy if exists "categories_select_public" on public.categories;
drop policy if exists "categories_write_authenticated" on public.categories;

drop policy if exists "products_select_public" on public.products;
drop policy if exists "products_write_authenticated" on public.products;

drop policy if exists "portfolio_select_public" on public.portfolio_items;
drop policy if exists "portfolio_write_authenticated" on public.portfolio_items;

drop policy if exists "profiles_select_authenticated" on public.profiles;
drop policy if exists "profiles_insert_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;

drop policy if exists "orders_select_authenticated" on public.orders;
drop policy if exists "orders_insert_own" on public.orders;

drop policy if exists "orders_update_own" on public.orders;

-- =========================================================
-- GRANTS
-- =========================================================

grant usage on schema public to anon, authenticated;

grant select on public.categories to anon, authenticated;
grant select on public.products to anon, authenticated;
grant select on public.portfolio_items to anon, authenticated;

grant select, insert, update, delete on public.categories to authenticated;
grant select, insert, update, delete on public.products to authenticated;
grant select, insert, update, delete on public.portfolio_items to authenticated;

grant select, insert, update on public.profiles to authenticated;
grant select, insert, update on public.orders to authenticated;

-- =========================================================
-- RLS POLICIES
-- NOTE:
-- Public can READ store data.
-- Authenticated users can WRITE store data, because your current site
-- uses a frontend admin password only. The UI now also requires login
-- before cloud admin actions, but this is still NOT strong security.
-- =========================================================

create policy "categories_select_public"
on public.categories
for select
to anon, authenticated
using (true);

create policy "categories_write_authenticated"
on public.categories
for all
to authenticated
using (true)
with check (true);

create policy "products_select_public"
on public.products
for select
to anon, authenticated
using (true);

create policy "products_write_authenticated"
on public.products
for all
to authenticated
using (true)
with check (true);

create policy "portfolio_select_public"
on public.portfolio_items
for select
to anon, authenticated
using (true);

create policy "portfolio_write_authenticated"
on public.portfolio_items
for all
to authenticated
using (true)
with check (true);

create policy "profiles_select_authenticated"
on public.profiles
for select
to authenticated
using (true);

create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "orders_select_authenticated"
on public.orders
for select
to authenticated
using (true);

create policy "orders_insert_own"
on public.orders
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "orders_update_own"
on public.orders
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- =========================================================
-- REALTIME PUBLICATION
-- =========================================================

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'categories'
  ) then
    alter publication supabase_realtime add table public.categories;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'products'
  ) then
    alter publication supabase_realtime add table public.products;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'portfolio_items'
  ) then
    alter publication supabase_realtime add table public.portfolio_items;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'profiles'
  ) then
    alter publication supabase_realtime add table public.profiles;
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

-- =========================================================
-- DEFAULT DATA
-- =========================================================

insert into public.categories (id, name_ar, name_en)
values
  ('notebooks', 'دفاتر', 'Notebooks'),
  ('mugs', 'أكواب', 'Mugs'),
  ('business-cards', 'كروت شخصية', 'Business Cards'),
  ('tshirts', 'تيشيرتات', 'T-Shirts'),
  ('bags', 'شنط', 'Bags'),
  ('pens', 'أقلام', 'Pens'),
  ('stickers', 'ستيكرات', 'Stickers'),
  ('other', 'أخرى', 'Other')
on conflict (id) do nothing;

insert into public.products (
  id, category_id, name_ar, name_en, short_desc_ar, short_desc_en,
  full_desc_ar, full_desc_en, image, methods, project_image,
  project_desc_ar, project_desc_en
)
values
  (
    'prod-1',
    'notebooks',
    'دفاتر فاخرة بغطاء كتاني',
    'Premium Linen Notebooks',
    'دفاتر أنيقة مناسبة للهدايا المؤسسية والعلامات التجارية الراقية.',
    'Elegant notebooks ideal for corporate gifts and refined brand identities.',
    'دفاتر بغطاء فاخر وخامة داخلية مريحة للكتابة، مناسبة لطباعة الشعار أو الهوية البصرية للشركات، مع إمكانيات تشطيب متعددة مثل UV والليزر والضغط الحراري.',
    'Luxury notebooks with a refined cover finish and smooth inner paper, perfect for logos, visual identities, and premium gifting. Suitable for UV printing, laser details, and heat transfer finishing.',
    'https://images.pexels.com/photos/6786610/pexels-photo-6786610.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    array['uv','laser','heat-transfer'],
    'https://images.pexels.com/photos/360009/pexels-photo-360009.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    'تنفيذ دفاتر بلون فحمي مع لمسة ذهبية لعميل مؤسسي ضمن مؤتمر سنوي.',
    'Charcoal notebooks with a subtle gold touch produced for a corporate annual event.'
  ),
  (
    'prod-2',
    'mugs',
    'أكواب سيراميك مطفية',
    'Matte Ceramic Mugs',
    'أكواب بطبعة مخصصة مناسبة للعلامات التجارية والمقاهي والهدايا.',
    'Custom printed mugs for brands, cafés, and stylish promotional gifting.',
    'أكواب سيراميك مطفية بتصميم عصري وتشطيب ناعم، قابلة للطباعة بعدة تقنيات حسب الخامة واللون المطلوب.',
    'Contemporary matte ceramic mugs with a soft finish, suitable for multiple print techniques depending on color and material needs.',
    'https://images.pexels.com/photos/6312175/pexels-photo-6312175.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    array['screen','uv','laser'],
    'https://images.pexels.com/photos/6312235/pexels-photo-6312235.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    'طباعة شعار لمقهى محلي على أكواب فاتحة بطابع بسيط وراقي.',
    'Minimal café logo printing on light-toned mugs with a clean premium finish.'
  )
on conflict (id) do nothing;

insert into public.portfolio_items (
  id, title_ar, title_en, method_ar, method_en, image, description_ar, description_en
)
values
  (
    'port-1',
    'دفاتر مؤتمر تنفيذي',
    'Executive Conference Notebooks',
    'طباعة UV و لمسة ذهبية',
    'UV Printing & Gold Accent',
    'https://images.pexels.com/photos/360009/pexels-photo-360009.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    'دفاتر بتشطيب فاخر تم تنفيذها لجهة مؤسسية ضمن فعالية رسمية.',
    'Premium notebooks executed for a formal corporate event with a refined finish.'
  ),
  (
    'port-2',
    'أكواب لمقهى محلي',
    'Custom Mugs for a Local Café',
    'ليزر / سيلك سكرين',
    'Laser / Screen Printing',
    'https://images.pexels.com/photos/3439481/pexels-photo-3439481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    'أكواب مخصصة لبراند قهوة بطابع بصري بسيط ومريح.',
    'Branded mugs designed for a coffee brand with a clean and elegant style.'
  )
on conflict (id) do nothing;

-- =========================================================
-- OPTIONAL BUT RECOMMENDED
-- 1) In Supabase Dashboard > Authentication > Providers:
--    Enable Phone provider.
-- 2) If you don't have SMS provider configured yet, disable phone confirmation
--    temporarily for testing, or configure Twilio / MessageBird / Vonage.
-- 3) In Database > Replication, ensure these tables are enabled for Realtime.
-- =========================================================