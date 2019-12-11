var http = require('http');
var url = require('url');
var fs = require('fs');

var app = http.createServer((request, response) => {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    console.log(queryData);
    if(_url == '/'){
        title = 'Welcome';
    }

    if(_url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }

    response.writeHead(200);
    fs.readFile(`data/${title}`, 'utf8', (err, data)=>{
      var description = data;
      var template = `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <ol>
        <li><a href="1.html?id=HTML">HTML</a></li>
        <li><a href="2.html?id=CSS">CSS</a></li>
        <li><a href="3.html?id=JavaScript">JavaScript</a></li>
      </ol>
      <h2>${title}</h2>
      <p>${description}</p>
    </body>
    </html>
    `;
    response.end(template);
    });
    
    
});

app.listen(3000);