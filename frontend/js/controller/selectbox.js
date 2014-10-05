/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

function addUserToComboBox(_userName)
{
    var userComboBox = document.getElementById("userComboBox");
    userComboBox.options[userComboBox.options.length] = new Option(_userName, 0);
}

function addItemToComboBox(_comboBox, _gameName)
{
    for (var i=0; i < _comboBox.options.length; i++)
    {
        var entry = _comboBox.options[i];
        if (entry.text == _gameName)
        {
            console.log("Skip adding redundant entry " + _gameName);
            return null;
        }
    }
    _comboBox.options[_comboBox.options.length] = new Option(_gameName, 0);
    return true;
}
