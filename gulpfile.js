var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var sass         = require('gulp-sass');
var uglify       = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var cssnano      = require('gulp-cssnano');
var include      = require('gulp-include');
var rev          = require('gulp-rev');
var revReplace   = require('gulp-rev-replace');
var revdel       = require('gulp-rev-delete-original');
var filter       = require('gulp-filter');
var sourcemaps   = require('gulp-sourcemaps');
var runSequence  = require('run-sequence');
var notify       = require('gulp-notify');
var browserSync  = require('browser-sync').create();
var gutil        = require("gulp-util");
var concat       = require("gulp-concat");
var imagemin     = require('gulp-imagemin');
var svgstore     = require('gulp-svgstore');
var svgmin       = require('gulp-svgmin');
var rename       = require('gulp-rename');
var argv         = require('minimist')(process.argv.slice(2));
var jshint       = require('gulp-jshint');

// Various config
var conf = {
  siteUrl: 'starthere.static'
};

// CLI options
var enabled = {
  // Enable static asset revisioning when `--production`
  rev: argv.production,
  // Disable source maps when `--production`
  maps: !argv.production,
  // Fail due to JSHint warnings only when `--production`
  failJSHint: argv.production,
  // Strip debug statments from javascript when `--production`
  stripJSDebug: argv.production
};

// Smash CSS!
gulp.task('styles', function() {
  return gulp.src([
      'assets/scss/main.scss'
    ])
    .pipe(gulpif(enabled.maps, sourcemaps.init()))
    .pipe(sass())
    .on('error', notify.onError(function(error) {
       return 'Styles error!' + error;
    }))
    .pipe(autoprefixer({
      browsers: [
        'last 2 versions',
        'android 4',
        'opera 12'
      ]
    }))
    .pipe(cssnano({
      safe: true
    }))
    .pipe(gulp.dest('assets/dist/css'))
    .pipe(gulpif(enabled.maps, sourcemaps.write('maps')))
    .pipe(gulpif(enabled.maps, gulp.dest('assets/dist/css')))
    .pipe(browserSync.stream({match: '**/*.css'}))
    .pipe(notify({message: 'Styles smashed.', onLast: true}));
});

// Smash javascript!
gulp.task('scripts', ['jshint'], function() {
  return gulp.src([
      'assets/js/main.js'
    ])
    .pipe(include())
    .pipe(concat('main.js'))
    .pipe(gulpif(enabled.maps, sourcemaps.init()))
    .pipe(uglify({
      compress: {
        'drop_debugger': enabled.stripJSDebug
      }
    }))
    .on('error', notify.onError(function(error) {
       return 'Styles error!' + error;
    }))
    .pipe(gulp.dest('assets/dist/js'))
    .pipe(gulpif(enabled.maps, sourcemaps.write('maps')))
    .pipe(gulpif(enabled.maps, gulp.dest('assets/dist/js')))
    .pipe(browserSync.reload({stream:true}))
    .pipe(notify({message: 'Scripts smashed.', onLast: true}));
});

// ### Images
// `gulp images` - Run lossless compression on all the images.
gulp.task('images', function() {
  return gulp.src([
      'assets/images/**/*'
    ])
    .pipe(imagemin())
    .pipe(gulp.dest('assets/dist/images'));
});

// SVGs to defs
gulp.task('svgs', function() {
  return gulp.src('assets/svgs/*.svg')
    .pipe(svgmin({
        plugins: [{
            removeViewBox: false
        }, {
            removeEmptyAttrs: false
        },{
            mergePaths: false
        },{
            cleanupIDs: false
        }]
    }))
    .pipe(gulp.dest('assets/svgs/'))
    .pipe(gulp.dest('assets/dist/svgs'))
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename({suffix: '-defs'}))
    .pipe(gulp.dest('assets/dist/'));
});

// Revision files for production assets
gulp.task('rev', function(callback) {
  gulp.src('assets/dist/**')
    .pipe(rev())
    .pipe(gulp.dest('build/assets/dist'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('assets/dist'))
    .on('end', callback);
});

// Replace instances of revised files in index.html
gulp.task('revreplace', function(){
  var manifest = gulp.src('assets/dist/rev-manifest.json');

  return gulp.src('*.html')
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest('build'));
});

// Folders to watch for changes
gulp.task('watch', ['build'], function() {
  // Init BrowserSync
  browserSync.init({
    proxy: conf.siteUrl,
    notify: true,
    open: false
  });
  gulp.watch('assets/scss/**/*.scss', ['styles']);
  gulp.watch('assets/js/**/*.js', ['scripts']);
  gulp.watch('assets/images/**/*', ['images']);
  gulp.watch('assets/svgs/**/*.svg', ['svgs']);
});

// `gulp jshint` - Lints configuration JSON and project JS.
gulp.task('jshint', function() {
  return gulp.src([
      'assets/bower.json', 'gulpfile.js', 'assets/js/main.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulpif(enabled.failJSHint, jshint.reporter('fail')));
});

// `gulp clean` - Deletes the build folder entirely.
gulp.task('clean', require('del').bind(null, ['assets/dist']));

// `gulp build` - Run all the build tasks but don't clean up beforehand.
gulp.task('build', function(callback) {
  if (argv.production) {
    // production gulpin' (with file revisioning)
    runSequence(
      'clean',
      ['styles','scripts','images','svgs'],
      'rev',
      'revreplace',
      callback
    );
  } else {
    // dev gulpin'
    runSequence(
      'clean',
      ['styles','scripts','images','svgs'],
      callback
    );
  }
});

// `gulp` - Run a complete build. To compile for production run `gulp --production`.
gulp.task('default', function() {
  gulp.start('build');
});
