const gulp = require('gulp')
const uglify = require('gulp-uglify')
const log = require('fancy-log')
const babel = require('gulp-babel')
const plumber = require('gulp-plumber')
const ts = require('gulp-typescript')

const tsProject = ts.createProject('./tsconfig.json')
const tsFiles = ['./src/**/*.ts']
const jsFiles = ['./src/**/*.js', '!gulpfile.js', '!tasks/**/*.js', '!dist/**', '!node_modules/**']

function buildTS () {
  return gulp.src(tsFiles)
    .pipe(plumber())
    .pipe(tsProject()
      .on('error', log))
    .pipe(babel()
      .on('error', log))
    .pipe(uglify().on('error', log))
    .pipe(gulp.dest('dist'))
}

function buildJS () {
  return gulp.src(jsFiles)
    .pipe(plumber())
    .pipe(babel()
      .on('error', log))
    .pipe(uglify().on('error', log))
    .pipe(gulp.dest('dist'))
}

function watchScripts () {
  gulp.watch(tsFiles, { ignoreInitial: false }, buildTS)
  gulp.watch(jsFiles, { ignoreInitial: false }, buildJS)
}

exports.buildScripts = gulp.series(buildTS, buildJS)
exports.watchScripts = watchScripts
