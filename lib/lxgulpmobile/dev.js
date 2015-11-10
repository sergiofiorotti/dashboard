var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('watchDev', function() {
	return gulp.watch(['app/**/*'], ['watchDevSequence']);
});

gulp.task('watchDevSequence', function () {
	runSequence('copyAppToWWWDev','injectAllWatch','sassWatch');
});

gulp.task('copyAppToWWWDev', function() {
  return gulp.src(['app/**/*'])
  .pipe(gulp.dest('www/'));
});

gulp.task('dev',function (callback){
  runSequence('cleanWWW','sass','injectAll','copyAppToWWWDev','copylibFonts',callback);
});

gulp.task('serveDev',function (callback){
  runSequence('dev','watchDev','serve',callback);
});

gulp.task('runDev',function (callback){
  runSequence('dev','run', callback);
});
