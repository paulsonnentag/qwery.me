var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var fallback = require('connect-history-api-fallback');

var SERVER_PORT = 3000;

gulp.task('browserify', function () {
  var bundler = browserify({
    entries: ['./src/app.jsx'],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  });
  var watcher = watchify(bundler);

  return watcher
    .on('update', function () {
      var updateStart = Date.now();
      gutil.log('Updating!');
      watcher.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./build/'));

      gutil.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle()
    .on('error', function (err) {
      gutil.log('Error: ' + err.description + ' in ' + err.fileName + ' at ' + err.lineNumber + ':' + err.column);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('css', function () {
  gulp.watch('styles/**/*.css', function () {
    return gulp.src('styles/**/*.css')
      .pipe(concat('main.css'))
      .pipe(gulp.dest('build/'));
  });
});


gulp.task('server', function () {
  connect.server({
    root: '.',
    port: SERVER_PORT,
    livereload: true,
    middleware: function (connect, options) {
      return [fallback];
    }
  });
});

gulp.task('default', ['browserify', 'css', 'server']);