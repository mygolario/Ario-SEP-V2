'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function saveArtifact(projectId: string, type: string, data: Record<string, unknown>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  // 1. Verify project ownership explicitly (though RLS handles it, good for custom checks)
  const { data: project } = await supabase
    .from('projects')
    .select('id')
    .eq('id', projectId)
    .eq('user_id', user.id)
    .single();

  if (!project) throw new Error('Project not found');

  // 2. Get max version
  const { data: existing } = await supabase
    .from('artifacts')
    .select('version')
    .eq('project_id', projectId)
    .eq('type', type)
    .order('version', { ascending: false })
    .limit(1);

  const currentVersion = existing && existing.length > 0 ? existing[0].version : 0;
  const newVersion = currentVersion + 1;

  // 3. Insert new version
  const { error } = await supabase.from('artifacts').insert({
    project_id: projectId,
    type,
    data,
    version: newVersion,
    created_by: user.id,
  });

  if (error) {
    console.error('Error saving artifact:', error);
    throw new Error('Failed to save');
  }

  revalidatePath(`/dashboard-v2/projects/${projectId}/bmc`);
  return { success: true, version: newVersion };
}

export async function getLatestArtifact(projectId: string, type: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from('artifacts')
    .select('*')
    .eq('project_id', projectId)
    .eq('type', type)
    .order('version', { ascending: false })
    .limit(1)
    .single();

  return data;
}

export async function getArtifactHistory(projectId: string, type: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from('artifacts')
    .select('id, version, created_at')
    .eq('project_id', projectId)
    .eq('type', type)
    .order('version', { ascending: false });

  return data || [];
}
