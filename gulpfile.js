const gulp = require ('gulp');
const jshint = require ('gulp-jshint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

gulp.task('processHTML', async () => {
    gulp.src('*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('processCSS', async () => {
    gulp.src('*.css')
    .pipe(gulp.dest('dist'));
});

gulp.task('processJS', async () => {
    gulp.src('*.js')
    .pipe(jshint({
      esversion: 8
    }))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('dist'));
});

//to pass js link on html files
// gulp.task('babelPolyfill', async () => {
//   gulp.src('node_modules/babel-polyfill/browser.js')
//     .pipe(gulp.dest('dist/node_modules/babel-polyfill'));
// });

gulp.task('browserSync', async () => {
  browserSync.init({
    server: './dist',
    port: 8080,
    ui: {
      port: 8081
    }
  });
});

gulp.task('watch', async() => {
    gulp.watch('*.js', gulp.series('processJS')).on('change', browserSync.reload);
    gulp.watch('*.html', gulp.series('processHTML')).on('change', browserSync.reload);
    gulp.watch('*.css', gulp.series('processCSS')).on('change', browserSync.reload);

    // gulp.watch('dist/*.js', gulp.series(browserSync.reload));
    // gulp.watch('dist/*.html', gulp.series(browserSync.reload));
    // gulp.watch('dist/*.css', gulp.series(browserSync.reload));
});

gulp.task('default',   gulp.parallel('processHTML', 'processCSS', 'processJS', 'browserSync', 'watch'));
