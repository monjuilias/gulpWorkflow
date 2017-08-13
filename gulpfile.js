var gulp = require('gulp');  
var sass = require('gulp-sass');  
var browserSync = require('browser-sync');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

gulp.task('sass', function () {  
    gulp.src('asset/sass/main.sass')
        .pipe(sass({includePaths: ['asset/sass']}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('ts', function () {  
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task('browser-sync', function() {  
    browserSync.init(["asset/**"], {
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', ['sass', 'browser-sync','ts'], function () {  
    gulp.watch("asset/**", ['sass']);
});