/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

function setupUI()
{
    var viewConstructors = [generateHomeTabPanel(), generateAccountTabPanel(), generateGameTabPanel(),
                            generateBattlefieldTabPanel(), generateBotLabTabPanel(),
                            generateAdministrationTabPanel(), generateClosedTabPanel()
                           ];
    var pages = ["Home", "Account", "Game", "Battlefield", "Botlab", "Administration"];

    var navigation = generateNavigation(generateNavigationConfigArray(pages));
    var headerPanel = addClassAndId(generateHeader(), null, "headerPanel");
    var contentPanel = generateDiv("contentPanel", "contentPanel");

    addElementToComponent(document.body, contentPanel);
    addElementToComponent(contentPanel, headerPanel);
    addElementToComponent(contentPanel, navigation);

    for (var i=0; i<viewConstructors.length; i++)
    {
        addNavItem(viewConstructors[i]);
    }
    showTabPanel(0);
}
