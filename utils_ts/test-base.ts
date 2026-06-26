//const  base = require('@playwright/test');
import {test as baseTest} from '@playwright/test';
interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
}

export const customTest = baseTest.extend<{testDataForOrder : TestDataForOrder}>({
    testDataForOrder: {
        username: "saifulsahim@gmail.com",
        password: "Sahim123#",
        productName: "ZARA COAT 3"
    }

})