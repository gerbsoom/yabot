function Battlefield(_gameName, _battleField)
{
    var battlefield = parseBattlefield(_battleField);
    this.battlefield = _battleField;

    this.setBattleField = function(_battleField)
    {
        if (_battleField) this.battlefield = parseBattlefield(_battleField);
    };

    this.updateBattleField = function(_posX, _posY)
    {

    };

    this.getTileAt = function(_posX, _posY)
    {

    }

    function parseBattlefield(_battleField)
    {
        if (_battleField)
        {
            for (var i=0; i < _battleField.length; i++)
            {
                //console.log(_battleField[i]);
            }
        }
        else console.log(_battleField);
    }

}
