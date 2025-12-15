create table if not exists public.roadmap_items (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade not null,
  title text not null,
  description text,
  status text check (status in ('todo', 'doing', 'done', 'archived')) default 'todo',
  priority text check (priority in ('high', 'medium', 'low')) default 'medium',
  version int default 1,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.roadmap_items enable row level security;

create policy "Users can access their projects roadmap"
on public.roadmap_items
for all
using (
  exists (
    select 1 from public.projects p
    where p.id = roadmap_items.project_id
      and p.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.projects p
    where p.id = roadmap_items.project_id
      and p.user_id = auth.uid()
  )
);
