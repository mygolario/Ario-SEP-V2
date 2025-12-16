-- Backfill profiles for existing auth.users
insert into public.profiles (id, full_name, email)
select 
  id, 
  raw_user_meta_data->>'full_name', 
  email
from auth.users
where id not in (select id from public.profiles);
