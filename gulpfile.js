var gulp = require('gulp')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var plumber = require('gulp-plumber')
var uglify = require('gulp-uglify')
var browser = require('browser-sync')

gulp.task('server', function() {
  browser({
    server: {
      baseDir: './dist',
    },
  })
})

gulp.task('html', function() {
  gulp
    .src(['src/**/*.html'])
    .pipe(gulp.dest('dist'))
    .pipe(browser.reload({ stream: true }))
})

gulp.task('sass', function() {
  gulp
    .src('src/sass/**/*scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/css'))
    .pipe(browser.reload({ stream: true }))
})

gulp.task('js', function() {
  gulp
    .src(['src/**/*.js', 'src/!js/min/**/*.js'])
    // .pipe(
    //   babel({
    //     presets: ["@babel/env"]
    //   })
    // )
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(browser.reload({ stream: true }))
})

gulp.task('assets', function() {
  gulp
    .src(['src/assets/**/*.{png,jpg,gif,svg}'], { base: 'src' })
    .pipe(gulp.dest('dist'))
})

gulp.task('default', ['server'], function() {
  gulp.watch(['src/js/script.js', 'src/!js/min/**/*.js'], ['js'])
  gulp.watch('src/sass/**/*.scss', ['sass'])
  gulp.watch('src/**/*.html', ['html'])
})
