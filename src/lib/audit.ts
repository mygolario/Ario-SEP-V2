import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';

export async function logAudit(
  action: string,
  targetId?: string,
  details?: Record<string, unknown>
) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.warn('Audit log attempted without user context:', action);
      return;
    }

    // Try to get IP (Next.js specific)
    const headerList = headers();
    const ip = headerList.get('x-forwarded-for') || 'unknown';

    await supabase.from('audit_logs').insert({
      user_id: user.id,
      action,
      target_id: targetId,
      details,
      ip_address: ip,
    });
  } catch (e) {
    console.error('Failed to write audit log:', e);
    // We generally don't want audit failure to break the main app flow, just log the error.
  }
}
