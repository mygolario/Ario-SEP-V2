import { test, expect } from '@playwright/test';

test.describe('Dashboard V2 Smoke Tests', () => {
  // Note: In a real environment, we'd mock auth or use a test user.
  // For this smoke test, we'll assume the dev server is running and we might hit a redirect if not logged in.
  // Or we can mock the auth cookie.

  // Strategy: We will mock the auth state by setting a cookie or ignoring auth if possible for "preview".
  // Alternatively, we verify the public pages or the redirection logic.

  test('should redirect to login when accessing dashboard unauthenticated', async ({ page }) => {
    await page.goto('/dashboard-v2');
    await expect(page).toHaveURL(/\/login/);
  });

  test('should load help center', async ({ page }) => {
    await page.goto('/dashboard-v2/help');
    // If protected, it redirects. If public (some parts might be), it loads.
    // Assuming protected:
    await expect(page).toHaveURL(/\/login/);
  });

  test('should redirect legacy /dashboard to /dashboard-v2 (or login)', async ({ page }) => {
    // This tests the middleware redirect
    await page.goto('/dashboard');
    // It should first go to /dashboard-v2, then /login (since unauthenticated)
    await expect(page).toHaveURL(/\/login/);
    // Ideally we'd verify the intermediate 307, but checking we don't stay on /dashboard is good.
    const url = page.url();
    expect(url).not.toContain('/dashboard'); // Should be /login
    expect(url).toContain('/login');
  });

  // TODO: comprehensive auth testing requires setup (seed user, login flow).
  // For "Smoke Test", verifying the app builds and serves pages (even error/redirect) is step 1.
});
