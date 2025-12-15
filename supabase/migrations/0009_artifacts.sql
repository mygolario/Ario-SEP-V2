create table if not exists public.artifacts (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade not null,
  type text not null, -- 'bmc', 'swot', etc.
  data jsonb not null,
  version int default 1,
  created_at timestamptz default now(),
  created_by uuid references auth.users(id)
);

alter table public.artifacts enable row level security;

-- Policy: Users can access artifacts of their projects
create policy "Users can access artifacts of their projects"
on public.artifacts
for all
using (
  exists (
    select 1 from public.projects p
    where p.id = artifacts.project_id
      and p.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.projects p
    where p.id = artifacts.project_id
      and p.user_id = auth.uid()
  )
);
