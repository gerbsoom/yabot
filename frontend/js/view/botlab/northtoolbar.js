function generateNorthToolbarPanel()
{
    var northToolbar = generateDiv("float-left", "northToolbar");
    var botFireWidget = document.createElement("div");
    addElementToComponent(northToolbar, botFireWidget);

        var botComboBox = createComboBox(["Test Bot1","Test Bot2","Test Bot3"]);
        botComboBox.setAttribute("tagId" , "botComboBox");
        botComboBox.setAttribute("className" , "botComboBox2");
        var botComboBoxLabel = createLabelForInputField(botComboBox, "Select a Bot to insert into the Game: ");
        botComboBoxLabel.setAttribute("className" , "botComboBoxLabel");

        var addBotButton = addClassAndId(generateButton("addBotButton", " Add Bot "), "myToolbarButton", "addBotButton");
        addBotButton.onclick = function()
        {
            getBattleFielData("game32");
        };

    addElementToComponent(botFireWidget, botComboBoxLabel);
    addElementToComponent(botFireWidget, botComboBox);
    addElementToComponent(botFireWidget, addBotButton);

    return northToolbar;
}
