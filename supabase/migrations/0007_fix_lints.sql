-- 0007_fix_lints.sql

-- 1) Fix mutable search_path warnings (safe for trigger funcs)
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- 2) RLS performance: remove duplicate permissive policies on projects
drop policy if exists "Users can view own projects" on public.projects;
drop policy if exists "Users can insert own projects" on public.projects;
drop policy if exists "Users can update own projects" on public.projects;
drop policy if exists "Users can delete own projects" on public.projects;

-- Recreate the single canonical policy with initPlan optimization
drop policy if exists "Users can access their projects" on public.projects;
create policy "Users can access their projects"
on public.projects
for all
to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));


-- 3) Fix initPlan warnings on versioning tables (wrap auth.uid with select)
drop policy if exists "Users can access their project versions" on public.project_versions;
create policy "Users can access their project versions"
on public.project_versions
for all
to authenticated
using (
  exists (
    select 1
    from public.projects p
    where p.id = project_versions.project_id
      and p.user_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1
    from public.projects p
    where p.id = project_versions.project_id
      and p.user_id = (select auth.uid())
  )
);

drop policy if exists "Users can access their project sections" on public.project_sections;
create policy "Users can access their project sections"
on public.project_sections
for all
to authenticated
using (
  exists (
    select 1
    from public.project_versions v
    join public.projects p on p.id = v.project_id
    where v.id = project_sections.version_id
      and p.user_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1
    from public.project_versions v
    join public.projects p on p.id = v.project_id
    where v.id = project_sections.version_id
      and p.user_id = (select auth.uid())
  )
);


-- 4) Fix initPlan warnings on usage_daily / feedback / telemetry
drop policy if exists usage_daily_select_own on public.usage_daily;
create policy usage_daily_select_own
on public.usage_daily
for select
to authenticated
using (user_id = (select auth.uid()));

drop policy if exists feedback_insert_own on public.feedback;
create policy feedback_insert_own
on public.feedback
for insert
to authenticated
with check (user_id = (select auth.uid()));

drop policy if exists feedback_select_own on public.feedback;
create policy feedback_select_own
on public.feedback
for select
to authenticated
using (user_id = (select auth.uid()));

drop policy if exists telemetry_events_insert_auth on public.telemetry_events;
create policy telemetry_events_insert_auth
on public.telemetry_events
for insert
to authenticated
with check (user_id is null or user_id = (select auth.uid()));

drop policy if exists telemetry_events_select_own on public.telemetry_events;
create policy telemetry_events_select_own
on public.telemetry_events
for select
to authenticated
using (user_id is null or user_id = (select auth.uid()));
