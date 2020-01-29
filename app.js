const express = require('express');
const app = express();
const http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get('/', function(req, res){
    res.render('index');
});
  
io.on('connection', function(socket){
  console.log("client is connected");
    socket.on('chat message', function(msg){
      //this.socket.write("welcome new client");
      io.emit('chat message', msg);
    });
  });

http.listen(3000, function(){
  console.log('listening on *:3000');
});