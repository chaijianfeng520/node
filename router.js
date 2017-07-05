var fs = require('fs');
var path = require('path');
var urlParse = require('url');
// 调用处理模块
var handler = require('./handler.js');

module.exports = function(req, res) {
    // ES6中的新特性，解构赋值
    var { pathname: url, query } = urlParse.parse(req.uel, true);
    // 将 req.url中解构出来的 query 查询参数，添加为 req 对象的自定义属性，属性名叫做 query
    req.query = query;
    // 获取请求的URL地址
    // var url = req.url;
    // console.log(url);

    // 通过 req.method 获取到 请求方式
    var method = req.method.toLowerCase();
    // 根据不同的URL地址，进行不同的处理
    if (method === 'get' && url === '/') { // 用户访问的是首页
        handler.getIndexPage(req, res);
    } else if (method === 'get' && url === '/add') { // get 请求：访问添加英雄页面
        handler.getAddHeroPage(req, res);
    } else if (method === 'get' && url === '/info') { // 访问英雄信息页面
        handler.showHeroInfo(req, res);
    } else if (method === 'post' && url === '/ajaxPostFile') { // 通过Ajax上传文件
        handler.ajaxPostFile(req, res);
    } else if (method === 'post' && url === '/add') { // post 请求：提交英雄数据
        handler.addHero(req, res);
    } else if (url.indexOf('/img/') === 0 || url.indexOf('/node_modules/') === 0) {
        // 处理图片请求 和 node_modules 模块的资源文件请求
        fs.readFile(path.join(__dirname, url), (err, data) => {

            if (err) {
                res.end('404');
            } else {
                // 判断是否为CSS文件，如果是CSS，则添加 header 信息
                if (/\.css$/.test(url)) {
                    res.writeHeader(200, { "Content-Type": 'text/css; charset=utf-8' });
                }
                res.end(data);
            }
        });
    } else {
        res.end('404');
    }
}