const Excel = require('exceljs');
const chalk = require('chalk');

function readFile(fileName, col) {
  const workbook = new Excel.Workbook();
  workbook.xlsx.readFile(fileName).then(function () {
    const worksheet = workbook.getWorksheet(1);
    const row = worksheet.getRow(1);

    row.eachCell(function (cell, colNumber) {
      console.log(`${chalk.bold(`Cell ` + colNumber)} = ${cell.value}`);
    });
  });
}

function show(filename) {
  console.log(chalk.green(`\nfilename: ${filename} \n`));
  readFile(filename);
}

exports.header = show;
