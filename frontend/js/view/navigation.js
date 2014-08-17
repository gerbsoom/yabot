function generateNavigation(_navConfig)
{
    var navigation = generateDiv("navigation", "navigation", null);

    for (var i = 0; i < _navConfig.length; i++)
    {
        addElementToComponent(navigation, generateTDLink(_navConfig[i]));
    }
    return navigation;
}
