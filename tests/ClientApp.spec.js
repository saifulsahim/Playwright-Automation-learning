const {test, expect} =  require('@playwright/test');    

test.only('Browser context- Validating Error login',async({page}) => {
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator('#userEmail').type('saifulsahim@gmail.com');   // using id
    await page.locator("#userPassword").fill('Sahim123#');
    await page.locator("[value='Login']").click();

    //await page.waitForLoadState('networkidle'); // wait for all network requests to finish
    await page.locator(".card-body b").first().waitFor(); // wait for the card body to be visible
    const titles = await page.locator('.card-body b').allTextContents(); 
    console.log("bbb",titles);
});    
 
