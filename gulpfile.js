const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssSorter = require("css-declaration-sorter");
const mmq = require("gulp-merge-media-queries");
const cleanCSS = require("gulp-clean-css");

function compileSass() {
  return gulp
    .src("./sass/**/*.scss")
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssSorter()]))
    .pipe(mmq())
    .pipe(cleanCSS())
    .pipe(gulp.dest("./css/"));
}

function watch() {
  gulp.watch("./sass/**/*.scss", compileSass);
}

exports.default = watch;
