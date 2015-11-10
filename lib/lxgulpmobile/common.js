var gulp = require('gulp');
var del = require('del');
var shell = require('gulp-shell');
var jshint = require('gulp-jshint');
var flatten = require('gulp-flatten');
var sass = require('gulp-sass');

gulp.task('sass', function() {
   return gulp.src(['scss/**/*.scss','app/css/**/*.scss'])
      .pipe(sass({/*outputStyle: 'compressed'*/}))
      .pipe(gulp.dest('app/css'));
});

gulp.task('sassWatch', function() {
   return gulp.src(['scss/**/*.scss','www/css/**/*.scss'])
      .pipe(sass({/*outputStyle: 'compressed'*/}))
      .pipe(gulp.dest('www/css'));
});

gulp.task('cleanWWW', function() {
  return del(['./www/**/*']);
});

gulp.task('serve',function(){
  return gulp.src(['.'])
  .pipe(shell(['ionic serve']));
});

gulp.task('run',function(){
  return gulp.src(['.'])
  .pipe(shell(['ionic run']));
});

gulp.task('jslint', function() {
  return gulp.src(['app/js/**/*.js', '!app/js/main-built.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('copylibFonts', function() {
  return gulp.src(['app/lib/**/*.ttf'])
  .pipe(flatten())
  .pipe(gulp.dest('www/fonts'));
});
