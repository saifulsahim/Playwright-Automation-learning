const { DashboardPage } = require('./DashboardPage');
const { LoginPage } = require('./LoginPage');
const { CartPage } = require('./CartPage');
const { CheckoutPage } = require('./CheckoutPage');
const { OrderHistoryPage } = require('./OrderHistoryPage');

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.checkOutPage = new CheckoutPage(page);
        this.orderHistoryPage = new OrderHistoryPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }
    getCartPage() {
        return this.cartPage;
    }
    getCheckOutPage() {
        return this.checkOutPage;
    }
    getOrderHistoryPage() {
        return this.orderHistoryPage;
    }
}
module.exports = { POManager };
