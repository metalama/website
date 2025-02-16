import gulp from 'gulp';
import svg2png from 'gulp-svg2png';
import rename from 'gulp-rename';
import brotli from 'gulp-brotli';
import gzip from 'gulp-gzip';
import htmlmin from 'gulp-htmlmin';
import revall from 'gulp-rev-all';
import terser from 'gulp-terser';

gulp.task('svg-to-png', function () {
    return gulp.src('./_cdn/assets/images/**/*.svg') // Adjust to match SVG files in all subdirectories
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
    return gulp.src(['./_cdn/assets/images/**/*.svg', './_cdn/assets/**/*.json', './_cdn/**/*.html' ])
        .pipe(gzip())
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});

// Task to minify HTML files produced by Jekyll
gulp.task('htmlmin', () => {
    return gulp.src('_site/**/*.html')
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
    return gulp.src("_site/**")
        .pipe(revall.revision({
            dontGlobal: ['.woff', '.woff2', '.ttf', '.eot'],
            dontRenameFile: ['.html', '.txt', '.xml', 'staticwebapp.config']
        }))
        .pipe(gulp.dest("_cdn"));
});

// Task to copy fonts to _cdn directory because rev-all might modify them in a bad way.
gulp.task('copy-fonts', function () {
    return gulp.src('_site/assets/fonts/**/*')
        .pipe(gulp.dest('_cdn/assets/fonts'));
});

gulp.task('default', gulp.series(
    'htmlmin',
    'rev-all',
    gulp.parallel('jsmin', 'copy-fonts'),
    gulp.parallel('brotli', 'gzip', 'svg-to-png')
));
