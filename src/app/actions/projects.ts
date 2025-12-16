'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { logAuditAction } from '@/lib/admin';

export async function getProjects() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data;
}

export async function getProject(id: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error('Error fetching project:', error);
    return null;
  }

  return data;
}

export async function createProject(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const title = formData.get('title') as string;

  if (!title) {
    throw new Error('Title is required');
  }

  const { data, error } = await supabase
    .from('projects')
    .insert({
      title,
      user_id: user.id,
      inputs: {}, // Initialize empty context
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating project:', error);
    throw new Error('Failed to create project');
  }

  // Audit Log
  await logAuditAction('create_project', { title, project_id: data.id }, data.id);

  revalidatePath('/dashboard-v2/projects');
  redirect(`/dashboard-v2/projects/${data.id}`);
}

export async function updateProjectInputs(projectId: string, inputs: Record<string, unknown>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  // Verify ownership implicitly via RLS or explicit check (RLS handles it usually but explicit check is safer for logic)
  // We update directly with match on user_id
  const { error } = await supabase
    .from('projects')
    .update({ inputs, updated_at: new Date().toISOString() })
    .eq('id', projectId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error updating project inputs:', error);
    throw new Error('Failed to update project context');
  }

  revalidatePath(`/dashboard-v2/projects/${projectId}`);
  return { success: true };
}
