const {test, expect} =  require('@playwright/test');

test('Screenshot & Visual comparison Validations',async({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator("#displayed-text")).toBeVisible();

    await page.locator("#displayed-text").screenshot({path : 'partialScreenshot.jpg'});

    await page.locator("#hide-textbox").click();

    await page.screenshot({path: 'screenshot.png'}) 
    await expect(page.locator("#displayed-text")).toBeHidden();
  
});
   

