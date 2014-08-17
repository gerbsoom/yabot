function generateAccountTabPanel()
{
    var accountTabPanel = new TabPage("Account", null, "wide");

    accountTabPanel.addToPanel(generateLoginPanel());
    accountTabPanel.addToPanel(generateRegisterPanel());

    return accountTabPanel.tabPage;
}
