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
    socket.on('news', function (data) {
        console.log(data);
        showAtStatusConsole("Message from Server: " + data.hello, false);
        socket.emit('my other event', { my: 'data' });
    });

    /*var connection = new WebSocket('ws://localhost:8080/', ["soap"]);
    connection.onopen = function () { connection.send('Ping'); // Send the message 'Ping' to the server  };
    connection.onerror = function (error) { console.log('WebSocket Error ' + error); };
    connection.onmessage = function (e) { console.log('Server: ' + e.data); showAtStatusConsole("Message from WebSocket Server: " + e.data + "!!!", true); };*/
}
