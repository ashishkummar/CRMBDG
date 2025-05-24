const gulp = require('gulp');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence');
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



gulp.task('1.BuildAllForPROD', ['cssbundle', 'externalAngDep', 'bundle-dependencies'], function () { });

gulp.task('CSSbuild', function () {
    return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/ag-grid/dist/styles/ag-grid.css',
        'node_modules/ag-grid/dist/styles/ag-theme-blue.css',
        'node_modules/font-awesome/css/font-awesome.min.css',
        'node_modules/primeng/resources/themes/omega/theme.css',
        'node_modules/primeng/resources/primeng.min.css'
    ])
        .pipe(concatCss("bundle.css"))
        .pipe(gulp.dest('bin/Release/PublishOutput/Content'));
});


gulp.task('fontawason-config', function () {
    return gulp.src([
        'node_modules/font-awesome/fonts/**/*'])
        .pipe(gulp.dest('bin/Release/PublishOutput/font-awesome/fonts'));
});
gulp.task('primeng-config', function () {
    return gulp.src([
        'node_modules/primeng/resources/themes/omega/fonts/**/*'])
        .pipe(gulp.dest('bin/Release/PublishOutput/primeng/resources/themes/omega/fonts'));
});

gulp.task('cssbundle', ['CSSbuild', 'fontawason-config', 'primeng-config'], function () { });

gulp.task('EmbedeFiles', function () {

    return gulp.src(['./app/components/**/*.js'])
        //.pipe(inlineNg2Styles({ base: '/', useRelativePaths: true, removeLineBreaks: true }))
        .pipe(angularEmbed())
        .pipe(gulp.dest('./'));
});

gulp.task('externalAngDep', function () {
    return gulp.src([
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/jquery/dist/jquery.js',
        'node_modules/chart.js/dist/chart.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',])
        .pipe(gulp.dest('bin/Release/PublishOutput/Scripts'));
});
gulp.task('minify-js', function () {
    gulp.src('./bin/Release/PublishOutput/app/**/*.js')
        .pipe(minifyjs())
        .pipe(gulp.dest('./bin/Release/PublishOutput/app'));
});
gulp.task('bundle-app', function () {

    var builder = new sysBuilder('./bin/Release/PublishOutput', 'systemjs.config.js');
    return builder
        .bundle('[app/**/*.js]', 'bin/Release/PublishOutput/Scripts/app.bundle.min.js', {
            minify: false,
            mangle: true,
            sourceMaps: true
        })
        .then(function () {
            console.log('Build complete');
        })
        .catch(function (err) {
            console.log('Build error');
            console.log(err);
        });

});

gulp.task('bundle-dependencies', function () {

    var builder = new sysBuilder('', 'systemjs.config.js');
    return builder
        .bundle('app/**/*.js - [app/**/*.js,app/**/*.html,app/**/*.css,app/**/*.ts]', 'bin/Release/PublishOutput/Scripts/dependencies.bundle.min.js', {
            minify: true,
            mangle: true,
            sourceMaps: true

        })
        .then(function () {
            console.log('Build complete');
        })
        .catch(function (err) {
            console.log('Build error');
            console.log(err);
        });

});


// Bundle dependencies into vendors file
//gulp.task('bundle:libs', function () {
//    return gulp.src([
//        //'node_modules/@angular/core/bundles/core.umd.js',
//        //'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
//        //'node_modules/@angular/common/bundles/common.umd.js',
//        //'node_modules/@angular/forms/bundles/forms.umd.js',
//        //'node_modules/@angular/http/bundles/http.umd.js',
//        //'node_modules/@angular/router/bundles/router.umd.js',
//        //'node_modules/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
//        //'node_modules/primeng/calendar.js',
//        //'node_modules/ag-grid-angular/main.js',
//        //'node_modules/primeng/growl.js',
//        //'node_modules/primeng/messages.js',
//        //'node_modules/primeng/components/common/messageservice.js',
//        //'node_modules/primeng/progressbar.js',
//        //'node_modules/primeng/sidebar.js',
//        //'node_modules/primeng/inputswitch.js',
//        //'node_modules/primeng/chart.js',
//        //'node_modules/primeng/schedule.js',
//        //'node_modules/rxjs/Observable.js',
//        //'node_modules/rxjs/add/operator/map.js',
//        //'node_modules/rxjs/add/operator/catch.js',
//        //'node_modules/rxjs/add/observable/throw.js',
//        //'node_modules/rxjs/Subject.js',
//        //'node_modules/rxjs/add/observable/interval.js',
//        'node_modules/core-js/client/shim.min.js',
//        'node_modules/zone.js/dist/zone.js',
//        'node_modules/systemjs/dist/system.src.js',
//        './systemjs.config.js',
//        './systemjs-angular-loader.js'
      
//    ])
//        .pipe(concat('vendors.min.js'))
//        .pipe(uglify())
//        .pipe(gulp.dest('bin/Release/PublishOutput/production'));
//});

//gulp.task('tsc', function () {

//    return gulp.src(['app/**/*.ts', 'typings/index.d.ts'], { base: 'app' })
//        .pipe(inlineNg2Styles({ base: '/', useRelativePaths: true, removeLineBreaks: true,}))
//       // .pipe(embedTemplates({ sourceType: 'ts' }))
//        .pipe(sourcemaps.init())
//        .pipe(tsc({
//            "target": "es5",
//            "module": "commonjs",
//            "moduleResolution": "node",
//            "sourceMap": true,
//            "emitDecoratorMetadata": true,
//            "experimentalDecorators": true,
//            "removeComments": true,
//            "skipDefaultLibCheck": true,
//            "skipLibCheck": true,
//            "strict": false,
//            "lib": ["es2015", "dom"],
//            "noImplicitAny": false,
//            "suppressImplicitAnyIndexErrors": true
//        }))
//        .pipe(sourcemaps.write({ sourceRoot: 'app' }))
//        .pipe(gulp.dest('dist'));

//});

//gulp.task('dist-config', function () {
//    return gulp.src([
//        './systemjs.config.js',
//        ])
//        .pipe(gulp.dest('dist'));
//});



//gulp.task('prod-FileCopy', function () {
//    return gulp.src([
//        'node_modules/core-js/client/shim.min.js',
//        'node_modules/zone.js/dist/zone.js',
//        'node_modules/systemjs/dist/system.src.js',
//        'node_modules/jquery/dist/jquery.js',
//        'node_modules/chart.js/dist/chart.js',
//        'node_modules/bootstrap/dist/js/bootstrap.js',
//        './systemjs.config.js',
//        './systemjs-angular-loader.js'])
//        .pipe(gulp.dest('bin/Release/PublishOutput/production'));
//});



//gulp.task('dist', ['cssbundle', 'dist-config','prod-FileCopy', 'tsc'], function () { });

//gulp.task('bundle-app', ['dist'], function () {

//    var builder = new sysBuilder('', './systemjs.config.js');
//    return builder
//        .bundle('[dist/**/*]', 'bin/Release/PublishOutput/production/app.bundle.min.js', {
//            minify: true,
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

//gulp.task('bundle-dependencies', ['dist'], function () {

//    var builder = new sysBuilder('', './dist/systemjs.config.js');
//    return builder
//        .bundle('dist/**/* - [dist/**/*.js]', 'bin/Release/PublishOutput/production/dependencies.bundle.min.js', {
//            minify: true,
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

//gulp.task('production', ['bundle-app', 'bundle-dependencies'], function () { });
