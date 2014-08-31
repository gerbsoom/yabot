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
            onHandleCreateGame(data);
        }
    }, checkError);
}

function onHandleCreateGame(_result)
{
    var parameters = _result.actionParameters;
    var gameName = parameters.gameName;
    if (addCreatedGame(gameName))
    {
        var createdGamesComboBox = document.getElementById("createdGamesComboBox");
        addItemToComboBox(createdGamesComboBox, "gameName");
    }
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
            onHandleDeleteGame(data);
        }
    }, checkError);
}

function onHandleDeleteGame(_result)
{
    var parameters = _result.actionParameters;
    var gameName = parameters.gameName;
    // notify all elements that display or store the game
    console.log("handleDeleteGame():" + gameName);
    showAtGameConsole("Game " + gameName + " successfully deleted", false);
    showAtGameConsole(getJoinedGame(), "Game " + gameName + " deleted");
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
            onHandleListGames(data);
        }
    }, checkError);
}

function onHandleListGames(_result)
{
    var data = _result.generatedData;
    var gameList = data.gameList;

    var serverGamesComboBox = document.getElementById("serverGamesComboBox");
    var createdGamesComboBox = document.getElementById("createdGamesComboBox");

    for (var i=0; i < gameList.length; i++)
    {
        addItemToComboBox(serverGamesComboBox, gameList[i]);
        addItemToComboBox(createdGamesComboBox, gameList[i]);
    }
    showAtGameConsole(getJoinedGame(), "GameList processed");
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
            onHandleJoinGame(data);
        }
    }, checkError);
}

function onHandleJoinGame(_result)
{
    var parameters = _result.actionParameters;
    var gameName = parameters.gameName;
    var data = _result.generatedData;
    var sessionKey = data.sessionKey;
    var numPlayer = data.numPlayer;
    var playerId = data.playerId;

    showAtGameConsole("gameName", "We are player number " + playerId + " of (" + numPlayer + ")", false);
    showAtGameConsole("gameName", "SessionKey=" + sessionKey, true);
    initWebSocketGameChannel(sessionKey);
    setGameSessionKey(sessionKey);
    setJoinedGame(gameName);
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
            onHandleDisconnectGame(data);
        }
    }, checkError);
}

function onHandleDisconnectGame(_result)
{
    var parameters = _result.actionParameters;
    var gameName = parameters.gameName;
    // notify all elements that display or store the game
    deleteJoinedGame();
    deleteGameSessionKey();
    showAtGameConsole("", "Disconnected from " + gameName, false);
    console.log("handleLeaveGame(): Need cleanup");
}
