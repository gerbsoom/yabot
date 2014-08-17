/**
 * Once the bot is successfully added to a game and the game started, method makeTheMove() will be triggered
 * each round one time as callback, the timer is adjustable with the slider in the battlefield component.
 *
 * The bot will get a game session ID from the server which is valid until the game ends.
 * This credential is generated in the backend and populated here over the nodejs server.
 * This allows the bot to directly communicate over the websocket protocol with the server.
 *
 * @param _id
 * @param userId
 * @param _posX
 * @param _posY
 * @param _roundTime
 * @constructor
 */
function Bot(_id, userId, _posX, _posY, _roundTime)
{
    this.id = _id;
    this.posX = _posX;
    this.posY = _posY;
    this.userId = userId;
    this.energy = 100000;
    this.timeLeft = 3000;

    this.basicTimeCosts =
    {// All times in miliseconds
        "moveADefaultField":"500",
        "exploreNeighborField":"500",
        "aimAt":"250",  // depends on enemy range
        "attack":"750", // melee not equal to range
        "defense":1000
    };

    this.makeTheMove = function()
    {
        while (this.timeLeft)
        {
           if (this.timeLeft < 0)
           {
               alert("BotMove finished!!!");
               return new Coordinate(this.x, this.y);
           }

            var rand = Math.floor((Math.random() * 10) + 1);
            if (rand < 3) this.moveToPos(_posX + 1, _posY);
            else if (rand < 5) this.moveToPos(_posX, _posY + 1);
            else if (rand < 7) this.moveToPos(_posX - 1, _posY);
            else if (rand < 9) this.moveToPos(_posX, _posY - 1);

            else this.exploreNeighborField(_posX, _posY); //...?
        }
        return new Coordinate(this.x, this.y);
    }

    // timeout, interval, Server nen callback mitgeben?
    this.exploreNeighborField = function(_posX, _posY)
    {
        console.log("Exploring neighborfield at (" + _posX + "," + _posY + ")");
        this.timeLeft = this.timeLeft - 500;
        return "nichts entdeckt!";
    }

    this.moveToPos = function(_posX, _posY)
    {
        console.log("Try to Move one field to (" + _posX + "," + _posY + ")");
        // ckeck if it is possible to trabel to the new position
        var neighboorField = this.exploreNeighborField(_posX, _posY);
        if (neighboorField)
        {
            ;
        }
        // else move there copy your sprite there and repair the old battle field tile from model
        this.timeLeft = this.timeLeft - 500;
    }

    this.travelCoordList = function(_coordList)
    {

    }

    this.shout = function(_text)
    {

    }

    this.aimAt = function(_target)
    {

    }

    this.defense = function()
    {

    }

    this.attack = function()
    {

    }

    this.setRoundTime = function()
    {

    }

    this.setPosX = function(_newPosX)
    {
        this.posX = _newPosX;
    }

    this.setPosY = function(_newPosY)
    {
        this.posY = _newPosY;
    }

    this.getPosX = function()
    {
        return this.posX;
    }

    this.getPosY = function()
    {
        return this.posY;
    }
//  ___________________________________________________________
    var privat = 'blubb';
    var privateAlert = function() { alert(privat); }
    this.publicAlert = function(_input) { alert(_input); }
}