/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

// toDo: Check how this function could work with registering at the LoginStatusUpdateChannel of the ComponentRegister.

function updateLoggedInFieldLabel(_userName)
{
    var retrievedLoggedInFieldLabel = document.getElementById("loggedInFieldLabel");
    if (retrievedLoggedInFieldLabel)
    {
        retrievedLoggedInFieldLabel.innerHTML = "Logged in as: " + _userName;
    }
    else showAtStatusConsole("Error updating login label in ACCOUNT!", false);
}
