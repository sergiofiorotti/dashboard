var fs = require('fs')
var _ = require('underscore');
var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var directoryMap = require('gulp-directory-map');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');

var directoryBase = "app";

gulp.task('listInjectablesFiles', function() {
 return gulp.src([directoryBase + '/js/**/*.js',
                  '!' + directoryBase +'/js/appModule.js',
                  '!' + directoryBase +'/js/bootstrap.js',
                  '!' + directoryBase +'/js/index.js',
                  '!' + directoryBase +'/js/main-built.js',
                  '!' + directoryBase +'/js/main-built.js.map',
                  '!' + directoryBase +'/js/**/*index.js'])
  .pipe(directoryMap({
   filename: 'directory.json'
  }))
  .pipe(gulp.dest('gulpTemp'));
});

gulp.task('injectFilesToIndex', function() {
 var json = JSON.parse(fs.readFileSync('gulpTemp/directory.json'));

 _.each(json, function(children, item) {
  var files = [];

  _.each(children, function(child) {
    var fileName = child.replace('.js', '').replace('\\', '/');
    files.push("'js/" + fileName  + "'");
  });

  var template = {
   file: new handlebars.Handlebars.SafeString(files.join())
  };

  gulp.src('builder/defaults/defaultIndex.js')
   .pipe(handlebars(template))
   .pipe(rename('index.js'))
   .pipe(gulp.dest(directoryBase + '/js/' + item + '/'));
 });
});

gulp.task('injectAll', function () {
 directoryBase = 'app';
 runSequence('listInjectablesFiles', 'injectFilesToIndex');
});

gulp.task('injectAllWatch', function () {
 directoryBase = 'www';
 runSequence('listInjectablesFiles', 'injectFilesToIndex');
});
