import gulp from 'gulp';
import svg2png from 'gulp-svg2png';
import rename from 'gulp-rename';
import brotli from 'gulp-brotli';
import gzip from 'gulp-gzip';
import htmlmin from 'gulp-htmlmin';
import revall from 'gulp-rev-all';
import terser from 'gulp-terser';

gulp.task('svg-to-png', function () {
    return gulp
        .src('./_cdn/assets/images/**/*.svg') // Adjust to match SVG files in all subdirectories
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

// Task to create Brotli-compressed assets and pages.
gulp.task('brotli', function () {
    return gulp.src(['./_cdn/assets/images/**/*.svg', './_cdn/assets/**/*.json', './_cdn/**/*.html' ])
        .pipe(brotli.compress({
            extension: 'br',
            quality: 11
        }))
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});

// Task to create Gzip-compressed assets and pages.
gulp.task('gzip', function () {
    return gulp
        .src(['./_cdn/assets/images/**/*.svg', './_cdn/assets/**/*.json', './_cdn/**/*.html' ])
        .pipe(gzip())
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});

// Task to minify HTML files produced by Jekyll
gulp.task('htmlmin', () => {
    return gulp
      .src('_site/**/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('_site'));
});

// Task to minify JavaScript files
gulp.task('jsmin', function () {
    return gulp.src('_cdn/**/*.js')
        .pipe(terser())
        .pipe(gulp.dest('_cdn'));
});

gulp.task("rev-all", function () {
    const excludedFiles = ['.woff', '.woff2', '.ttf', '.eot', '.png', '.jpg', '.jpeg', '.gif', '.ico'];
    const excludedGlob = excludedFiles.map(ext => `_site/**/*${ext}`); // Create glob patterns for excluded files

    gulp.src(excludedGlob)
        .pipe(gulp.dest("_cdn"));

    return gulp
        .src(["_site/**", "!_site/assets/fonts/**/*"])
        .pipe(revall.revision({
            dontGlobal: excludedFiles,
            dontRenameFile: ['.html', '.txt', '.xml', 'staticwebapp.config'],
        }))
        .pipe(gulp.dest("_cdn"));
});

gulp.task('default', gulp.series(
    'htmlmin',
    'rev-all',
    'jsmin',
    gulp.parallel('brotli', 'gzip', 'svg-to-png')
));
