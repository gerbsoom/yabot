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
    var posX = data.posX;
    var posY = data.posY;

    showAtStatusConsole("Bot added to game '" + gameName + "' (" + posX + "x" + posY + ")", true);

    drawBotAt("bot1", new Coordinate(posX, posY), new Coordinate(posX, posY), getBattleFielData(getJoinedGame()));
}
