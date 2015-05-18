// https://nodejs.org/api/fs.html
var fs = require('fs');

var del = require('del');
var sass = require('node-sass');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer-core');
var CleanCSS = require('clean-css');
var watch = require('watch');
var chalk = require('chalk');
var browserSync = require('browser-sync');
var queue = require('queue-async');

var compiledCss;
var compiledPrefixedCss;
var compiledPrefixedMinifiedCss;

var task = process.argv[2];
switch (task) {
  case 'style':
    style();
    break;
  case 'dev':
    dev();
    break;
  case 'clean':
    clean();
    break;
  default:
    throw new Error('Must specify task "style" or "dev"');
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
  console.log(chalk.bold('Deleting old files ...'));
  del('dist/**/*.*', function(err) {
    console.log('  ... Finished deleting old files.');
    cb && cb(err);
  });
}

function compileSass(cb) {
  console.log(chalk.bold('Compiling Sass ...'));
  sass.render({ file: './src/scss/main.scss' }, function(err, result) {
    console.log('  ... Finished Sass compilation.');
    compiledCss = result.css.toString(),
    cb(err);
  });
};

function autoprefixCss(cb) {
  console.log(chalk.bold('Autoprefixing CSS ...'));
  postcss()
    .use(autoprefixer({ browsers: ['last 2 version'] }))
    .process(compiledCss)
    .then(function(result) {
      console.log('  ... Finished autoprefixing.');
      compiledPrefixedCss = result.css;
      cb();
    })
    .catch(cb);
}

function minifyCss(cb) {
  console.log(chalk.bold('Minifying CSS ...'));
  new CleanCSS().minify(compiledPrefixedCss, function(err, result) {
    console.log('  ... Finished minifying.');
    compiledPrefixedMinifiedCss = result.styles;
    cb(err);
  });
}

function writeCss(cb) {
  console.log(chalk.bold('Writing CSS to file ...'));
  fs.writeFile(
    'dist/css/compiled-prefixed-minified.css',
    compiledPrefixedMinifiedCss,
    function(err) {
      console.log('  ... Finished writing file.');
      cb(err)
    }
  );
}

function dev() {
  var bs = browserSync.create();

  bs.init({ server: './' });
  bs.watch('dist/**/*.*', function (event, file) {
    bs.reload(file);
  });

  watch.watchTree('src', function() {
    console.log(chalk.cyan('Change detected: ') + chalk.bold('processing styles ...'));
    style();
  });
}
