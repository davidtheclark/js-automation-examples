var del = require('del');
var browserSync = require('browser-sync');
var gulp = require('gulp');
var gulpPostcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var gulpSass = require('gulp-sass');
var gulpCssmin = require('gulp-minify-css');
var gulpRename = require('gulp-rename');

// Compile Sass to CSS, add vendor prefixes, minify,
// and save it into dist/
gulp.task('style', ['clean'], function() {
  return gulp.src('src/scss/main.scss')
    .pipe(gulpSass())
    .pipe(gulpPostcss([
      autoprefixer({ browsers: ['last 2 version'] })
    ]))
    .pipe(gulpCssmin())
    .pipe(gulpRename('compiled-prefixed-minified.css'))
    .pipe(gulp.dest('dist/css'))
});

// Cleanup dist
gulp.task('clean', function(cb) {
  del('dist/css/*', cb);
});

// Re-compile and refresh on save
gulp.task('dev', ['style'], function() {
  var bs = browserSync.create();
  bs.init({
    server: './'
  });

  gulp.watch('src/scss/*.scss', ['style']);
  gulp.watch('dist/**/*.*').on('change', bs.reload);
})

gulp.task('default', ['dev']);
