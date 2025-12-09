'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const supabase = createClient()
  
  // SANITIZATION: Remove leading/trailing spaces
  const email = String(formData.get('email')).trim()
  const password = String(formData.get('password')).trim()

  console.log("LOGIN DEBUG -> Email:", email) 
  console.log("LOGIN DEBUG -> Password Length:", password.length)

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("LOGIN ERROR ->", error.message)
    return redirect('/login?error=Invalid login credentials')
  }

  return redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = createClient()
  
  // SANITIZATION
  const email = String(formData.get('email')).trim()
  const password = String(formData.get('password')).trim()
  const full_name = String(formData.get('full_name')).trim()

  console.log("SIGNUP DEBUG -> Email:", email)

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name },
    },
  })

  if (error) {
    console.error("SIGNUP ERROR ->", error.message)
    return redirect('/signup?error=' + error.message)
  }

  return redirect('/dashboard')
}
