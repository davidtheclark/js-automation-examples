var path = require('path');
var fs = require('fs');
var CleanCSS = require('clean-css');

var source = fs.readFileSync(path.resolve(__dirname, '../dist/css/compiled-prefixed.css'));

new CleanCSS().minify(source, function(err, result) {
  if (err) throw err;
  fs.writeFileSync(path.resolve(__dirname, '../dist/css/compiled-prefixed-minified.css'), result.styles);
});
