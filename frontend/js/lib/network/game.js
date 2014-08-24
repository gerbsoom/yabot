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

function processAddBotToServerGame(_gameName, _botId)
{
    var userName = getLoggedInUser();
    var botId = "test";
    var postData =
    {
        loginName : userName,
        gameName : _gameName,
        botId:    botId,
        controller : "game",
        action : "addBot"
    }
    doPostRequest(getServerUrl(), "POST", postData, "JSON", function(data)
    {
        if (checkResult(data))
        {
            handleAddBot(data);
        }
    }, checkError);
}

function processGetGameInfo(_gameName)
{
    var userName = getLoggedInUser();
    var postData =
    {
        loginName : userName,
        gameName : _gameName,
        controller : "game",
        action : "gameInfo"
    }
    doPostRequest(getServerUrl(), "POST", postData, "JSON", function(data)
    {
        if (checkResult(data))
        {
            handleJoinGame(data);
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
