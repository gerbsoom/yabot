function generateHeader()
{
    var header = generateDiv("header", "header", "<h2>__yaBOTGAme__</h2>");
    var headerStatusPanel = generateDiv("headerStatusPanel", "headerStatusPanel");

    var statusConsole = generateDiv("statusConsole", "statusConsole");
    var statusConsoleTextArea = addClassAndId(createTextArea(""), "statusConsoleTextArea", "statusConsoleTextArea");

    addElementToComponent(statusConsole, statusConsoleTextArea);

    var consoleButton = addClassAndId(generateButton("consoleButton", "Hide"), "consoleButton");
    consoleButton.onclick = function() { getBattleFielData("game32"); };
    addElementToComponent(statusConsole, consoleButton);

    addElementToComponent(headerStatusPanel, statusConsole);
    addElementToComponent(header, headerStatusPanel);

    /**var loggedInUserLabel = addClassAndId(createLabelForInputField(null, "Logged in as: NOT logged in"), "loggedInUserLabel", "loggedInUserLabel");
    var progressDiv = document.createElement("div");
    progressDiv.setAttribute('class', "progressDiv");
    progressDiv.setAttribute('id', "progressDiv");

    var progress = document.createElement("PROGRESS");
    progress.setAttribute('class', "myProgress");
    progress.setAttribute('id', "myProgress");
    progress.setAttribute('max', 100);
    progress.value = 0;
    addElementToComponent(progressDiv, progress);
    addElementToComponent(headerStatusPanel, progressDiv);
    */
    return header;
}
