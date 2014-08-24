<?php

/**
 * Offers actions to manage games.
 */
class GameController extends ControllerBase
{
    /**
     * {@inheritdoc}
     */
    public function validateParameters()
    {
        $action = $this->params["action"];
        if ($action == "listGames")
        {
            return true;
        }
        else if (in_array($action, array("createGame", "deleteGame", "joinGame", "disconnectGame", "quitGame")))
        {
            if (isset($this->params["gameName"]) && isset($this->params["loginName"]))
            {
                return true;
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
            $this->log->debug("Session was time out!");
            $this->backendResult->setResult("Not Ok", "Session was timed out!");
        }
        else
        {
            $this->cache->updateLastActivity($loginName, "game::$action");
            $gameHandler = new GameHandler($this->backendResult);

            // we have to check here if the user is really logged in...
            if ($this->cache->isUserLoggedIn($loginName))
            {
                if ($action == "createGame")
                {
                    $this->log->debug("Creating new game $gameName for user $loginName");
                    $gameNumPlayer = 2;
                    $width = $height = 16;
                    if (isset($this->params["gameWidth"])) $width = $this->params["gameWidth"];
                    if (isset($this->params["gameHeight"])) $height = $this->params["gameHeight"];
                    if (isset($this->params["gameNumPlayer"])) $gameNumPlayer = $this->params["gameNumPlayer"];

                    $gameHandler->createGame($loginName, $gameName, $width, $height, $gameNumPlayer);
                }
                else if ($action == "deleteGame")
                {
                    $this->log->debug("Deleting existing game $gameName for user $loginName");
                    $gameHandler->deleteGame($loginName, $gameName);
                }
                else if ($action == "joinGame")
                {
                    $this->log->debug("Join existing game $gameName for user $loginName");
                    $gameHandler->joinGame($loginName, $gameName);
                }
                else if ($action == "disconnectGame")
                {
                    $this->log->debug("User $loginName quits game $gameName");
                    $gameHandler->disconnectGame($loginName, $gameName);
                }
                else if ($action == "listGames")
                {
                    $this->log->debug("Listing existing games for user $loginName");
                    $gameHandler->listGames();
                }
            }
            else
            {
                $this->log->debug("Someone called backend action [game::$action] without being authenticated");
                $this->backendResult->setResult("Not Ok", "You must be logged in to proceed!");
            }
        }
        return json_encode($this->backendResult);
    }

}
