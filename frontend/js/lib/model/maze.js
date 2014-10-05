/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

/**
 * Represents the explored state of a battlefield offering methods to store and retrieve info.
 *
 * @param _gameName The name of the game for which the mqaze gets constructed.
 * @param _width The width of the game.
 * @param _height The height of the game.
 * @constructor
 */
function Maze(_gameName, _width, _height)
{
    var fieldData = [];
    var processedFields = [];

    var width = _width;
    var height = _height;
    var gameName = _gameName;

    var traveledCoordinates = [];

    /**
     * Initialize an empty maze where '-1' defines not processed..
     */
    this.init = function()
    {
        for (var x=0; x < width; x++)
        {
            fieldData[x] = [];
            processedFields[x] = [];
            for (var y=0; y < height; y++)
            {
                fieldData[x][y] = -1;
                processedFields[x][y] = -1;
            }
        }
    };

    /**
     * Stores a traveled coordinate for displaying later and adds to the processed fields.
     *
     * @param _traveledCoord The coordinate which gets added to the traveled and the processed coordinates.
     */
    this.addTravelledCoordinates = function(_traveledCoord)
    {
        traveledCoordinates.push(_traveledCoord);
        processedFields[_traveledCoord.getPosX()][_traveledCoord.getPosY()] = 1;
    };

    /**
     * Checks if the field at the requested position already is traveled.
     *
     * @param _posX The x-part of the requested position.
     * @param _posY The y-part of the requested position.
     * @returns {boolean} True means that the field already is traveled.
     */
    this.isFieldExplored = function(_posX, _posY)
    {
        if (_posX < 0 || _posX > width - 1) return true;
        if (_posY < 0 || _posY > height - 1) return true;

        if (fieldData[_posX][_posY] == -1)
        {
            return false;
        }
        else return true;
    };

    /**
     * Checks if the field at the requested position already is processed.
     *
     * @param _posX The x-part of the requested position.
     * @param _posY The y-part of the requested position.
     * @returns {boolean} True means that the field already is processed.
     */
    this.isFieldProcessed = function(_posX, _posY)
    {
        if (_posX < 1 || _posX >= width - 1) return true;
        if (_posY < 1 || _posY >= height - 1) return true;

        if (processedFields[_posX][_posY] == 1)
        {
            return true;
        }
        else return false;
    };

    /**
     * Sets a (discovered) value into a field.
     *
     * @param _posX The x-part of the position.
     * @param _posY The y-part of the position.
     * @param _type The discovered type at the position.
     */
    this.setFieldData = function(_posX, _posY, _type)
    {
        console.log("Setting field data [" + _type + "] at (" + _posX + ", " + _posY + ")");
        fieldData[_posX][_posY] = _type;
    };

    /**
     * Returns the type of the field at the requested position.
     *
     * @param _posX The x-part of the requested position.
     * @param _posY The y-part of the requested position.
     * @returns _type The field type at the position.
     */
    this.getFieldData = function(_posX, _posY)
    {
        return fieldData[_posX][_posY];
    };

    /**
     * Returns the width of the underlying battlefield.
     *
     * @returns {*} The width of the underlying battlefield.
     */
    this.getWidth = function()
    {
        return width;
    };

    /**
     * Returns the height of the underlying battlefield.
     *
     * @returns {*} The height of the underlying battlefield.
     */
    this.getHeight = function()
    {
        return height;
    };

    /**
     * Returns the gameName of the underlying battlefield.
     *
     * @returns {*} The gameName of the underlying battlefield.
     */
    this.getGameName = function()
    {
        return gameName;
    }
}
