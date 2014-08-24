function setupUI()
{
    var viewConstructors = [generateHomeTabPanel(), generateAccountTabPanel(), generateGameTabPanel(), generateBattlefieldTabPanel(), generateBotLabTabPanel(), generateAdministrationTabPanel()];
    var pages = ["Home", "Account", "Game", "Battlefield", "Botlab", "Administration"];

    var navigation = generateNavigation(generateNavigationConfigArray(pages));
    var headerPanel = addClassAndId(generateHeader(), null, "headerPanel");
    var contentPanel = generateDiv("contentPanel", "contentPanel");

    addElementToComponent(document.body, contentPanel);
    addElementToComponent(contentPanel, headerPanel);
    addElementToComponent(contentPanel, navigation);

    for (var i=0; i<viewConstructors.length; i++)
    {
        addNavItem(viewConstructors[i]);
    }
    showTabPanel(0);
}

function initWebSocket()
{
    var socket = io('http://localhost:8080');
    socket.on('echo', function (data)
    {// websocket is reachable
        showAtStatusConsole("Echo message from Server: " + data.state, false);
    });
    /*var connection = new WebSocket('ws://localhost:8080/', ["soap"]);
    connection.onopen = function () { connection.send('Ping'); // Send the message 'Ping' to the server  };
    connection.onerror = function (error) { console.log('WebSocket Error ' + error); };
    connection.onmessage = function (e) { console.log('Server: ' + e.data); showAtStatusConsole("Message from WebSocket Server: " + e.data + "!!!", true); };*/
}

function initWebSocketGameChannel(_sessionKey)
{
    var socket = io('http://localhost:8080');
    socket.on('echo', function (data) {
        console.log(data);
        showAtStatusConsole("Echo message from Server: " + data.state, false);
        socket.emit("provideSessionKey", { loginName: getLoggedInUser(), sessionKey: _sessionKey });
    });
    socket.on("PrivilegedChannel", function (data)
    {
        showAtStatusConsole("Websocket Game channel established", false);
        // we are allowed to execute new command to explore the battlefield and fight other bots
    });
}

function startWorker()
{
    if (workerSupport())
    {
       /** w = new Worker("http://localhost/botgame/frontend/js/lib/worker/testworker.js");
        var theWorker = new Worker ("web-worker.js");
        theWorker.addEventListener ("message", onMessage, true);
        theWorker.addEventListener ("error", onError, true);

        // Daten, die wir an den Worker übergeben
        var data = "Ein Hallo von Worker ";
        theWorker.postMessage(data);*/
    }
    else console.log("Webworker not supported!");
}
