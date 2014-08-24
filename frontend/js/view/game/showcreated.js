var previewCanvas;
var scaling = 1;

function generateShowCreatedPanel()
{
    var generateShowCreatedPanel = generateDiv("float-left", "generateShowCreatedPanel", "<h1>Show created games: </h1><p></p>");

    var createdGamesComboBox = addClassAndId(createComboBox(getCreatedGames()), "select-style", "createdGamesComboBox");
    addElementToComponent(generateShowCreatedPanel, createdGamesComboBox);

    var showPreviewButton = addClassAndId(generateButton("showPreviewButton", "Show Preview"), "gameMenuButtons", "showPreviewButton");
    showPreviewButton.onclick = function()
    {
        var selectBoxCreatedGames = document.getElementById("createdGamesComboBox");
        drawPreviewMaze(selectBoxCreatedGames.options[selectBoxCreatedGames.selectedIndex].text);
    }
    addElementToComponent(generateShowCreatedPanel, showPreviewButton);

    var previewCanvasComponent = generateDiv("component", "CanvasComponent");
    previewCanvas = generateCanvas("canvasPaintDiv", 400, 300);
    previewCanvasComponent.appendChild(previewCanvas);
    addElementToComponent(generateShowCreatedPanel, previewCanvas);

    return generateShowCreatedPanel;
}

function drawPreviewMaze(_gameName)
{
    console.log("Start drawing preview maze: " + _gameName);
    var battlefield = getBattleFielData(_gameName);
    console.log(battlefield);
    var iconSize = 25;
    var ctx = previewCanvas.getContext("2d");
    // restore origin scaling
    ctx.scale(1/scaling, 1/scaling);
    //                  0  4   8     12    16    20    24    28     32   36     40   44    48
    var scaleFactors = [0, 1, 0.88, 0.66, 0.44, 0.39, 0.33, 0.27, 0.22, 0.20, 0.18, 0.16, 0.15];

    scaling = scaleFactors[battlefield.length/4];
    ctx.scale(scaling,scaling);

    for (var x=0; x < battlefield.length; x++)
    {
        for (var y=0; y < battlefield.length; y++)
        {
            console.log("Type=" + battlefield[x][y]);
            ctx.drawImage(loadedImages[battlefield[x][y]], x*iconSize, y*iconSize);
        }
    }
}
