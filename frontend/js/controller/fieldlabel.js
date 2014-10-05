/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

function updateLoggedInFieldLabel(_userName)
{
    var retrievedLoggedInFieldLabel = document.getElementById("loggedInFieldLabel");
    if (retrievedLoggedInFieldLabel)
    {
        retrievedLoggedInFieldLabel.innerHTML = "Logged in as: " + _userName;
    }
    else showAtStatusConsole("Error updating login label in ACCOUNT!", false);
}
