<?php
/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

/**
 * Entry point for the botgame PHP backend where all available actions can be triggered.
 */
require_once("boot.php");

// register an own SessionSaveHandler to store session data in Rediska
$handler = new SessionSaveHandler($rediska, "botgame/sessionKeys/");

session_set_save_handler
(
    array($handler, 'open'),
    array($handler, 'close'),
    array($handler, 'read'),
    array($handler, 'write'),
    array($handler, 'destroy'),
    array($handler, 'gc')
);

// the following prevents unexpected effects when using objects as save handlers
register_shutdown_function('session_write_close');
session_start();

$log = LoggerRegistry::getLogger("entrypoint");

/**
 * Exits with an error message.
 *
 * @param string $_errorMessage The error message gets displayed.
 */
function dieOutputError($_errorMessage)
{
    $log = LoggerRegistry::getLogger("entrypoint_DIED_");
    $log->err($_errorMessage);
    die($_errorMessage);
}

/**
 * Returns the BackendResult which was generated in the corresponding controller or handler.
 *
 * @param string $_response The generated BackendResult as JSON result.
 */
function sendResponse($_response)
{
    $log = LoggerRegistry::getLogger("entrypoint_SUCCESS_");
    $log->debug($_response);
    header('Content-type: application/json');
    echo $_response;
}

/**
 * Returns the requested key from GET or POST parameters.
 *
 * toDo: Remove when the stuff works, we want only POST.
 *
 * @param string $_key The key of the requested value.
 * @return string The retrieved value.
 */
function submittedValueFor($_key)
{
    if (isset($_POST[$_key]))
    {
        return $_POST[$_key];
    }
    else  if (isset($_GET[$_key]))
    {
        return $_GET[$_key];
    }
    else return "";
}

$components = new Components();
$actions = $components->getActions();
$controller = $components->getController();

$loginName = submittedValueFor("loginName");
$controllerName = submittedValueFor("controller");
$_SESSION['user']['username'] = $loginName;
if (in_array($controllerName, array_keys($actions)))
{
    $action = submittedValueFor("action");
    $log->debug("_____________________________________________________________________________________________________");
    $log->debug("Serving request [$controllerName|$action] for user: $loginName");
    if (in_array($action, $actions[$controllerName]["actions"]))
    {
        $parsedParameters = array("controller"=>$controllerName, "action"=>$action);
        foreach ($actions[$controllerName]["params"] as $parameter)
        {
            $value = submittedValueFor($parameter);
            if ($value) $log->debug(" --> parameter[$parameter] = '$value'");
            $parsedParameters[$parameter] = $value;
        }
        /** @var ControllerBase $requestedController */
        $requestedController = new $controller[$controllerName]($parsedParameters);
        if ($requestedController->validateParameters())
        {
            if ($requestedController->checkPermissions())
            {
                sendResponse($requestedController->executeAction());
            }
            else dieOutputError("Insufficient permissions at [$controllerName::$action] for user #$loginName");
        }
        else dieOutputError("Error validating required parameters in [$controllerName::$action] for user #$loginName");
    }
    else dieOutputError("Invalid action [$controllerName::$action] for user #$loginName");
}
else dieOutputError("Invalid controller ($controllerName) for user #$loginName");
