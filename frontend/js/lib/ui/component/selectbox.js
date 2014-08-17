function SelectBox(_id, _selectBoxContent, _labelText)
{
    this.container = generateDiv("selectBoxContainer", _id + "Container");

    var text = addClassAndId(createComboBox(_selectBoxContent), "selectBox-style-small", _id);
    var label = addClassAndId(createLabelForInputField(text, _labelText), "selectBoxLabel");

    addElementToComponent(this.container, label);
    addElementToComponent(this.container, text);
}
