var canvas;

function generateBattlefieldTabPanel()
{
    var battlefieldTabPanel = generateTabPanelDiv("tabPanel", "battlefieldTabPanel", null, 1280, 1024);

    var leftToolBox = document.createElement("div");
    leftToolBox.setAttribute("className", "leftToolBox");

    var slider = createSlider("toolbarSlider", 1000, 4000, 100, 2000);
    slider.setAttribute("className", "sliderLabel");
    slider.onchange = function()
    {
        var changeLabel = document.getElementById("sliderLabel");
        var changeSlider = document.getElementById("toolbarSlider");
        changeLabel.innerHTML = changeSlider.value + " ms";
    }
    var sliderLabel = addClassAndId(createLabelForInputField(null, "2000 ms"), "sliderLabel", "sliderLabel");
    var sliderLabelDescription = addClassAndId(createLabelForInputField(slider, "Left bar to modify round time: "), "sliderLabel", "sliderLabelDescription");

    addElementToComponent(leftToolBox, sliderLabelDescription);
    addElementToComponent(leftToolBox, slider);
    addElementToComponent(leftToolBox, sliderLabel);


    var slider2 = createSlider("toolbarSlider2", 1000, 8000, 200, 4000);
    slider2.setAttribute("className", "sliderLabel2");
    slider2.onchange = function()
    {
        var changeLabel2 = document.getElementById("sliderLabel2");
        var changeSlider2 = document.getElementById("toolbarSlider2");
        changeLabel2.innerHTML = "+" + changeSlider2.value + " $";
    }
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
    }
    addElementToComponent(rightToolBox, loadBattlefieldButton);

    var explorerBotButton = addClassAndId(generateButton("explorerBotButton", "Add ExplorerBot"), "battlefieldButton");
    explorerBotButton.onclick = function ()
    {
        loadImagesWithCallback(startLocalExplorerBot);
    }
    addElementToComponent(rightToolBox, explorerBotButton);

    var serverBotButton = addClassAndId(generateButton("serverBotButton", "Add RealGameBot"), "battlefieldButton");
    serverBotButton.onclick = onAddBotToServerGame;
    addElementToComponent(rightToolBox, serverBotButton);

    /**for (var i=1 ;i<5 ;i++) addElementToComponent(rightToolBox, generateButton("blabka" + i, "TESTButten- Text" + i))*/
    var canvasComponent = generateDiv("component", "CanvasComponent");
    canvas = generateCanvas("canvasPaintDiv", 1280, 1024);
    canvasComponent.appendChild(canvas);
    addElementToComponent(battlefieldTabPanel, canvasComponent);

    return battlefieldTabPanel;
}

function onAddBotToServerGame()
{
    processAddBotToServerGame(getJoinedGame(), "test");
}

function startLocalExplorerBot(botImages, imageArray)
{
    // get current game from cache and explore it
    var battleField = getBattleFielData(getJoinedGame());
    var oldCoordinate = new Coordinate(1, 1);
    var newCoordinate = new Coordinate(1, 1);
    //var explorerBot = new Bot(1, getLoggedInUser(), middle, middle, 5000);
    for (var x=2; x<15; x++)
    {
        for (var y=2; y<15; y++)
        {
            oldCoordinate = new Coordinate(newCoordinate.getPosX(), newCoordinate.getPosY());
            newCoordinate = new Coordinate(x, y);
            drawLocalBot(battleField, botImages, imageArray, newCoordinate, oldCoordinate);
            oldCoordinate = newCoordinate;
        }
    }
}

function drawBotAt(_newCoord, _oldCoord)
{
    var botImage = createImage("img/bots/explorerbot.png");
    drawLocalBot(null, botImage , null, _newCoord);
}

function drawLocalBot(_battlefield, _botImages, _imageArray, _newCoord, _oldCoord)
{
    if (_oldCoord)
    {// restore old field from cached battlefield
        var _oldType = _battlefield[_oldCoord.getPosX()][_oldCoord.getPosY()];
        console.log("oldType" + _oldType);
        drawImageAtPos(_imageArray[_oldType], _oldCoord);
    }
    // and draw the bot at the new location
    drawImageAtPos(_botImages[0], _newCoord);
}

function loadImagesWithCallback(callback)
{
    var botImages = [createImage("img/bots/explorerbot.png")];
    var imageArray = [];
    imageArray.push(createImage("img/tileset/0_item_random.png"));
    imageArray.push(createImage("img/tileset/1_field_neutral.png"));
    imageArray.push(createImage("img/tileset/2_field_blue_bot.png"));
    imageArray.push(createImage("img/tileset/3_field_black_bot.png"));
    imageArray.push(createImage("img/tileset/4_field_lightblue_bot.png"));
    imageArray.push(createImage("img/tileset/5_field_lightblack_bot.png"));
    imageArray.push(createImage("img/tileset/6_wall_brick.png"));
    imageArray.push(createImage("img/tileset/7_wall_vertical.png"));
    imageArray.push(createImage("img/tileset/8_wall_horizontal.png"));
    imageArray.push(createImage("img/tileset/9_wall_connector.png"));

    var loadedImages = 0;
    var numImages = botImages.length + imageArray.length;
    for (var a1=0; a1 < botImages.length; a1++)
    {
        botImages[a1].onload = function()
                           {
                                if(++loadedImages >= numImages)
                                {
                                    callback(botImages, imageArray);
                                }
        };
    }
    for (var a2=0; a2 < imageArray.length; a2++)
    {
        imageArray[a2].onload = function()
        {
            if(++loadedImages >= numImages)
            {
                callback(botImages, imageArray);
            }
        };
    }
}

function loadImages()
{
    var imageArray = [];
    imageArray.push(createImage("img/tileset/0_item_random.png"));
    imageArray.push(createImage("img/tileset/1_field_neutral.png"));
    imageArray.push(createImage("img/tileset/2_field_blue_bot.png"));
    imageArray.push(createImage("img/tileset/3_field_black_bot.png"));
    imageArray.push(createImage("img/tileset/4_field_lightblue_bot.png"));
    imageArray.push(createImage("img/tileset/5_field_lightblack_bot.png"));
    imageArray.push(createImage("img/tileset/6_wall_brick.png"));
    imageArray.push(createImage("img/tileset/7_wall_vertical.png"));
    imageArray.push(createImage("img/tileset/8_wall_horizontal.png"));
    imageArray.push(createImage("img/tileset/9_wall_connector.png"));

    return imageArray;
}

function drawBattleField(_battlefield)
{
    console.log("Start drawing the maze...");
    var scale = 25;
    var ctx = canvas.getContext("2d");
    var imageTypes = loadImages();
    var imageTypeTexts = ["Bonus-Item", "Empty-Field", "Player1 (Blue)", "Player2 (Black)", "Player3 (Blue2)", "Player4 (Black2)", "Indestructible Wall"];

    for (var x=0; x < _battlefield.length; x++)
    {
        for (var y=0; y < _battlefield.length; y++)
        {
            ctx.drawImage(imageTypes[_battlefield[x][y].type], x*scale, y*scale);
        }
    }

    ctx.font = "16pt Arial";
    ctx.fillStyle = "white";
    var legendeStartX = 15;
    var legendeStartY = scale * _battlefield.length + 25;

    for (var i=0; i <= 6; i++)
    {
        ctx.drawImage(imageTypes[i], legendeStartX, legendeStartY + i*scale);
        ctx.fillText(imageTypeTexts[i], legendeStartX + 35, legendeStartY + (i+1)*scale - 5);
    }

}

function drawImageAtPos(_image, _coord)
{
    var scale = 25;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(_image, _coord.getPosX()*scale, _coord.getPosY()*scale);
}

function imageForType(_type)
{
    return loadImages()[_type];
}

/**
canvas.addEventListener('mousemove', function(evt)
{
    var mousePos = getMousePos(evt);
    var message = mousePos.x + ',' + mousePos.y;
    writeMessage(message);
}, false);

function getMousePos(evt)
{
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function writeMessage(_message)
{
    var context = canvas.getContext('2d');
    context.clearRect(800, 200, 200, 200);
    context.font = '18pt Calibri';
    context.fillStyle = 'white';
    context.fillText(_message, 800, 200);
}
*/