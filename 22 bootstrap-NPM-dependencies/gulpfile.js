// gulpfile.js (Gulp v4)
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));

// ---------- styles (Bootstrap SCSS + your SCSS) ----------
function styles() {
    return gulp.src(
        [
            'node_modules/bootstrap/scss/bootstrap.scss', // BS source (see /node_modules/bootstrap/scss/)
            'src/scss/*.scss'                             // your SCSS
        ],
        { sourcemaps: true }
    )
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css', { sourcemaps: '.' }))
        .pipe(browserSync.stream());
}

// ---------- JS (Bootstrap bundle + jQuery if you want it) ----------
function js() {
    return gulp
        .src(
            [
                'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', // includes Popper
                'node_modules/jquery/dist/jquery.min.js'                  // optional for your code
            ],
            { allowEmpty: true }
        )
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.stream());
}

// ---------- Font Awesome (CSS + webfonts + optional JS) ----------
function faCss() {
    return gulp
        .src('node_modules/@fortawesome/fontawesome-free/css/all.min.css', { allowEmpty: true })
        .pipe(gulp.dest('src/css'));
}

function faWebfonts() {
    // FA CSS expects ../webfonts relative to the CSS file -> put them in src/webfonts
    return gulp
        .src('node_modules/@fortawesome/fontawesome-free/webfonts/*', { allowEmpty: true })
        .pipe(gulp.dest('src/webfonts'));
}

function faJs() {
    // Only needed if you use the FA JS/SVG framework
    return gulp
        .src('node_modules/@fortawesome/fontawesome-free/js/all.min.js', { allowEmpty: true })
        .pipe(gulp.dest('src/js'));
}

// ---------- dev server ----------
function serve() {
    browserSync.init({ server: './src' });
    gulp.watch(['node_modules/bootstrap/scss/**/*.scss', 'src/scss/**/*.scss'], styles);
    gulp.watch('src/*.html').on('change', browserSync.reload);
    gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
};

// ---------- exports ----------
exports.styles = styles;
exports.js = js;
exports.fa = gulp.parallel(faCss, faWebfonts, faJs);
exports.serve = gulp.series(styles, serve);
exports.default = gulp.series(gulp.parallel(js, faCss, faWebfonts, faJs, styles), serve);
