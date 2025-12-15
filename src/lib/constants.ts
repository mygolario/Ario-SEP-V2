export const APP_CONFIG = {
  name: 'Karnex',
  description: 'دستیار هوشمند راه‌اندازی استارتاپ',
  version: '0.1.0',
};

export const ROUTES = {
  home: '/',
  login: '/login',
  signup: '/signup',
  dashboard: {
    home: '/dashboard-v2',
    settings: '/dashboard-v2/settings',
    history: '/dashboard-v2/history',
  },
  auth: {
    verifyEmail: '/auth/verify-email',
    callback: '/auth/callback',
  },
} as const;
