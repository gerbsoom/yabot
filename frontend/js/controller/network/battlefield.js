/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

/**
 * Contains all battlefield-related backend calls.
 *
 * Each backend call uses 'checkResult' to check if the server returned an error.
 * In the case of a backend error, 'checkError' is called to parse for more details.
 * Otherwise the success callback 'onHandle<ActionName>' is invoked to process the response.
 *
 * toDo: Parameter serverUrl should be added to all methods and made optionally
 */

/**
 * Executes the AJAX-Request 'GetCurrentBattlefieldState' to load the complete battlefield.
 *
 * @param _gameName The name of the game that gets loaded.
 */
function processGetCurrentBattlefieldState(_gameName)
{
    var userName = getLoggedInUser();
    var postData =
    {
        loginName : userName,
        gameName : _gameName,
        controller : "battlefield",
        action : "getCurrentBattlefieldState"
    }
    doPostRequest(getServerUrl(), "POST", postData, "JSON", function(data)
    {
        if (checkResult(data))
        {
            onHandleGetCurrentBattlefieldState(data);
        }
    }, checkError);
}

/**
 * Callback which gets triggered for successful 'GetCurrentBattlefieldState' calls.
 *
 * Draws the complete battlefield and stores into the local storage.
 *
 * @param _result Contains the server response.
 */
function onHandleGetCurrentBattlefieldState(_result)
{
    var actionParameters = _result.actionParameters;
    var battlefieldData = _result.generatedData.battlefield;
    drawBattleField(battlefieldData);

    storeBattleFieldData(actionParameters.loginName, actionParameters.gameName,battlefieldData);
}

/**
 * Executes the AJAX-Request 'addBot'.
 */
function processAddBot()
{
    var gameName = getJoinedGame();
    var userName = getLoggedInUser();
    var botId = "test";
    var postData =
    {
        loginName : userName,
        gameName : gameName,
        botId:    botId,
        controller : "battlefield",
        action : "addBot"
    }
    doPostRequest(getServerUrl(), "POST", postData, "JSON", function(data)
    {
        if (checkResult(data))
        {
            onHandleAddBot(data);
        }
    }, checkError);
}

/**
 * Callback which gets triggered for successful 'addBot' calls.
 *
 * Draws the bot at the coordinate returned by the server.
 *
 * @param _result Contains the server response.
 */
function onHandleAddBot(_result)
{
    var parameters = _result.actionParameters;
    var gameName = parameters.gameName;
    var data = _result.generatedData;
    var posX = data.posX;
    var posY = data.posY;

    showAtStatusConsole("Bot added to game '" + gameName + "' (" + posX + "x" + posY + ")", true);

    drawBotAt("bot1", new Coordinate(posX, posY), new Coordinate(posX, posY), getBattleFielData(getJoinedGame()));
}

/**
 * Executes the AJAX-Request 'getFieldState'.
 *
 * @param _botId The ID of the bot that explores the field state.
 * @param _posX The x-position of the field state that gets explored.
 * @param _posY The y-position of the field state that gets explored.
 * @param _errorCallback A specific errorCallback which gets triggered if the servers returns an error.
 * @param _successCallback A specific successCallback which gets triggered if the servers returns an error.
 */
function processGetFieldState(_botId, _posX, _posY, _errorCallback, _successCallback)
{
    var gameName = getJoinedGame();
    var userName = getLoggedInUser();
    var postData =
    {
        loginName : userName,
        gameName : gameName,
        botId:    _botId,
        posX: _posX,
        posY: _posY,
        controller : "battlefield",
        action : "getFieldState"
    }

    doPostRequest(getServerUrl(), "POST", postData, "JSON", function(data)
    {
        if (checkResult(data))
        {
            _successCallback(data);
        }
    }, _errorCallback);
}

/**
 * Callback which gets triggered for successful 'getFieldState' calls.
 *
 * @param _result Contains the server response.
 */
function onHandleGetFieldState(_result)
{
    var parameters = _result.actionParameters;
    var gameName = parameters.gameName;
    var data = _result.generatedData;
    var posX = parameters.posX;
    var posY = parameters.posY;
    var type = data.type;
    // bot there?

    showAtStatusConsole("Bot discovered field [" + type + "] in game '" + gameName + "' at pos (" + posX + "x" + posY + ")", true);

    // populate information to bot
}
