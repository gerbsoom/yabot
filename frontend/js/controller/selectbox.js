/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

/**
 * Offers comboBox-related methods - addItemToComboBox() could move to core.js or into the selectBox UI component.
 *
 * The remaining global function addUserToComboBox() is not worth the file.
 */

/**
 * Adds the provided userName to the userComboBox.
 *
 * @param _userName The user that gets added to the userComboBox.
 */
function addUserToComboBox(_userName)
{
    var userComboBox = document.getElementById("userComboBox");
    userComboBox.options[userComboBox.options.length] = new Option(_userName, 0);
}

/**
 * Adds the provided item to the provided comboBox.
 *
 * @param _comboBox The comboBox where the item gets added.
 * @param _itemName The item that gets added to the comboBox.
 * @returns {boolean} True means that the item was added successfully.
 */
function addItemToComboBox(_comboBox, _itemName)
{
    for (var i=0; i < _comboBox.options.length; i++)
    {
        var entry = _comboBox.options[i];
        if (entry.text == _itemName)
        {
            console.log("Skip adding redundant entry " + _itemName);
            return null;
        }
    }
    _comboBox.options[_comboBox.options.length] = new Option(_itemName, 0);
    return true;
}
