const gulp = require('gulp');
const svg2png = require('gulp-svg2png');
const rename = require('gulp-rename');
const brotli = require('gulp-brotli');
const gzip = require('gulp-gzip');
const htmlmin = require('gulp-htmlmin');


gulp.task('svg-to-png', function () {
    return gulp.src('./assets/images/**/*.svg') // Adjust to match SVG files in all subdirectories
        .pipe(svg2png({
            width: 1200,
            height: 675
        }))
        .pipe(rename(function (path) {
            path.basename += ".svg.g"; 
            path.extname = ".png";
        }))
        .pipe(gulp.dest(function (file) {
            return file.base; // Output to the original directory
        }));
});

// Task to create Brotli-compressed SVG files
gulp.task('brotli-svg', function () {
    return gulp.src('./assets/images/**/*.svg')
        .pipe(brotli.compress({
            extension: 'br',
            quality: 11
        }))
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});

// Task to create Gzip-compressed SVG files
gulp.task('gzip-svg', function () {
    return gulp.src('./assets/images/**/*.svg')
        .pipe(gzip())
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});

// Task to minify HTML files produced by Jekyll
gulp.task('minify-html', () => {
    return gulp.src('_site/**/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('_site'));
});

gulp.task('default', gulp.parallel('svg-to-png', 'brotli-svg', 'gzip-svg', 'minify-html'));
