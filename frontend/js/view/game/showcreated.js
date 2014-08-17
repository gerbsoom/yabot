function generateShowCreatedPanel()
{
    var generateShowCreatedPanel = generateDiv("float-left", "generateShowCreatedPanel", "<h1>Show created games: </h1><p></p>");

    var createdGamesComboBox = addClassAndId(createComboBox(getCreatedGames()), "select-style", "createdGamesComboBox");
    addElementToComponent(generateShowCreatedPanel, createdGamesComboBox);

    return generateShowCreatedPanel;
}
