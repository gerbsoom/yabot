var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

var redis = require("redis");
//var redisutil = require('./myredisutil.js');
var redisSessionKey = "botgame/sessionKeyHash";

// this one is hardcoded for now
app.listen(8080);

// we offer an echo service and also do gently greet arbitrary websocket clients
function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

// for clients that have joined a game and added a bot
// battlefield changes will be populated to all clients
var clients = [];

// Stores the available session keys together with the unique user login as index
// on validated user requests we will trigger the corresponding methods and return
var sessionKeys;

io.on('connection', function (socket)
{
    console.log("Connection coming in...");
    cyclicRedisCheckSet();
    // normal operation is to echo alive state and wait for a 'provideSessionKey' challenge
    socket.emit('echo', { state: "alive" });
    // check if the client has a valid session key to be added in clients
    if (false)
    {// maybe this will only work with a specific 'provideSessionKey'-Event
        console.log("Socket added");
        clients.push(socket);
    }
    socket.on("provideSessionKey", function (data)
    {// check for a valid session key to establish a new channel
        console.log(data.sessionKey);
        if (sessionKeys[data.loginName] === data.sessionKey)
        {
            clients.push(socket);
            console.log("Privileged client channel is established");
            socket.emit('PrivilegedChannel', { state: "established" });
        }
        else console.log("Unknown or invalid session key");
    });
});

function cyclicRedisCheckSet()
{
    var client = redis.createClient();
    client.hgetall(redisSessionKey, function (err, obj) {
        if (obj == undefined || !obj || obj == null || obj == 'undefined')
        {
            console.log("Prevent session keys from beeing destroyed");
        }
        else sessionKeys = obj;
    });
    client.quit();
    //console.dir(sessionKeys);
}

setInterval(cyclicRedisCheckSet, 2500);
