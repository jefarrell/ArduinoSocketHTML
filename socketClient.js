//  Connect Websocket server to our IP at port 3000
var Websocket = require("ws")
	, ws = new Websocket('ws://104.131.40.84:3000/');

ws.on('open', function() {
	ws.send("Hello Arduino");
});

var readline = require('readline');  
console.log("Hello again, Arduino");



//  Interface to read lines from Arduino
var lineReader = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal:false
});

//  When you get new lines from input
//  Send to output as confirmation on Arduino side
lineReader.on('line', function (data) {
		ws.send(data);
        console.log("you sent me: " + data);
});