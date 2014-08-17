<?php
//session_start( );
require_once("boot.php");

require_once("lib/controller/battlefieldcontroller.php");
require_once("lib/controller/accountcontroller.php");
require_once("lib/controller/gamecontroller.php");
require_once("lib/controller/componentmanager.php");

function dieOutputError($_errorMessage)
{
    myLog("EntryPoint: ".$_errorMessage);
    die($_errorMessage);
}

function sendResponse($_response)
{
    header('Content-type: application/json');
    echo $_response;
}

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

$componentManager = new ComponentManager();
$validCommands = $componentManager->getValidCommands();
$cmdController = $componentManager->getCmdController();


$loginName = submittedValueFor("loginName");
$controllerName = submittedValueFor("controller");
if (in_array($controllerName, array_keys($validCommands)))
{
    $action = submittedValueFor("action");
    myLog("Serving request [$controllerName|$action] for user: $loginName");
    if (in_array($action, $validCommands[$controllerName]["actions"]))
    {
        $parsedParameters = array("controller"=>$controllerName, "action"=>$action);
        foreach ($validCommands[$controllerName]["params"] as $parameter)
        {
            $parsedParameters[$parameter] = submittedValueFor($parameter);
        }
        /** @var ControllerBase $controller */
        $controller = new $cmdController[$controllerName]($parsedParameters);
        if ($controller->validateParameters())
        {
            if ($controller->checkPermissions())
            {
                sendResponse($controller->executeAction());
            }
            else dieOutputError("Insufficient permissions at [$controllerName::$action] for user #$loginName");
        }
        else dieOutputError("Error validating required parameters in [$controllerName::$action] for user #$loginName");
    }
    else dieOutputError("Invalid action [$controllerName::$action] for user #$loginName");
}
else dieOutputError("Invalid controller ($controllerName) for user #$loginName");
