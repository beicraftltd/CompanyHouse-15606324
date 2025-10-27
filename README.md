# Companies House – Lead Test Engineer – Technical Assessment

**Demo:** [https://automationintesting.online/](https://automationintesting.online/)

## Overview

This repository contains an automated test suite for the Companies House testing application, developed as part of a Lead Test Engineer technical assessment. The project uses TypeScript with Playwright for modern, reliable test automation, implementing the Page Object Model pattern for maintainable and scalable test code.

The suite covers functional end-to-end testing (booking and admin flows) along with basic non-functional performance validation.

## Project Structure

```
CompanyHouse-15606324/
├── README.md                    # This file
├── TestPlan.md                  # Comprehensive test plan
├── Bug-Reports.md               # Defects and issues found
├── package.json                 # Dependencies and scripts
├── playwright.config.ts         # Playwright configuration
├── tsconfig.json               # TypeScript configuration
└── src/
    ├── pages/                   # Page Object Models
    │   ├── BookingPage.ts      # Booking form interactions
    │   └── AdminPage.ts        # Admin panel interactions
    ├── tests/
    │   ├── functional/         # E2E functional tests
    │   │   ├── booking.spec.ts
    │   │   └── admin.spec.ts
    │   └── non-functional/     # Performance tests
    │       └── performance.spec.ts
    └── utils/
        └── helpers.ts          # Test utilities and helpers
```

## Test Coverage

### Test Cases Implemented

| Test ID | Test Name | Priority | Type | Status |
|---------|-----------|----------|------|--------|
| TC-01 | Submit valid booking → success | High | Functional | ✅ |
| TC-02 | Empty required fields → validation errors | High | Functional | ✅ |
| TC-03 | Admin login & logout flow | High | Functional | ✅ |
| TC-04 | Homepage loads < 5 seconds | Medium | Performance | ✅ |
| TC-05 | Booking round-trip < 10 seconds | Medium | Performance | ✅ |

### Additional Test Features

* **Negative Testing:** Invalid submissions, missing form fields
* **Edge Cases:** Form validation, error message displays
* **UI Validation:** Page loading, element visibility, navigation
* **Performance:** Load times, round-trip performance

## Tech Stack

- **Node.js** 20
- **Playwright** 1.48
- **TypeScript** 5.5
- **ESLint** + **Prettier** for code quality

## Prerequisites

* Node.js (v20 or higher)
* npm (v8 or higher)
* Chrome browser (installed automatically by Playwright)

## Quick Start

1. **Navigate to project directory:**
   ```bash
   cd companies-house-lead-test-engineer
   ```

2. **Install dependencies:**
   ```bash
   npm ci
   ```

3. **Install browsers:**
   ```bash
   npx playwright install --with-deps
   ```

4. **Run tests:**
   ```bash
   # Run all tests
   npm test
   
   # Run with UI (headed mode)
   npm run test:headed
   
   # Run in debug mode
   npm run test:debug
   
   # View HTML report
   npm run test:report
   ```

## Detailed Setup Instructions

### Install Node.js

* Download from [nodejs.org](https://nodejs.org/)
* Verify installation: `node --version`
* Should display v20 or higher

### Clone and Setup

```bash
git clone https://github.com/beicraftltd/CompanyHouse-15606324.git
cd CompanyHouse-15606324
npm ci
npx playwright install --with-deps
```

### Configuration

Key configuration settings in `playwright.config.ts`:

* **Base URL:** https://automationintesting.online/
* **Timeout:** 30 seconds for actions
* **Retries:** 1 on failure
* **Screenshots:** On first retry
* **Videos:** On first retry
* **Viewport:** 1280x720

## Test Execution

### Running Individual Test Suites

```bash
# Booking tests only
npx playwright test src/tests/functional/booking.spec.ts

# Admin tests only
npx playwright test src/tests/functional/admin.spec.ts

# Performance tests only
npx playwright test src/tests/non-functional/performance.spec.ts

# Specific test by name
npx playwright test -g "successful booking submission"
```

### Running with Different Browsers

```bash
# Chrome (default)
npm test

# Firefox (if enabled in config)
npx playwright test --project=firefox

# Safari (if enabled in config)
npx playwright test --project=webkit
```

### Running in Different Modes

```bash
# Headed mode (see browser)
npm run test:headed

# Debug mode (step through)
npx playwright test --debug

# Update snapshots
npx playwright test --update-snapshots
```

## Test Reports

After test execution, reports are generated:

* **HTML Report:** `playwright-report/index.html`
  - View by running: `npm run test:report`
* **Screenshots:** Saved in `test-results/` on failure
* **Videos:** Saved in `test-results/` on first retry
* **Traces:** Captured for debugging failed tests

## Configuration

The test suite is configured via `playwright.config.ts`:

```typescript
{
  baseURL: 'https://automationintesting.online/',
  timeout: 30_000,              // 30 seconds
  retries: 1,                   // Retry once on failure
  headless: true,               // Run in background
  viewport: { width: 1280, height: 720 },
  video: 'on-first-retry',      // Record video on retry
  trace: 'on-first-retry',      // Capture trace on retry
}
```

## Troubleshooting

### Common Issues

**1. Browser not found:**
```bash
npx playwright install --with-deps
```

**2. Timeout errors:**
* Increase timeout values in `playwright.config.ts`
* Check network connectivity
* Verify site availability at https://automationintesting.online/

**3. Test failures:**
* Check browser version compatibility
* Review error logs in test-results directory
* Run with `--headed` flag to see what's happening

**4. Permission errors (Windows):**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Debug Mode

For detailed debugging:
```bash
npx playwright test --debug
```

This opens Playwright Inspector where you can:
* Step through tests line by line
* Inspect page state
* View network requests
* Debug selectors

## Test Data Management

### Helper Functions

The test suite uses utilities from `src/utils/helpers.ts`:

```typescript
// Generate random string
randomString(length: number): string

// Generate random email
randomEmail(): string
```

### Test Data Strategy

* **Dynamic Generation:** Test data created per test run
* **Isolated:** Each test creates its own data
* **Cleanup:** Automatic cleanup after test completion

## Continuous Integration

GitHub Actions workflow runs automatically on push/PR:

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

Tests run on:
* **Chromium** (default)
* **Firefox** (if enabled)
* **WebKit** (if enabled)

## Performance Considerations

### Test Execution Time

* **Full Suite:** ~2-3 minutes
* **Functional Tests:** ~1 minute
* **Performance Tests:** ~10 seconds each

### Resource Usage

* **Memory:** ~200MB per browser instance
* **CPU:** Moderate usage during test execution
* **Network:** Minimal bandwidth requirement

## Best Practices

### Test Design

1. **Page Object Model:** All page interactions abstracted
2. **Independent Tests:** Each test can run standalone
3. **Clear Assertions:** Specific, meaningful validations
4. **Proper Waits:** Implicit waits handled by Playwright
5. **Error Handling:** Graceful handling of failures

### Code Quality

1. **Linting:** ESLint for code quality
2. **Formatting:** Prettier for consistent styling
3. **Type Safety:** TypeScript for compile-time checks
4. **Comments:** Clear, concise documentation

Run linting:
```bash
npm run lint
npm run format
```

### Maintenance

1. **Regular Updates:** Keep dependencies current
2. **Code Review:** Review test code regularly
3. **Documentation:** Keep this README updated
4. **Monitoring:** Monitor test stability in CI

## Contributing

### Adding New Tests

1. Follow existing naming conventions (`*.spec.ts`)
2. Add proper documentation and comments
3. Include both positive and negative scenarios
4. Update `TestPlan.md` with new test cases

### Code Style

* **TypeScript:** Strict mode enabled
* **Imports:** Organized by type (built-ins, external, internal)
* **Naming:** camelCase for variables, PascalCase for classes

## Support

### Documentation

* **Test Plan:** See `docs/TestPlan.md`
* **Bug Reports:** See `docs/Bug-Reports.md`
* **Configuration:** See `playwright.config.ts`


