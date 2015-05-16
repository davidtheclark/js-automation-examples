var del = require('del');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var babelify = require('babelify');
var gulp = require('gulp');
var gulpRename = require('gulp-rename');
var gulpUglify = require('gulp-uglify');
var vinylSource = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');

gulp.task('js', ['clean'], function() {
  return browserify('src/js/index.js')
    .transform(babelify)
    .bundle()
    .pipe(vinylSource('bundled.js'))
    .pipe(vinylBuffer())
    .pipe(gulpUglify())
    .pipe(gulpRename('bundled-uglified.js'))
    .pipe(gulp.dest('dist/js'))
})

gulp.task('clean', function(cb) {
  del('dist/js/*', cb);
});

gulp.task('watch', ['js'], function() {
  browserSync.init({
    server: './'
  });

  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('dist/**/*.*').on('change', browserSync.reload);
})

gulp.task('default', ['watch']);