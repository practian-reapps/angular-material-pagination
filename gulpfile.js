/* Servidor web gulp para desarrollo 
 */
var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('serve-connect', function() {
    connect.server({
        port: 9003,
        host: 'localhost'
    });
    // watch no reload change
});



/**/
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var header = require('gulp-header');
var pkg = require('./package.json');
var rename = require('gulp-rename');
//var imagemin = require('gulp-imagemin'); // no se puede eliminar fácilmente 
//para eliminar archivos con nombres demasiados largos
//node_modules>subst z: .   //crear una unidad virtual
//node_modules>subst /d z:  //quitar la unidad virtual

var del = require('del');
var jshint = require('gulp-jshint');



var config = {
    filename: 'angular-material-pagination.js',
    filenameCss: 'angular-material-pagination.css',
    src: ['./src/scripts/*.js', './src/scripts/**/*.js'],

    filenameTpls: 'angular-material-pagination.tpls.js',
    srcTpls: ['./src/scriptstpls/*.js', './src/scriptstpls/**/*.js'],

    srcHtml: ['./src/views/*.html', './src/views/**/*.html'],
    srcDirectives: ['./src/directives/*.html', './src/directives/**/*.html'],

    srcIndexHtml: ['index.html', ],
    srcCss: ['./src/content/*.css', './src/content/**/*.css'],
    images: 'media/**/*',
    dest: './dist',
    dest2: './demo/dist',
    umd: {

    },
    banner: ['/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @author <%= pkg.author %>',
        ' * @version v<%= pkg.version %>',
        ' * @link <%= pkg.homepage %>',
        ' * @license <%= pkg.license %>',
        ' */',
        ''
    ].join('\n')
};


var browserSync = require('browser-sync'),
    reload = browserSync.reload;

// ////////////////////////////////////////////////
// Browser-Sync Tasks
// 
// // /////////////////////////////////////////////

gulp.task('serve-browser-sync', function() {
    browserSync({
        port: 9101,
        host: '127.0.0.1',
        server: {
            baseDir: "./demo/"
        },
        browser: ["firefox"], // , "chrome"
        uix: {
            port: 3001
        },
        ui: false
    });

    // watch reload change
    //gulp.watch(config.images).on('change', reload);
    gulp.watch(config.srcCss).on('change', reload);
    //gulp.watch(config.srcHtml).on('change', reload);
    gulp.watch(config.srcDirectives).on('change', reload);
    //gulp.watch(config.srcIndexHtml).on('change', reload);

    gulp.watch(config.src).on('change', reload);
    gulp.watch(config.srcTpls).on('change', reload);


});





// Copy all static images
gulp.task('images', function() {
    return gulp.src(config.images)
        // Pass in options to the task
        .pipe(imagemin({ optimizationLevel: 5 }))
        .pipe(gulp.dest(config.dest + '/media'));
});

gulp.task('styles', function() {
    console.log("styles");
    return gulp.src(config.srcCss)
        .pipe(concat(config.filenameCss))
        .pipe(header(config.banner, { pkg: pkg }))
        .pipe(gulp.dest(config.dest))
        .pipe(gulp.dest(config.dest2));
});

/////////
gulp.task('scripts-lint', function() {
    return gulp.src(config.src)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('js', ['scripts-lint'], function() {
    console.log("js");
    return gulp.src(config.src)
        .pipe(concat(config.filename))
        .pipe(uglify({
            mangle: false,
            output: { beautify: true },
            compress: false
        }))
        .pipe(header(config.banner, { pkg: pkg }))
        .pipe(gulp.dest(config.dest))
        .pipe(gulp.dest(config.dest2));

});

gulp.task('js-min', ['js'], function() {
    console.log("js-min");
    return gulp.src(config.src)
        .pipe(concat(config.filename))
        .pipe(uglify({ mangle: false }))
        .pipe(header(config.banner, { pkg: pkg }))
        .pipe(rename(function(path) {
            path.extname = '.min.js';
        }))
        .pipe(gulp.dest(config.dest))
        .pipe(gulp.dest(config.dest2));
    //.pipe(reload({ stream: true }));
});

///////// Tpls

gulp.task('scripts-lintTpls', function() {
    return gulp.src(config.srcTpls)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('jsTpls', ['scripts-lintTpls'], function() {
    console.log("jsTpls");
    return gulp.src(config.srcTpls)
        .pipe(concat(config.filenameTpls))
        .pipe(uglify({
            mangle: false,
            output: { beautify: true },
            compress: false
        }))
        .pipe(header(config.banner, { pkg: pkg }))
        .pipe(gulp.dest(config.dest))
        .pipe(gulp.dest(config.dest2));

});

gulp.task('js-minTpls', ['jsTpls'], function() {
    console.log("js-minTpls");
    return gulp.src(config.srcTpls)
        .pipe(concat(config.filenameTpls))
        .pipe(uglify({ mangle: false }))
        .pipe(header(config.banner, { pkg: pkg }))
        .pipe(rename(function(path) {
            path.extname = '.min.js';
        }))
        .pipe(gulp.dest(config.dest))
        .pipe(gulp.dest(config.dest2));
    //.pipe(reload({ stream: true }));
});


gulp.task('html', ['directiveshtml'], function() {
    console.log("html");
    return gulp.src(config.srcHtml)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(config.dest + '/views'))
        .pipe(gulp.dest(config.dest2 + '/views'));
});

gulp.task('directiveshtml', function() {
    console.log("directiveshtml");
    return gulp.src(config.srcDirectives)
        //.pipe(htmlmin({ collapseWhitespace: true })) // no htmlmin, solo copia para dist
        .pipe(gulp.dest(config.dest + '/directives'))
        .pipe(gulp.dest(config.dest2 + '/directives'));
});

gulp.task('indexhtml', function() { //TODO
    console.log("indexhtml");
    return gulp.src(config.srcIndexHtml)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(config.dest));
});


gulp.task('watch', function() {
    //gulp.watch(config.images, ['images']); Tpls
    gulp.watch(config.srcCss, ['styles']);
    gulp.watch(config.src, ['js-min']);
    gulp.watch(config.srcTpls, ['js-minTpls']);
    //gulp.watch(config.srcHtml, ['html']);
    gulp.watch(config.srcDirectives, ['directiveshtml']);
    //gulp.watch(config.srcIndexHtml, ['indexhtml']);
});

gulp.task('clean', function() {
    return del(config.dest)+del(config.dest2);
});

gulp.task('build', ['js-min', 'styles', 'directiveshtml', 'js-minTpls']);
//gulp.task('build', ['js-min', 'styles', 'images', 'html']);
//gulp.task('serve', ['serve-connect', 'watch']);
gulp.task('default', ['serve-browser-sync', 'watch']);
