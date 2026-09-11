-- ArabDEV V20 — product video support + larger media bucket
-- Run once in Supabase > SQL Editor.

alter table public.themes add column if not exists video_url text;
alter table public.plugins add column if not exists video_url text;

update storage.buckets
set
  public = true,
  file_size_limit = 31457280,
  allowed_mime_types = array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'video/mp4',
    'video/webm',
    'video/quicktime',
    'video/x-m4v'
  ]
where id = 'media';
