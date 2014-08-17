function Coordinate(_posX, _posY)
{
    this.posX = _posX;
    this.posY = _posY;

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
}
