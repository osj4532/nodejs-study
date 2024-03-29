var http = require('http');
var url = require('url');
var fs = require('fs');

var app = http.createServer((request, response) => {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/'){
      if(queryData.id === undefined){
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var template = setTemplate(title, description);
        response.writeHead(200);
        response.end(template);
      }else{
        var title = queryData.id;
        fs.readFile(`data/${title}`, 'utf8', (err, description)=>{
          var template = setTemplate(title, description);
          response.writeHead(200);
          response.end(template);
        });
      }
    }else{
      response.writeHead(404);
      response.end('Not Found');
    }

    
    
    
});

app.listen(3000);

function setTemplate(title, description){
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
              <li><a href="/?id=HTML">HTML</a></li>
              <li><a href="/?id=CSS">CSS</a></li>
              <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ol>
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `;
    return template;
}