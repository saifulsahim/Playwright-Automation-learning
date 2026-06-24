class LoginPage {
    constructor(page) {
        this.page = page;
        this.signInButton = page.locator("[value='Login']");
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');

    }
    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }
    async validLogin(username, password) {
        await this.userName.type(username);   // using id
        await this.password.fill(password);
        await this.signInButton.click();
        //await this.page.locator(".card-body b").first().waitFor();
        await this.page.waitForLoadState('networkidle'); // wait for all network requests to finish
    }
}
module.exports = { LoginPage }; 