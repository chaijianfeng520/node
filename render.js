var path = require('path');
var template = require('art-template');
// 为 传递进来的 res 对象，绑定 render 函数，用来渲染模板页面
module.exports = function(res) {
    res.render = function(filename, dataObj) {
        var html = template(path.join(__dirname, 'views/' + filename + '.html'), dataObj);
        // 通过 res.end 把HTML 返回
        this.end(html);
    }
    res.json = function(dataObj) { // 手动封装一个向客户端发送JSON数据的方法
        console.log(JSON.stringify(dataObj));
        this.end(JSON.stringify(dataObj));

    }
}