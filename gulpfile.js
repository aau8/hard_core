import gulp from 'gulp'
import browserSync from 'browser-sync'
import del from 'del'
import htmlBuild from './gulp/tasks/html.js'
import cssBuild from './gulp/tasks/css.js'
import jsBuild from './gulp/tasks/js.js'
import imagesBuild from './gulp/tasks/images.js'

const { series, parallel, src, dest, watch } = gulp

import path from './gulp/config/path.js'
global.app = {
    path,
    gulp
}

function webServer() {
    browserSync.init({
        // proxy: "", // Для работы с OpenServer (php) указываем папку, с которой работаем в OpenServer.
        server: {
            baseDir: "./dist",
        },
        notify: false,
        port: 3000,
    });
}

function watchFiles() {
    watch(app.path.src.html, htmlBuild);
    watch(app.path.src.scss, cssBuild);
    watch(app.path.src.js, jsBuild);
    watch(app.path.src.images, imagesBuild);
}

async function cleanDist() {
    await del(`./dist`);
}

let dev = series(
    cleanDist,
    htmlBuild,
    cssBuild,
    jsBuild,
    imagesBuild
);

export default parallel(dev, watchFiles, webServer)