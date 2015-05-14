var del = require('del');
var gulp = require('gulp');
var gulpPostcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var gulpSass = require('gulp-sass');
var gulpCssmin = require('gulp-minify-css');
var gulpRename = require('gulp-rename');

gulp.task('style', ['clean:css'], function() {
  return gulp.src('src/scss/main.scss')
    .pipe(gulpSass())
    .pipe(gulpPostcss([
      autoprefixer({ browsers: ['last 2 version'] })
    ]))
    .pipe(gulpCssmin())
    .pipe(gulpRename('compiled-prefixed-minified.css'))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('clean:css', function(cb) {
  del('dist/css/*', cb);
});

gulp.task('clean:js', function(cb) {
  del('dist/js/*', cb);
});

gulp.task('clean', ['clean:css', 'clean:js']);

gulp.task('default', ['style']);
