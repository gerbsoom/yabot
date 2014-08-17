function generateGameTabPanel()
{
    var gameTabPanel = new TabPage("Game", null, "wide");

    gameTabPanel.addToPanel(generateCreateGamePanel());
    gameTabPanel.addToPanel(generateListGamesPanel());
    gameTabPanel.addToPanel(generateShowCreatedPanel());

    return gameTabPanel.tabPage;
}
