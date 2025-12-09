'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const supabase = createClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  console.log("Attempting Login for:", email) // DEBUG LOG

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Supabase Login Error:", error.message) // DEBUG LOG
    return redirect('/login?error=InvalidCredentials')
  }

  console.log("Login Successful! Redirecting...") // DEBUG LOG
  return redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = createClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const full_name = formData.get('full_name') as string

  console.log("Attempting Signup for:", email)

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name },
    },
  })

  if (error) {
    console.error("Signup Error:", error.message)
    return redirect('/signup?error=' + error.message)
  }

  return redirect('/dashboard')
}
