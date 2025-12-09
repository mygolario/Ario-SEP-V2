'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const supabase = createClient()
  
  // 1. Sanitize Inputs
  const email = String(formData.get('email')).trim()
  const password = String(formData.get('password')).trim()

  // 2. Attempt Login
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Login Error:", error.message)
    return redirect(`/login?error=${encodeURIComponent('اطلاعات ورود نادرست است')}`)
  }

  return redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = createClient()
  
  // 1. Sanitize Inputs
  const email = String(formData.get('email')).trim()
  const password = String(formData.get('password')).trim()
  const full_name = String(formData.get('full_name')).trim()

  // 2. Attempt Signup
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name },
    },
  })

  if (error) {
    console.error("Signup Error:", error.message)
    return redirect(`/signup?error=${encodeURIComponent(error.message)}`)
  }

  return redirect('/dashboard')
}
