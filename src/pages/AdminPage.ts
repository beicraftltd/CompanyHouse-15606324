import { Page, Locator } from '@playwright/test';

export class AdminPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly logoutBtn: Locator;
  readonly bookingsTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginBtn = page.getByRole('button', { name: 'Login' });
    this.logoutBtn = page.getByRole('button', { name: 'Logout' });
    this.bookingsTable = page.locator('.bookings');
  }

  async goto() {
    await this.page.goto('/admin');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }
}
