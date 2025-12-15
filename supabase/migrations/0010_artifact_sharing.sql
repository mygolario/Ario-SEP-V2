-- Add share_token column to artifacts
alter table public.artifacts add column if not exists share_token text unique;

create index if not exists idx_artifacts_share_token on public.artifacts(share_token);

-- Secure function for public access to shared artifacts
-- This function is SECURITY DEFINER to bypass RLS, but it ONLY returns data if the token matches.
create or replace function public.get_shared_artifact(token_input text)
returns jsonb
language plpgsql
security definer
as $$
declare
  result jsonb;
begin
  select jsonb_build_object(
    'id', a.id,
    'type', a.type,
    'data', a.data,
    'version', a.version,
    'created_at', a.created_at,
    'project_title', (select title from public.projects where id = a.project_id)
  ) into result
  from public.artifacts a
  where a.share_token = token_input;
  
  return result;
end;
$$;
