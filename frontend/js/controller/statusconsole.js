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

function clearStatusConsole()
{
    var statusConsoleTextArea = document.getElementById("statusConsoleTextArea");
    statusConsoleTextArea.innerHTML = "";
}

function minimzeStatusConsole()
{
    var statusConsoleTextArea = document.getElementById("statusConsoleTextArea");
    statusConsoleTextArea.style.width = "0px";
    statusConsoleTextArea.style.height = "0px";
}

function resetStatusConsole()
{
    var statusConsoleTextArea = document.getElementById("statusConsoleTextArea");
    statusConsoleTextArea.style.width = "450px";
    statusConsoleTextArea.style.height = "140px";
}

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