'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-minify-css');

var path = {
    build: {
        js: 'dist/js/',
        css: 'dist/styles/'
    },
    src: {
        js: 'source/js/**/*.js',
        style: 'source/css/**/main.scss'
    },
    watch: {
        js: 'source/js/**/*.js',
        style: 'source/css/**/*.scss'
    },
};


gulp.task('js:build', function () {
    gulp.src(path.src.js)
        // .pipe(uglify())
        .pipe(gulp.dest(path.build.js));
});

gulp.task('style:build', function(done) {
    gulp.src(path.src.style)
        .pipe(sass().on('error', function(error) {
            done(error);
        }))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.css))
        .on('end', function() {
            done();
        });
});

// gulp.task('style:build', function () {
//     gulp.src(path.src.style)
//         .pipe(sass({
//             errLogToConsole: true
//         }))
//         .pipe(prefixer())
//         .pipe(cssmin())
//         .pipe(gulp.dest(path.build.css));
// });


gulp.task('build', [
    'js:build',
    'style:build'
]);


gulp.task('watch', function(){
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
});


gulp.task('default', ['build', 'watch']);


