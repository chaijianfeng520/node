

var http = require('http');
var path = require('path');
var fs = require('fs');
var template = require('art-template');


var server = http.createServer();

server.on('request', function(req, res) {
 
    var url = req.url;
  
    if (url === '/') {
      
        fs.readFile(path.join(__dirname, './data.json'), 'UTF-8', (err, dataStr) => {
            if (err) throw err;
           
            var heros = JSON.parse(dataStr);
            

            // var html = template(path.join(__dirname, 'views/index.html'), { list: heros });
        
            // res.end(html);
            render(res, 'index', { list: heros });
        })
    } else if (url === '/add') {
        // var html =template(path.join(__dirname,'/views.add.html'),{});
        // res.end(html);
        render(res, 'add', {});

    } else if (url.indexOf('/img/') === 0 || url.indexOf('/node_modules') === 0) {
        
        fs.readFile(path.join(__dirname, url), (err, data) => {
            if (err) {
                res.end('404');
            } else {
               
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


server.listen(3000, function() {
        console.log('server listen at http://127.0.0.1:3000')
    })
    
function render(res, filename, dataObj) {
    var html = template(path.join(__dirname, '/views/' + filename + '.html'), dataObj);
    res.end(html);
}
