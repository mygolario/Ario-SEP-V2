-- Projects table updates (preserve existing business_data)
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'projects' and column_name = 'title'
  ) then
    alter table public.projects add column title text not null default 'پروژه جدید';
  end if;

  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'projects' and column_name = 'inputs'
  ) then
    alter table public.projects add column inputs jsonb;
  end if;

  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'projects' and column_name = 'updated_at'
  ) then
    alter table public.projects add column updated_at timestamptz default now();
  end if;

  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'projects' and column_name = 'created_at'
  ) then
    alter table public.projects add column created_at timestamptz default now();
  end if;
end
$$;

alter table if exists public.projects alter column title set default 'پروژه جدید';
alter table if exists public.projects alter column updated_at set default now();
alter table if exists public.projects alter column created_at set default now();
alter table if exists public.projects alter column inputs set default '{}'::jsonb;
update public.projects set inputs = coalesce(inputs, '{}'::jsonb);
alter table if exists public.projects alter column inputs set not null;

-- Versions
create table if not exists public.project_versions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  version int not null,
  status text not null,
  model text null,
  error text null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (project_id, version)
);

-- Sections
create table if not exists public.project_sections (
  id uuid primary key default gen_random_uuid(),
  version_id uuid not null references public.project_versions (id) on delete cascade,
  section_key text not null,
  content jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (version_id, section_key)
);

-- Indexes
create index if not exists idx_projects_user_id on public.projects (user_id);
create index if not exists idx_project_versions_project_id_version on public.project_versions (project_id, version desc);
create index if not exists idx_project_sections_version_section on public.project_sections (version_id, section_key);

-- Updated at triggers
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_projects_updated_at on public.projects;
create trigger trg_projects_updated_at
before update on public.projects
for each row
execute procedure public.update_updated_at_column();

drop trigger if exists trg_project_versions_updated_at on public.project_versions;
create trigger trg_project_versions_updated_at
before update on public.project_versions
for each row
execute procedure public.update_updated_at_column();

drop trigger if exists trg_project_sections_updated_at on public.project_sections;
create trigger trg_project_sections_updated_at
before update on public.project_sections
for each row
execute procedure public.update_updated_at_column();

-- RLS
alter table public.projects enable row level security;
alter table public.project_versions enable row level security;
alter table public.project_sections enable row level security;

-- Policies
drop policy if exists "Users can access their projects" on public.projects;
create policy "Users can access their projects"
on public.projects
for all
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "Users can access their project versions" on public.project_versions;
create policy "Users can access their project versions"
on public.project_versions
for all
using (
  exists (
    select 1 from public.projects p
    where p.id = project_versions.project_id
      and p.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.projects p
    where p.id = project_versions.project_id
      and p.user_id = auth.uid()
  )
);

drop policy if exists "Users can access their project sections" on public.project_sections;
create policy "Users can access their project sections"
on public.project_sections
for all
using (
  exists (
    select 1
    from public.project_versions pv
    join public.projects p on p.id = pv.project_id
    where pv.id = project_sections.version_id
      and p.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.project_versions pv
    join public.projects p on p.id = pv.project_id
    where pv.id = project_sections.version_id
      and p.user_id = auth.uid()
  )
);
