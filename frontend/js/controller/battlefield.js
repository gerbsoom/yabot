function handleGetCurrentBattlefieldState(_result)
{
    var actionParameters = _result.actionParameters;
    var battlefieldData = _result.generatedData.battlefield;
    drawBattleField(battlefieldData);

    storeBattleFieldData(actionParameters.loginName, actionParameters.gameName,battlefieldData);
}
