const  base = require('@playwright/test');

exports.customtest = base.test.extend({
    testDataForOrder: {
        username: "saifulsahim@gmail.com",
        password: "Sahim123#",
        productName: "ZARA COAT 3"
    }

})