<?php

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
            else if ($action == "addBot")
            {
                if (isset($this->params["loginName"]) && isset($this->params["botId"]))
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
        $gameName = $this->params["gameName"];
        $loginName = $this->params["loginName"];
        if ($this->cache->sessionTimedOut($loginName, $this->maxSessionTimeout))
        {
            $this->backendResult->setResult("Not Ok", "Session was timed out!!");
        }
        else
        {
            // we have to check here if the user is really logged in...
            if ($this->cache->isUserLoggedIn($loginName))
            {// and that the game still exists
                if ($this->cache->checkIfGameExists($gameName))
                {
                    $battleFieldHandler = new BattlefieldHandler( $this->backendResult, $gameName);
                    if ($action == "getCurrentBattlefieldState")
                    {
                        $battleFieldHandler->getCurrentState();
                    }
                    else if ($action == "getFieldState")
                    {
                        $battleFieldHandler->getFieldState($this->params["posX"], $this->params["posY"]);
                    }
                    else if ($action == "addBot")
                    {
                        myLog("Adding bot ".$this->params["botId"]." to game $gameName for user $loginName");
                        $battleFieldHandler->addBot($loginName, $this->params["botId"], $gameName);
                    }
                    $this->cache->updateLastActivity($loginName, "battlefield::$action");
                }
                else
                {
                    myLog("The requested game could not be found anymore!");
                    $this->backendResult->setResult("Not Ok", "Requested game could not be found!");
                }
            }
            else
            {
                myLog("Someone called backend action [battlefield::".$action."] without being authenticated");
                $this->backendResult->setResult("Not Ok", "You must be logged in to proceed!");
            }
        }
        return json_encode($this->backendResult);
    }

}
