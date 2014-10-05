/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

function generateNavigation(_navConfig)
{
    var navigation = generateDiv("navigation", "navigation", null);

    for (var i = 0; i < _navConfig.length; i++)
    {
        addElementToComponent(navigation, generateTDLink(_navConfig[i]));
    }
    return navigation;
}
