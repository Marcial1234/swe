'use strict';

var gulp = require('gulp'),
    bs = require('browser-sync'),
    nodemon = require('gulp-nodemon');

gulp.task('default', ['browser-sync'], function () {
});

gulp.task('browser-sync', ['nodemon'], function() {
    bs.init(null, {
        proxy: "http://localhost:8080",
        port: "3000",
        files: ["client/**/*.*"],
        browser: "chrome"
    });
});

gulp.task('nodemon', function (cb) {

    var started = false;

    return nodemon({env: { 'NODE_ENV': 'development' }})
    .on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    })
    .on('restart', function() {
        setTimeout(function() {
            console.log('-------- restart BS --------');
            bs.reload();
        }, 1000);
    });
});