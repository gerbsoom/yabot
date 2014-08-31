function Maze(_gameName, _width, _height)
{
    var fieldData = [];
    var processedFields = [];

    var width = _width;
    var height = _height;
    var gameName = _gameName;
    var fieldTypes =
    [
        "unknown",
        "empty",
        "wall",
        "bot"
    ];

    var traveledCoordinates = [];

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

    this.addTravelledCoordinates = function(_traveledCoord)
    {
        traveledCoordinates.push(_traveledCoord);
        processedFields[_traveledCoord.getPosX()][_traveledCoord.getPosY()] = 1;
    }

    this.isFieldExplored = function(_posX, _posY)
    {
        if (_posX < 0 || _posX > width - 1) return true;
        if (_posY < 0 || _posY > height - 1) return true;

        if (fieldData[_posX][_posY] == -1)
        {
            return false;
        }
        else return true;
    }

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

    this.setFieldData = function(_posX, _posY, _type)
    {
        console.log("Setting field data [" + _type + "] at (" + _posX + ", " + _posY + ")");
        fieldData[_posX][_posY] = _type;
    };

    this.getFieldData = function(_posX, _posY)
    {
        return fieldData[_posX][_posY];
    };

    this.getWidth = function()
    {
        return width;
    };

    this.getHeight = function()
    {
        return height;
    };

    this.getGameName = function()
    {
        return gameName;
    }
}
