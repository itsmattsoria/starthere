// Gulp setup for Start Here front end boilerplate

// Load required plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    svg2png = require('gulp-svg2png')

// File path vars
var paths = {
    scssSrc: 'sass/**/*.scss',
    imgSrc: 'images/**/*',
    svgSrc: 'svgs/*.svg'
}

// Do the stuff!

// Sass compilation and output
gulp.task('styles', function() {
  return sass('sass/main.scss', { style: 'expanded' })
    .pipe(autoprefixer())
    .pipe(gulp.dest('css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Javascript concatenation
gulp.task('scripts', function() {
  return gulp.src(['js/libs/*.js', 'js/main.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('site.js'))
    .pipe(gulp.dest('js/build'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('js/build'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Compress images (must run glulp images manually)
gulp.task('images', function() {
  return gulp.src(paths.imgSrc)
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// SVG time!
gulp.task('svgs', function() {
  return gulp.src(paths.svgSrc)
    .pipe(svgmin({
        plugins: [{
            removeViewBox: false
        }, {
            removeEmptyAttrs: false
        }]
    }))
    .pipe(gulp.dest('svgs'))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename({suffix: '-defs'}))
    .pipe(gulp.dest('svgs/build'))
});
// convert to png for fallback
gulp.task('svgfallback', function() {
  return gulp.src(paths.svgSrc)
    .pipe(svg2png())
    .pipe(gulp.dest('../'));
});

// Gulp watch
gulp.task('watch', function() {
  // Watch sass files
  gulp.watch(paths.scssSrc, ['styles']);
  // Watch js files
  gulp.watch(['js/libs/*.js', 'js/main.js'], ['scripts']);
  // Watch SVGs
  gulp.watch(paths.svgSrc, ['svgs', 'svgfallback']);
  // LiveReload
  livereload.listen();
  gulp.watch(['assets/**']).on('change', livereload.changed);
});

// Make watch the default task
gulp.task('default', function() {
    gulp.start('watch');
});