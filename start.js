var http = require('http');
var cmd_server = require('./lib/cmd_server');
var fs = require('fs');
var mime = require('mime');
var path = require('path');

var s = http.createServer(onRequest);

s.listen(8888);
console.log("Server has started.");
cmd_server.listen(s);

function onRequest(request, response) {
    var filePath = false;

    if(request.url == '/'){
        filePath = './index.html';
    }
    else {
        filePath = './'+request.url;
    }
    serveFile(filePath, response);
}

function serveFile(filePath, response) {
     fs.exists(filePath, function (){
             fs.readFile(filePath, function(err, data) {
                response.writeHead(200, {"content-type": mime.lookup(path.basename(filePath))});
                 response.end(data);
              })
     });
 }

