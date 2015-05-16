var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');
var gulpBabel = require('gulp-babel');
var runSequence = require('run-sequence');

gulp.task('js:globals', function(cb) {
  webpack(webpackConfig, function(err, stats) {
    if (err) { throw err; }
    console.log('[webpack]', stats.toString());
    cb();
  });
});

gulp.task('js:modules', function() {
  return gulp.src('src/js/**/*.{js,jsx}')
    .pipe(gulpBabel())
    .pipe(gulp.dest('./dist/modules'));
});

gulp.task('js', ['js:globals', 'js:modules']);

gulp.task('clean', function(cb) {
  del('dist/js/*', cb);
});

gulp.task('dev', function() {
  var compiler = webpack(webpackConfig);

  new WebpackDevServer(compiler)
    .listen(8080, 'localhost', function(err) {
      if(err) { throw err; }
      console.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
  });
});

gulp.task('build', function(cb) {
  runSequence('clean', 'js', cb);
});

gulp.task('default', ['dev']);
