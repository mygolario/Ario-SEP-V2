'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const supabase = createClient()
  const email = String(formData.get('email')).trim()
  const password = String(formData.get('password')).trim()

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return redirect(`/login?error=${encodeURIComponent('اطلاعات ورود نادرست است')}`)
  return redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = createClient()
  const email = String(formData.get('email')).trim()
  const password = String(formData.get('password')).trim()
  const full_name = String(formData.get('full_name')).trim()

  const { error } = await supabase.auth.signUp({
    email, password,
    options: { data: { full_name } }
  })
  if (error) return redirect(`/signup?error=${encodeURIComponent(error.message)}`)
  return redirect('/dashboard')
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  return redirect('/login')
}

export async function updateProfile(formData: FormData) {
  const supabase = createClient()
  const full_name = String(formData.get('full_name')).trim()
  
  const { error } = await supabase.auth.updateUser({ data: { full_name } })
  if (error) return { error: error.message }
  return { success: true }
}
