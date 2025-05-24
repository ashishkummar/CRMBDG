const gulp = require('gulp');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
//const runSequence = require('run-sequence');
const sourcemaps = require('gulp-sourcemaps');
const sysBuilder = require('systemjs-builder');
const tslint = require('gulp-tslint');
const tsc = require('gulp-typescript');
const uglify = require('gulp-uglify');
const tsconfig = require('tsconfig-glob');
const embedTemplates = require('gulp-angular-embed-templates');
var concatCss = require('gulp-concat-css');
var inlineNg2Styles = require('gulp-inline-ng2-template');
var minifyjs = require('gulp-js-minify');
var angularEmbed = require("gulp-angular4-embedfromurl");
var replace = require('gulp-replace');
var del = require('del');
var sequence = require('gulp4-run-sequence');
var babel = require('gulp-babel');
var minifyCSS = require('gulp-minify-css');

gulp.task('1.BuildAllForPROD', function (done)
{
    sequence('2.CSSbuild',
        '3.CSSminify',
        '4.fontawason-config',
        '5.primeng-config',
        '6.externalAngDep',
        '7.embadeHtml',
        '8.bundle-dependencies',
        '9.ReplaceView',
        '10.ugligyMainDep',
        '11.DeleteUnwantedFiles'
    );
});

gulp.task('2.CSSbuild', function () {
    return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/ag-grid/dist/styles/ag-grid.css',
        'node_modules/ag-grid/dist/styles/ag-theme-blue.css',
        'node_modules/font-awesome/css/font-awesome.min.css',
        'node_modules/primeng/resources/themes/omega/theme.css',
        'node_modules/primeng/resources/primeng.min.css',
        'node_modules/quill/dist/quill.core.css',
        'node_modules/quill/dist/quill.snow.css'
    ])
        .pipe(concatCss("bundle.css"))
        .pipe(gulp.dest('bin/Release/PublishOutput/Content'));
});

gulp.task('3.CSSminify', function () {
    return gulp.src('./bin/Release/PublishOutput/Content/bundle.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('./bin/Release/PublishOutput/Content'));
});

gulp.task('4.fontawason-config', function () {
    return gulp.src([
        'node_modules/font-awesome/fonts/**/*'])
        .pipe(gulp.dest('bin/Release/PublishOutput/font-awesome/fonts'));
});

gulp.task('5.primeng-config', function () {
    return gulp.src([
        'node_modules/primeng/resources/themes/omega/fonts/**/*'])
        .pipe(gulp.dest('bin/Release/PublishOutput/primeng/resources/themes/omega/fonts'));
});

gulp.task('6.externalAngDep', function () {
    return gulp.src([
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/quill/dist/quill.min.js',
        'node_modules/chart.js/dist/chart.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',])
        .pipe(gulp.dest('bin/Release/PublishOutput/Scripts'));
});

gulp.task('minify-js', function () {
    gulp.src('./bin/Release/PublishOutput/app/**/*.js')
        .pipe(minifyjs())
        .pipe(gulp.dest('./bin/Release/PublishOutput/app'));
});

//gulp.task('bundle-app', function () {

//    var builder = new sysBuilder('./bin/Release/PublishOutput', 'systemjs.config.js');
//    return builder
//        .bundle('[app/**/*.js]', 'bin/Release/PublishOutput/Scripts/app.bundle.min.js', {
//            minify: false,
//            mangle: true,
//            sourceMaps: true
//        })
//        .then(function () {
//            console.log('Build complete');
//        })
//        .catch(function (err) {
//            console.log('Build error');
//            console.log(err);
//        });

//});

gulp.task('8.bundle-dependencies', function () {

    var builder = new sysBuilder('', 'systemjs.config.js');
    return builder
        .bundle('app/**/*.js - [app/**/*.js,app/**/*.html,app/**/*.css,app/**/*.ts]', 'bin/Release/PublishOutput/Scripts/dependencies.bundle.min.js', {
            minify: false,
            mangle: true,
            sourceMaps: true

        })
        .then(function () {
            console.log('bundle complete');
        })
        .catch(function (err) {
            console.log('Build error');
            console.log(err);
        });

});

//gulp.task('bundle-dependencies', function () {

//    var builder = new sysBuilder('', 'systemjs.config.js');
//    return builder
//        .bundle('bin/Release/PublishOutput/app/**/*.js - [bin/Release/PublishOutput/app/**/*.js,bin/Release/PublishOutput/app/**/*.html,bin/Release/PublishOutput/app/**/*.css,bin/Release/PublishOutput/app/**/*.ts]', 'bin/Release/PublishOutput/Scripts/dependencies.bundle.min.js', {
//            minify: false,
//            mangle: true,
//            sourceMaps: true

//        })
//        .then(function () {
//            console.log('bundle complete');
//        })
//        .catch(function (err) {
//            console.log('Build error');
//            console.log(err);
//        });

//});
//gulp.task('ReplaceSingleQuote', function () {
//    return gulp.src(['./bin/Release/PublishOutput/app/components/**/*.html'])
//        .pipe(replace(/'/g, "\\'"))
//        .pipe(gulp.dest('./bin/Release/PublishOutput/app/components/'));
//});
gulp.task('9.ReplaceView', function () {
   return gulp.src(['./bin/Release/PublishOutput/Views/Shared/_Layout.cshtml'])
        .pipe(replace('@Styles.Render("~/Content/css")', '<link href="/Content/bundle.css" rel="stylesheet">'))
        .pipe(replace('<script src="~/node_modules/core-js/client/shim.min.js"></script>', '<script src="/Scripts/shim.min.js"></script>'))
        .pipe(replace('<script src="~/node_modules/zone.js/dist/zone.js"></script>', '<script src="/Scripts/zone.js"></script>'))
        .pipe(replace('<script src="~/node_modules/systemjs/dist/system.src.js"></script>', '<script src="/Scripts/system.src.js"></script>'))
        .pipe(replace('<script src="~/systemjs.config.js"></script>', '<script src="/systemjs.config.js"></script>'))
        .pipe(replace('@Scripts.Render("~/bundles/jquery")', '<script src="/Scripts/jquery.min.js"></script><script src = "/Scripts/chart.min.js"></script>'))
       .pipe(replace('@Scripts.Render("~/bundles/bootstrap")', '<script src="/Scripts/bootstrap.min.js"></script><script src="/Scripts/quill.min.js"></script><script src="/Scripts/dependencies.bundle.min.js"></script>'))
        .pipe(gulp.dest('./bin/Release/PublishOutput/Views/Shared/'));
});

gulp.task('11.DeleteUnwantedFiles', function () {
    return del(['./bin/Release/PublishOutput/node_modules', './bin/Release/PublishOutput/app', './bin/Release/PublishOutput/Logs']);
});

gulp.task('7.embadeHtml', function () {
  return  gulp.src(["./app/**/*.js"])
        .pipe(angularEmbed())
        .pipe(gulp.dest('./'));
});

//gulp.task('embadeHtml', function () {
//    return gulp.src(["./bin/Release/PublishOutput/app/**/*.js"])
//        .pipe(angularEmbed())
//        .pipe(gulp.dest('./'));
//});

gulp.task('10.ugligyMainDep', function () {
    return gulp.src("./bin/Release/PublishOutput/Scripts/dependencies.bundle.min.js")
        .pipe(babel({
            presets: ['es2015'],
            compact:false
        }))
        .pipe(uglify().on('error', function (e) {
            console.log(e);
        }))
        .pipe(gulp.dest('./bin/Release/PublishOutput/Scripts'));
});



