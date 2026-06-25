const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('../utils/ApiUtils');

const loginPayload = { userEmail: "saifulsahim@gmail.com", userPassword: "Sahim123#" };
const orderPayload = { orders: [{ country: "Bangladesh", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const fakePayloadOrders = { data: [], message: "No Orders" };

let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

});

test('Verify created order is showing in the order history page', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);


    await page.goto('https://rahulshettyacademy.com/client/');
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request()); // for API page.request
            let body = JSON.stringify(fakePayloadOrders);
            route.fulfill({
                response,
                body,
            });
            // intercepting response - API response ->{fake response} browser -> render data on front end

        })

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")



});


// Verify if order created is showing in the order history page
// Precondition : order created