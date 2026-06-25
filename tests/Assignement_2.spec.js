const { test, expect } = require("@playwright/test");
const console = require("node:console");

test.describe.configure({mode : 'parallel'});
test("Assignment 2 ", async ({ page }) => {
    const BASE_URL = 'https://eventhub.rahulshettyacademy.com'
    //Step 1 — Login
    await page.goto(`${BASE_URL}/login`);
    await page.getByLabel("Email").click();
    await page.getByPlaceholder("you@email.com").fill("saifulsahim@gmail.com");
    await page.getByLabel("Password").fill("Sahim123#");
    await page.locator("#login-btn").click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();

    // Step 2 — Book first event with 1 ticket (default)

    await page.goto(`${BASE_URL}/events`);
    const eventCards = page.getByTestId('event-card').last().getByTestId('book-now-btn').click();
    await page.getByLabel("Full Name").fill("Saiful Sahim");
    await page.locator("#customer-email").fill("saifulsahim@gmail.com");
    await page.getByPlaceholder('+91 98765 43210').fill('9999999999');
    await page.locator('.confirm-booking-btn').click();

    //Step 3 — Navigate to booking detail

    await page.getByRole('link', { name: 'View My Bookings' }).click();
    expect(page).toHaveURL(`${BASE_URL}/bookings`);

    await page.getByTestId("booking-card").first().getByRole('button', { name: 'View Details' }).click();
    await expect(page.getByText('Booking Information')).toBeVisible();


    // Step 4 - Validate booking ref first letter matches event name first letter
    const bookingRef = await page.locator('span.font-mono.font-bold').textContent();
    //console.log("bookingRef", bookingRef);
    const eventTitle = await page.locator('h1').textContent();
    //console.log("eventTitle", eventTitle);
    expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));

    // Step 5 — Check refund eligibility
    await page.getByTestId("check-refund-btn").click();
    await expect(page.locator("#refund-spinner")).toBeVisible();
    // Wait for spinner to disappear after 4s
    await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });

    // Step 6 — Validate result
    await expect(page.locator("#refund-result")).toBeVisible();
    await expect(page.locator("#refund-result")).toContainText("Eligible");
    await expect(page.locator("#refund-result")).toContainText("Single-ticket bookings qualify for a full refund.");

});

test("refund not eligible for group ticket booking", async ({ page }) => {
    const BASE_URL = 'https://eventhub.rahulshettyacademy.com'
    await page.goto(`${BASE_URL}/login`);
    await page.getByLabel("Email").click();
    await page.getByPlaceholder("you@email.com").fill("saifulsahim@gmail.com");
    await page.getByLabel("Password").fill("Sahim123#");
    await page.locator("#login-btn").click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();

    // Test 2 — Book second event with 2 tickets
    await page.goto(`${BASE_URL}/events`);
    const eventCards = page.getByTestId('event-card').last().getByTestId('book-now-btn').click();

    // Increase quantity to 3
    await page.locator('button:has-text("+")').click();
    await page.locator('button:has-text("+")').click();

    await page.getByLabel("Full Name").fill("Saiful Sahim");
    await page.locator("#customer-email").fill("saifulsahim@gmail.com");
    await page.getByPlaceholder('+91 98765 43210').fill('9999999999');
    await page.locator('.confirm-booking-btn').click();

    // Navigate to booking detail
    await page.getByRole('link', { name: 'View My Bookings' }).click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    await page.getByRole('link', { name: 'View Details' }).first().click();
    await expect(page.getByText('Booking Information')).toBeVisible();

    // Validate booking ref first letter matches event name first letter
    const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
    const eventTitle = await page.locator('h1').innerText();
    expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));
    await page.locator('#check-refund-btn').click();

    // Spinner must appear immediately
    await expect(page.locator('#refund-spinner')).toBeVisible();

    // Wait for spinner to disappear after 4s
    await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });

    // Step 6 — Validate result (different assertions)
    // Validate ineligible message
    const result = page.locator('#refund-result');
    await expect(result).toBeVisible();
    await expect(result).toContainText('Not eligible for refund');
    await expect(result).toContainText('Group bookings (3 tickets) are non-refundable');
});