/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

/**
 * Once the bot is successfully added to a game and the game started, method makeTheMove() will be triggered
 * each round one time as callback, the timer is adjustable with the slider in the battlefield component.
 *
 * The bot will get a game session ID from the server which is valid until the game ends.
 * This credential is generated in the backend and populated here over the nodejs server.
 * This allows the bot to directly communicate over the websocket protocol with the server.
 *
 * @param _botId
 * @param _maze
 * @param _startPosX
 * @param _startPosY
 * @constructor
 */
function Bot(_botId, _maze, _startPosX, _startPosY)
{
    var maze = _maze;
    var botId = _botId;
    var maxEnergy = 4000;
    var energyLeft = 4000;
    var posX = _startPosX;
    var posY = _startPosY;
    var width = maze.getWidth();
    var height = maze.getHeight();

    var battleField = getBattleFielData(maze.getGameName());
    maze.addTravelledCoordinates(new Coordinate(posX, posY));
    drawImageAtPos(loadedImages[10], new Coordinate(posX, posY));

    var actionCosts =
    {
        "moveADefaultField":"500",
        "exploreField":"200",
        "attack":"1000"
    };

    this.setRoundEnergy = function(_newRoundEnergy)
    {
        maxEnergy = _newRoundEnergy;
    };

    this.processRound = function()
    {
        energyLeft = maxEnergy;
        nextMove();
    };

    var isValidMove = function(_coordinate)
    {
        return  _coordinate.getPosX() > 0 && _coordinate.getPosX() < width - 1 &&
                _coordinate.getPosY() > 0 && _coordinate.getPosY() < height - 1 &&
                maze.getFieldData(_coordinate.getPosX(), _coordinate.getPosY()) < 6;
    };

    var nextMove = function()
    {
        if (energyLeft > 0)
        {
            // first explore all fields around us that are not yet explored
            if (!maze.isFieldExplored(posX - 1, posY)) exploreField(posX - 1, posY);
            else if (!maze.isFieldExplored(posX + 1, posY)) exploreField(posX + 1, posY);
            else if (!maze.isFieldExplored(posX, posY - 1)) exploreField(posX, posY - 1);
            else if (!maze.isFieldExplored(posX, posY + 1)) exploreField(posX, posY + 1);
            else
            {
                //console.log("All fields around explored...let's move ahead");
                var newCoord;
                var validMoves = [];
                var possibleMoves = [
                    new Coordinate(posX - 1, posY),
                    new Coordinate(posX + 1, posY),
                    new Coordinate(posX, posY + 1),
                    new Coordinate(posX, posY - 1)
                ];
                for (var i=0; i < possibleMoves.length; i++)
                {
                    if (isValidMove(possibleMoves[i])) validMoves.push(possibleMoves[i]);
                }
                if (validMoves.length == 1) newCoord = validMoves[0];
                else
                {
                    //console.log("More than one (" + validMoves.length + ") valid move left...");
                    var preferedMoves = [];
                    for (var i2=0; i2<validMoves.length; i2++)
                    {
                        if (!maze.isFieldProcessed(validMoves[i2].getPosX(), validMoves[i2].getPosY()))
                        {
                            preferedMoves.push(validMoves[i2]);
                        }
                    }
                    var randomMoves = [];
                    if (preferedMoves.length == 1) newCoord = preferedMoves[0];
                    else
                    {
                        //console.log("More than one (" + preferedMoves.length + ") preferred move left...");
                        if (preferedMoves.length > 1) randomMoves = preferedMoves;
                        else randomMoves = validMoves;

                        var random = Math.floor((Math.random() * 100) + 1);
                        var index = random % randomMoves.length;
                        newCoord = randomMoves[index];
                    }
                }
                moveToPos(newCoord.getPosX(), newCoord.getPosY());
            }
        }
        //else console.log("Out of energy...waiting for next run");
    };

    var moveToPos = function(_posX, _posY)
    {
        //console.log("Bot " + botId + " requests moving to (" + _posX + "," + _posY + ")");
        // toDo: Implement BOT action moveTo(gameId, botId, posX, posY) in a backend controller
        // toDo: It is not possible to move into a wall, over an enemy bot or a not-neighbor-field
        // toDo: Moving (speed?) against a wall or an enemy bot results in damage (game option: wall damage)
        energyLeft = energyLeft - actionCosts.moveADefaultField;
        // the backend action does not exist yet
        onMoveToPosSucess(_posX, _posY);
    };

    var onMoveToPosSucess = function(_posX, _posY)
    {
        //console.log("Bot " + botId + " has moved to (" + _posX + "," + _posY + ")");
        drawBotAt(botId, new Coordinate(_posX, _posY), new Coordinate(posX, posY), battleField);
        maze.addTravelledCoordinates(new Coordinate(_posX, _posY));
        posX = _posX;
        posY = _posY;
        nextMove();
    };

    var exploreField = function(_posX, _posY)
    {
        // console.log("Bot " + botId + " requests exploring field at (" + _posX + "," + _posY + ")");
        energyLeft = energyLeft - actionCosts.exploreField;
        //console.log("Energy left: " + energyLeft);
        // backend call
        processGetFieldState(botId, _posX, _posY, onExploreFieldError, onExploreFieldSuccess)
    };

    var onExploreFieldSuccess = function(_result)
    {
        var parameters = _result.actionParameters;
        var gameName = parameters.gameName;
        var data = _result.generatedData;
        var type = data.type;

        //showAtStatusConsole("Bot " + botId + " discovered field [" + type + "] in game '" + gameName + "' at pos (" + posX + "x" + posY + ")", true);
        drawImageAtPos(loadedImages[type], new Coordinate(parameters.posX, parameters.posY));
        maze.setFieldData(parameters.posX, parameters.posY, type);

        nextMove();
    };

    var onExploreFieldError = function(_xmlHttpRequest, _textStatus, _message)
    {
        var errorCode = _xmlHttpRequest.status;
        var consoleMessage = "Network Error: " + errorCode + " (" + _textStatus + ")" + " {" + _message + "}";
        //console.log("Bot " + botId + " not able to explore field because " + consoleMessage);
        //showAtStatusConsole(consoleMessage, false);
        nextMove();
    };

}
