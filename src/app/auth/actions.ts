'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  console.log("Login action triggered");
  const supabase = createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  if (!email || !password) {
      redirect('/login?error=Email and password are required')
  }

  console.log("Attempting login for:", email);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Login error:", error.message);
    // Determine if it's an invalid credentials error
    if (error.message.includes('Invalid login credentials')) {
        redirect('/login?error=InvalidCredentials')
    }
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
  const fullName = formData.get('full_name') as string

  if (!email || !password || !fullName) {
      redirect('/signup?error=All fields are required')
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
        data: {
            full_name: fullName,
        }
    }
  })

  if (error) {
    console.error("Signup error:", error.message);
    redirect('/signup?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
