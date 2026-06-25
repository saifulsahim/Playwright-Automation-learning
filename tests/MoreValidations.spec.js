const {test, expect} =  require('@playwright/test');

test('More Validations Playwright test',async({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    //await page.goto("https://google.com/");
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    //await page.pause();

    const mouseHoverBtn = page.locator("#mousehover");
    await mouseHoverBtn.hover(); 
    await page.locator("text=Top").click();

    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click();
    const frameText = await framePage.locator(".text h2").textContent();
    //console.log(frameText.split(" ")[1]);
});
   
