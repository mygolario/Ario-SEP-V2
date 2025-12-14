// 'use client' is implied by the file extension/usage but good to keep if it was there.
'use client';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { useEffect } from 'react';

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

    if (key) {
      posthog.init(key, {
        api_host: host,
        capture_pageview: false, // Usage handled manually in Next.js if needed or autocapture
        opt_out_capturing_by_default: true, // REQUIRE CONSENT
        autocapture: {
          dom_event_allowlist: ['click', 'submit'], // Only capture clicks and submits
        },
        // Privacy / Risk mitigation
        mask_all_element_attributes: true,
        mask_all_text: true,
        disable_session_recording: false, // If we want replays. Set false but require consent.
      });
    }
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
