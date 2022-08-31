#!/usr/bin/env node

const slugify = require('./source/slugify').slugify;
const show = require('./source/header').header;
const md = require('./source/markdown').md;

const yargs = require('yargs/yargs')(process.argv.slice(2));
yargs
  .command(
    'slugify',
    'Generate SEO friendly and human readable',
    function (yargs) {
      return yargs
        .option('filename', {
          alias: 'f',
          describe: 'Ingrese el nombre del archivo',
        })
        .option('col', {
          alias: 'c',
          describe: 'Ingrese el número de columna',
        })
        .alias('v', 'version')
        .demandOption(['f', 'c'])
        .version('0.0.1')
        .epilog('dev by Neil Ruiz');
    },
    function (argv) {
      slugify(argv.filename, argv.col);
    }
  )
  .command(
    'header',
    'Show the current configuration',
    function (yargs) {
      return yargs
        .option('filename', {
          alias: 'f',
          describe: 'Ingrese el nombre del archivo',
        })
        .alias('v', 'version')
        .demandOption(['f'])
        .version('0.0.1')
        .epilog('dev by Neil Ruiz');
    },
    function (argv) {
      show(argv.filename);
    }
  )
  .command(
    'html',
    'convert markdown to html',
    function (yargs) {
      return yargs
        .option('filename', {
          alias: 'f',
          describe: 'Ingrese el nombre del archivo',
        })
        .option('col', {
          alias: 'c',
          describe: 'Ingrese el número de columna',
        })
        .alias('v', 'version')
        .demandOption(['f', 'c'])
        .version('0.0.1')
        .epilog('dev by Neil Ruiz');
    },
    function (argv) {
      md(argv.filename, argv.col);
    }
  )
  .help().argv;
