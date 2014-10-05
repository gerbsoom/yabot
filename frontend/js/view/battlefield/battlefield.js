/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

var canvas;
var scalingBattlefield = 1;
var botPosition = [];
var explorerBot = null;
var explorerBotTimer;

function getCurrentBotPos(_botId)
{
    return botPosition[_botId];
}

function generateBattlefieldTabPanel()
{
    var battlefieldTabPanel = generateTabPanelDiv("tabPanel", "battlefieldTabPanel", null, 1280, 1024);

    var leftToolBox = document.createElement("div");
    leftToolBox.setAttribute("className", "leftToolBox");

    var slider = createSlider("toolbarSlider", 500, 9800, 100, 4000);
    slider.setAttribute("className", "sliderLabel");
    slider.onchange = function()
    {
        var changeLabel = document.getElementById("sliderLabel");
        var changeSlider = document.getElementById("toolbarSlider");
        changeLabel.innerHTML = changeSlider.value + " ms";
        adjustRoundTime(changeSlider.value);
    };
    var sliderLabel = addClassAndId(createLabelForInputField(null, "4000 ms"), "sliderLabel", "sliderLabel");
    var sliderLabelDescription = addClassAndId(createLabelForInputField(slider, "Left bar to modify round time: "), "sliderLabel", "sliderLabelDescription");

    addElementToComponent(leftToolBox, sliderLabelDescription);
    addElementToComponent(leftToolBox, slider);
    addElementToComponent(leftToolBox, sliderLabel);


    var slider2 = createSlider("toolbarSlider2", 2000, 9800, 200, 4000);
    slider2.setAttribute("className", "sliderLabel2");
    slider2.onchange = function()
    {
        var changeLabel2 = document.getElementById("sliderLabel2");
        var changeSlider2 = document.getElementById("toolbarSlider2");
        changeLabel2.innerHTML = "+" + changeSlider2.value + " $";
        adjustRoundEnergy(changeSlider2.value);
    };
    var sliderLabel2 = addClassAndId(createLabelForInputField(null, "+4000 $"), "sliderLabel2", "sliderLabel2");
    var sliderLabelDescription2 = addClassAndId(createLabelForInputField(slider2, "Right bar to modify reinforcements: "), "sliderLabel2", "sliderLabelDescription2");

    addElementToComponent(battlefieldTabPanel, leftToolBox);
    addElementToComponent(leftToolBox, sliderLabel2);
    addElementToComponent(leftToolBox, slider2);
    addElementToComponent(leftToolBox, sliderLabelDescription2);

    var rightToolBox = document.createElement("div");
    rightToolBox.setAttribute("className", "rightToolBox");
    addElementToComponent(battlefieldTabPanel, rightToolBox);

    var loadBattlefieldButton = addClassAndId(generateButton("loadBattlefieldButton", "Load Battlefield"), "battlefieldButton");
    loadBattlefieldButton.onclick = function()
    {
        processGetCurrentBattlefieldState(getJoinedGame());
    };
    addElementToComponent(rightToolBox, loadBattlefieldButton);

    var explorerBotButton = addClassAndId(generateButton("explorerBotButton", "Add ExplorerBot"), "battlefieldButton");
    explorerBotButton.onclick = startLocalExplorerBot;
    addElementToComponent(rightToolBox, explorerBotButton);

    var serverBotButton = addClassAndId(generateButton("serverBotButton", "Add RealGameBot"), "battlefieldButton");
    serverBotButton.onclick = processAddBotToServerGame;
    addElementToComponent(rightToolBox, serverBotButton);

    var canvasComponent = generateDiv("component", "CanvasComponent");
    canvas = generateCanvas("canvasPaintDiv", 1280, 1024);
    canvasComponent.appendChild(canvas);
    addElementToComponent(battlefieldTabPanel, canvasComponent);

    return battlefieldTabPanel;
}

function startLocalExplorerBot()
{
    var gameName = getJoinedGame();
    var gameDiemension = getBattleFielData(gameName).length;
    var maze = new Maze(gameName, gameDiemension, gameDiemension);
    maze.init();
    // toDo: get a free player start corner
    explorerBot = new Bot("explorer", maze, 2, 2);
    explorerBot.setRoundEnergy(document.getElementById("toolbarSlider").value);
    stopClosedAnimation();
    clearInterval(explorerBotTimer);
    explorerBotTimer = setInterval(explorerBot.processRound, document.getElementById("toolbarSlider2").value);
}

function adjustRoundTime(_newInterval)
{
    if (explorerBot != null)
    {
        clearInterval(explorerBotTimer);
        explorerBotTimer = setInterval(explorerBot.processRound, _newInterval);
    }
}

function adjustRoundEnergy(_newRoundEnergy)
{
    if (explorerBot != null) explorerBot.setRoundEnergy(_newRoundEnergy);
}

function drawBotAt(_botId, _newCoord, _oldCoord, _battlefield)
{
    var _oldType = _battlefield[_oldCoord.getPosX()][_oldCoord.getPosY()];
    drawImageAtPos(loadedImages[_oldType], _oldCoord);
    // and draw the bot at the new location
    if (_botId == "explorer") drawImageAtPos(loadedImages[10], _newCoord);
    else drawImageAtPos(loadedImages[11], _newCoord);
    botPosition[_botId] = _newCoord;
}

function drawImageAtPos(_image, _coord)
{
    var scale = 25;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(_image, _coord.getPosX()*scale, _coord.getPosY()*scale);
}

function drawBattleField(_battlefield)
{
    var scale = 25;
    var ctx = canvas.getContext("2d");
    var imageTypeTexts = ["Bonus-Item", "Empty-Field", "Player1 (Blue)", "Player2 (Black)", "Player3 (Blue2)", "Player4 (Black2)", "Indestructible Wall"];

    ctx.scale(1/scalingBattlefield, 1/scalingBattlefield);
    if (_battlefield.length <= 16)
    {
        scalingBattlefield = 1;
    }
    else
    {
        var bfHeight = scale * (_battlefield.length + 7) + 25;
        scalingBattlefield = 1024 / bfHeight;
    }
    console.log("Scaling: " + scalingBattlefield);
    ctx.scale(scalingBattlefield, scalingBattlefield);

    ctx.clearRect(0, 0, 1280, 1024);

    for (var x=0; x < _battlefield.length; x++)
    {
        for (var y=0; y < _battlefield.length; y++)
        {
            ctx.drawImage(loadedImages[_battlefield[x][y].type], x*scale, y*scale);
        }
    }

    ctx.font = "16pt Arial";
    ctx.fillStyle = "white";
    var legendeEnd;
    var legendeStartX = 15;
    var legendeStartY = scale * _battlefield.length + 25;

    for (var i=0; i <= 6; i++)
    {
        ctx.drawImage(loadedImages[i], legendeStartX, legendeStartY + i*scale);
        ctx.fillText(imageTypeTexts[i], legendeStartX + 35, legendeStartY + (i+1)*scale - 5);
        legendeEnd = legendeStartY + (i+1)*scale;
    }
}
