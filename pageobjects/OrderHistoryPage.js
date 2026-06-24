const { expect } = require('@playwright/test');

class OrderHistoryPage {
    constructor(page) {
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderIdDetails = page.locator(".col-text");
    }
    async searchOrderAndSelect(orderId) {
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