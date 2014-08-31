function generateLoginPanel()
{
    var loginPanel = generateDiv("float-left", "loginPanel", "<p></p>");

    var userComboBox = new SelectBox("userComboBox", getUsers(), "Select User");
    addElementToComponent(loginPanel, userComboBox.container);
    var loginField = new InputField("loginField", "text", "", "Username");
    addElementToComponent(loginPanel, loginField.container);
    var loginPasswordField = new InputField("loginPasswordField", "password", "", "Password");
    addElementToComponent(loginPanel, loginPasswordField.container);

    if (getUsers() && getUsers().length == 1)
    {
        loginField.setFieldText(userComboBox.comboBox().options[userComboBox.comboBox().selectedIndex].text);
    }

    userComboBox.comboBox().onchange = function()
    {
        var selectionBox = getRegisteredComponent("RegisteredSelectBox_userComboBox").comboBox();
        getRegisteredComponent("RegisteredInputField_loginField").setFieldText(selectionBox.options[selectionBox.selectedIndex].text);
    }

    var loginButton = addClassAndId(generateButton("loginButton", "Log into Account"), "gameMenuButtons", "loginButton");
    addElementToComponent(loginPanel, loginButton);

    loginButton.onclick = onLoginActionTriggered;
    loginField.fieldText().onkeypress = filterForEnterEventInLoginFields;
    loginPasswordField.fieldText().onkeypress = filterForEnterEventInLoginFields;

    return loginPanel;
}
