const { test, expect } = require('@playwright/test');
const{customtest} = require('../utils/test-base');
const { POManager } = require('../pageobjects/POManager');
// JSON -> string -> JS object
const dataset = JSON.parse(JSON.stringify(require("../utils/placeOrderTestData.json")));

for (const data of dataset) {
    test(`@Web End to end ecommerce flow ${data.productName}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        const dashboardPage = poManager.getDashboardPage();
        const cartPage = poManager.getCartPage();
        const checkoutPage = poManager.getCheckOutPage();
        const orderHistoryPage = poManager.getOrderHistoryPage();

        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password);

        await dashboardPage.searchProductAddToCart(data.productName);
        await dashboardPage.navigateToCart();

        await cartPage.verifyProductIsDisplayed(data.productName);
        await cartPage.Checkout();

        await checkoutPage.searchCountryAndSelect("ban", "Bangladesh");
        await checkoutPage.VerifyEmailId(data.username);
        const orderId = await checkoutPage.submitAndGetOrderId();
        await dashboardPage.navigatoToOrders();

        await orderHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();

    });
}

 customtest(`End to end ecommerce flow`, async ({ page, testDataForOrder }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        const dashboardPage = poManager.getDashboardPage();
        const cartPage = poManager.getCartPage();
        const checkoutPage = poManager.getCheckOutPage();
        const orderHistoryPage = poManager.getOrderHistoryPage();

        await loginPage.goTo();
        await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

        await dashboardPage.searchProductAddToCart(testDataForOrder.productName);
        await dashboardPage.navigateToCart();

        await cartPage.verifyProductIsDisplayed(testDataForOrder.productName);
        await cartPage.Checkout();
    })
