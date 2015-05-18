var path = require('path');
var del = require('del');

del(path.resolve(__dirname, '../dist/**/*.*'), function(err) {
  if (err) throw err;
  console.log('Done deleting!');
});
