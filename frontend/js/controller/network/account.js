/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

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
            onHandleRegister(data);
        }
    }, checkError);
}

function onHandleRegister(_result)
{
    var parameters = _result.actionParameters;
    var userName = parameters.loginName;
    if (addValidUser(userName))
    {
        addUserToComboBox(userName);
    }
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
            onHandleLogin(data);
        }
    }, checkError);
}

function onHandleLogin(_result)
{
    var parameters = _result.actionParameters;
    var userName = parameters.loginName;
    setLoggedInUser(userName);
    getRegisteredComponent("RegisteredInputField_loginPasswordField").setFieldText("");

    updateLoggedInFieldLabel(userName);

    if (addValidUser(userName))
    {
        addUserToComboBox(userName);
    }
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

function handleLogout(_result)
{
    setLoggedInUser(null);
    updateLoggedInFieldLabel("Null");
    showAtStatusConsole("User was successfully logged off", false);
}
