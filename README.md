# gulp-webpack-vue<br>
gulp结合webpack构建工具，vue+vue-router自动化构建部署工作流<br>

安装好node、gulp、del等相关模块<br>
1、npm install 安装依赖包文件<br>
2、gulp dev 开发环境<br>
3、gulp 线上环境<br>

细节及注意事项说明：<br>
1、项目基于gulp webpack构建工具构建的基于vue+vue-router的自动化构建部署模块化开发应用示例。单页应用及单页切换效果均有示例。<br>
2、webpack构建的异步按需加载的js文件不能够再进行md5添加后缀，在进行gulp压缩添加后缀时要过滤掉。代码中有注释说明。<br>
3、dist、rev目录是在执行构建任务时自动生成的，不是必须文件。<br>
4、项目中ftp上传还有相关图片雪碧图类似的东西注释掉了。只是一个大概的用法，去掉注释也不可用，需要的自行根据项目需求进行更改。<br>
5、项目中test.js入口文件中有关于按需异步加载模块js的写法。（不同的方式在我的为知笔记：“webpack打包工具 按需加载文件” 记录）
