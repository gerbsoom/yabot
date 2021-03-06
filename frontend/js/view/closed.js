/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

var closedImage, bgImage;
var closedCanvas;
var closedTimer;
var offsetBGY = -2000;
var offsetX = 350;
var modifier = 1;
var bgModifier = 1;

function generateClosedTabPanel()
{
    var closedTabPanel = generateTabPanelDiv("tabPanel", "closedTabPanel", null, 1000, 300);

    var closedCanvasComponent = generateDiv("component", "closedCanvasComponent");
    closedCanvas = generateCanvas("closedCanvas", 1000, 300);
    closedCanvasComponent.appendChild(closedCanvas);
    addElementToComponent(closedTabPanel, closedCanvas);

    bgImage = createImage("img/closed_background.png");
    closedImage = createImage("img/closed.png");
    closedImage.onload = startClosedAnimation;

    return closedTabPanel;
}

function startClosedAnimation()
{
    closedTimer = setInterval(drawClosedCanvas, 50);
}

function stopClosedAnimation()
{
    clearInterval(closedTimer);
}

function drawClosedCanvas()
{
    if (activeTab == 6)
    {
        var ctx = closedCanvas.getContext("2d");
        ctx.clearRect(0, 0, 800, 300);
        ctx.drawImage(bgImage, 0, offsetBGY);
        ctx.drawImage(closedImage, offsetX, 0);
        if (offsetX > 700) modifier *= -1;
        else if (offsetX < 0)  modifier *= -1;
        offsetX += 2*modifier;
        if (offsetBGY > 0) bgModifier *= -1;
        else if (offsetBGY < -2000)  bgModifier *= -1;
        offsetBGY += 3*bgModifier;
    }
}
