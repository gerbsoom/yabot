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

function onHandleGetCurrentBattlefieldState(_result)
{
    var actionParameters = _result.actionParameters;
    var battlefieldData = _result.generatedData.battlefield;
    drawBattleField(battlefieldData);

    storeBattleFieldData(actionParameters.loginName, actionParameters.gameName,battlefieldData);
}

function processAddBotToServerGame()
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