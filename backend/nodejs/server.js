// Stores the available session keys together with the unique user login as index
var sessionKeys;
// hold clients that have joined a game to populate updates to them
var clients = [];
var redisSessionKey = "botgame/gameSessionKeys";

var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

var redis = require("redis")
    , subscriber = redis.createClient()
    , publisher = redis.createClient();

app.listen(8080);

subscriber.on("message", function(channel, message)
{
    console.log("Message '" + message + "' on channel '" + channel + "' arrived!")
});

subscriber.subscribe("botgame/update/gameSessionChannel");
subscriber.subscribe("botgame/update/gameFieldDataChannel");

publisher.subscribe("botgame/update/connectionChannel");

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

io.on('connection', function (socket)
{
    console.log("Connection coming in...");
    reloadSessionKeys();
    // normal operation is to echo alive state and wait for a 'provideSessionKey' challenge
    socket.emit('echo', { state: "alive" });
    // check if the client has a valid session key to be added in clients
    socket.on("provideSessionKey", function (data)
    {// check for a valid session key to establish a new channel
        if (sessionKeys && sessionKeys[data.loginName] === data.sessionKey)
        {
            clientData = {
                "socket" : socket,
                "loginName" : data.loginName,
                "sessionKey" : data.sessionKey
            }
            clients.push(clientData);
            console.log("Privileged client channel is established");
            socket.emit('PrivilegedChannel', { state: "established" });
        }
        else
        {
            console.log("Unknown or invalid session key: " + data.sessionKey + " for user: " + data.loginName);
            console.log(sessionKeys);
        }
    });
});

function reloadSessionKeys()
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
}

function checkGameDataChanges()
{
    var socket;
    for (var i=0; i < clients.length; i++)
    {
        socket = clients[i].socket;
        var posX, posY;
        posX = Math.floor((Math.random() * 15) + 1);
        posY = Math.floor((Math.random() * 15) + 1);
        console.log("Bot  'bot1' should move to " + posX + "x" + posY);
        socket.emit("GameUpdate", { botId: "bot1", posX: posX, posY: posY });
    }
}

setInterval(reloadSessionKeys, 2500);
setInterval(checkGameDataChanges, 500);
