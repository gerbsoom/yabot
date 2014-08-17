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
