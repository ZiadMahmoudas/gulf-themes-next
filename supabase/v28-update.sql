-- ArabDEV V28
-- Adds one flexible JSON field for all social-media links while keeping the
-- original facebook / instagram / linkedin columns for backwards compatibility.

alter table public.site_settings
  add column if not exists social_links jsonb not null default '{}'::jsonb;

update public.site_settings
set social_links = coalesce(social_links, '{}'::jsonb) || jsonb_strip_nulls(
  jsonb_build_object(
    'facebook', nullif(facebook, ''),
    'instagram', nullif(instagram, ''),
    'linkedin', nullif(linkedin, '')
  )
)
where id = 1;
