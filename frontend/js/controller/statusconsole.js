/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

/**
 * Offers Status and GameConsole-related functions to display texts.
 *
 * toDo: Functions should move to a new UI component 'Console', should work with prototype to not duplicate code.
 * StatusConsole objects could automatically register for StatusUpdate-Events in ComponentRegister.
 * GameConsole could (dynamically) register to a to be added Event-channel with a game filter.
 */

/**
 * Shows the provided message on the StatusConsole.
 *
 * @param _msg The message that gets displayed.
 * @param _append If true, the message will be appended.
 */
function showAtStatusConsole(_msg, _append)
{
    var d = new Date ();
    var statusMessage = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + " ";
    var statusConsoleTextArea = document.getElementById("statusConsoleTextArea");
    if (_append == true)
    {
        statusMessage = statusConsoleTextArea.innerHTML + statusMessage;
    }
    statusMessage += _msg;

    statusConsoleTextArea.innerHTML = statusMessage + "\n";
}

/**
 * Clears all displayed text from the StatusConsole.
 */
function clearStatusConsole()
{
    var statusConsoleTextArea = document.getElementById("statusConsoleTextArea");
    statusConsoleTextArea.innerHTML = "";
}

/**
 * Minimizes the StatusConsole.
 */
function minimzeStatusConsole()
{
    var statusConsoleTextArea = document.getElementById("statusConsoleTextArea");
    statusConsoleTextArea.style.width = "0px";
    statusConsoleTextArea.style.height = "0px";
}

/**
 * Resets the size of the StatusConsole to the origin values.
 */
function resetStatusConsole()
{
    var statusConsoleTextArea = document.getElementById("statusConsoleTextArea");
    statusConsoleTextArea.style.width = "450px";
    statusConsoleTextArea.style.height = "140px";
}

/**
 * Shows the provided message on the GameConsole of a specific game.
 *
 * @param _gameName The game where the message gets displayed.
 * @param _msg The message that gets displayed.
 * @param _append If true, the message will be appended.
 */
function showAtGameConsole(_gameName, _msg, _append)
{
    var d = new Date ();
    var statusMessage = "Not connected to a game\n";
    if (_gameName != "" &&_gameName != "null" && _gameName != null)
    {
        statusMessage = "Connected to " + _gameName + "\n";
    }
    statusMessage += "________________________________\n";
    statusMessage += d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + " ";
    var gameConsoleTextArea = document.getElementById("tinyConsoleTextArea");
    if (_append)
    {
        statusMessage = gameConsoleTextArea.innerHTML + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + _msg;
    }
    statusMessage += _msg;

    if (gameConsoleTextArea) gameConsoleTextArea.innerHTML = statusMessage + "\n";
}
