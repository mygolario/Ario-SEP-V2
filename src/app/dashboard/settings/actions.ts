'use server'

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function deleteProject(projectId: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId)
    .eq('user_id', user.id); // Ensure user owns the project

  if (error) {
    console.error('Error deleting project:', error);
    throw new Error('Failed to delete project');
  }

  revalidatePath('/dashboard/settings');
  revalidatePath('/dashboard'); // Also revalidate dashboard in case the deleted project was active/latest
}
