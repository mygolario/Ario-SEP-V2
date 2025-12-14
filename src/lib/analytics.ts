import posthog from 'posthog-js';

// Events that we want to track with strict typing if needed,
// but for now we'll accept any string to be flexible.
export const AnalyticsEvents = {
  SIGNUP_COMPLETED: 'signup_completed',
  LOGIN_COMPLETED: 'login_completed',
  PROJECT_CREATED: 'project_created',
  PRICING_VIEWED: 'pricing_viewed',
  UPGRADE_CLICKED: 'upgrade_clicked',
  CHECKOUT_STARTED: 'checkout_started',
  // Phase 6
  JOURNEY_GENERATED: 'journey_generated',
  MODULE_TOGGLED: 'module_toggled',
  SECTION_REGENERATED: 'section_regenerated',
  OUTPUT_EXPORTED: 'output_exported',
  // Phase 10
  PLAYBOOK_OPENED: 'playbook_opened',
  DEPTH_CHANGED: 'depth_changed',
  TEMPLATE_COPIED: 'template_copied',
  STEP_CHECKED: 'step_checked',
} as const;

export const analytics = {
  /**
   * Track an event.
   * Safe to call even if consent is not granted (PostHog will drop it).
   */
  track: (event: string, properties?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.capture(event, properties);
    }
  },

  /**
   * Identify the user.
   * Only use userId, avoid PII in traits unless strictly necessary and consented.
   */
  identify: (userId: string, traits?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.identify(userId, traits);
    }
  },

  /**
   * Reset the user session (e.g. on logout).
   */
  reset: () => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.reset();
    }
  },

  /**
   * Manage consent.
   * @param granted true to opt-in, false to opt-out.
   */
  setConsent: (granted: boolean) => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      if (granted) {
        posthog.opt_in_capturing();
      } else {
        posthog.opt_out_capturing();
      }
    }
  },

  /**
   * Check if user has opted in.
   */
  hasConsented: () => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      return posthog.has_opted_in_capturing();
    }
    return false;
  },
};
