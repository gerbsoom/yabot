/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

function generateManagePanel()
{
    var managePanel = generateDiv("float-left", "loginPanel", "<p></p>");
    var logoutButton = addClassAndId(generateButton("logoutButton", "Logout"), "gameMenuButtons", "logoutButton");
    var updateAccountButton = addClassAndId(generateButton("updateAccountButton", "Update Password"), "gameMenuButtons", "updateAccountButton");
    var deleteAccountButton = addClassAndId(generateButton("deleteAccountButton", "Delete the Account"), "gameMenuButtons", "deleteAccountButton");

    var loggedInFieldLabel = addClassAndId(createLabelForInputField(logoutButton, "Logged in as: " + getLoggedInUser()), "buttonLabel", "loggedInFieldLabel");
    addElementToComponent(managePanel, loggedInFieldLabel);
    addElementToComponent(managePanel, logoutButton);

    var oldPasswordField = new InputField("oldPasswordField", "password", "", "Old Password: ");
    addElementToComponent(managePanel, oldPasswordField.container);
    var updatePasswordField = new InputField("updatePasswordField", "password", "", "New Password: ");
    addElementToComponent(managePanel, updatePasswordField.container);
    var updatePasswordRetype = new InputField("updatePasswordRetype", "password", "", "Repeat Password: ");
    addElementToComponent(managePanel, updatePasswordRetype.container);
    addElementToComponent(managePanel, updateAccountButton);
    addElementToComponent(managePanel, deleteAccountButton);


    logoutButton.onclick = function()
    {
        processLogout(getLoggedInUser());
    };

    return managePanel;
}
