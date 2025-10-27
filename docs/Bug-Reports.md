# Bug Reports

| ID | Title | Severity | Status | Steps to Reproduce | Expected | Actual |
|----|-------|----------|--------|--------------------|----------|--------|
| BUG-01 | Success message disappears after page refresh | Medium | Open | 1. Navigate to booking page<br>2. Fill all required fields<br>3. Submit booking<br>4. Observe success message<br>5. Refresh page | Success message persists | Success message disappears |

---

## BUG-01: Success message disappears after page refresh

**Severity:** Medium  
**Status:** Open

**Description:**
After successfully submitting a booking form, a success message appears ("Thanks for getting in touch [Name]!") but it disappears when the page is refreshed.

**Steps to Reproduce:**
1. Navigate to the booking page (https://automationintesting.online/)
2. Fill in all required fields with valid data:
   - **Name:** "Test User"
   - **Email:** "test@example.com"
   - **Phone:** "01234567890"
   - **Subject:** "Test Booking Subject"
   - **Message:** "This is a test message with sufficient length to meet validation requirements."
3. Click the "Submit" button
4. Observe the success message appears on the page
5. Refresh the page (F5 or Ctrl+R)
6. Observe the success message has disappeared

**Expected Behavior:**
The success message should persist after page refresh to confirm the booking submission was successful.

**Actual Behavior:**
The success message disappears when the page is refreshed. This occurs because the message is rendered client-side and not stored in the session or persisted in any way.

**Impact:**
Users who refresh the page lose confirmation that their booking was submitted. This is particularly problematic if they accidentally refresh the page after submission.
