const Excel = require('exceljs');
const chalk = require('chalk');
const markdownIt = require('markdown-it');
const MarkdownItLink = require('./util/MarkdownItLink');

const md = new markdownIt({
  html: true,
  linkify: true,
  typographer: true,
}).use(MarkdownItLink, {
  attrsDefault: {
    title: true,
    target: '_blank',
    nofollow: true,
  },
  attrsReplace: [
    {
      replace: {
        href: 'https://interbank.pe',
        html: 'www.interbank.pe',
      },
      title: 'www.interbank.pe',
      target: false,
      nofollow: false,
      pattern: /(www\.)?(interbank)(\.com)?(\.pe)/,
    },
  ],
});

function readFile(fileName, col) {
  const workbook = new Excel.Workbook();
  workbook.xlsx
    .readFile(fileName)
    .then(function () {
      const worksheet = workbook.getWorksheet(1);

      worksheet.eachRow((row, index) => {
        if (index > 1) {
          const html = md.render(row.getCell(col).value);
          row.getCell(col).value = html;
        }
      });
    })
    .then(() => {
      return workbook.xlsx.writeFile(fileName);
    })
    .catch((err) => console.error(err));
}

function convert(filename, col) {
  console.log('filename: ' + filename + ' col: ' + col);
  readFile(filename, col);
}

exports.md = convert;
