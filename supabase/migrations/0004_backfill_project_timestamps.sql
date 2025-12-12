update public.projects
set created_at = coalesce(created_at, now()),
    updated_at = coalesce(updated_at, now())
where created_at is null or updated_at is null;

alter table public.projects alter column created_at set not null;
alter table public.projects alter column updated_at set not null;
