
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAuth() {
  const email = `test-ario-${Date.now()}@gmail.com`;
  const password = 'TestPassword123!';

  console.log(`1. Attempting Signup with ${email}...`);
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    console.error('Signup Failed:', signUpError.message);
    return;
  }

  console.log('Signup Successful:', signUpData.user?.email);

  // If email confirmation is enabled, we might not be able to login immediately unless auto-confirm is on.
  // We can check if session is established.
  if (signUpData.session) {
     console.log('Session established immediately (Email confirmation might be off or auto-confirmed).');
  } else {
     console.log('No session returned. Email confirmation likely required.');
  }

  console.log('2. Attempting Logout...');
  await supabase.auth.signOut();

  console.log('3. Attempting Login...');
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) {
    console.error('Login Failed:', loginError.message);
    if (loginError.message.includes('Email not confirmed')) {
        console.log('CONCLUSION: Email confirmation is REQUIRED. User cannot login without confirming email.');
    }
    return;
  }

  console.log('Login Successful!', loginData.user?.email);
  console.log('CONCLUSION: Auth system is working correctly.');
}

testAuth();
