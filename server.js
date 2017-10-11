var request = require('request');
var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer();
server.on('request', CheckEndPoint);
var io = require('socket.io').listen(server);
server.listen(8000);
console.log('Server Running at http://localhost:8000');

function CheckEndPoint(request, response){
  let endpoint = url.parse(request.url,true);

  switch(endpoint.pathname){
    case '/':
      fs.readFile('./index.html','utf-8',
      function(err,data){
        response.writeHead(200,{'Content-Type':'text/html'});
        response.write(data);
        response.end();
      });
      break;

    case '/index.css':
      fs.readFile('./css/index.css', 'utf-8',
      function (err, data) {
        response.writeHead(200, {'Content-Type': 'text/css'});
        response.write(data);
        response.end();
      });
      break;

    case '/main.js':
      fs.readFile('./js/main.js', 'utf-8',
      function (err, data) {
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.write(data);
        response.end();
      });
      break;

    case '/canvas.js':
      fs.readFile('./js/canvas.js', 'utf-8',
      function (err, data) {
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.write(data);
        response.end();
      });
      break;

    case '/Discriminant.js':
      fs.readFile('./js/Discriminant.js', 'utf-8',
      function (err, data) {
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.write(data);
        response.end();
      });
      break;

    case '/socket.js':
      fs.readFile('./js/socket.js', 'utf-8',
      function (err, data) {
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.write(data);
        response.end();
      });
      break;

    case '/favicon.ico':
      fs.readFile('./favicon.ico', '',
        function(err,data){
          if(err){
            console.log(err);
          }
          response.writeHead(200, {'Content-Type': 'image/x-icon'});
          response.write(data);
          response.end();
        });
        break;

    default:
      response.writeHead(400, {'Content-Type':'text/html', 'charset':'UTF-8'});
      response.write('<h1 style="text-align:center">400 Bad Request</h1>');
      response.end();
      break;
  }
}

io.sockets.on('connection', function(socket){
  socket.emit('greeting', {message: 'hello'}, function(data){
    console.log(data);
  });

  socket.on("attack", function(data) {
    asyncWordCheck(data.value).then(
    function() {
      io.sockets.emit("SendOdai", {check: true, value: data.value});
      socket.broadcast.emit('ChangeAttack',{});
    }, function(){
      io.sockets.emit("SendOdai", {check: false});
    });
  });
});


//https://ja.wikipedia.org/w/api.php?format=xml&action=query&list=search&srsearch= コレが優秀か?
function asyncWordCheck(word){
  return new Promise(function(resolve, reject){
    var option = {
      url : `https://ja.wikipedia.org/w/api.php?format=json&action=query&list=search&srsearch=${encodeURI(word)}`,
      method : 'GET',
    };

    request(option, function (error, response, body) {
      var pp = JSON.parse(body);
      var searchtotal = pp.query.searchinfo.totalhits;
      if(searchtotal > 0){
        resolve();
      }else{
        reject();
      }
    });
  });
}
