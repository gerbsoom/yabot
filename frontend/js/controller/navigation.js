/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

/**
 * 0: Home
 * 1: Account
 * L: ______________
 * 2: Game
 * 3: Battlefield
 * 4: BotLab
 * 5: Administration
 * 6: closed-tab
 */
tabCounter = 0;
activeTab = -1;
tabPanels = [];

function showTabPanel(_tabNum)
{
    if (activeTab == _tabNum) return;
    else
    {
        console.log(getLoggedInUser());
        if (_tabNum > 1 && getLoggedInUser() == "null")
        {
            showAtStatusConsole("Please login first...");
            console.log("closed: " + _tabNum);
            _tabNum = 6;
        }
        if (_tabNum == 2)
        {
            showAtGameConsole(getJoinedGame(), "", false);
        }

        var newReference = tabPanels[_tabNum];
        if (activeTab != -1)
        {
            var oldReference = tabPanels[activeTab];
            contentPanel.replaceChild(newReference, oldReference);
        }
        else contentPanel.appendChild(newReference);

    }
    activeTab = _tabNum;
}

function addNavItem(_navItem)
{
    tabPanels[tabCounter] = _navItem;
    tabCounter++;
}
