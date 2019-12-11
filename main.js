var http = require('http');
var fs = require('fs');

var app = http.createServer((request, response) => {
    var url = request.url;
    if(url == '/'){
        url = '/index.html';
    }

    if(url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }

    response.writeHead(200);
    //보여주는 데이터
    response.end(fs.readFileSync(__dirname + url));
});

app.listen(3000);