const gulp = require('gulp')

const scripts = require('./tasks/script.task')

const watchApplication = gulp.parallel(scripts.watchScripts)
const buildApplication = gulp.series(scripts.buildScripts)

exports.watch = watchApplication
exports.build = buildApplication
