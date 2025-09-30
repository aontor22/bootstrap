// gulpfile.js (Gulp v4)
const gulp = require('gulp');
const browserSync = require('browser-sync').create();

// Use gulp-sass with Dart Sass
const sass = require('gulp-sass')(require('sass'));

// ---------- tasks ----------
function styles() {
    return gulp.src([
        'node_modules/bootstrap/scss/bootstrap.scss', // Bootstrap
        'src/scss/*.scss'                            // your scss
    ], { sourcemaps: true })
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css', { sourcemaps: '.' }))
        .pipe(browserSync.stream());
}

function js() {
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', // includes Popper
        'node_modules/jquery/dist/jquery.min.js'                  // optional for your code
    ])
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.stream());
}

// Font Awesome (support old 'font-awesome' or new '@fortawesome')
function fonts() {
    return gulp.src([
        'node_modules/font-awesome/fonts/*',
        'node_modules/@fortawesome/fontawesome-free/webfonts/*'
    ], { allowEmpty: true })
        .pipe(gulp.dest('src/fonts'));
}

function fa() {
    return gulp.src([
        'node_modules/font-awesome/css/font-awesome.min.css',
        'node_modules/@fortawesome/fontawesome-free/css/all.min.css'
    ], { allowEmpty: true })
        .pipe(gulp.dest('src/css'));
}

function serve() {
    browserSync.init({ server: './src' });
    gulp.watch(['node_modules/bootstrap/scss/**/*.scss', 'src/scss/**/*.scss'], styles);
    gulp.watch('src/*.html').on('change', browserSync.reload);
    gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
}

// ---------- exports ----------
exports.sass = styles;
exports.js = js;
exports.fonts = fonts;
exports.fa = fa;
exports.serve = gulp.series(styles, serve);
exports.default = gulp.series(gulp.parallel(js, fa, fonts, styles), serve);
