// 项目的入口文件
// 导入 http 内置模块
var http = require('http');
// 导入自定义的 router 模块作用：根据不同的URL请求地址，分发不同的请求
var router = require('./router.js');
// 导入自定义的 render 模块，作用：为 res 对象添加自定义的 render 函数，方便我们 通过模板引擎 直接渲染数据
var bindRender = require('./render.js');
// 创建一个 http 服务器
var server = http.createServer();
// 监听 http 服务器的 request 请求
server.on('request', function(req, res) {
    // 每当有新请求过来的时候，自动调用  bindRender ，为 当前的 res 对象，追加一个自定义的方法，方法名叫做 render
    bindRender(res);
    router(req, res);
});

// 指定端口号并启动服务器监听
server.listen(3001, function() {
    console.log('server listen at http://127.0.0.1:3001');
});