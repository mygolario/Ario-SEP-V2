-- Create a function to atomically create a new project version
-- This handles locking to prevent race conditions on version number

create or replace function public.create_project_version(
  p_project_id uuid,
  p_model text
)
returns table(id uuid, version int)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_new_version int;
  v_version_id uuid;
begin
  -- 1. Check ownership
  if not exists (
    select 1 from public.projects
    where id = p_project_id
    and user_id = auth.uid()
  ) then
    raise exception 'Access denied or project not found';
  end if;

  -- 2. Advisory lock to prevent race conditions on version number
  -- We use the hash of the project_id to get a 64-bit integer for the lock
  perform pg_advisory_xact_lock(hashtext(p_project_id::text));

  -- 3. Calculate new version number
  select coalesce(max(v.version), 0) + 1
  into v_new_version
  from public.project_versions v
  where v.project_id = p_project_id;

  -- 4. Insert new version
  insert into public.project_versions (
    project_id,
    version,
    status,
    model
  ) values (
    p_project_id,
    v_new_version,
    'generating', -- Initial status
    p_model
  )
  returning project_versions.id into v_version_id;

  -- 5. Return result
  return query select v_version_id, v_new_version;
end;
$$;
