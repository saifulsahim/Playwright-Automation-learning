const { test, expect } = require('@playwright/test');
let webContext;
let email;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    email = 'saifulsahim@gmail.com';

    await page.locator('#userEmail').type(email);   // using id
    await page.locator("#userPassword").fill('Sahim123#');
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle'); // wait for all network requests to finish

    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });

})

test('Client App login API', async ({ }) => {
    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    const products = page.locator('.card-body');

    await page.locator(".card-body b").first().waitFor(); // wait for the card body to be visible
    const titles = await page.locator('.card-body b').allTextContents();

    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === "ZARA COAT 3") {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor(); // As isVisible() does not support autoWait like click()
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 100 });
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text.trim() === "India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order.");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody tr").first().waitFor();
    const orderRows = page.locator("tbody tr");
    const orderCount = await orderRows.count();

    for (let i = 0; i < orderCount; ++i) {
        const rowOrderId = await orderRows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await orderRows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});

test('Test case 2', async ({ }) => {
    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    const products = page.locator('.card-body');

    await page.locator(".card-body b").first().waitFor(); // wait for the card body to be visible
    const titles = await page.locator('.card-body b').allTextContents();
});

