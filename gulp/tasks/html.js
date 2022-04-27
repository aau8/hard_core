import gulp from 'gulp'
import del from "del";
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'

import fileinclude from 'gulp-file-include';
import replace from 'gulp-replace';
import versionNumber from 'gulp-version-number'


export default function htmlBuild () {
    del("./dist/*.html");
    return gulp.src(app.path.src.html)
        .pipe(plumber(
            notify.onError({
                title: 'HTML',
                message: 'Error <%= error.message %>'
            })
        ))
        .pipe(fileinclude())
        .pipe(replace(/@img\//g, './img/'))
        .pipe(versionNumber({
            'value': '%DT%', // добавляем дату и время в мс
            'append': {
                'key': '_v',
                'cover': 0,
                'to': [
                    'css',
                    'js'
                ]
            },
            'output': {
                'file': './gulp/version.json'
            }
        }))
        .pipe(gulp.dest(app.path.build.html))
        .pipe(browserSync.reload({ stream: true }));
};