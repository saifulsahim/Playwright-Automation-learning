const { When, Then, Given } = require('@cucumber/cucumber')
const { customtest } = require('../../utils/test-base');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');
const { POManager } = require('../../pageobjects/POManager');

Given('A login to Ecommerce application with {string} and {string}', { timeout: 100*1000 }, async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});

When('Add {string} to cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddToCart(productName);
    await this.dashboardPage.navigateToCart();
});
Then('Verify {string} is displayed in cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    const cartPage = this.poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});
When('Enter valid details and place the order', async function () {
    // Write code here that turns the phrase above into concrete actions
    const checkoutPage = this.poManager.getCheckOutPage();
    await checkoutPage.searchCountryAndSelect("ban", "Bangladesh");
    //await checkoutPage.VerifyEmailId(data.username);
    this.orderId = await checkoutPage.submitAndGetOrderId();
});
Then('Verify order is present in order history', async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.dashboardPage.navigatoToOrders();
    const orderHistoryPage = this.poManager.getOrderHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
});