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
            handleGetCurrentBattlefieldState(data);
        }
    }, checkError);
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
            handleAddBot(data);
        }
    }, checkError);
}
