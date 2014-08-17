/**
 * 0: Home
 * 1: Account
 * 2: Game (needs a choosen server and to be logged in)
 *
 */
tabCounter = 0;
activeTab = -1;
tabPanels = [];

function showTabPanel(_tabNum)
{
    if (activeTab == _tabNum) return;
    else
    {
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
