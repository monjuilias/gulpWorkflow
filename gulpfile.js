var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    ts = require("gulp-typescript");
    // tsProject = ts.createProject("tsconfig.json");

gulp.task('sass', function () {  
    gulp.src('asset/sass/main.sass')
        .pipe(sourcemaps.init())
            .pipe(sass({includePaths: ['asset/sass']}))
            .pipe(autoprefixer({
                browsers: ['last 20 versions','>1%'],
                cascade: false
            }))
        .pipe(sourcemaps.write('map'))        
        .pipe(gulp.dest('dist/css'));
});


//Complile ts with source map... 
gulp.task('ts', function () {  
    return gulp.src('asset/ts/**/*.ts')
        .pipe(sourcemaps.init())
            .pipe(ts({
                target: 'ES5',
                module: 'system',
                noImplicitAny: true,
                declaration: true,
                emitDecoratorMetadata: true,
                experimentalDecorators: true,
                typeRoots: [
                    "asset/@types"
                ]
            }))
        .pipe(sourcemaps.write('map')) 
        .pipe(gulp.dest('dist/js'));
});


//browser sync
gulp.task('browser-sync', function() {  
    browserSync.init(["asset/**"], {
        server: {
            baseDir: "./"
        }
    });
});


//gulp task for image Comporession
gulp.task('image', function(){
    gulp.src('asset/img/**')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({plugins: [{removeViewBox: true}]})
        ]))
        .pipe(gulp.dest('dist/img'));
});


//gulp task for production version
gulp.task('dist',function(){

});


gulp.task('default', ['sass', 'browser-sync','ts'], function () {  
    gulp.watch("asset/sass/**", ['sass']);
    gulp.watch("asset/ts/**", ['ts']);
});