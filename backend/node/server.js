var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var _redis = require("redis");
var redis = _redis.createClient();

app.listen(8080);

var clients = [];

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

io.on('connection', function (socket) {
    clients.push(socket);
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

incKey(1);

function cyclicRedisCheck()
{
    redis.get("test", function(error, result) {
        if (error) console.log('Error: '+ error);
        else
        {
            console.log('Name: ' + result);
            for (var i=0; i < clients.length; i++)
            {
                clients[i].emit('news', { hello: result });
            }
            incKey(parseInt(result) + 1);
        }
    });
}

function incKey(_value)
{
    redis.set('test', _value, function(error, result) {
        if (error) console.log('Error: ' + error);
        else console.log('Saved');
    });
}

setInterval(cyclicRedisCheck, 60000);

