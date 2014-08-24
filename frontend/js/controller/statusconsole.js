function showAtStatusConsole(_msg, _append)
{
    //_append=true;
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
