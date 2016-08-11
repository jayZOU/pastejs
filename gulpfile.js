var gulp = require('gulp'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    watchify = require('watchify'),
    babel = require("gulp-babel");

gulp.task('connectSrc', function() {
  connect.server({
    root: './',
    port: 8080
  });
});

gulp.task('compress-es6', function() {
  return gulp.src('./pastejs.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    // .pipe(concat('preload-es6.js'))
    // .pipe(uglify())
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/'));
});


gulp.task('watch-es6', function() {
  gulp.watch('./*.js', ['compress-es6']);
});


gulp.task('es6', ['watch-es6', 'connectSrc', 'compress-es6']);