import { test, expect, Locator, Page } from "@playwright/test";

export class OrderHistoryPage {
    page: Page;
    ordersTable: Locator;
    rows: Locator;
    orderIdDetails: Locator;
    constructor(page: Page) {
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderIdDetails = page.locator(".col-text");
    }
    async searchOrderAndSelect(orderId: any) {
        await this.ordersTable.first().waitFor();
        const orderRows = this.rows;
        const orderCount = await orderRows.count();

        for (let i = 0; i < orderCount; ++i) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }
        const orderIdDetails = await this.orderIdDetails.textContent();
    }
    async getOrderId() {
        return await this.orderIdDetails.textContent();
    }
}
module.exports = { OrderHistoryPage };