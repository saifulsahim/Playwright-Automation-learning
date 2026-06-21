const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('./utils/ApiUtils');

const loginPayload = { userEmail: "saifulsahim@gmail.com", userPassword: "Sahim123#" };
const orderPayload = { orders: [{ country: "Bangladesh", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils =  new ApiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

});

test('Verify created order is showing in the order history page', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);


    await page.goto('https://rahulshettyacademy.com/client/');
    const products = page.locator('.card-body');

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody tr").first().waitFor();
    const orderRows = page.locator("tbody tr");
    const orderCount = await orderRows.count();

    for (let i = 0; i < orderCount; ++i) {
        const rowOrderId = await orderRows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await orderRows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});


// Verify if order created is showing in the order history page
// Precondition : order created