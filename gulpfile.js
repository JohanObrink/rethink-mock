'use strict'
const gulp = require('gulp')
const eslint = require('gulp-eslint')
const mocha = require('gulp-mocha')

const running = {}
const watching = {}

gulp.task('lint', () => {
  running.lint = ['gulpfile.js', 'lib/**/*.js', 'test/**/*.js']
  return gulp.src(running.lint)
    .pipe(eslint())
    .pipe(eslint.format())
})

gulp.task('test', () => {
  running.test = ['lib/**/*.js', 'test/**/*.js']
  return gulp.src(running.test[1])
    .pipe(mocha({reporter: 'spec'}))
})

gulp.task('watch', () => {
  Object.keys(running)
    .filter(key => !watching[key])
    .forEach(key => {
      watching[key] = true
      gulp.watch(running[key], [key])
    })
})
