'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  console.log("Login action triggered"); // Debug log
  const supabase = createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  console.log("Attempting login for:", email);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Login error:", error.message);
    redirect('/login?error=' + encodeURIComponent(error.message))
  }

  console.log("Login successful, redirecting...");
  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    redirect('/login?error=Could not create user')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
