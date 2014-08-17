<?php

require_once("controllerbase.php");
require_once(__DIR__ . "/../handler/battlefieldhandler.php");

/**
 * Offers actions to interact with the battlefield.
 */
class BattlefieldController extends ControllerBase
{
    /**
     * {@inheritdoc}
     */
    public function validateParameters()
    {
        if (isset($this->params["gameName"]))
        {
            $action = $this->params["action"];
            if ($action == "getCurrentBattlefieldState")
            {
                return true;
            }
            else if ($action == "getFieldState")
            {
                if (isset($this->params["posX"]) && isset($this->params["posY"]))
                {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * {@inheritdoc}
     */
    public function executeAction()
    {
        $action = $this->params["action"];
        if ($this->cache->sessionTimedOut($this->params["loginName"], $this->maxSessionTimeout))
        {
            $this->backendResult->setResult("Not Ok", "Session was timed out!!");
        }
        else
        {
            $this->cache->updateLastActivity($this->params["loginName"], "battlefield::$action");
            // we have to check here if the user is really logged in...
            if ($this->cache->isUserLoggedIn($this->params["loginName"]))
            {// and that the game still exists
                if ($this->cache->checkIfGameExists($this->params["gameName"]))
                {
                    $battleFieldHandler = new BattlefieldHandler( $this->backendResult, $this->params["gameName"]);
                    if ($action == "getCurrentBattlefieldState")
                    {
                        $battleFieldHandler->getCurrentState();
                    }
                    else if ($action == "getFieldState")
                    {
                        $battleFieldHandler->getFieldState($this->params["posX"], $this->params["posY"]);
                    }
                }
                else
                {
                    myLog("The requested game could not be found anymore!");
                    $this->backendResult->setResult("Not Ok", "Requested game could not be found!");
                }
            }
            else
            {
                myLog("Someone called backend action [battlefield::".$this->params["action"]."] without being authenticated");
                $this->backendResult->setResult("Not Ok", "You must be logged in to proceed!");
            }
        }
        return json_encode($this->backendResult);
    }

}
