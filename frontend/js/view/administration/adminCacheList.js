/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

function generateAdminCacheList(_displayName, _cacheKey)
{
    var adminCacheListPanel = generateDiv("float-left", "adminCacheListPanel", "<h1>" + _displayName + "</h1>");
    var cacheKeyList = [];
    if (localStorage.getItem(_cacheKey))
    {
        cacheKeyList = JSON.parse(localStorage.getItem(_cacheKey));
    }

    var cacheKeyListComboBox = addClassAndId(createComboBox(cacheKeyList), "select-style", "cacheKeyListComboBox_" + _cacheKey);
    addElementToComponent(adminCacheListPanel, cacheKeyListComboBox);

    var adminCacheListButton = addClassAndId(generateButton("adminCacheListButton", "Delete all values"), "inputAndLabels", "adminCacheListButton_" + _cacheKey);
    adminCacheListButton.onclick = function()
    {
        localStorage.removeItem(_cacheKey);
        var cacheList = document.getElementById("cacheKeyListComboBox_" + _cacheKey);
        for(var i = cacheList.options.length -1; i >= 0; i--)
        {
            cacheList.remove(i);
        }
    }
    addElementToComponent(adminCacheListPanel, adminCacheListButton);

    return adminCacheListPanel;
}
