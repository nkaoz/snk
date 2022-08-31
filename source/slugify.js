const Excel = require('exceljs');

const slugify = (text) => {
  const a = 'àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;';
  const b = 'aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(p, (c) => b.charAt(a.indexOf(c)))
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^\-+/, '')
    .replace(/\-+$/, '');
};

function readFile(fileName, col) {
  const workbook = new Excel.Workbook();
  workbook.xlsx
    .readFile(fileName)
    .then(function () {
      const worksheet = workbook.getWorksheet(1);

      worksheet.eachRow((row, index) => {
        if (index > 1) {
          const slug = slugify(row.getCell(col).value);

          row.getCell(col).value = slug;

          console.log(index + ' ' + slug);
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

exports.slugify = convert;
