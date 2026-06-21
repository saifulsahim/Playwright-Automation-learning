import {test, expect} from '@playwright/test';    
test('Playwright special locators',async({page}) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male"); 
    await page.getByPlaceholder("Password").fill("12344");
    await page.getByRole("button", { name: "Submit" }).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    await page.getByRole("link", { name: "Shop" }).click();
    //await page.locator("app-card").filter({ hasText: "Blackberry" }).getByRole("button",{ name: "Add" }).click();  
    await page.locator("app-card").filter({ hasText: "Blackberry" }).getByRole("button").click();  // As there is only one button in the card, so we can skip the name locator
});  