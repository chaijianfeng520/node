var path = require('path');
// dist\css\home\index.css
// var result1 = path.join('dist', 'css', 'home', 'index.css');
var result1 = path.join('dist/abc/123', '../../css', 'home', 'index.css');


// template(__dirname + '');

dist/abc/css

// dist\abc\123\css\home\index.css
// dist\abc\css\home\index.css

console.log(result1);