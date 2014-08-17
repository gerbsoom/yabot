function handleJoinGame(_result)
{
    var parameters = _result.actionParameters;
    var gameName = parameters.gameName;
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

function handleListGames(_result)
{
    var data = _result.generatedData;
    var gameList = data.gameList;

    var serverGamesComboBox = document.getElementById("serverGamesComboBox");
    for (var i=0; i < gameList.length; i++)
    {
        addItemToComboBox(serverGamesComboBox, gameList[i]);
    }
}

function addItemToComboBox(_comboBox, _gameName)
{
    _comboBox.options[_comboBox.options.length] = new Option(_gameName, 0);
}
