var fs = require('fs');
var path = require('path');
// Model 模块的主要作用是：处理英雄数据的增删改查


// 获取所有的英雄数据
function getAll(callback) {
    // 异步方法中，如果想往外 返回数据，只能使用 callback 回调函数 
    fs.readFile(path.join(__dirname, './data.json'), 'UTF-8', (err, dataStr) => {
        // 当方法内部发生错误的时候，直接调用 callback 将错误对象传递给用户，让用户去决定如何处理这个错误！
        // 当报错之后，我们要切断后续代码的执行，所以在调用 callback(err) 完毕后，需要退出当前代码
        if (err) return callback(err);
        var heros = JSON.parse(dataStr);
        callback(null, heros);
    })
}
// 将最新的英雄，写入到 data.json
function writeAll(heros, callback) {
    fs.writeFile(path.join(__dirname, './data/json'), JSON.stringify(heros), (err) => {
        if (err) return callback(err);
        callback(nill, true);
    })
}

module.exports = {
    getAllHero(callback) { // 获取所有的英雄数据
        getAll(callback);

    },
    getHeroById(id, callback) { // 根据Id获取指定的英雄数据
        // 获取所有的英雄数据，拿到数组
        // 循环遍历每一个英雄，比较Id和用户传递的Id是否相同，如果相同了，则表示找到了对应的英雄数据，返回即可
        getAll((err, heros) => {
            if (err) return callback(err);
            // 循环每一个英雄对象，将当前循环的英雄Id 和  用户传递的Id比较
            heros.some(hero => {
                if (hero.id === parseInt(id)) {
                    // 如果Id相同，则直接调用 callback 把数据返回给用户去处理
                    callback(null, hero);
                    // 在数组的some方法中，如果return true,表示立即结束循环！
                    return true;
                }
            })
        })

    },
    addHero(hero, callback) { // 添加英雄
        // 先读取 data.json，获取所有的英雄数组，然后，把新添加的英雄，push进去
        getAll((err, heros) => {
            // 先解决Id的问题
            var newId = 0;
            // 通过 forEach 查找到最大的Id 
            heros.forEach(item => {
                if (item.id > newId) {
                    newId = item.id;
                }
            });
            newId++;
            hero.id = newId;
            // 拿到最新的英雄数组
            heros.push(hero);
            // 写入数据成功之后，需要把 写入的结果传递给用户，
            writeAll(heros, callback);
        })
    },
    deleteHeroById() {} // 根据Id删除指定的英雄数据
}