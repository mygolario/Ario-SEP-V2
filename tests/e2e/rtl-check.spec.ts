import { test, expect } from '@playwright/test';

test.describe('RTL & Layout Checks', () => {
  test('should have dir=rtl on html tag', async ({ page }) => {
    await page.goto('/login'); // Login page is accessible
    const htmlDir = await page.getAttribute('html', 'dir');
    expect(htmlDir).toBe('rtl');

    const htmlLang = await page.getAttribute('html', 'lang');
    expect(htmlLang).toBe('fa');
  });

  test('should have text-right globally via body', async ({ page }) => {
    await page.goto('/login');
    const bodyTextAlign = await page.evaluate(() => {
      return getComputedStyle(document.body).textAlign;
    });
    // Browsers might return 'right' or 'start' depending on impl, checking right mostly.
    expect(bodyTextAlign).toBe('right');
  });

  test('inputs should still be LTR for emails', async ({ page }) => {
    await page.goto('/login');
    // The email input should have dir="ltr" or class text-left
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toHaveCount(1);

    // Check if it has dir="ltr"
    const dir = await emailInput.getAttribute('dir');
    expect(dir).toBe('ltr');
  });
});
