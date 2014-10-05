/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

/**
 * The ComponentRegister offers methods to register and retrieve objects.
 *
 * Items can get stored by object type like 'inputField' or 'selectBox' and a convenient identifier (tab + short name).
 * Another possibility is to index components by specific update channels, for example to receive all 'status-updates'.
 * So it would make sense to hold all components in a queue together that react on an 'onLoginStateChange' event.
 * toDo: Is it a good place here for this event subscribing mechanism ;/
 * @constructor
 */
function ComponentRegister()
{
    var inputFields = [];
    var selectionBoxes = [];
    var statusUpdateSubscriber = [];
    var loginStatusUpdateSubscriber = [];

    /**
     * Registers the provided InputField under a short index.
     *
     * @param _inputField The InputField that gets registered.
     * @param _tabName The TabName where the component is located.
     * @param shortName The short name of the component for retrieving.
     */
    this.registerInputField = function(_inputField, _tabName, shortName)
    {
        inputFields[_tabName + "-" + shortName] = _inputField;
    };

    /**
     * Retrieves a registered InputField under a short index.
     *
     * @param _tabName The TabName where the component is located.
     * @param shortName The short name of the component for retrieving.
     */
    this.getRegisteredInputField = function(_tabName, shortName)
    {
        var index = _tabName + "-" + shortName;
        if (index in inputFields)
        {
            return inputFields[index];
        }
        else console.log("getRegisterInputField(): Not able to retrieve " + index);
        return null;
    };

    /**
     * Registers the provided SelectionBox under a short index.
     *
     * @param _selectionBox The SelectionBox that gets registered.
     * @param _tabName The TabName where the component is located.
     * @param shortName The short name of the component for retrieving.
     */
    this.registerSelectionBox = function(_selectionBox, _tabName, shortName)
    {
        selectionBoxes[_tabName + "-" + shortName] = _selectionBox;
    };

    /**
     * Retrieves the registered SelectionBox under a short index.
     *
     * @param _tabName The TabName where the component is located.
     * @param shortName The short name of the component for retrieving.
     */
    this.getRegisteredSelectionBox = function(_tabName, shortName)
    {
        var index = _tabName + "-" + shortName;
        if (index in selectionBoxes)
        {
            return selectionBoxes[index];
        }
        else console.log("getRegisteredSelectionBox(): Not able to retrieve " + index);
        return null;
    };

    /**
     * Subscribes the provided component to the StatusUpdate channel.
     *
     * @param _component The component which gets subscribed to the StatusUpdate channel.
     */
    this.subscribeToStatusUpdates = function(_component)
    {
        statusUpdateSubscriber.push(_component);
    };

    /**
     * Notifies all subscribers on status updates.
     *
     * @param _updateType The type of the update.
     * @param _updatedValue The updated value.
     */
    this.onStatusUpdate = function(_updateType, _updatedValue)
    {
        for (var i=0; i < statusUpdateSubscriber.length; i++)
        {
            statusUpdateSubscriber[i].notify(_updateType, _updatedValue);
        }
    };

    /**
     * Subscribes the provided component to the LoginStatusUpdate channel.
     *
     * @param _component The component which gets subscribed to the LoginStatusUpdate channel.
     */
    this.subscribeToLoginStatusUpdates = function(_component)
    {
        loginStatusUpdateSubscriber.push(_component);
    };

    /**
     * Notifies all subscribers on login status updates.
     *
     * @param _updateType The type of the update.
     * @param _updatedValue The updated value.
     */
    this.onLoginStatusUpdate = function(_updateType, _updatedValue)
    {
        for (var i=0; i < loginStatusUpdateSubscriber.length; i++)
        {
            loginStatusUpdateSubscriber[i].notify(_updateType, _updatedValue);
        }
    };

}
