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
      socket.broadcast.emit('chat message', msg);
    });

    socket.on('join', name => {
      socket.name = name;
      socket.broadcast.emit('join', name);
    })
  });

  if(`development`) {
    http.listen(4000, function(){
  console.log('server listening on port 3000');
});
  } else{
    http.listen(process.env.PORT, process.env.IP);
  }
/*http.listen(4000, function(){
  console.log('server listening on port 3000');
}); */

