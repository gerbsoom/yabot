function generateHomeTabPanel()
{
    var homeTabPanel = generateTabPanelDiv("tabPanel", "startComponentTabPanel", null, 800, 600);
    var welcomePanel = generateDiv("component", "welcomePanel", "<h1>Welcome to YaBot Game</h1>");
    var description = "<p>Page represents a Frontend to manage accounts and games with different battlefields and bots.</p>";
        description += "<p>The game world itself lives on the server but the backend offers all actions to interact with it.</p>";
    var descriptionPanel = generateDiv("component", "descriptionPanel", description);

    var featurePanel = generateDiv("component_wide", "featurePanel", "<h1>Backend Functions</h1><p>Following controllers and actions will be available</p>");

    var featureList1 = "<h1>Account Controller</h1><ul><li>register</li><li>login</li><li>logout</li><li>update</li><li>showStats</li></ul>";
    var featureList2 = "<h1>Game Controller</h1><ul><li>createGame</li><li>deleteGame</li><li>listGames</li><li>joinGame</li><li>quitGame</li></ul>";
    var featureList3 = "<h1>Battlefield Controller</h1><ul><li>getCurrentBattlefieldState</li><li>getFieldStates</li><li>getFieldRowState</li></ul>";

    addElementToComponent(featurePanel, generateDiv("float-left", "featureList1", featureList1));
    addElementToComponent(featurePanel, generateDiv("float-left", "featureList2", featureList2));
    addElementToComponent(featurePanel, generateDiv("float-left", "featureList3", featureList3));

    addElementToComponent(homeTabPanel, welcomePanel);
    addElementToComponent(homeTabPanel, descriptionPanel);
    addElementToComponent(homeTabPanel, featurePanel);

    return homeTabPanel;
}
