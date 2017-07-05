//项目的入口文件

//导入HTTP 内置模块

var http = require('http');
var path = require('path');
var fs = require('fs');
var template = require('art-template');

//创建一个HTTP服务器
var server = http.createServer();
//监听http服务器的request请求
server.on('request', function(req, res) {
    //获取url的地址
    var url = req.url;
    //根据不同的url 地址,进行不同的处理
    if (url === '/') {
        //用户访问的是首页
        //获取英雄列表数据
        fs.readFile(path.join(__dirname, './data.json'), 'UTF-8', (err, dataStr) => {
            if (err) throw err;
            //如何将对象字符串转换为对象
            var heros = JSON.parse(dataStr);
            //根据模板引擎 渲染制定的首页模板文件 得到最终的HTML字符串

            // var html = template(path.join(__dirname, 'views/index.html'), { list: heros });
            //通过res.end把HTML返回
            // res.end(html);
            render(res, 'index', { list: heros });
        })
    } else if (url === '/add') { //访问添加英雄页面
        // var html =template(path.join(__dirname,'/views.add.html'),{});
        // res.end(html);
        render(res, 'add', {});

    } else if (url.indexOf('/img/') === 0 || url.indexOf('/node_modules') === 0) {
        //处理图片请求和node_modules模块的资源文件请求
        fs.readFile(path.join(__dirname, url), (err, data) => {
            if (err) {
                res.end('404');
            } else {
                //判断是否为CSS文件 如果是CSS 则添加header 信息
                if (/\.css$/.test(url)) {
                    res.writeHeader(200, { "Content-Type": 'text/css;charset=UTF-8' });
                }
                res.end(data);
            }
        })
    } else {
        res.end('404')
    }
})

//指定端口号并启动服务器监听
server.listen(3000, function() {
        console.log('server listen at http://127.0.0.1:3000')
    })
    //封装渲染页面数据的render函数
function render(res, filename, dataObj) {
    var html = template(path.join(__dirname, '/views/' + filename + '.html'), dataObj);
    res.end(html);
}