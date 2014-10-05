/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

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

    var featurePanelDescription = "<p>Start registering a new or log into an existing account, create a new game, join it and hit one of the buttons to start a Bot in the menu 'Battlefield'</p>";
    var featurePanelDescriptionDiv = generateDiv("component", "featurePanelDescriptionPanel", featurePanelDescription, "float: left");
    addElementToComponent(featurePanel, featurePanelDescriptionDiv);

    addElementToComponent(homeTabPanel, welcomePanel);
    addElementToComponent(homeTabPanel, descriptionPanel);
    addElementToComponent(homeTabPanel, featurePanel);

    var updateChannelDescription = "<p>Once a game is successfuly joined, a fast game channel will be established to populate field updates</p>";
    var updateChannelPanel = generateDiv("component", "updateChannelPanel", "<h1>Websocket Connection</h1>" + updateChannelDescription);
    addElementToComponent(homeTabPanel, updateChannelPanel);

    return homeTabPanel;
}
