/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

/**
 * Filters password fields for the keyboard event 'Enter' and triggers the Login-action.
 *
 * @param e The keyboard event which gets filtered for 'Enter'.
 */
function filterForEnterEventInLoginFields(e)
{
    console.log("Processing keyboard event...");
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13') onLoginActionTriggered();
}

/**
 * Triggered on pressing the login button or 'Enter' in password fields.
 */
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
