var path = require('path');
var fs = require('fs');
var sass = require('node-sass');

var options = { file: path.resolve(__dirname, '../src/scss/main.scss') };

sass.render(options, function(err, result) {
  if (err) throw err;

  fs.writeFileSync(path.resolve(__dirname, '../dist/css/compiled.css'), result.css);
});
