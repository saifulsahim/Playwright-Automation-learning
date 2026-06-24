const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');


test('End to end ecommerce flow', async ({ page }) => {
    const poManager = new POManager(page);
    const products = page.locator('.card-body');
    const username = 'saifulsahim@gmail.com';
    const password = 'Sahim123#';
    const productName = "ZARA COAT 3";
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();
    const checkoutPage = poManager.getCheckOutPage();
    const orderHistoryPage = poManager.getOrderHistoryPage();

    await loginPage.goTo();
    await loginPage.validLogin(username, password);

    await dashboardPage.searchProductAddToCart(productName);
    await dashboardPage.navigateToCart();

    await cartPage.verifyProductIsDisplayed(productName);
    await cartPage.Checkout();

    await checkoutPage.searchCountryAndSelect("ban", "Bangladesh");
    await checkoutPage.VerifyEmailId(username);
    const orderId = await checkoutPage.submitAndGetOrderId();
    await dashboardPage.navigatoToOrders();

    await orderHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();

});

