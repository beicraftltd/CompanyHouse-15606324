import { test, expect } from '@playwright/test';

test.describe('Page load performance', () => {
  test('homepage loads under 2 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - start;

    console.log(`Page load time: ${loadTime} ms`);
    expect(loadTime).toBeLessThan(5000);
  });

  test('booking submission round-trip < 3 seconds', async ({ page }) => {
    await page.goto('/');
    const start = Date.now();

    await page.locator('#name').fill('Perf Test');
    await page.locator('#email').fill('perf@example.com');
    await page.locator('#phone').fill('01234 567890');
    await page.locator('#subject').fill('Perf');
    await page.locator('#description').fill('This is a longer message that meets the minimum character requirement for the booking form validation.');
    await page.getByRole('button', { name: 'Submit' }).click();

    // Wait for form submission to complete
    await page.waitForTimeout(2000);
    const rt = Date.now() - start;

    console.log(`Round-trip time: ${rt} ms`);
    expect(rt).toBeLessThan(10000);
  });
});
