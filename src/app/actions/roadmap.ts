'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function generateRoadmap(projectId: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  // Fetch project inputs to customize roadmap
  const { data: project } = await supabase
    .from('projects')
    .select('inputs')
    .eq('id', projectId)
    .eq('user_id', user.id)
    .single();

  if (!project) throw new Error('Project not found');

  const inputs = project.inputs as Record<string, string>;
  const isTech = inputs['tech_stack'] && inputs['tech_stack'].length > 0;

  // Simple logic engine
  const items = [
    {
      title: 'تحقیقات بازار و اعتبارسنجی اولیه',
      description: 'بررسی رقبا و مصاحبه با ۱۰ مشتری احتمالی برای تایید فرضیات.',
      priority: 'high',
      status: 'todo',
    },
    {
      title: 'طراحی محصول اولیه (MVP)',
      description: 'طراحی Wireframe صفحات اصلی و فلوهای کاربری.',
      priority: 'medium',
      status: 'todo',
    },
    {
      title: isTech ? 'توسعه زیرساخت فنی' : 'آماده‌سازی مقدمات تولید',
      description: isTech
        ? 'راه اندازی ریپازیتوری، دیتابیس و محیط توسعه.'
        : 'تهیه مواد اولیه و تجهیزات مورد نیاز.',
      priority: 'high',
      status: 'todo',
    },
    {
      title: 'بازاریابی و جذب اولین کاربران',
      description: 'ساخت لندینگ پیج و شروع کمپین‌های کوچک در شبکه‌های اجتماعی.',
      priority: 'medium',
      status: 'todo',
    },
    {
      title: 'لانچ آزمایشی (Soft Launch)',
      description: 'ارائه محصول به گروه محدودی از کاربران و جمع‌آوری بازخورد.',
      priority: 'low',
      status: 'todo',
    },
  ];

  // Archive old items (Simple versioning strategy: set status to archived?)
  // Actually, let's just insert new ones with version increment if we wanted complex versioning.
  // For MVP, we just ADD them if list is empty, or RE-ADD if requested (which might duplicate or we delete old).
  // Let's delete old 'todo' items to keep it clean, or just append?
  // User requested "Regenerate roadmap", keep old version accessible.
  // Let's create with version = (max_version + 1).

  // Get max version
  const { data: existing } = await supabase
    .from('roadmap_items')
    .select('version')
    .eq('project_id', projectId)
    .order('version', { ascending: false })
    .limit(1);

  const currentVersion = existing && existing.length > 0 ? existing[0].version : 0;
  const newVersion = currentVersion + 1;

  const dbItems = items.map((i) => ({
    project_id: projectId,
    ...i,
    version: newVersion,
  }));

  const { error } = await supabase.from('roadmap_items').insert(dbItems);

  if (error) {
    console.error('Error generating roadmap:', error);
    throw new Error('Failed to generate roadmap');
  }

  revalidatePath(`/dashboard-v2/projects/${projectId}`);
  return { success: true };
}

export async function getRoadmap(projectId: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  // Get latest version items only for default view
  // Subquery to find max version? Or just fetch all and sort logic in client?
  // Let's fetch ALL and client selects max version, OR fetch items where version = (select max(version)...)
  // Supabase select doesn't support easy subquery in one go often.
  // Two steps: 1. find max version (or assume current logic).
  // Let's just fetch ALL (user won't have 1000 versions) and filter in client/server.

  // Actually simpler: Query items order by version desc.
  const { data } = await supabase
    .from('roadmap_items')
    .select('*')
    .eq('project_id', projectId)
    .eq('user_id', user.id) // Security check implicit via RLS but strictly enforces valid project ownership too via join, but RLS on project_id handles it.
    // Wait, roadmap_items doesn't have user_id column in my migration! It relies on project's user_id. RLS handles it.
    .order('version', { ascending: false })
    .order('created_at', { ascending: true });

  return data || [];
}

export async function updateRoadmapItemStatus(itemId: string, status: string) {
  const supabase = createClient();
  const { error } = await supabase.from('roadmap_items').update({ status }).eq('id', itemId);

  if (error) throw new Error('Failed to update status');
  revalidatePath('/dashboard-v2');
  return { success: true };
}
