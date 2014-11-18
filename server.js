//require http lib, create server with callback
var http = require('http');
var fs = require('fs');
server = http.createServer(requestHandler);
var url = require('url');
server.listen(4000);

console.log('server is listening on port 4000');

/////////////////////////
//  HTTP SECTION   //////
/////////////////////////
function requestHandler(request,response) {
	urlParse = url.parse(request.url);
    console.log("request from: " + urlParse.pathname);


    fs.readFile(__dirname + urlParse.pathname,
    	function (err,data) {
    		if (err) {
    			response.writeHead(500);
    			return response.end("Error loading" + urlParse.pathname);
    		}
    		response.writeHead(200);
    		response.end(data);
    	})
};

/////////////////////////
//  SOCKET.IO SECTION  //
/////////////////////////
var io = require('socket.io').listen(server);

var connectedSockets = [];

io.sockets.on('connection', function(socket) {
	console.log("There's a new client: " + socket.id);
	connectedSockets.push(socket);
});

/////////////////////////
//  WS SECTION   ////////
/////////////////////////
var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({port:3000});

var wsMessage;

console.log("Listening on port 3000");

wss.on('connection', function(ws){
	console.log("New connection");

	ws.on('message', function(message){
		//console.log("From Arduino: %s", message);
		io.sockets.emit('Event', message);
	})

})