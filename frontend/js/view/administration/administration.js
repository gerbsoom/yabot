var administrationTabPanel;

function generateAdministrationTabPanel()
{
    administrationTabPanel = new TabPage("Administration", "Provides access to the cache register", "wide");

    var adminCacheEntryReloadButton = addClassAndId(generateButton("adminCacheEntryReloadButton", "Reload all values from cache"), "inputAndLabels", "adminCacheEntryReloadButton");
    adminCacheEntryReloadButton.onclick = function()
    {
        administrationTabPanel.reloadPanel();
        setupCacheRegister();
    }
    addElementToComponent(administrationTabPanel.tabPage, adminCacheEntryReloadButton);
    var logoutAllKnownUserButton = addClassAndId(generateButton("logoutAllKnownUserButton", "Logout all known users"), "inputAndLabels", "logoutAllKnownUserButton");
    logoutAllKnownUserButton.onclick = function()
    {
        var knownUsers = getUsers();
        console.log(knownUsers);
        if (knownUsers)
        {
            for (var i=0; i< knownUsers.length; i++)
            {
                showAtStatusConsole("Try to logout user: " + knownUsers[i], true);
                processLogout(knownUsers[i]);
            }
            administrationTabPanel.reloadPanel();
            setupCacheRegister();
        }
    }
    addElementToComponent(administrationTabPanel.tabPage, logoutAllKnownUserButton);

    setupCacheRegister();

    return administrationTabPanel.tabPage;
}

function setupCacheRegister()
{
    administrationTabPanel.addToPanel(generateAdminCacheEntry("Logged User", "/user/loggedIn"), true);
    administrationTabPanel.addToPanel(generateAdminCacheEntry("Joined Game", "/game/joined"), true);
    administrationTabPanel.addToPanel(generateAdminCacheList("Trusted Users", "/user/list"), true);
    administrationTabPanel.addToPanel(generateAdminCacheList("Created Games", "/games/created"), true);
}
