/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

function generateListGamesPanel()
{
    var generateListGamesPanel = generateDiv("float-left", "generateListGamesPanel", "<h1>Query server for running games: </h1><p></p>");

    var listServerGamesButton = addClassAndId(generateButton("listServerGamesButton", "Get Games List"), "gameMenuButtons", "listServerGamesButton");
    listServerGamesButton.onclick = function()
    {
        processListServerGames();
    }
    addElementToComponent(generateListGamesPanel, listServerGamesButton);

    var serverGamesComboBox = addClassAndId(createComboBox(), "selectBox-style-medium", "serverGamesComboBox");
    addElementToComponent(generateListGamesPanel, serverGamesComboBox);

    var disconnectGameButton = addClassAndId(generateButton("disconnectGameButton", "Disconnect Game"), "gameMenuButtons", "disconnectGameButton");
    disconnectGameButton.onclick = function()
    {
        var gameSelectionBox = document.getElementById("serverGamesComboBox");
        var selectedGame = gameSelectionBox.options[gameSelectionBox.selectedIndex].text;
        processDisconnectGame(selectedGame);
    }
    addElementToComponent(generateListGamesPanel, disconnectGameButton);

    var joinServerGameButton = addClassAndId(generateButton("joinServerGameButton", "Connect to Game"), "gameMenuButtons", "joinServerGameButton");
    joinServerGameButton.onclick = function()
    {
        var gameSelectionBox = document.getElementById("serverGamesComboBox");
        var selectedGame = gameSelectionBox.options[gameSelectionBox.selectedIndex].text;
        processJoinServerGame(selectedGame);
    }
    addElementToComponent(generateListGamesPanel, joinServerGameButton);

    var tinyGameConsolePanel = generateDiv("tinyGameConsolePanel", "tinyGameConsolePanel");

    var tinyGameConsole = generateDiv("tinyGameConsole", "tinyGameConsole");
    var tinyConsoleTextArea = addClassAndId(createTextArea("init..."), "tinyConsoleTextArea", "tinyConsoleTextArea");
    addElementToComponent(tinyGameConsole, tinyConsoleTextArea);

    var tinyConsoleButton = addClassAndId(generateButton("tinyConsoleButton", "Send ChatMessage/Execute Command"), "tinyConsoleButton");
    tinyConsoleButton.onclick = function() { getBattleFielData("game32"); };

    addElementToComponent(tinyGameConsole, tinyConsoleButton);

    addElementToComponent(tinyGameConsolePanel, tinyGameConsole);
    addElementToComponent(generateListGamesPanel, tinyGameConsolePanel);


    return generateListGamesPanel;
}
