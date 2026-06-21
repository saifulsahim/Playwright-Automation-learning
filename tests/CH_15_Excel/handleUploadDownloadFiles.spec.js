const {test, expect} =  require('@playwright/test');
const ExcelJS = require('exceljs');

/*
// One way of promise
const workBook = new ExcelJS.Workbook();
workBook.xlsx.readFile("excelDownload.xlsx").then(function () {
    const workSheet = workBook.getWorksheet('Sheet1');
    workSheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, colNumber) => {
            console.log(cell.value);
        })

    })

})
    */

// Another way of promise
async function writeExcelTest(searchText, replaceText,change, filePath) {
    const workBook = new ExcelJS.Workbook();
    await workBook.xlsx.readFile(filePath);
    const workSheet = workBook.getWorksheet('Sheet1');
    const output = await readExcel(workSheet, searchText);

    const cell = workSheet.getCell(output.row, output.column+change.colChnage);
    cell.value = replaceText;
    await workBook.xlsx.writeFile(filePath);
}
async function readExcel(workSheet, searchText) {
    let output = { row: -1, column: -1 };

    workSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber
                output.column = colNumber
            }
        })

    })
    return output;
}

//writeExcelTest("Papaya", 350,{rowChange: 0, colChnage : 2}, "excelDownload.xlsx");
test('Upload download excel validation',async ({page}) => {
    const textSearch = 'Papaya';
    const updatedValue = '45631';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', {name : 'Download'}).click();
    await downloadPromise;

    await writeExcelTest(textSearch, updatedValue,{rowChange: 0, colChnage : 2}, "/Users/saifulalam/Downloads/download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("/Users/saifulalam/Downloads/download.xlsx"); // setInputFiles only works on attribute type='file'
    //page.waitForEvent('upload');

    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has:textLocator }) ;
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updatedValue);
})
 