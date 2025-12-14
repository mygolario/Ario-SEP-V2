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
    home: '/dashboard',
    settings: '/dashboard/settings',
    history: '/dashboard/history',
  },
  auth: {
    verifyEmail: '/auth/verify-email',
    callback: '/auth/callback',
  },
} as const;
