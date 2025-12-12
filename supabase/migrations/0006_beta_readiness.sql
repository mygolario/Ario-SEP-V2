-- Usage limits, feedback, telemetry, and daily quota RPC

-- Helper: updated_at trigger
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Usage daily table
create table if not exists public.usage_daily (
  user_id uuid not null,
  day date not null,
  generate_count int not null default 0,
  regen_count int not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint usage_daily_unique_day unique (user_id, day)
);

drop trigger if exists set_usage_daily_updated_at on public.usage_daily;
create trigger set_usage_daily_updated_at
before update on public.usage_daily
for each row
execute procedure public.set_updated_at();

alter table public.usage_daily enable row level security;

-- Allow users to read their own usage rows
do $$
begin
  if not exists (
    select 1 from pg_policies
    where policyname = 'usage_daily_select_own'
      and tablename = 'usage_daily'
  ) then
    create policy usage_daily_select_own on public.usage_daily
      for select
      using (auth.uid() = user_id);
  end if;
end$$;

-- No insert/update policies: only RPC (security definer) should modify counts

-- Feedback table
create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  project_id uuid null,
  version_id uuid null,
  message text not null,
  created_at timestamptz default now()
);

alter table public.feedback enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where policyname = 'feedback_insert_own'
      and tablename = 'feedback'
  ) then
    create policy feedback_insert_own on public.feedback
      for insert
      with check (auth.uid() = user_id);
  end if;

  if not exists (
    select 1 from pg_policies
    where policyname = 'feedback_select_own'
      and tablename = 'feedback'
  ) then
    create policy feedback_select_own on public.feedback
      for select
      using (auth.uid() = user_id);
  end if;
end$$;

-- Telemetry events table
create table if not exists public.telemetry_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid null,
  event text not null,
  properties jsonb not null default '{}'::jsonb,
  created_at timestamptz default now()
);

alter table public.telemetry_events enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where policyname = 'telemetry_events_insert_auth'
      and tablename = 'telemetry_events'
  ) then
    create policy telemetry_events_insert_auth on public.telemetry_events
      for insert
      with check (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where policyname = 'telemetry_events_select_own'
      and tablename = 'telemetry_events'
  ) then
    create policy telemetry_events_select_own on public.telemetry_events
      for select
      using (user_id is null or auth.uid() = user_id);
  end if;
end$$;

-- RPC: check_and_increment_daily
drop function if exists public.check_and_increment_daily(text, int);
create or replace function public.check_and_increment_daily(kind text, p_limit int)
returns table (
  allowed boolean,
  used int,
  remaining int
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_day date := (now() at time zone 'Asia/Tehran')::date;
  v_limit int := greatest(coalesce(p_limit, 0), 0);
  v_used int;
begin
  if v_user is null then
    return query select false, 0, 0;
    return;
  end if;

  insert into public.usage_daily (user_id, day)
  values (v_user, v_day)
  on conflict do nothing;

  if kind = 'generate' then
    update public.usage_daily
    set generate_count = generate_count + 1,
        updated_at = now()
    where user_id = v_user
      and day = v_day
      and generate_count < v_limit
    returning generate_count into v_used;
  elsif kind = 'regen' then
    update public.usage_daily
    set regen_count = regen_count + 1,
        updated_at = now()
    where user_id = v_user
      and day = v_day
      and regen_count < v_limit
    returning regen_count into v_used;
  else
    return query select false, 0, v_limit;
    return;
  end if;

  if v_used is null then
    select case when kind = 'generate' then generate_count else regen_count end
    into v_used
    from public.usage_daily
    where user_id = v_user
      and day = v_day;

    return query select false, v_used, greatest(v_limit - v_used, 0);
    return;
  end if;

  return query select true, v_used, greatest(v_limit - v_used, 0);
end;
$$;

grant execute on function public.check_and_increment_daily(text, int) to authenticated;
