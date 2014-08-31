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
