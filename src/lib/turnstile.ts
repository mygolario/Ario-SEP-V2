import { ENV } from '@/env';

interface TurnstileVerifyResponse {
  success: boolean;
  'error-codes': string[];
  challenge_ts?: string;
  hostname?: string;
}

export const verifyTurnstileToken = async (token: string): Promise<boolean> => {
  if (!ENV.TURNSTILE_SECRET_KEY) {
    console.warn('⚠️ TURNSTILE_SECRET_KEY is missing. Skipping verification (dev mode?).');
    // In production, this should probably fail, but for dev without keys we might allow.
    // However, the user requirement is strict.
    // Let's return false if missing in production, but maybe true in dev?
    // Safety first: if secret is missing, we can't verify.
    return ENV.NODE_ENV !== 'production';
  }

  try {
    const formData = new FormData();
    formData.append('secret', ENV.TURNSTILE_SECRET_KEY);
    formData.append('response', token);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });

    const data: TurnstileVerifyResponse = await res.json();

    if (!data.success) {
      console.error('❌ Turnstile verification failed:', data['error-codes']);
    }

    return data.success;
  } catch (error) {
    console.error('❌ Error verifying Turnstile token:', error);
    return false;
  }
};
