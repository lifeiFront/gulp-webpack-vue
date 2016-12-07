# gulp-webpack-vue
## gulp结合webpack构建工具，vue+vue-router自动化构建部署工作流

### 一、安装好node、gulp、del等相关模块
1、npm install 安装依赖包文件

2、gulp dev 开发环境（在开发环境下用fiddler本地代理的方式进行调试开发）

3、gulp 线上环境


### 二、细节及注意事项说明：
1、项目基于gulp webpack构建工具构建的基于vue+vue-router的自动化构建部署模块化开发应用示例。单页应用及单页切换效果均有示例。

2、webpack构建的异步按需加载的js文件不能够再进行md5添加后缀，在进行gulp压缩添加后缀时要过滤掉。代码中有注释说明。

3、dist、rev目录是在执行构建任务时自动生成的，不是必须文件。

4、项目中ftp上传还有相关图片雪碧图类似的东西注释掉了。只是一个大概的用法，去掉注释也不可用，需要的自行根据项目需求进行更改。

5、项目中test.js入口文件中有关于按需异步加载模块js的写法。（不同的方式在我的为知笔记：“webpack打包工具 按需加载文件” 记录）

```大型的项目一般为多页应用，不会将全部功能放到一个单页中，会按照功能模块分隔成多个单页，可参照一下目录结构
[参考learnReact](http://ghosertblog.github.com)
├── package.json                 
├── README.md                    
├── gulpfile.js                  // gulp 配置文件
├── webpack.config.js            // webpack 配置文件
├── doc                          // doc  目录：放置应用文档
├── test                         // test 目录：测试文件
├── dist                         // dist 目录：放置开发时候的临时打包文件
├── bin                          // bin  目录：放置 prodcution 打包文件
├── mocks                        // 数据 mock 相关（模拟ajax返回数据）  可用fiddler替换
├── src                          // 源文件目录
│   ├── html                     // html 目录 
│   │   ├── index.html
│   │   └── page2.html
│   ├── js                       // js 目录 
│   │   ├── common               // 所有页面的共享区域，可能包含共享组件，共享工具类
│   │   ├── home                 // home 页面 js 目录
│   │   │   ├── components
│   │   │   │   ├── App.js
│   │   │   ├── index.js         // 每个页面会有一个入口，统一为 index.js
│   │   ├── page2                // page2 页面 js 目录
│   │   │   ├── components
│   │   │   │   ├── App.js
│   │   │   └── index.js
│   └── style                    // style 目录
│       ├── common               // 公共样式区域
│       │   ├── varables.less    // 公共共享变量
│       │   ├── index.less       // 公共样式入口
│       ├── home                 // home 页面样式目录    
│       │   ├── components       // home 页面组件样式目录
│       │   │   ├── App.less 
│       │   ├── index.less       // home 页面样式入口
│       ├── page2                // page2 页面样式目录
│       │   ├── components       
│       │   │   ├── App.less
│       │   └── index.less       
├── vendor                      //第三方js插件一块打包
│   └── bootstrap
└── └── jquery
``` 
### 参考：
[https://segmentfault.com/a/1190000006178770](https://segmentfault.com/a/1190000006178770)

[https://segmentfault.com/a/1190000003969465](https://segmentfault.com/a/1190000003969465)

[https://zhuanlan.zhihu.com/leanreact](https://zhuanlan.zhihu.com/leanreact)

