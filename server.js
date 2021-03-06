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

    case '/sound_control.js':
      fs.readFile('./js/sound_control.js', 'utf-8',
      function (err, data) {
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.write(data);
        response.end();
      });
      break;

    case '/atsumori.wav':
      fs.readFile('./atsumori.wav',
      function (err, data) {
        response.writeHead(200, {'Content-Type': 'audio/wav'});
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
    function(damage) {
      io.sockets.emit("SendOdai", {check: true, value: data.value});
      socket.broadcast.emit('ChangeAttack',{});
      socket.broadcast.emit('SendDamage',{damage: damage, user: "hp1"});
      io.sockets.to(socket.id).emit('SendDamage', {damage: damage, user:"hp2"});
    }, function(){
      io.sockets.to(socket.id).emit("SendOdai", {check: false});
    });
  });

  socket.on("result", function(){
    socket.broadcast.emit('winner',{});
  });
});


function asyncWordCheck(word){
  return new Promise(function(resolve, reject){
    var option = {
      url:`https://jlp.yahooapis.jp/KeyphraseService/V1/extract?appid=dj0zaiZpPU85N2RhcDV1MjlEayZzPWNvbnN1bWVyc2VjcmV0Jng9Yjg-&sentence=${encodeURI(word)}&output=json`,
      method : 'GET',
    };

    request(option, function (error, response, body) {
      var total = JSON.parse(body);
      if(total[word]){
        let damage = Math.floor(word.length * Math.random() * 500) + 500
        resolve(damage);
      }else{
        reject();
      }
    });
  });
}
