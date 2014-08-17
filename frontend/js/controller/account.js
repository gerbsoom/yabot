function handleLogin(_result)
{
    var parameters = _result.actionParameters;
    var userName = parameters.loginName;
    setLoggedInUser(userName);

    updateLoggedInFieldLabel(userName);

    if (addValidUser(userName))
    {
        addUserToComboBox(userName);
    }
}

function handleLogout(_result)
{
    setLoggedInUser(null);
    updateLoggedInFieldLabel("Null");
    showAtStatusConsole("User was successfully logged off", false);
}

function handleRegister(_result)
{
    var parameters = _result.actionParameters;
    var userName = parameters.loginName;
    if (addValidUser(userName))
    {
        addUserToComboBox(userName);
    }
}

function updateLoggedInFieldLabel(_userName)
{
    var retrievedLoggedInFieldLabel = document.getElementById("loggedInFieldLabel");
    if (retrievedLoggedInFieldLabel)
    {
        retrievedLoggedInFieldLabel.innerHTML = "Logged in as: " + _userName;
    }
    else showAtStatusConsole("Error updating login label in ACCOUNT!", false);
}

function addUserToComboBox(_userName)
{
    var userComboBox = document.getElementById("userComboBox");
    userComboBox.options[userComboBox.options.length] = new Option(_userName, 0);
}
