-- ArabDEV CMS schema
-- Run once in Supabase SQL Editor after creating your project.

create extension if not exists pgcrypto;

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text default '',
  content_html text default '',
  category text default 'WordPress',
  featured_image text,
  seo_title text,
  seo_description text,
  keywords text[] default '{}',
  status text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.themes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  label text default '',
  category text default 'WordPress',
  description text default '',
  content_html text default '',
  cover_image text,
  gallery text[] default '{}',
  price text default 'قريباً',
  features text[] default '{}',
  demo_url text,
  seo_title text,
  seo_description text,
  keywords text[] default '{}',
  status text not null default 'draft' check (status in ('draft','published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.plugins (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  label text default '',
  category text default 'WordPress',
  description text default '',
  content_html text default '',
  cover_image text,
  price text default 'قريباً',
  features text[] default '{}',
  demo_url text,
  seo_title text,
  seo_description text,
  keywords text[] default '{}',
  status text not null default 'draft' check (status in ('draft','published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text default '',
  project_type text default '',
  message text not null,
  status text not null default 'new' check (status in ('new','read','archived')),
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  brand_name text default 'ArabDEV',
  tagline text default 'ثيمات وإضافات ومنتجات WordPress عربية بجودة تليق بالسوق الخليجي.',
  phone text default '01100133486',
  email text default 'ziadbobo78@gmail.com',
  facebook text default 'https://www.facebook.com/ziadmohagerDev/',
  instagram text default 'https://www.instagram.com/ziadmohagerdev/',
  linkedin text default 'https://www.linkedin.com/in/ziad-mahmoud-mohammed/',
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id) values (1) on conflict (id) do nothing;

-- Keep updated_at accurate.
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists articles_updated_at on public.articles;
create trigger articles_updated_at before update on public.articles
for each row execute function public.set_updated_at();

drop trigger if exists themes_updated_at on public.themes;
create trigger themes_updated_at before update on public.themes
for each row execute function public.set_updated_at();

drop trigger if exists plugins_updated_at on public.plugins;
create trigger plugins_updated_at before update on public.plugins
for each row execute function public.set_updated_at();

drop trigger if exists faqs_updated_at on public.faqs;
create trigger faqs_updated_at before update on public.faqs
for each row execute function public.set_updated_at();

drop trigger if exists settings_updated_at on public.site_settings;
create trigger settings_updated_at before update on public.site_settings
for each row execute function public.set_updated_at();

-- RLS
alter table public.articles enable row level security;
alter table public.themes enable row level security;
alter table public.plugins enable row level security;
alter table public.faqs enable row level security;
alter table public.contact_messages enable row level security;
alter table public.site_settings enable row level security;

-- Public visitors can only read published content.
drop policy if exists "public read published articles" on public.articles;
create policy "public read published articles" on public.articles for select to anon, authenticated
using (status = 'published' or (select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');

drop policy if exists "public read published themes" on public.themes;
create policy "public read published themes" on public.themes for select to anon, authenticated
using (status = 'published' or (select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');

drop policy if exists "public read published plugins" on public.plugins;
create policy "public read published plugins" on public.plugins for select to anon, authenticated
using (status = 'published' or (select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');

-- Only the owner/admin email can write CMS content.
drop policy if exists "admin insert articles" on public.articles;
create policy "admin insert articles" on public.articles for insert to authenticated
with check ((select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');
drop policy if exists "admin update articles" on public.articles;
create policy "admin update articles" on public.articles for update to authenticated
using ((select auth.jwt()->>'email') = 'ziadbobo78@gmail.com')
with check ((select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');
drop policy if exists "admin delete articles" on public.articles;
create policy "admin delete articles" on public.articles for delete to authenticated
using ((select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');

drop policy if exists "admin insert themes" on public.themes;
create policy "admin insert themes" on public.themes for insert to authenticated
with check ((select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');
drop policy if exists "admin update themes" on public.themes;
create policy "admin update themes" on public.themes for update to authenticated
using ((select auth.jwt()->>'email') = 'ziadbobo78@gmail.com')
with check ((select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');
drop policy if exists "admin delete themes" on public.themes;
create policy "admin delete themes" on public.themes for delete to authenticated
using ((select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');

drop policy if exists "admin insert plugins" on public.plugins;
create policy "admin insert plugins" on public.plugins for insert to authenticated
with check ((select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');
drop policy if exists "admin update plugins" on public.plugins;
create policy "admin update plugins" on public.plugins for update to authenticated
using ((select auth.jwt()->>'email') = 'ziadbobo78@gmail.com')
with check ((select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');
drop policy if exists "admin delete plugins" on public.plugins;
create policy "admin delete plugins" on public.plugins for delete to authenticated
using ((select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');



-- FAQ public read / admin write.
drop policy if exists "public read faqs" on public.faqs;
create policy "public read faqs" on public.faqs for select to anon, authenticated
using (is_published = true or (select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');
drop policy if exists "admin insert faqs" on public.faqs;
create policy "admin insert faqs" on public.faqs for insert to authenticated
with check ((select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');
drop policy if exists "admin update faqs" on public.faqs;
create policy "admin update faqs" on public.faqs for update to authenticated
using ((select auth.jwt()->>'email') = 'ziadbobo78@gmail.com')
with check ((select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');
drop policy if exists "admin delete faqs" on public.faqs;
create policy "admin delete faqs" on public.faqs for delete to authenticated
using ((select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');

-- Anyone can send a contact message, nobody public can read it.
drop policy if exists "public send contact messages" on public.contact_messages;
create policy "public send contact messages" on public.contact_messages for insert to anon, authenticated
with check (char_length(name) between 2 and 120 and char_length(message) between 10 and 5000);
drop policy if exists "admin read contact messages" on public.contact_messages;
create policy "admin read contact messages" on public.contact_messages for select to authenticated
using ((select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');
drop policy if exists "admin update contact messages" on public.contact_messages;
create policy "admin update contact messages" on public.contact_messages for update to authenticated
using ((select auth.jwt()->>'email') = 'ziadbobo78@gmail.com')
with check ((select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');
drop policy if exists "admin delete contact messages" on public.contact_messages;
create policy "admin delete contact messages" on public.contact_messages for delete to authenticated
using ((select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');

-- Settings are public-readable, admin-writable.
drop policy if exists "public read settings" on public.site_settings;
create policy "public read settings" on public.site_settings for select to anon, authenticated using (true);
drop policy if exists "admin update settings" on public.site_settings;
create policy "admin update settings" on public.site_settings for update to authenticated
using ((select auth.jwt()->>'email') = 'ziadbobo78@gmail.com')
with check ((select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');

-- Storage bucket for all CMS images.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 10485760, array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do update set public = excluded.public;

drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects for select to public using (bucket_id = 'media');

drop policy if exists "admin upload media" on storage.objects;
create policy "admin upload media" on storage.objects for insert to authenticated
with check (bucket_id = 'media' and (select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');

drop policy if exists "admin update media" on storage.objects;
create policy "admin update media" on storage.objects for update to authenticated
using (bucket_id = 'media' and (select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');

drop policy if exists "admin delete media" on storage.objects;
create policy "admin delete media" on storage.objects for delete to authenticated
using (bucket_id = 'media' and (select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');

-- Helpful indexes.
create index if not exists articles_status_published_idx on public.articles(status, published_at desc);
create index if not exists themes_status_idx on public.themes(status, created_at desc);
create index if not exists plugins_status_idx on public.plugins(status, created_at desc);
create index if not exists contact_messages_status_idx on public.contact_messages(status, created_at desc);

create index if not exists faqs_publish_order_idx on public.faqs(is_published, sort_order, created_at);
