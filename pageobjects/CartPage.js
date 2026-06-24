const { test, expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.cartProducts = this.page.locator("div li").first();
        this.checkout = this.page.locator("text=Checkout");
    }
    async verifyProductIsDisplayed(productName) {
        await this.cartProducts.waitFor(); // As isVisible() does not support autoWait like click()
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }
    async Checkout() {
        await this.checkout.click();
    }

    getProductLocator(productName) {
        return this.page.locator("h3:has-text('" + productName + "')");
    }

}
module.exports = { CartPage };