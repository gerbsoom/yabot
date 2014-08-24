var closedImage, bgImage;
var closedCanvas;
var offsetBGY = -300;
var offsetX = 100;
var modifier = 1;
var bgModifier = 1;

function generateClosedTabPanel()
{
    var closedTabPanel = generateTabPanelDiv("tabPanel", "closedTabPanel", null, 800, 300);

    var closedCanvasComponent = generateDiv("component", "closedCanvasComponent");
    closedCanvas = generateCanvas("closedCanvas", 800, 300);
    closedCanvasComponent.appendChild(closedCanvas);
    addElementToComponent(closedTabPanel, closedCanvas);

    bgImage = createImage("img/closed_background.png");
    closedImage = createImage("img/closed.png");
    closedImage.onload = setInterval(drawClosedCanvas, 50);

    return closedTabPanel;
}

function drawClosedCanvas()
{
    if (activeTab == 6)
    {
        var ctx = closedCanvas.getContext("2d");
        ctx.clearRect(0, 0, 800, 300);
        ctx.drawImage(bgImage, 0, offsetBGY);
        ctx.drawImage(closedImage, offsetX, 0);
        if (offsetX > 200) modifier *= -1;
        else if (offsetX < 0)  modifier *= -1;
        offsetX += 2*modifier;
        if (offsetBGY > 0) bgModifier *= -1;
        else if (offsetBGY < -300)  bgModifier *= -1;
        offsetBGY += 3*bgModifier;
    }
}