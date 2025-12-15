'use server';

import { createClient } from '@/utils/supabase/server';
import { logAudit } from '@/lib/audit';

export async function checkAdmin() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;

  const { data } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single();

  return !!data?.is_admin;
}

export async function getUsers() {
  const isAdmin = await checkAdmin();
  if (!isAdmin) throw new Error('Unauthorized');

  const supabase = createClient();

  // In a real production app with thousands of users, we'd use pagination.
  // Assuming manageable scale for V2.
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function getAuditLogs() {
  const isAdmin = await checkAdmin();
  if (!isAdmin) throw new Error('Unauthorized');

  const supabase = createClient();

  const { data, error } = await supabase
    .from('audit_logs')
    .select('*, profiles(full_name, email)')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) throw new Error(error.message);
  return data;
}

export async function toggleAdminStatus(userId: string, status: boolean) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) throw new Error('Unauthorized');

  const supabase = createClient();
  await supabase.from('profiles').update({ is_admin: status }).eq('id', userId);

  await logAudit('ADMIN_TOGGLE', userId, { new_status: status });
  return true;
}
