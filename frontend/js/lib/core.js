function addElementToComponent(_component, _newElement)
{
    _component.appendChild(_newElement);
}

function removeElementFromComponent(_component, _element)
{
    _component.removeChild(_element);
}

function addClassAndId(_object, _className, _tagId)
{
    if (_className) _object.setAttribute('class', _className);
    if (_tagId) _object.setAttribute('id', _tagId);
    return _object;
}

function generateTDLink(_linkInfo)
{
    var newTDLink = document.createElement('td');
    newTDLink.setAttribute('id', _linkInfo["tagId"]);
    newTDLink.setAttribute('class', _linkInfo["className"]);
    newTDLink.innerHTML = _linkInfo["innerText"];
    return newTDLink;
}

function generateCanvas(_tagId, _width, _height)
{
    var newCanvas = document.createElement('canvas');
    if (_tagId) newCanvas.setAttribute('id', _tagId);
    if (_width) newCanvas.setAttribute('width', _width);
    if (_height) newCanvas.setAttribute('height', _height);
    return newCanvas;
}

function generateDiv(_className, _tagId, _innerText, _style)
{
    var newDiv = document.createElement('div');
    if (_className) newDiv.setAttribute('class', _className);
    if (_tagId) newDiv.setAttribute('id', _tagId);
    if (_innerText != null) newDiv.innerHTML = _innerText;
    if (_style != null) newDiv.setAttribute('style', _style);
    return newDiv;
}


function generateClearFixElement()
{
    return generateDiv("clearfix");
}

function generateTabPanelDiv(_className, _tagId, _style, _width, _height, _tabName)
{
    var newTabPanel = generateDiv(_className, _tagId, null, _style);
    newTabPanel.setAttribute('width', _width);
    newTabPanel.setAttribute('height', _height);
    if (_tabName)
    {// tabName will probably be a styled paragraph, div or span without margins and and a special border
        var tabNameLabel = document.createElement('span');
        tabNameLabel.setAttribute('class', "tabNameLabel");
        tabNameLabel.innerHTML = _tabName;
        newTabPanel.appendChild(tabNameLabel);
    }
    return newTabPanel;
}

function generateNavigationConfigArray(_links)
{
    var navConfig = [];
    for (var i=0; i < _links.length; i++)
    {
        navConfig[i] = {};
        navConfig[i]["tagId"] = "navButton" + i;
        navConfig[i]["className"] = "navButton";
        navConfig[i]["innerText"] = "<span onClick=\"showTabPanel(" + i + ")\">" + _links[i] + "</span>";
        navConfig[i]["linkUrl"] = "./playground.html";
    }
    return navConfig;
}

function createImage(_src, _width, _height)
{
    var image = document.createElement("img");
    image.setAttribute('src', _src);
    if (_width) image.setAttribute('width', _width);
    if (_height) image.setAttribute('height', _height);
    return image;
}

function createComboBox(_content)
{
    var newComboBox = document.createElement('select');
    if (_content)
    {
        for(var i=0; i < _content.length; i++)
        {
            newComboBox.options.add(new Option(_content[i], i));
        }
    }
    return newComboBox;
}

function createLabelForInputField(_inputField, _labelText)
{
    var itemLabel = document.createElement("Label");
    if (_inputField) itemLabel.setAttribute("for", _inputField);
    itemLabel.innerHTML = _labelText;
    return itemLabel;
}

function createInputField(_type, _text)
{
    var inputField = document.createElement("input");
    inputField.setAttribute('type', _type);
    inputField.setAttribute('value', _text);
    return inputField;
}

function generateButton(_buttonId, _buttonText)
{
    var newButton = document.createElement("button");
    newButton.setAttribute('id', _buttonId);
    var text = document.createTextNode(_buttonText);
    newButton.appendChild(text);
    return newButton;
}

function createTextArea(_text)
{
    var textArea = document.createElement("textArea");
    textArea.innerHTML = _text;
    return textArea;
}


function createSlider(_id, _min, _max, _step, _value)
{
    var slider = document.createElement("input");
    slider.setAttribute('type', "range");
    slider.setAttribute('id', _id);
    slider.setAttribute('min', _min);
    slider.setAttribute('max', _max);
    slider.setAttribute('step', _step);
    slider.setAttribute('value', _value);

    return slider;
}
