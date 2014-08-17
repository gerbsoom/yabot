function generateCreateGamePanel()
{
    var createGamePanel = generateDiv("float-left", "createGamePanel", "<h1>Create a new game </h1><p></p>");

    var gameNameField = new InputField("gameNameField", "text", "", " Game Name ");
    addElementToComponent(createGamePanel, gameNameField.container);

    var gameWidthField = new SelectBox("gameWidthField", [8,12,16,20,24,28,32,36,40,44,48], " Game Width ");
    addElementToComponent(createGamePanel, gameWidthField.container);

    var gameHeightField = new SelectBox("gameHeightField", [8,12,16,20,24,28,32,36,40,44,48], " Game Height ");
    addElementToComponent(createGamePanel, gameHeightField.container);

    var gameNumPlayerField = new SelectBox("gameNumPlayerField", [1,2,3,4], " Max Players ");
    addElementToComponent(createGamePanel, gameNumPlayerField.container);

    var createGameButton = addClassAndId(generateButton("createGameButton", "Create Game"), "gameMenuButtons", "createGameButton");
    createGameButton.onclick = function()
    {
        var textFieldName = document.getElementById("gameNameField");
        var selectBoxWidth = document.getElementById("gameWidthField");
        var selectBoxHeight = document.getElementById("gameHeightField");
        var selectBoxdNumPlayer = document.getElementById("gameNumPlayerField");

        var width = selectBoxWidth.options[selectBoxWidth.selectedIndex].text;
        var height = selectBoxHeight.options[selectBoxHeight.selectedIndex].text;
        var maxPlayer = selectBoxdNumPlayer.options[selectBoxdNumPlayer.selectedIndex].text;

        processCreateGame(textFieldName.value, width, height, maxPlayer);
    }
    addElementToComponent(createGamePanel, createGameButton);

    return createGamePanel;
}
