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
      fs.readFile('./test.html','utf-8',
      function(err,data){
        response.writeHead(200,{'Content-Type':'text/html'});
        response.write(data);
        response.end();
      });
      break;

    case '/test.css':
      fs.readFile('./test.css', 'utf-8',
      function (err, data) {
        response.writeHead(200, {'Content-Type': 'text/css'});
        response.write(data);
        response.end();
      });
      break;

    case '/test.js':
      fs.readFile('./test.js', 'utf-8',
      function (err, data) {
        response.writeHead(200, {'Content-Type': 'text/javascript'});
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
