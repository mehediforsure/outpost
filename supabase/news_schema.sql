create table if not exists public.newsdb (
  id bigint generated always as identity primary key,
  title text not null,
  original_summary text,
  ai_rewrite text,
  source_feed text,
  created_at timestamptz not null default now()
);

alter table public.newsdb enable row level security;

create policy "News articles are readable by everyone"
on public.newsdb
for select
to anon, authenticated
using (true);

create index if not exists newsdb_created_at_idx
on public.newsdb (created_at desc);

insert into public.newsdb (
  title,
  original_summary,
  ai_rewrite,
  source_feed
) values
(
  'Inside the new AI newsroom built for faster public-interest reporting',
  'Editors are using automation to detect leads, verify sources, and publish explainers without losing human judgment.',
  'Modern publishing teams are under pressure to move faster while keeping trust intact.

The strongest newsrooms are treating automation as infrastructure: a way to reduce repetitive work, surface signals, and keep reporters focused on context.',
  'Technology Desk'
);
