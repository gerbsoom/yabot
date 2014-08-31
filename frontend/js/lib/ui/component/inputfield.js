function InputField(_id, _type, _inputText, _labelText)
{
    this.container = generateDiv("inputcontainer", _id + "Container");

    var text = addClassAndId(createInputField(_type, _inputText), "tbInputs", _id);
    var label = addClassAndId(createLabelForInputField(text, _labelText), "selectBoxLabel");

    registerComponent("RegisteredInputField_" + _id, this);

    addElementToComponent(this.container, label);
    addElementToComponent(this.container, text);
    this.setFieldText = function(_text)
    {
        text.value = _text;
    }
    this.fieldText = function()
    {
        return text;
    }
}
