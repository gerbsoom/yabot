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

    var gameInfoButton = addClassAndId(generateButton("GameInfoButton", "Get Game Info"), "gameMenuButtons", "GameInfoButton");
    gameInfoButton.onclick = function()
    {
        var gameSelectionBox = document.getElementById("serverGamesComboBox");
        var selectedGame = gameSelectionBox.options[gameSelectionBox.selectedIndex].text;
        processGetGameInfo(selectedGame);
    }
    addElementToComponent(generateListGamesPanel, gameInfoButton);

    var joinServerGameButton = addClassAndId(generateButton("joinServerGameButton", "Connect to a Game"), "gameMenuButtons", "joinServerGameButton");
    joinServerGameButton.onclick = function()
    {
        var gameSelectionBox = document.getElementById("serverGamesComboBox");
        var selectedGame = gameSelectionBox.options[gameSelectionBox.selectedIndex].text;
        processJoinServerGame(selectedGame);
    }
    addElementToComponent(generateListGamesPanel, joinServerGameButton);

    var tinyGameConsolePanel = generateDiv("tinyGameConsolePanel", "tinyGameConsolePanel");

    var tinyGameConsole = generateDiv("tinyGameConsole", "tinyGameConsole");
    var tinyConsoleTextArea = addClassAndId(createTextArea(""), "tinyConsoleTextArea", "tinyConsoleTextArea");
    addElementToComponent(tinyGameConsole, tinyConsoleTextArea);

    var tinyConsoleButton = addClassAndId(generateButton("tinyConsoleButton", "Send ChatMessage/Execute Command"), "tinyConsoleButton");
    tinyConsoleButton.onclick = function() { getBattleFielData("game32"); };

    addElementToComponent(tinyGameConsole, tinyConsoleButton);

    addElementToComponent(tinyGameConsolePanel, tinyGameConsole);
    addElementToComponent(generateListGamesPanel, tinyGameConsolePanel);


    return generateListGamesPanel;
}
