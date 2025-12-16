import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';

export async function checkIsAdmin() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  return !!profile?.is_admin;
}

export async function logAuditAction(
  action: string,
  details: Record<string, unknown> = {},
  targetId?: string
) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Get IP address if possible (best effort)
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';

    await supabase.from('audit_logs').insert({
      user_id: user?.id,
      action,
      details,
      target_id: targetId,
      ip_address: ip,
    });
  } catch (error) {
    console.error('Failed to log audit action:', error);
    // Don't throw, we don't want to break the main flow if logging fails
  }
}

export async function getAuditLogs(page = 1, limit = 20) {
  const supabase = createClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // Check admin first
  if (!(await checkIsAdmin())) {
    throw new Error('Unauthorized');
  }

  const { data, error, count } = await supabase
    .from('audit_logs')
    .select(
      `
            *,
            profiles:user_id (email, full_name)
        `,
      { count: 'exact' }
    )
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw error;

  return { data, count };
}

export async function getAllUsers(page = 1, limit = 20) {
  const supabase = createClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // Check admin first
  if (!(await checkIsAdmin())) {
    throw new Error('Unauthorized');
  }

  const { data, error, count } = await supabase
    .from('profiles')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw error;

  return { data, count };
}
