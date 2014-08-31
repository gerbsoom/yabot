var registeredComponents = [];

function registerComponent(_componentId, _component)
{
    //console.log("Registering component: " + _componentId);
    registeredComponents[_componentId] = _component;
}

function getRegisteredComponent(_componentId)
{
    return registeredComponents[_componentId];
}
