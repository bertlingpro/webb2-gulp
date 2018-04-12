const gulp =require('gulp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const csscomb = require('gulp-csscomb');

gulp.task('hello',function() {
    console.log('Hello World');
});

gulp.task('copyhtml',function() {
    return gulp.src('source/**/*.html')
    .pipe(gulp.dest('public'));
});

gulp.task('images', function () {
    return gulp.src('source/images/**/*.+(png|jpg|gif)')
    .pipe(newer('public/images/'))
    .pipe(imagemin())
    .pipe(gulp.dest('public/images'))
});

gulp.task('sass', function(){
    return gulp.src('source/sass/*.scss')
          .pipe(sourcemaps.init())
          .pipe(sass().on('error', sass.logError))
          .pipe(sourcemaps.write('../maps'))
          .pipe(gulp.dest('public/css'))
  });

  gulp.task('sasscomb', function(){
    return gulp.src('source/sass/*.scss')
          .pipe(sourcemaps.init())
          .pipe(sass().on('error', sass.logError))
          .pipe(csscomb())
          .pipe(sourcemaps.write('../maps'))
          .pipe(gulp.dest('public/css'))
  });

gulp.task('sortsass', function() {
    return gulp.src('source/sass/*.scss')
    .pipe(csscomb())
    .pipe(gulp.dest('source/sass/*'))
});

gulp.task('js', function() {
    return gulp.src('source/js/**/*.+(js|json)')
          .pipe(gulp.dest('public/js'));
  });

  gulp.task('default', [
    'copyhtml',
    'images',
    'sasscomb',
    'js'
  ]);

  gulp.task('watch', ['default'], function() {
    gulp.watch('source/**/*.html', ['copyhtml']);
    gulp.watch('source/sass/*.scss', ['sass', 'sortsass']);
    gulp.watch('source/js/**/*.+(js|json)', ['js']);
    gulp.watch('source/images/**/*.+(png|jpg|gif)', ['images']);
  });