var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');
var minifyFont = require('gulp-fontmin');
var shell = require('gulp-shell');
var htmlreplace = require('gulp-html-replace');
var runSequence = require('run-sequence');

gulp.task('minifyCssBuild', function() {
  return gulp.src(['app/lib/AngularJS-Toaster/toaster.css','app/css/*.css'])
    .pipe(concatCss('bundle.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('www/css'));
});

gulp.task('minifyFontBuild', function() {
  return gulp.src(['app/lib/ionic/fonts/*', 'app/fonts/*'])
    .pipe(minifyFont())
    .pipe(gulp.dest('www/fonts'));
});

gulp.task('copyImgBuild', function() {
  return gulp.src(['app/img/**/*'])
  .pipe(gulp.dest('www/img'));
});

gulp.task('copyViewsBuild', function() {
  return gulp.src(['app/views/**/*'])
  .pipe(gulp.dest('www/views'));
});

gulp.task('copyRequirejs', function() {
  return gulp.src(['app/lib/requirejs/require.js'])
  .pipe(gulp.dest('www/lib/requirejs'));
});

gulp.task('copyLinxBreeze', function() {
  return gulp.src(['app/lib/linxbreeze/**/*'])
  .pipe(gulp.dest('www/lib/linxbreeze'));
});

gulp.task('copyJson', function() {
  return gulp.src(['app/json/**/*'])
  .pipe(gulp.dest('www/json'));
});

gulp.task('build', function() {
    return gulp.src('.')
    .pipe(shell(['node ./node_modules/requirejs/bin/r.js -o build.js']));
});

gulp.task('injectMainBuild',function(){
   gulp.src(['app/index.html'])
  .pipe(htmlreplace({
    'js': '<script data-main="js/main-built" src="lib/requirejs/require.js"></script>',
    'css': '<link rel="stylesheet" href="css/bundle.css" type="text/css">'
  }))
  .pipe(gulp.dest('www'));
});

gulp.task('release',function (callback){
   runSequence('cleanWWW', 'sass', 'injectAll','copylibFonts', 'copyJson','minifyCssBuild','minifyFontBuild','build',  'copyImgBuild','copyViewsBuild','copyRequirejs','copyLinxBreeze', 'injectMainBuild',callback);
});

gulp.task('serveRelease',function (callback){
   runSequence('release','serve',callback);
});

gulp.task('runRelease',function (callback){
   runSequence('release','run',callback);
});
