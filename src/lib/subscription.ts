import { createClient } from '@/utils/supabase/server';

export async function isProUser(): Promise<boolean> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const plan = user.app_metadata?.plan;

  // For Development/Demo purposes, we can hardcode logic here or check the DB.
  // Let's assume 'pro' or 'admin' grants access.
  // Also, we can allow a 'trial' status?

  return plan === 'pro' || plan === 'admin';
}

export async function getUserPlan(): Promise<string> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.app_metadata?.plan || 'free';
}
