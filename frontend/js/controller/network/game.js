/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

/**
 * Contains all game-related backend calls.
 *
 * Each backend call uses 'checkResult' to check if the server returned an error.
 * In the case of a backend error, 'checkError' is called to parse for more details.
 * Otherwise the success callback 'onHandle<ActionName>' is invoked to process the response.
 *
 * toDo: Parameter serverUrl should be added to all methods and made optionally
 */

/**
 * Executes the AJAX-Request 'createGame'.
 *
 * @param _gameName The name of the game that gets created.
 * @param _gameWidth The width of the game that gets created.
 * @param _gameHeight The height of the game that gets created.
 * @param _gameNumPlayer The amount of allowed players in the game.
 */
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

/**
 * Callback which gets triggered for successful 'createGame' calls.
 *
 * Adds the created to local storage and the createdGamesComboBox.
 *
 * @param _result Contains the server response.
 */
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

/**
 * Executes the AJAX-Request 'deleteGame'.
 *
 * @param _gameName The name of the game that gets deleted.
 */
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

/**
 * Callback which gets triggered for successful 'deleteGame' calls.
 *
 * Logs on several channels.
 *
 * @param _result Contains the server response.
 */
function onHandleDeleteGame(_result)
{
    var parameters = _result.actionParameters;
    var gameName = parameters.gameName;
    // notify all elements that display or store the game
    console.log("handleDeleteGame():" + gameName);
    showAtGameConsole("Game " + gameName + " successfully deleted", false);
    showAtGameConsole(getJoinedGame(), "Game " + gameName + " deleted");
}

/**
 * Executes the AJAX-Request 'listGames'.
 */
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

/**
 * Callback which gets triggered for successful 'listGames' calls.
 *
 * Adds the retrieved entries to the serverGame- and createdGamesComboBox.
 *
 * @param _result Contains the server response.
 */
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

/**
 * Executes the AJAX-Request 'joinGame'.
 *
 * @param  _gameName The name of the game that gets joined.
 */
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

/**
 * Callback which gets triggered for successful 'joinGame' calls.
 *
 * Displays the returned values on the game console, sets the game session key and the joined game.
 * Tries to establish the websocket connections with the nodejs server using the returned game session key.
 *
 * @param _result Contains the server response.
 */
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

/**
 * Executes the AJAX-Request 'disconnectGame'.
 *
 * toDo: The established websocket connection should be also disconnected here.
 *
 * @param  _gameName The name of the game that gets disconnected.
 */
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

/**
 * Callback which gets triggered for successful 'disconnectGame' calls.
 *
 * Deletes the joined game and the game session key from the local storage.
 *
 * @param _result Contains the server response.
 */
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
