/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

/**
 * Contains all account-related backend calls.
 *
 * Each backend call uses 'checkResult' to check if the server returned an error.
 * In the case of a backend error, 'checkError' is called to parse for more details.
 * Otherwise the success callback 'onHandle<ActionName>' is invoked to process the response.
 *
 * toDo: Parameter serverUrl should be added to all methods and made optionally
 */

/**
 * Executes the AJAX-Request to register a new account.
 *
 * @param _loginName The loginName of the account that gets created.
 * @param _password The clear-text password for the account that gets created.
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
    };
    doPostRequest(getServerUrl(), "POST", postData, "JSON", function(data)
    {
        if (checkResult(data))
        {
            onHandleRegister(data);
        }
    }, checkError);
}

/**
 * Callback which gets triggered for successful 'register' calls.
 *
 * Adds the logged-in user into the local storage as valid user.
 * Adds the logged-in user to the user comboBox.
 * toDo: Check for more UI components that needs this update?
 *
 * @param _result Contains the server response.
 */
function onHandleRegister(_result)
{
    var parameters = _result.actionParameters;
    var userName = parameters.loginName;
    if (addValidUser(userName))
    {// gets only added if the user did not exist as valid user
        addUserToComboBox(userName);
    }
}

/**
 * Executes the AJAX-Request to login into an account.
 *
 * @param _loginName The loginName of the account that gets created.
 * @param _password The clear-text password for the account that gets created.
 */
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

/**
 * Callback which gets triggered for successful 'login' calls.
 *
 * Adds the logged-in user into the local storage as valid user.
 * Adds the logged-in user to the user comboBox.
 * Updates login field label and sets user to be logged-in
 * Executes a text-empty-operation on a registered component?
 * toDo: Registering is good but what does it here, cleanup.
 * toDo: Check for more UI components that needs this update?
 *
 * @param _result Contains the server response.
 */
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

/**
 * Executes the AJAX-Request to logout a provided or the current user.
 *
 * @param _otherUser The loginName of the user that gets logged-out.
 */
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
                onHandleLogout(data);
            }
        }, checkError);
    }
    else
    {
        showAtStatusConsole("No user was logged in...", false);

    }
}

/**
 * Callback which gets triggered for successful 'logout' calls.
 *
 * Deletes the logged-in user and updatesd the loggedin label.
 * Shows a message on the status console.
 * toDo: Check for more UI components that needs this update?
 *
 * @param _result Contains the server response.
 */
function onHandleLogout(_result)
{
    setLoggedInUser(null);
    updateLoggedInFieldLabel("Null");
    showAtStatusConsole("User was successfully logged off", false);
}
