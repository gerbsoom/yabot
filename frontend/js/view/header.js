/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

function generateHeader()
{
    var header = generateDiv("header", "header", "<h2>_yaBOT_</h2>");
    var headerStatusPanel = generateDiv("headerStatusPanel", "headerStatusPanel");

    var statusConsole = generateDiv("statusConsole", "statusConsole");
    var statusConsoleTextArea = addClassAndId(createTextArea(""), "statusConsoleTextArea", "statusConsoleTextArea");

    addElementToComponent(statusConsole, statusConsoleTextArea);

    var consoleButtonMin = addClassAndId(generateButton("consoleButtonMin", "_"), "consoleButtonMin");
    var consoleButtonReset = addClassAndId(generateButton("consoleButtonReset", "[]"), "consoleButtonReset");
    var consoleButtonClear = addClassAndId(generateButton("consoleButtonClear", "CLS"), "consoleButtonClear");
    consoleButtonMin.onclick = minimzeStatusConsole;
    consoleButtonReset.onclick = resetStatusConsole;
    consoleButtonClear.onclick = clearStatusConsole;
    addElementToComponent(statusConsole, consoleButtonMin);
    addElementToComponent(statusConsole, consoleButtonReset);
    addElementToComponent(statusConsole, consoleButtonClear);

    addElementToComponent(headerStatusPanel, statusConsole);
    addElementToComponent(header, headerStatusPanel);

    return header;
}
