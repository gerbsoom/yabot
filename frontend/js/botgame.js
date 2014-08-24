function setupUI()
{
    var viewConstructors = [generateHomeTabPanel(), generateAccountTabPanel(), generateGameTabPanel(),
                            generateBattlefieldTabPanel(), generateBotLabTabPanel(),
                            generateAdministrationTabPanel(), generateClosedTabPanel()
                           ];
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
    socket.emit("provideSessionKey", { loginName: getLoggedInUser(), sessionKey: _sessionKey });
    socket.on('echo', function (data) {
        console.log(data);
        showAtStatusConsole("Echo message from Server: " + data.state, false);
    });
    socket.on("PrivilegedChannel", function (data)
    {
        var message = "Websocket Game channel established";
        showAtStatusConsole(message, false);
        showAtGameConsole(getJoinedGame(), message, false);
    });
    socket.on("GameUpdate", function (data)
    {
        var message = "[" + data.botId + "] moves to (" + data.posX + "," + data.posY + ")";
        var gameName = getJoinedGame();
        showAtGameConsole(gameName, message, false);
        console.log("GameUpdate");
        drawBotAt(data.botId, new Coordinate(data.posX, data.posY), getCurrentBotPos(data.botId), getBattleFielData(getJoinedGame()));
    });
}
