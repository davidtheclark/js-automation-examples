var del = require('del');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var babelify = require('babelify');
var gulp = require('gulp');
var gulpRename = require('gulp-rename');
var gulpUglify = require('gulp-uglify');
var gulpEslint = require('gulp-eslint');
var vinylSource = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');

gulp.task('js', ['clean', 'lint'], function() {
  // Browserify is not a gulp plugin: we're just using
  // its JS API
  return browserify('src/js/index.js')
    .transform(babelify)
    .bundle()
    // Then we transform it into the gulp vinyl format
    .pipe(vinylSource('bundled.js'))
    .pipe(vinylBuffer())
    .pipe(gulpUglify())
    .pipe(gulpRename('bundled-uglified.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('lint', function() {
  // This is much more code than running the ESLint CLI ...
  return gulp.src('src/js/**/*.js')
    .pipe(gulpEslint())
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failOnError());
});

gulp.task('clean', function(cb) {
  del('dist/js/*', cb);
});

gulp.task('dev', ['js'], function() {
  browserSync.init({
    server: './'
  });

  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('dist/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', ['dev']);
