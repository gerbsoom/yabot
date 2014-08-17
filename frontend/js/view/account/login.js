function generateLoginPanel()
{
    var loginPanel = generateDiv("float-left", "loginPanel", "<h1>Login: </h1>");

    var loginField = addClassAndId(createInputField("text", ""), "inputAndLabels", "loginField");
    var loginFieldLabel = addClassAndId(createLabelForInputField(loginField, "Username"), "inputAndLabels", "loginFieldLabel");
    var loginPasswordField = addClassAndId(createInputField("password", ""), "inputAndLabels", "loginPasswordField");
    var loginPasswordFieldLabel = addClassAndId(createLabelForInputField(loginPasswordField, "Password"), "inputAndLabels", "loginPasswordFieldLabel");

    var userComboBox = addClassAndId(createComboBox(getUsers()), "select-style", "userComboBox");
    if (getUsers() && getUsers().length == 1)
    {
        loginField.value = userComboBox.options[userComboBox.selectedIndex].text;
    }

    userComboBox.onchange = function()
    {
        var loginField = document.getElementById("loginField");
        var selectionBox = document.getElementById("userComboBox");
        loginField.value = selectionBox.options[selectionBox.selectedIndex].text;
    }

    addElementToComponent(loginPanel, userComboBox);
    addElementToComponent(loginPanel, loginFieldLabel);
    addElementToComponent(loginPanel, loginField);
    addElementToComponent(loginPanel, loginPasswordFieldLabel);
    addElementToComponent(loginPanel, loginPasswordField);

    var loginButton = addClassAndId(generateButton("loginButton", "Login"), "inputAndLabels", "loginButton");
    addElementToComponent(loginPanel, loginButton);

    loginButton.onclick = onLoginActionTriggered;
    loginField.onkeypress = filterForEnterEvent;
    loginPasswordField.onkeypress = filterForEnterEvent;

    addElementToComponent(loginPanel, createLabelForInputField(null, "____________________"));
    var logoutButton = addClassAndId(generateButton("logoutButton", "Logout"), "inputAndLabels", "logoutButton");
    logoutButton.onclick = function() { processLogout(getLoggedInUser());};
    var loggedInFieldLabel = addClassAndId(createLabelForInputField(logoutButton, "Logged in as: " + getLoggedInUser()), "inputAndLabels", "loggedInFieldLabel");
    addElementToComponent(loginPanel, loggedInFieldLabel);
    addElementToComponent(loginPanel, createLabelForInputField(null, "____________________"));
    addElementToComponent(loginPanel, logoutButton);

    return loginPanel;
}

function filterForEnterEvent(e)
{
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13') onLoginActionTriggered();
}

function onLoginActionTriggered()
{
    var loginField = document.getElementById("loginField");

    if (getLoggedInUser() != "null" && getLoggedInUser() != loginField.value)
    {
        showAtStatusConsole("Try first to logout the current user...", false);
        processLogout();
        setLoggedInUser(null);
        showAtStatusConsole("Check the state and hit the login button again...", true);
    }
    var loginPasswordField = document.getElementById("loginPasswordField");
    processLogin(loginField.value, loginPasswordField.value);
}