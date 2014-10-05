/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

function SelectBox(_id, _selectBoxContent, _labelText)
{
    this.container = generateDiv("selectBoxContainer", _id + "Container");

    var text = addClassAndId(createComboBox(_selectBoxContent), "selectBox-style-small", _id);
    var label = addClassAndId(createLabelForInputField(text, _labelText), "selectBoxLabel");

    registerComponent("RegisteredSelectBox_" + _id, this);

    this.comboBox = function()
    {
        return text;
    }

    addElementToComponent(this.container, label);
    addElementToComponent(this.container, text);
}
