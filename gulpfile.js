var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function() {
    //the return is to use as subtask if needed
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', function() {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var injectSrc = gulp.src(['./public/css/*.css','./public/js/*.js'], {read: false});

    var injectOptions = {
        ignorePath: '/public' //just doesn't write this part of the path
    };

    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public' //just doesn't write this part of the path
    };

    return gulp.src(['./src/views/*.ejs'])
        .pipe(wiredep(options)) //bower files
        .pipe(inject(injectSrc, injectOptions)) //own files
        .pipe(gulp.dest('./src/views'));
});

//we run style and inject both at the same time and prior our main task. If we needed them to be run in sequence we would need to declar a dependency
gulp.task('serve', ['style','inject'], function() {
    var options = {
      script: './src/app.js',
        delayTime: 1,
        env: {
            'PORT': 5000
            //database config
        },
        verbose: true,
        watch: ['./src/**/*.js']
    };

    return nodemon(options)
        .on('restart', function(ev) {
            console.log('Restarting...');
        });
});