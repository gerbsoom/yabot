/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

function generateAdminCacheEntry(_displayName, _cacheKey)
{
    var adminCacheEntryPanel = generateDiv("float-left", "adminCacheEntryPanel", "<h1>" + _displayName + "</h1>");
    var cacheKeyValue = localStorage.getItem(_cacheKey);
    var adminCacheEntryLabel = addClassAndId(createLabelForInputField(null, "[" + cacheKeyValue + "]"), "inputandlabels", "adminCacheEntryLabel_" + _cacheKey);

    addElementToComponent(adminCacheEntryPanel, adminCacheEntryLabel);

    var adminCacheEntryButton = addClassAndId(generateButton("loginButton", "Delete cached value"), "inputAndLabels", "adminCacheEntryButton_" + _cacheKey);
    adminCacheEntryButton.onclick = function()
    {
        localStorage.removeItem(_cacheKey);
        var cacheEntryLabel = document.getElementById("adminCacheEntryLabel_" + _cacheKey);
        cacheEntryLabel.innerHTML = "[" + _cacheKey + "] = null";
    }
    addElementToComponent(adminCacheEntryPanel, adminCacheEntryButton);

    return adminCacheEntryPanel;
}
