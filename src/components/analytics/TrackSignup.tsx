'use client';

import { useEffect } from 'react';
import { analytics, AnalyticsEvents } from '@/lib/analytics';

export function TrackSignup() {
  useEffect(() => {
    // We assume if this component is mounted, the signup was just completed successfully
    // as it is only rendered on the verify-email page which follows signup redirect.
    analytics.track(AnalyticsEvents.SIGNUP_COMPLETED);
  }, []);

  return null;
}
