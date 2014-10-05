/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

/**
 * Small math helper to avoid some lines of code.
 *
 * @param _posX The X-part of the Coordinate.
 * @param _posY The Y-part of the Coordinate.
 * @constructor
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
