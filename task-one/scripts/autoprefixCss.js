var fs = require('fs');
var path = require('path');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer-core');

var source = fs.readFileSync(path.resolve(__dirname, '../dist/css/compiled.css'));

postcss()
  .use(autoprefixer({ browsers: ['last 2 version'] }))
  .process(source)
  .then(function(result) {
    fs.writeFileSync(path.resolve(__dirname, '../dist/css/compiled-prefixed.css'), result.css);
  })
  .catch(function(err) {
    throw err;
  });
