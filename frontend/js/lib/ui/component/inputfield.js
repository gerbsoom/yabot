function InputField(_id, _type, _inputText, _labelText)
{
    this.container = generateDiv("inputcontainer", _id + "Container");

    var text = addClassAndId(createInputField(_type, _inputText), "tbInputs", _id);
    var label = addClassAndId(createLabelForInputField(text, _labelText), "selectBoxLabel");

    addElementToComponent(this.container, label);
    addElementToComponent(this.container, text);
}
