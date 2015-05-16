// https://nodejs.org/api/fs.html
var fs = require('fs');
// https://nodejs.org/api/path.html
var path = require('path');

var queue = require('queue-async');
var del = require('del');
var sass = require('node-sass');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer-core');
var CleanCSS = require('clean-css');
var watch = require('watch');
var chalk = require('chalk');
var browserSync = require('browser-sync');

var compiledCss;
var compiledPrefixedCss;
var compiledPrefixedMinifiedCss;
var logEverything = true;

var task = process.argv[2];
switch (task) {
  case 'style':
    style();
    break;
  case 'dev':
    dev();
    break;
  default:
    throw new Error('Must specify task "style" or "dev"');
}

function dev() {
  var bs = browserSync.create();
  logEverything = false;

  bs.init({ server: './' });
  bs.watch('dist/**/*.*', function (event, file) {
    bs.reload(file);
  });

  watch.watchTree('src', function() {
    console.log(chalk.cyan('Change detected: ') + chalk.bold('processing styles ...'));
    style();
  });
}

function style(cb) {
  queue(1)
    .defer(clean)
    .defer(compileSass)
    .defer(autoprefixCss)
    .defer(minifyCss)
    .defer(writeCss)
    .awaitAll(function(err) {
      if (err) throw err;
      console.log(chalk.green('>> Done processing styles!'));
      if (cb) cb();
    });
}

function clean(cb) {
  logEverything && console.log(chalk.bold('Deleting old files ...'));
  del('dist/**/*.*', function(err) {
    logEverything && console.log('  ... Finished deleting old files.');
    cb(err);
  });
}

function compileSass(cb) {
  logEverything && console.log(chalk.bold('Compiling Sass ...'));
  sass.render({ file: './src/scss/main.scss' }, function(err, result) {
    logEverything && console.log('  ... Finished Sass compilation.');
    compiledCss = result.css.toString(),
    cb(err);
  });
};

function autoprefixCss(cb) {
  logEverything && console.log(chalk.bold('Autoprefixing CSS ...'));
  postcss()
    .use(autoprefixer({ browsers: ['last 2 version'] }))
    .process(compiledCss)
    .then(function(result) {
      logEverything && console.log('  ... Finished autoprefixing.');
      compiledPrefixedCss = result.css;
      cb();
    })
    .catch(cb);
}

function minifyCss(cb) {
  logEverything && console.log(chalk.bold('Minifying CSS ...'));
  new CleanCSS().minify(compiledPrefixedCss, function(err, result) {
    logEverything && console.log('  ... Finished minifying.');
    compiledPrefixedMinifiedCss = result.styles;
    cb(err);
  });
}

function writeCss(cb) {
  logEverything && console.log(chalk.bold('Writing CSS to file ...'));
  fs.writeFile(
    'dist/css/compiled-prefixed-minified.css',
    compiledPrefixedMinifiedCss,
    function(err) {
      logEverything && console.log('  ... Finished writing file.');
      cb(err)
    }
  );
}
