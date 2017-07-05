var url = require('url');

var result = url.parse('http://127.0.0.1:3000/info?id=1&age=20', true);

console.log(result);