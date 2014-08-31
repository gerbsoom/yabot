function filterForEnterEventInLoginFields(e)
{
    console.log("Processing keyboard event...");
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13') onLoginActionTriggered();
}

function onLoginActionTriggered()
{
    var loginField = document.getElementById("loginField");

    if (getLoggedInUser() != "null" && getLoggedInUser() != loginField.value)
    {
        showAtStatusConsole("Try first to logout the current user...", false);
        processLogout();
        setLoggedInUser(null);
        showAtStatusConsole("Check the state and hit the login button again...", true);
    }
    var loginPasswordField = document.getElementById("loginPasswordField");
    processLogin(loginField.value, loginPasswordField.value);
}
