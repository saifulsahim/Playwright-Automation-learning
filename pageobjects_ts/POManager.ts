import { DashboardPage } from "./DashboardPage";
//const { LoginPage } = require('./LoginPage');
import { LoginPage } from "./LoginPage";
import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";
import { OrderHistoryPage } from "./OrderHistoryPage";
import { Page } from "@playwright/test";

export class POManager {
    loginPage: LoginPage; // type is class name
    dashboardPage: DashboardPage;
    cartPage: CartPage;
    checkOutPage: CheckoutPage;
    orderHistoryPage: OrderHistoryPage;
    page: Page
    constructor(page: Page) {
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
