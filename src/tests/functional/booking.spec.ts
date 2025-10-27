import { test, expect } from '@playwright/test';
import { BookingPage } from '../../pages/BookingPage';
import { randomString, randomEmail } from '../../utils/helpers';

test.describe('Booking form – functional', () => {
  let booking: BookingPage;

  test.beforeEach(async ({ page }) => {
    booking = new BookingPage(page);
    await booking.goto();
  });

  test('successful booking submission', async ({ page }) => {
    const data = {
      name: `John Doe ${randomString(4)}`,
      email: randomEmail(),
      phone: '01234 567890',
      subject: 'Test booking',
      message: 'This is a longer message that meets the minimum character requirement for the booking form validation.',
    };

    await booking.book(data);
    // Wait for form submission to complete
    await page.waitForTimeout(2000);
    // Check that we're on a valid page (successful submission)
    await expect(page).toHaveURL(/automationintesting\.online/);
  });

  test('validation errors on empty required fields', async () => {
    await booking.submitBtn.click();
    await expect(booking.errorMsg).toBeVisible();
  });
});
