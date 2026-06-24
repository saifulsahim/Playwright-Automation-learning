const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
// JSON -> string -> JS object
const dataset = JSON.parse(JSON.stringify(require("../utils/placeOrderTestData.json")));

test('End to end ecommerce flow', async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();
    const checkoutPage = poManager.getCheckOutPage();
    const orderHistoryPage = poManager.getOrderHistoryPage();

    await loginPage.goTo();
    await loginPage.validLogin(dataset.username, dataset.password);

    await dashboardPage.searchProductAddToCart(dataset.productName);
    await dashboardPage.navigateToCart();

    await cartPage.verifyProductIsDisplayed(dataset.productName);
    await cartPage.Checkout();

    await checkoutPage.searchCountryAndSelect("ban", "Bangladesh");
    await checkoutPage.VerifyEmailId(dataset.username);
    const orderId = await checkoutPage.submitAndGetOrderId();
    await dashboardPage.navigatoToOrders();

    await orderHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();

});

