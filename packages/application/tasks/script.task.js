const gulp = require('gulp')
const uglify = require('gulp-uglify')
const log = require('fancy-log')
const babel = require('gulp-babel')
const plumber = require('gulp-plumber')
const ts = require('gulp-typescript')
const sourcemaps = require('gulp-sourcemaps')

const tsFiles = ['./src/**/*.ts', '!dist/**', '!node_modules/**']
const jsFiles = ['./src/**/*.js', '!gulpfile.js', '!tasks/**/*.js', '!dist/**', '!node_modules/**']

function buildTS () {
  const tsProject = ts.createProject('./tsconfig.json')
  const tsResult = gulp.src(tsFiles)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(tsProject()
      .on('error', log))

  return tsResult.js
    .pipe(babel()
      .on('error', log))
    .pipe(uglify().on('error', log))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
}

function buildDefinition () {
  const tsProject = ts.createProject('./tsconfig.json')
  const tsResult = gulp.src(tsFiles)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(tsProject()
      .on('error', log))

  return tsResult.dts
    .pipe(gulp.dest('dist'))
}

function buildJS () {
  return gulp.src(jsFiles)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(babel()
      .on('error', log))
    .pipe(uglify().on('error', log))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
}

function watchScripts () {
  gulp.watch(tsFiles, { ignoreInitial: false }, buildTS)
  gulp.watch(tsFiles, { ignoreInitial: false }, buildDefinition)
  gulp.watch(jsFiles, { ignoreInitial: false }, buildJS)
}

exports.buildScripts = gulp.series(buildTS, buildDefinition, buildJS)
exports.watchScripts = watchScripts
