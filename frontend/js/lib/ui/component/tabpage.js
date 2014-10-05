/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

var mainPanel;
var panelItems = [];

function TabPage(_id, _headLine, _layout, _width, _height)
{
    this._id = _id;
    var headLine = null;
    if (_headLine)
    {
        headLine = "<H1>" + _headLine + "</h1>";
    }
    var layout = "component";
    if (_layout == "wide")
    {
        layout = "component_wide";
    }

    var width = 800;
    var height = 800;
    if (_width) width = _width;
    if (_height) height = _height;

    this.tabPage = generateTabPanelDiv("tabPage", "tabPage" + _id, null, width, height);
    mainPanel = generateDiv(layout, _id + "MainPanel", headLine);
    addElementToComponent(this.tabPage, mainPanel);

    this.addToPanel = function(_panelItem, _addForCleanup)
    {
        addElementToComponent(mainPanel, _panelItem);
        if (_addForCleanup) panelItems.push(_panelItem);
    }

    this.reloadPanel = function()
    {
        console.log(panelItems);
        for (var i=0; i<panelItems.length; i++)
        {
            removeElementFromComponent(mainPanel, panelItems[i]);
        }
        panelItems = [];
    }

}
