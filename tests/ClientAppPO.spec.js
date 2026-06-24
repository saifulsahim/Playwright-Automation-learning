const {test, expect} =  require('@playwright/test');    
const {POManager} = require('../pageobjects/POManager');


test('Browser context- Validating Error login',async({page}) => {
    const poManager = new POManager(page);
    const products = page.locator('.card-body');
    const username =  'saifulsahim@gmail.com';
    const password = 'Sahim123#';
    const productName = "ZARA COAT 3";
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();

    await loginPage.goTo();
    await loginPage.validLogin(username,password); 
   
    await dashboardPage.searchProductAddToCart(productName);
    await dashboardPage.navigateToCart();
    
    await page.locator("div li").first().waitFor(); // As isVisible() does not support autoWait like click()
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();  
    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:100});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i=0; i<optionsCount; ++i){
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text.trim() === "India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order.");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("order",orderId);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody tr").first().waitFor();
    const orderRows = page.locator("tbody tr");
    const orderCount = await orderRows.count();

    for(let i=0; i<orderCount; ++i){
    const rowOrderId = await orderRows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
            await orderRows.nth(i).locator("button").first().click();
            break;
        }
    }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
});     
 
