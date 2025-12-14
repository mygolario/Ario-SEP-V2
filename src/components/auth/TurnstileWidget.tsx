'use client';

import Turnstile from 'react-turnstile';

interface TurnstileWidgetProps {
  onVerify?: (token: string) => void;
  onError?: (error: unknown) => void;
}

export default function TurnstileWidget({ onVerify, onError }: TurnstileWidgetProps) {
  // If no site key is provided (e.g. dev), we might want to skip or show warning
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    if (process.env.NODE_ENV !== 'production') {
      return (
        <div className="p-4 bg-yellow-50 text-yellow-800 text-xs rounded border border-yellow-200">
          Turnstile Site Key Missing (Dev Mode)
          <input type="hidden" name="cf-turnstile-response" value="dev_token_bypass" />
        </div>
      );
    }
    return null;
  }

  return (
    <div className="flex justify-center my-4">
      <Turnstile
        sitekey={siteKey}
        onVerify={(token) => {
          if (onVerify) onVerify(token);
        }}
        onError={onError}
        language="fa" // Persian
      />
    </div>
  );
}
