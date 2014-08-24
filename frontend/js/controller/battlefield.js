function handleGetCurrentBattlefieldState(_result)
{
    var actionParameters = _result.actionParameters;
    var battlefieldData = _result.generatedData.battlefield;
    drawBattleField(battlefieldData);

    storeBattleFieldData(actionParameters.loginName, actionParameters.gameName,battlefieldData);
}

function handleAddBot(_result)
{
    var parameters = _result.actionParameters;
    var gameName = parameters.gameName;
    var data = _result.generatedData;
    var sessionKey = data.sessionKey;
    var numPlayer = data.numPlayer;
    var playerId = data.playerId;
    var posX = data.posX;
    var posY = data.posY;

    showAtStatusConsole("Bot added to game '" + gameName + "' (" + posX + "x" + posY + ")", true);
    showAtStatusConsole("We are player number " + playerId + " of (" + numPlayer + ")", true);
    showAtStatusConsole("SessionKey=" + sessionKey, true);

    setGameSessionKey(sessionKey);
    initWebSocketGameChannel(sessionKey);

    drawBotAt(new Coordinate(posX, posY));
}
