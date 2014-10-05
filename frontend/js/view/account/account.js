/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

function generateAccountTabPanel()
{
    var accountTabPanel = new TabPage("Account", null, "wide");

    accountTabPanel.addToPanel(generateLoginPanel());
    accountTabPanel.addToPanel(generateRegisterPanel());
    accountTabPanel.addToPanel(generateManagePanel());

    return accountTabPanel.tabPage;
}
