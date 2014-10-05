/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

function generateRegisterPanel()
{
    var registerMainPanel = generateDiv("float-left", "registerMainPanel", "<p></p>");

    var registerNameField = new InputField("registerNameField", "text", "", "Username: ");
    addElementToComponent(registerMainPanel, registerNameField.container);
    var registerPasswordField = new InputField("registerPasswordField", "password", "", "Password: ");
    addElementToComponent(registerMainPanel, registerPasswordField.container);
    var registerPasswordRetype = new InputField("registerPasswordRetype", "password", "", "Re-type  : ");
    addElementToComponent(registerMainPanel, registerPasswordRetype.container);

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
