function processCreateGame(_gameName, _gameWidth, _gameHeight, _gameNumPlayer)
{
    var userName = getLoggedInUser();
    var postData =
    {
        loginName : userName,
        gameName : _gameName,
        gameWidth : _gameWidth,
        gameHeight : _gameHeight,
        gameNumPlayer: _gameNumPlayer,
        controller : "game",
        action : "createGame"
    }
    doPostRequest(getServerUrl(), "POST", postData, "JSON", function(data)
    {
        if (checkResult(data))
        {
            handleCreateGame(data);
        }
    }, checkError);
}

function processJoinServerGame(_gameName)
{
    var userName = getLoggedInUser();
    var postData =
    {
        loginName : userName,
        gameName : _gameName,
        controller : "game",
        action : "joinGame"
    }
    doPostRequest(getServerUrl(), "POST", postData, "JSON", function(data)
    {
        if (checkResult(data))
        {
            handleJoinGame(data);
        }
    }, checkError);
}

function processDisconnectGame(_gameName)
{
    var userName = getLoggedInUser();
    var postData =
    {
        loginName : userName,
        gameName : _gameName,
        controller : "game",
        action : "disconnectGame"
    }
    doPostRequest(getServerUrl(), "POST", postData, "JSON", function(data)
    {
        if (checkResult(data))
        {
            handleDisconnectGame(data);
        }
    }, checkError);
}

function processDeleteGame(_gameName)
{
    var userName = getLoggedInUser();
    var postData =
    {
        loginName : userName,
        gameName : _gameName,
        controller : "game",
        action : "deleteGame"
    }
    doPostRequest(getServerUrl(), "POST", postData, "JSON", function(data)
    {
        if (checkResult(data))
        {
            handleDeleteGame(data);
        }
    }, checkError);
}

function processListServerGames()
{
    var userName = getLoggedInUser();
    var postData =
    {
        loginName : userName,
        controller : "game",
        action : "listGames"
    }
    doPostRequest(getServerUrl(), "POST", postData, "JSON", function(data)
    {
        if (checkResult(data))
        {
            handleListGames(data);
        }
    }, checkError);
}
