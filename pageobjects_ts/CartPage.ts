import { test,expect, Locator, Page } from "@playwright/test";

export class CartPage {
    cartProducts : Locator;
    checkout : Locator;
    page : Page

    constructor(page : Page) {
        this.page = page;
        this.cartProducts = this.page.locator("div li").first();
        this.checkout = this.page.locator("text=Checkout");
    }
    async verifyProductIsDisplayed(productName:string) {
        await this.cartProducts.waitFor(); // As isVisible() does not support autoWait like click()
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }
    async Checkout() {
        await this.checkout.click();
    }

    getProductLocator(productName:string) {
        return this.page.locator("h3:has-text('" + productName + "')");
    }

}
module.exports = { CartPage };