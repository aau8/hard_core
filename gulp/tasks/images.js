import gulp from 'gulp'
import del from "del";
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import newer from 'gulp-newer'

import imagemin from 'gulp-imagemin';

export default function imagesBuild () {
    return gulp.src(app.path.src.images)
        .pipe(plumber(
            notify.onError({
                title: 'IMAGES',
                message: 'Error <%= error.message %>'
            })
        ))
        .pipe(newer(app.path.build.images))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3
        }))
        .pipe(gulp.dest(app.path.build.images))
        .pipe(browserSync.reload({ stream: true }));
}