function processRegister(_loginName, _password)
{
    var passwordHash = MD5(_password);
    var postData =
    {
        loginName : _loginName,
        passwordHash : passwordHash,
        controller : "account",
        action : "register"
    }
    doPostRequest(getServerUrl(), "POST", postData, "JSON", function(data)
    {
        if (checkResult(data))
        {
            handleRegister(data);
        }
    }, checkError);
}

function processLogin(_loginName, _password)
{
    var passwordHash = MD5(_password);
    var postData =
    {
        loginName : _loginName,
        passwordHash : passwordHash,
        controller : "account",
        action : "login"
    }
    doPostRequest(getServerUrl(), "POST", postData, "JSON", function(data)
    {
        if (checkResult(data))
        {
            handleLogin(data);
        }
    }, checkError);
}

function processLogout(_otherUser)
{
    var loggedInUser;
    if (_otherUser)
    {
        loggedInUser = _otherUser;
    }
    else loggedInUser = getLoggedInUser();

    if (loggedInUser)
    {
        var postData =
        {
            loginName : loggedInUser,
            controller : "account",
            action : "logout"
        }
        doPostRequest(getServerUrl(), "POST", postData, "JSON", function(data)
        {
            if (checkResult(data))
            {
                handleLogout(data);
            }
        }, checkError);
    }
    else
    {
        showAtStatusConsole("No user was logged in...", false);

    }
}