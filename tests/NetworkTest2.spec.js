const { test, expect, request } = require('@playwright/test');


test('Security test request intercept', async ({page}) => {
    const email = 'saifulsahim@gmail.com';
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator('#userEmail').type(email);   // using id
    await page.locator("#userPassword").fill('Sahim123#');
    await page.locator("[value='Login']").click();
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();

    // login and reach order page
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({
            url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'
        })
    );
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
})