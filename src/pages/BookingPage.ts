import { Page, Locator } from '@playwright/test';

export class BookingPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly submitBtn: Locator;
  readonly successMsg: Locator;
  readonly errorMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#email');
    this.phoneInput = page.locator('#phone');
    this.subjectInput = page.locator('#subject');
    this.messageInput = page.locator('#description');
    this.submitBtn = page.getByRole('button', { name: 'Submit' });
    this.successMsg = page.locator('.alert-success');
    this.errorMsg = page.locator('.alert-danger');
  }

  async goto() {
    await this.page.goto('/');
  }

  async book({
    name,
    email,
    phone,
    subject,
    message,
  }: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
    await this.submitBtn.click();
  }
}
