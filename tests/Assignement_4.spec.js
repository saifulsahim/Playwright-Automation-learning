const { test, expect } = require("@playwright/test");
//const console = require("node:console");

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL = 'https://api.eventhub.rahulshettyacademy.com/api';

const YAHOO_USER = { email: 'saifulsahim@gmail.com', password: 'Sahim123#' };
const GMAIL_USER = { email: 'sahim@yahoo.com', password: 'Sahim123#' };


async function loginAs(page, user) {
    await page.goto(`${BASE_URL}/login`);
    await page.getByLabel('Email').fill(user.email);
    await page.getByLabel('Password').fill(user.password);
    await page.locator('#login-btn').click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
    await page.goto(`${BASE_URL}/events`);
}

test("Assignment: Cross-User Booking Access Denied", async ({ page, request }) => {
    // Step 1 — Login as Yahoo user via API  -
    const loginRes = await request.post(`${API_URL}/auth/login`, {
        data: { email: YAHOO_USER.email, password: YAHOO_USER.password },
    });
    expect(loginRes.ok()).toBeTruthy();
    const { token } = await loginRes.json();


    //Step 2 — Fetch events via API to get a valid event ID
    const eventRes = await request.get(`${API_URL}/events`, {
        //headers: token,
        headers: { Authorization: `Bearer ${token}` },

    });
    expect(eventRes.ok()).toBeTruthy();
    const eventsData = await eventRes.json();
    const eventId = eventsData.data[1].id;

    // Step 3 — Create a booking via API as Yahoo user

    const bookingsRes = await request.post(`${API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
            eventId: eventId,
            customerName: 'sahim',
            customerEmail: 'sahim@yahoo.com',
            customerPhone: '9999999999',
            quantity: 1,
        },

    });

    expect(bookingsRes.ok()).toBeTruthy();
    const yahooBookingId = (await bookingsRes.json()).data.id;

    // Step 4 — Login as Gmail user via browser UI
    await loginAs(page, GMAIL_USER)

    // Step 5 — Navigate directly to Yahoo's booking URL as Gmail user

    await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`, { waitUntil: 'networkidle' });

    // ── Step 6: Validate Access Denied ───────────────────────────────────────

    await expect(page.getByText('Access Denied')).toBeVisible();

    await expect(page.getByText("You are not authorized to view this booking")).toBeVisible();



});


