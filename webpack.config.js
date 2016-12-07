var path = require('path')
var webpack = require('webpack')
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var fs = require('fs');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;//js压缩插件
//process.cwd()：根路径比如D:\gulp_webpack   srcDir:D:\gulp_webpack\src
var srcDir = path.resolve(process.cwd(), 'src');
var publicPath = path.resolve(process.cwd(), 'dist');//应用绝对路径
module.exports = {
  entry: getEntry(),//js文件夹下的文件均是入口文件
  output: {
    path: path.resolve(__dirname, 'dist/js/'),
    publicPath: publicPath+'/js/',//用于配置文件发布路径，如CDN或本地服务器。异步加载的模块或者js生成的单独文件引入路径均是相对于publicPath
    filename: '[name].js',//入口文件命名
    chunkFilename: "async_[name]-[chunkhash:8].js"//异步加载模块命名
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        // query: {//加上次条件后，在样式中引入的图片引入路径存在问题
        //   limit: 10000,
        //   name: '[name].[ext]?[hash]'
        // }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: 'cheap-module-source-map'//设置此参数，可看到文件中引用的.vue对应的源js文件，方便调试，不设置只能看到一个打包后的js文件.
}

/*if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({//上线后的devtool要配置为source-map,有时候为了性能考虑，一定要配置这个插件
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
            warnings: false
        },
        sourceMap: true,//这里的soucemap 不能少，可以在线上生成soucemap文件，便于调试
        mangle: true
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}*/
//返回入口文件对象，src/js目录下的所有js文件均为入口文件。
function getEntry() {
    var jsPath = path.resolve(srcDir, 'js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'js', item);
        }
    });
    return files;
}
/*参考资料*/
// 用node的glob对象获取入口文件（仅做参考）
// const glob = require('glob');
// var files = glob.sync('./src/js/*/index.js');//nodejs中的文件路劲读取
// var newEntries = files.reduce(function(memo, file) {
//     var name = /.*\/(.*?)\/index\.js/.exec(file)[1];
//     memo[name] = entry(name);
//     return memo;
// }, {});
// config.entry = Object.assign({}, config.entry, newEntries);
// /**
//  * [entry description]
//  * @param  {[type]} name [description]
//  * @return {[type]}      [description]
//  */
// function entry(name) {
//     return './src/js/' + name + '/index.js';
// }

// var webpack = require('webpack');
// var BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');
// module.exports = {
// 	entry:{
// 		index:['./src/index.js','./src/style.css'],//通过配置方式将index.js与style.css融合到生成的index.js文件中
// 		a:'./src/a.js',
// 		vendor:[
// 		'react',
// 		'react-dom'
// 		]
// 	},
// 	output:{
// 		path:'./dist/',
// 		filename:'[name].js',
// 		//webpack-dev-server 的打包结果是放在内存的，查看 dist/index.js 的内容实际上是没有改变的
// 		publicPath: '/dist'// webpack-dev-server 启动目录是  `/`, `/dist` 目录是打包的目标目录相对于启动目录的路径
// 	},
// 	module:{
// 		loaders:[{
// 			test:/\.js$/,
// 			exclude:/node_modules/,
// 			loader:'babel',
// 			query:{
// 				presets:['es2015','stage-0','react']
// 			}
// 		},{
// 			test:/\.css$/,
// 			loader:"style-loader!css-loader"
// 		}]
// 	},
// 	devServer: {
// 	  hot: true,
// 	  inline: true
// 	},
// 	plugins: [
// 	   new BellOnBundlerErrorPlugin(),
// 	   new webpack.HotModuleReplacementPlugin(),//此模块用于热加载，检测源代码变化，自动执行webpack打包命令，自动刷新页面（之前测试webpack服务自动刷新报错，就是因为没有引入此插件）
// 	   new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= 可以添加hash值[hash].bundle.js*/"vendor.bundle.js",Infinity),//将业务代码与第三方代码分离插件
// 	  ]
// eslint: {//eslint代码检查规则
//         configFile: './.eslintrc'
//     }
// };


/**
 * webpack 配置字段说明
 */
//webpack 的配置中主要的两个配置 key 是，entry 和 output。
// {
//     entry: [String | Array | Object], // 入口模块
//     output: {
//         path: String,      // 输出路径
//         filename: String   // 输出名称或名称 pattern
//         publicPath: String // 指定静态资源的位置
//         ...                // 其他配置
//     }
// }


// 上面的例子中都是打包出一个 index.js 文件，如果项目有多个页面，那么需要打包出多个文件，webpack 可以用对象的方式配置多个打包文件

// {
//   entry: {
//     index: './src/index.js',
//     a: './src/a.js'
//   },
//   output: {
//     path: './dist/',
//     filename: '[name].js' 
//   }
// }
