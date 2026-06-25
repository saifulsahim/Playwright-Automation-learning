const { test, expect } = require("@playwright/test");
const console = require("node:console");

test("Assignment", async ({ page }) => {
    const BASE_URL      = 'https://eventhub.rahulshettyacademy.com'
    //Step 1 — Login
    await page.goto(`${BASE_URL}/login`);
    await page.getByLabel("Email").click();
    await page.getByPlaceholder("you@email.com").fill("saifulsahim@gmail.com");
    await page.getByLabel("Password").fill("Sahim123#");
    await page.locator("#login-btn").click();
    await page.getByText("Browse Events", { exact: true }).waitFor();
    await expect(page.getByText('Browse Events', { exact: true })).toBeVisible();

    // Step 2 — Create a new event

    await page.goto(`${BASE_URL}/admin/events`);
    const eventTitle = `Test Event ${Date.now()}`;
    await page.locator("#event-title-input").fill(eventTitle);
    await page.locator("#admin-event-form textarea").fill("This is a test event created by Playwright automation.");
    await page.getByLabel("City").fill("Dhaka");
    await page.getByLabel("Venue").fill("test");
    await page.getByLabel("Event Date & Time").fill("2027-12-31T12:00");
    await page.getByLabel("Price ($)").fill("100");
    await page.getByLabel("Total Seats").fill("50");
    await page.locator("#add-event-btn").click();
    await expect(page.getByText("Event created!")).toBeVisible();

    // Step 3 — Find the event card and capture seats 
    await page.goto(`${BASE_URL}/events`);
    // Located by data-testid
    const eventCards = page.getByTestId('event-card');
    await expect(eventCards.first()).toBeVisible();

    const targetCard = eventCards.filter({ hasText: eventTitle }).first();
    await page.locator(eventCards).filter({ hasText: eventTitle });
    await expect(targetCard).toBeVisible({ timeout: 5000 });

    // Capture seat count before booking
    const seatsBeforeBooking = parseInt(await targetCard.getByText('seat').first().innerText());

    //Step 4 — Start booking
    await targetCard.getByTestId("book-now-btn").click();

    //Step 5 — Fill booking form
    await expect(page.locator("#ticket-count")).toHaveText("1");
    await page.getByLabel("Name").fill("Saiful Sahim");
    await page.locator("#customer-email").fill("saifulsahim@gmail.com");
    await page.getByPlaceholder("+91 98765 43210").fill("2333333310");
    await page.locator(".confirm-booking-btn").click();

    // Step 6 — Verify booking confirmation
     const bookingRefEl = await page.locator('.booking-ref').innerText();
     //console.log("ref",bookingRefEl);

     expect(bookingRefEl.charAt(0)).toBe(eventTitle.trim().charAt(0).toUpperCase());

     // Step 7 — Verify seat count decreased by 1
      await page.getByRole('link', { name: 'View My Bookings' }).click();
      await expect(page).toHaveURL(`${BASE_URL}/bookings`);

      const bookingCards = page.getByTestId('booking-card');
      const matchingCard = bookingCards.filter({ has: page.locator('.booking-ref', { hasText: bookingRefEl }) });
      await expect(matchingCard).toBeVisible();
      await expect(matchingCard).toContainText(eventTitle);

     // console.log(`Booking card found in My Bookings for ref: ${bookingRefEl}`);

    
      //Step 8 — Verify seat count decreased by 1
      await page.goto(`${BASE_URL}/events`);
      const updatedEventCards = page.getByTestId('event-card');
      const updatedTargetCard = updatedEventCards.filter({ hasText: eventTitle }).first();
      await expect(updatedTargetCard).toBeVisible();

      const seatsAfterBooking = parseInt(await updatedTargetCard.getByText('seat').first().innerText());
      expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);


});