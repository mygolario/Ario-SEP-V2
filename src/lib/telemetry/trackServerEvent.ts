import type { SupabaseClient } from '@supabase/supabase-js';

type TrackOptions = {
  event: string;
  properties?: Record<string, unknown>;
  userId?: string | null;
  supabase?: SupabaseClient;
};

const posthogApiKey = process.env.POSTHOG_API_KEY;
const posthogHost = (process.env.POSTHOG_HOST ?? 'https://app.posthog.com').replace(/\/$/, '');

export async function trackServerEvent({
  event,
  properties = {},
  userId = null,
  supabase,
}: TrackOptions): Promise<void> {
  if (posthogApiKey) {
    try {
      await fetch(`${posthogHost}/capture/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: posthogApiKey,
          event,
          properties,
          distinct_id: userId ?? 'anonymous',
        }),
      });
    } catch (error) {
      console.error('PostHog tracking failed:', error);
    }
  }

  if (supabase) {
    try {
      await supabase.from('telemetry_events').insert({
        user_id: userId,
        event,
        properties,
      });
    } catch (error) {
      console.error('Telemetry fallback insert failed:', error);
    }
  }
}
