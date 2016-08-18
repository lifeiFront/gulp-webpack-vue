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
        exclude: /node_modules/
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
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
