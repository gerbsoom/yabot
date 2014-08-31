function generateRegisterPanel()
{
    var registerMainPanel = generateDiv("float-left", "registerMainPanel", "<p></p>");

    var registerNameField = new InputField("registerNameField", "text", "", "Username: ");
    addElementToComponent(registerMainPanel, registerNameField.container);
    var registerPasswordField = new InputField("registerPasswordField", "password", "", "Password: ");
    addElementToComponent(registerMainPanel, registerPasswordField.container);
    var registerPasswordRetype = new InputField("registerPasswordRetype", "password", "", "Re-type  : ");
    addElementToComponent(registerMainPanel, registerPasswordRetype.container);

/*    var registerNameField = addClassAndId(createInputField("text", ""), "inputAndLabels", "registerNameField");
    var registerPasswordField = addClassAndId(createInputField("password", ""), "inputAndLabels", "registerPasswordField");
    var registerPasswordRetype = addClassAndId(createInputField("password", ""), "inputAndLabels", "registerPasswordRetype");
    var registerNameFieldLabel = addClassAndId(createLabelForInputField(registerNameField, "New Username"), "inputAndLabels", "registerNameFieldLabel");
    var registerPasswordLabel = addClassAndId(createLabelForInputField(registerPasswordField, "Choose password"), "inputAndLabels", "registerPasswordLabel");
    var registerPasswordRetypeLabel = addClassAndId(createLabelForInputField(registerPasswordRetype, "Re-type password"), "inputAndLabels", "registerPasswordRetypeLabel");
    addElementToComponent(registerMainPanel, registerNameFieldLabel);
    addElementToComponent(registerMainPanel, registerNameField);
    addElementToComponent(registerMainPanel, registerPasswordLabel);
    addElementToComponent(registerMainPanel, registerPasswordField);
    addElementToComponent(registerMainPanel, registerPasswordRetypeLabel);
    addElementToComponent(registerMainPanel, registerPasswordRetype);
*/
    var registerButton = addClassAndId(generateButton("registerButton", "Register Account"), "inputAndLabels", "registerPasswordRetypeLabel");
    registerButton.onclick = function()
    {
        var registerNameField = document.getElementById("registerNameField");
        var registerPasswordField = document.getElementById("registerPasswordField");
        var registerPasswordRetype = document.getElementById("registerPasswordRetype");
        if (registerPasswordField.value.length > 4)
        {
            if (registerPasswordField.value == registerPasswordRetype.value)
            {
                processRegister(registerNameField.value, registerPasswordField.value);
            }
            else  alert("Password do not match!!!")
        }
        else alert("Password too short, min length 5!")

        registerPasswordField.value = "";
        registerPasswordRetype.value = "";
    }
    addElementToComponent(registerMainPanel, registerButton);

    return registerMainPanel;
}
