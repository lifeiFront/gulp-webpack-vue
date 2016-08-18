/**
 * [gulp gulp+webpack+vue+vue-router 自动化构建部署方案]
 * create by lifei
 */
var gulp = require('gulp'),
    runSequence = require('run-sequence'), //保证任务按照一定的顺序执行模块
    del = require('del'), //删除文件及文件夹模块
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(), //获取package.json中已有安装的gulp模块json对象，方便引用
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js'); //webpack执行文件,发布环境默认
/**
 * 引用webpack对js进行操作，发布环境
 */
gulp.task("build:js", ['del'], function(callback) {
    webpackConfig.output.chunkFilename = "async_[name]-[chunkhash:8].js"; //修改webpack配置文件
    webpackConfig.devtool = 'cheap-module-source-map';//生成环境建议
    
    var buildWebpackConfig = Object.create(webpackConfig),
        buildCompiler = webpack(buildWebpackConfig);
    buildCompiler.run(function(err, stats) {
        if (err) throw new gutil.PluginError("webpack:build-js", err);
        gutil.log("[webpack:build-js]", stats.toString({
            colors: true
        }));
        callback();
    });
});
/**
 * 引用webpack对js进行操作，开发环境
 */
gulp.task("dev:js", ['del'], function(callback) {
    webpackConfig.output.chunkFilename = "async_[name].js"; //修改webpack配置文件
    webpackConfig.devtool = 'cheap-module-eval-source-map';//开发环境建议
    var devWebpackConfig = Object.create(webpackConfig),
        devCompiler = webpack(devWebpackConfig);
    devCompiler.run(function(err, stats) {
        if (err) throw new gutil.PluginError("webpack:build-js", err);
        gutil.log("[webpack:build-js]", stats.toString({
            colors: true
        }));
        callback();
    });
});


/**
 * 1、压缩js文件，给入口文件添加md5时间戳，生成对应的json对应文件，存放到rev/js目录下。
 * 2、异步加载的文件在webpack构建时添加，确定名字，后续不能更改名字，其引用均是在入口文件中动态添加的，在页面中没有静态引用。
 */
gulp.task('js', function() {
    var f = plugins.filter(function(file) {
        return !/async_.+/.test(file.path); //异步加载的js不需要添加后缀更改名字，过滤掉。返回true的文件是符合条件的
    }, {
        restore: true
    });
    return gulp.src('dist/js/*.js')
        .pipe(plugins.uglify())
        .pipe(f) //过滤文件
        .pipe(plugins.rev()) //只有符合过滤条件的文件被添加了后缀
        .pipe(f.restore) //恢复
        .pipe(gulp.dest('dist/js')) //所有文件均被压缩后放到次路径下
        .pipe(plugins.rev.manifest())
        .pipe(gulp.dest('rev/js'));
});



/**
 * [删除文件夹]
 */
gulp.task('del', function() {
    return del(['dist']);
});


/**
 * 压缩样式文件，添加md5后缀，生成对应的json文件
 */
gulp.task('css', function() {
    return gulp.src('src/css/*.css')
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions'], //自动补全样式前缀，针对最新的两个浏览器版本
            cascade: false
        }))
        .pipe(plugins.minifyCss())
        .pipe(plugins.rev()) //对文件流进行处理，更改文件名，添加md5后缀
        .pipe(gulp.dest('dist/css')) //写入到此路径下
        .pipe(plugins.rev.manifest()) //处理流，生成原始文件名：添加后缀后的文件名对应关系的json文件
        .pipe(gulp.dest('rev/css')); //将json文件保存到此路径下
});



/**执行rev任务，调试看下，生成的manifest  json文件中有引入的js,css
 *文件名与根据内容计算出来的签名后缀的对应关系（{"normalize.css": "normalize-0f0d0833f8.css"}），然后替换对应页面中的路径引用  .html文件与.jsp文件均可
 *如果html或者jsp中有字符与样式引入的字符相同也会被替换如：
 *<link rel="stylesheet" href="css/normalize.css" /> 
 *body体重如果含有"css/normalize.css"字符内容也会被替换，项目中要避免
 *app.js可以被替换 app-a8a87ad36b.js也会被替换，app-后面的字符必须是合法的md5,app-222.js这种随意写的名字不会被替换
 */
gulp.task('replacePath', function() {
    //del 与['js', 'css']顺序执行， ['js', 'css']中的异步执行
    runSequence('build:js', ['js', 'css'],
        function() {
            return gulp.src(['rev/**/*.json', 'src/app/*.jsp', 'src/app/*.html']) //文件的替换依赖于rev/**/*.json次路径下的json文件中的对应关系
                .pipe(plugins.revCollector({
                    replaceReved: true,
                    // dirReplacements: {
                    //     'css': '/dist/css', //前面的css是文件中的原始路径，后面的是替换后的路径。注释掉后，直接替换文件名，路径还是页面中原始的路径
                    //     'js': '/dist/js',
                    //     'cdn/': function(manifest_value) {
                    //         return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                    //     }
                    // }
                }))
                .pipe(plugins.htmlmin({
                    empty: true,
                    spare: true
                }))
                .pipe(gulp.dest('src/app/'));
        });
});

//发布，可添加发布任务（现在缺少）
gulp.task('default', ['replacePath']);

//开发
gulp.task('dev', ['dev:js'], function() {
    gulp.watch(['src/js/*.js', 'src/components/*.vue'], ['dev:js']);
    // gulp.watch('js/**/*.js', function(event) {//也可通过这种方式针对性的压缩改变的js、css
    //     console.log(event.type); //变化类型 added为新增,deleted为删除，changed为改变 
    //     console.log(event.path); //变化的文件的路径
    // });
});




/*
//用于在html文件中直接include文件
gulp.task('fileinclude', function(done) {
	gulp.src(['src/app/*.html'])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('dist/app'))
		.on('end', done);
	// .pipe(connect.reload())
});

//雪碧图操作，应该先拷贝图片并压缩合并css
gulp.task('sprite', ['copy:images', 'lessmin'], function(done) {
	var timestamp = +new Date();
	gulp.src('dist/css/style.min.css')
		.pipe(spriter({
			spriteSheet: 'dist/images/spritesheet' + timestamp + '.png',
			pathToSpriteSheetFromCSS: '../images/spritesheet' + timestamp + '.png',
			spritesmithOptions: {
				padding: 10
			}
		}))
		.pipe(base64())
		.pipe(cssmin())
		.pipe(gulp.dest('dist/css'))
		.on('end', done);
});




gulp.task('connect', function() {
	console.log('connect------------');
	connect.server({
		root: host.path,
		port: host.port,
		livereload: true
	});
});

gulp.task('open', function(done) {
	gulp.src('')
		.pipe(gulpOpen({
			app: browser,
			uri: 'http://localhost:3000/app'
		}))
		.on('end', done);
});
gulp.task('upload', function () {
  return gulp.src('dist/**')
  .pipe(ftp({
    host: '8.8.8.8',  // 远程主机ip
    port: 22,  // 端口
    user: 'username',  // 帐号
    pass: 'password',  // 密码
    remotePath: '/project'  // 上传路径，不存在则新建
  }))
  .pipe(gutil.noop())
})*/