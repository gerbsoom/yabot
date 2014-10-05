/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

function Coordinate(_posX, _posY)
{
    var posX = _posX;
    var posY = _posY;

    this.setPosX = function(_newPosX)
    {
        posX = _newPosX;
    }

    this.setPosY = function(_newPosY)
    {
        posY = _newPosY;
    }

    this.getPosX = function()
    {
        return posX;
    }

    this.getPosY = function()
    {
        return posY;
    }
}
