const {test, expect} =  require('@playwright/test');    

test('Browser context Playwright test',async({browser}) => {
    const context = await browser.newContext(); 
    const page = await context.newPage();
    const userName = page.locator('#username'); 
    const signInBtn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');
   
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    //console.log(await page.title());
    // css -> type, fill 
    await userName.type('Miqdad Bin Saiful Alam');   // using id
    await page.locator("[type='password']").fill('Learning@830$3mK2'); // using css attribute selector
    await signInBtn.click();  
    //console.log(await page.locator("[style*='block']").textContent());  
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await userName.fill(''); 
    await userName.fill('rahulshettyacademy');      
    await signInBtn.click();   

    //console.log(await page.locator(".card-body a").first().textContent());
    console.log(await cardTitles.nth(2).textContent()); // grab one specific title
    //await expect(cardTitles.first()).toBeVisible();
    const allTitles = await cardTitles.allTextContents(); // grab all titles
    console.log("tessst",allTitles);
});    
 
test('Page Playwright test',async({page}) => {  
    await page.goto('https://www.google.com/');
    //console.log(await page.title());
    await expect(page).toHaveTitle('Google');
 
});    

test('UI Controls Playwright test',async({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator('#username'); 
    const signInBtn = page.locator('#signInBtn');
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");

    await userName.type('Miqdad Bin Saiful Alam');   // using id
    await page.locator("[type='password']").fill('Learning@830$3mK2'); // using css attribute selector
    await signInBtn.click();  
    await dropdown.selectOption('consult'); 
    await page.locator(".radiotextsty").last().click();
    await page.locator('#okayBtn').click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked(); // assertion for radio button

    await page.locator('#terms').check(); // check the checkbox
    await expect(page.locator('#terms')).toBeChecked(); // assertion for checkbox   
    await page.locator('#terms').uncheck(); // uncheck the checkbox
    expect(await page.locator('#terms').isChecked()).toBeFalsy(); // assertion for checkbox
    //await page.pause();
    //await expect(dropdown).toHaveValue('consult');

    await expect(documentLink).toHaveAttribute('class','blinkingText'); // assertion for attribute
});     

test.only('Child Window Playwright test',async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username'); 
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // Listen for any new page
        documentLink.click() // Click the link that opens a new page
    ]);
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@"); 
    const domain = arrayText[1].split(" ")[0]; 
   
    await page.locator('#username').type(domain); 
    //await page.pause(); 
    console.log(await page.locator('#username').inputValue());        
});
 