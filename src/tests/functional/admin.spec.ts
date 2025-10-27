import { test, expect } from '@playwright/test';
import { AdminPage } from '../../pages/AdminPage';
import { BookingPage } from '../../pages/BookingPage';
import { randomEmail } from '../../utils/helpers';

test.describe('Admin panel – functional', () => {
  let admin: AdminPage;
  let booking: BookingPage;

  test.beforeEach(async ({ page }) => {
    admin = new AdminPage(page);
    booking = new BookingPage(page);
  });

  test('admin login functionality', async ({ page }) => {
    // Test admin login
    await admin.goto();
    await admin.login('admin', 'password');
    
    // Verify we're logged in by checking for logout button
    await expect(admin.logoutBtn).toBeVisible();
    
    // Logout
    await admin.logoutBtn.click();
  });
});
