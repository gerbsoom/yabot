/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

/**
 * There is now a better but still not even solution with the ComponentRegister constructor under /lib/ui/.
 * The problem is that it registers components but also event classes which seem to correlate with UI elements.
 */

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
