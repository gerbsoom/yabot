/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

function generateGameTabPanel()
{
    var gameTabPanel = new TabPage("Game", null, "wide");

    gameTabPanel.addToPanel(generateCreateGamePanel());
    gameTabPanel.addToPanel(generateListGamesPanel());
    gameTabPanel.addToPanel(generateShowCreatedPanel());

    return gameTabPanel.tabPage;
}
