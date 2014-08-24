function handleJoinGame(_result)
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

function handleCreateGame(_result)
{
    var parameters = _result.actionParameters;
    var gameName = parameters.gameName;
    if (addCreatedGame(gameName))
    {
        var createdGamesComboBox = document.getElementById("createdGamesComboBox");
        addItemToComboBox(createdGamesComboBox, "gameName");
    }
}

function handleDisconnectGame(_result)
{
    var parameters = _result.actionParameters;
    var gameName = parameters.gameName;
    // notify all elements that display or store the game
    deleteJoinedGame();
    deleteGameSessionKey();
    showAtGameConsole("", "Disconnected from " + gameName, false);
    console.log("handleLeaveGame(): Need cleanup");
}

function handleDeleteGame(_result)
{
    var parameters = _result.actionParameters;
    var gameName = parameters.gameName;
    // notify all elements that display or store the game
    console.log("handleDeleteGame():" + gameName);
    showAtGameConsole("Game " + gameName + " successfully deleted", false);
    showAtGameConsole(getJoinedGame(), "Game " + gameName + " deleted");
}

function handleListGames(_result)
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

function addItemToComboBox(_comboBox, _gameName)
{
    for (var i=0; i < _comboBox.options.length; i++)
    {
        var entry = _comboBox.options[i];
        if (entry.text == _gameName)
        {
            console.log("Skip adding redundant entry " + _gameName);
            return null;
        }
    }
    _comboBox.options[_comboBox.options.length] = new Option(_gameName, 0);
    return true;
}
