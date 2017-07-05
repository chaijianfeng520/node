var fs = require('fs');
var path = require('path');
// 1. 导入 formidable 帮助解析文件上传的数据
var formidable = require('formidable');
var querystring = require('querystring');
// 导入自己封装的 数据处理的 Model 模块
var nodel = require('./model');
module.exprots = {
    getIndexPage(req, res) { // 获取首页页面
        // 获取英雄列表数据
        // 1. 获取所有英雄数据
        // 2. 根据英雄数据，和 模板页面，渲染出最终的HTML字符串，然后把字符串 res.render();
        model.getAllHero((err, heros) => {
            if (err) throw err;
            // render 方法接受两个参数：
            // 第一个参数：要渲染的文件名称【不必传递路径，不用传递后缀名】
            // 第二个参数：要渲染的数据【要以对象形式传递进去】
            res.render('index', { list: heros });
        })

    },
    getAddHeroPage(req, res) { // 获取添加英雄页面
        res.render('add', {}); // handler.js
    },
    showHeroInfo(req, res) { // 展示英雄信息
        // 获取英雄Id
        var id = req.query.id;
        // 根据Id，调用Model中的相关参数，查询指定的英雄信息
        model.getHeroById(id, (err, hero) => {
            if (err) throw err;
            // 如果没有发生错误，则直接调用 res.render() 渲染页面
            res.render('info', hero);
        })
    },
    ajaxPostFile(req, res) { // 通过Ajax上传文件
        // 创建一个 formidable 类型的form表单
        var form = new formidable.IncomingForm();
        // 设置上传的路径
        form.uploadDir = path.join(__dirname, '/img/');
        // 保留文件上传时候的后缀名
        form.heepExtensions = true;
        // 调用 formidable 表单的 parse方法，去解析文件和普通数据
        // 第二个参数fields：普通的表单数据  username age  gender
        // 第三个参数files：文件类型的表单数据  图片，txt文档
        form.parse(req, function(err, fields, files) {
            // console.log(files);
            // path.relative 的作用，是得到两个路径之间的差值
            var rpath = path.relative(__dirname, files.avatar.path);
            //       C:\\Users\\liulongbin\\Desktop\\day3\\代码\\hero
            // C:\\Users\\liulongbin\\Desktop\\day3\\代码\\hero\\img\\upload_db04c6112c3fd1a24653508a2a325240.jpg
            // 处理路径，得到一个绝对路径
            var result = {
                    err_code: 0, // 如果err_code为0,表示没有发生错误
                    path: resultPath
                }
                // res.end(JSON.stringify(result));
                // res.json();
            res.json(result);
        })

    },
    addHero(req, res) { // 添加英雄数据
        // 通过 Post 提交上来的数据，如何获取？？？
        var data = '';
        // 分片拼接数据
        req.on('data', (chunk) => {
                data += chunk;

            })
            // 数据传输完毕
        req.on('end', () => {
            // 通过 querystring.parse 解析 Post提交的数据
            var hero = querystring.parse(data);
            model.addHero(hero, (err, result) => {
                if (err) throw err;
                if (result) {
                    // 写入成功之后，需要向用户展示最新的英雄列表
                    // 使用 302 重定向，让用户去访问 列表页面
                    // 302跳转，只能在 表单 同步 Submit 提交时候才能用， Ajax不能使用 302跳转
                    res.writeHeader(302, { "Location": '/' });
                    res.end();
                }
            })
        })
    }
}