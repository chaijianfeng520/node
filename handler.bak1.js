var fs = require('fs');
var paht = require('path');

//导入自己封装的数据处理Model模块

var model = require('./model.js');

module.exports = {
    getIndexPage(req, res) {
        // 获取首页页面
        // 获取英雄列表数据
        // 1. 获取所有英雄数据
        // 2. 根据英雄数据，和 模板页面，渲染出最终的HTML字符串，然后把字符串 res.render();
        fs.readFile(path.join(__dirname, './data.json'), 'UTF-8', (err, dataStr) => {
            if (err) throw err;
            // 如何将 对象字符串 转换为 对象 
            var heros = JSON.parse(dataStr);
            res.render('index', { list: heros });
        })
    }
    getAddHeroPage(req, res) { // 获取添加英雄页面
        res.render('add', {}); // handler.js

    }
}