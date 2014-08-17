<?php

require_once("controllerbase.php");
require_once(__DIR__ . "/../handler/accounthandler.php");

/**
 * Offers actions to manage a user account.
 */
class AccountController extends ControllerBase
{
    /**
     * {@inheritdoc}
     */
    public function validateParameters()
    {
        $action = $this->params["action"];
        if ($action == "selectServer")
        {
            return true;
        }
        else if ($action == "logout" && isset($this->params["loginName"]))
        {
            return true;
        }
        else if ($action == "login" || $action == "register" || $action == "delete")
        {
            if (isset($this->params["loginName"]) && isset($this->params["passwordHash"]))
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
        $accountHandler = new AccountHandler($this->backendResult);
        $action = $this->params["action"];

        if ($action == "selectServer")
        {
            myLog("Affirmative server version for select");
            $this->backendResult->setResult("OK");
            $data = new stdClass();
            $data->version="0.1";
            $this->backendResult->setData($data);
        }
        else if ($action == "register")
        {
            myLog("Registering account for user ".$this->params["loginName"]);
            $accountHandler->register($this->params["loginName"], $this->params["passwordHash"]);
        }
        else if ($this->params["action"] == "delete")
        {
            myLog("Deleting account for user ".$this->params["loginName"]);
            $accountHandler->delete($this->params["loginName"], $this->params["passwordHash"]);
        }
        else if ($action == "login")
        {
            myLog("Login into account for user".$this->params["loginName"]);
            if ($this->cache->isUserLoggedIn($this->params["loginName"]))
            {// toDo: Play with OK/Not Ok and get the frontend to handle both cases better
                $this->backendResult->setResult("Not Ok", "Not possible to login when already logged in!");
            }
            else $accountHandler->login($this->params["loginName"], $this->params["passwordHash"]);

            $this->cache->updateLastActivity($this->params["loginName"], "account::".$this->params["action"]);
        }
        else if ($action == "logout")
        {
            myLog("Logout user ".$this->params["loginName"]);
            if (!$this->cache->isUserLoggedIn($this->params["loginName"]))
            {// toDo: Play with OK/Not Ok and get the frontend to handle both cases better
                $this->backendResult->setResult("Not Ok", "Not possible to logout when NOT logged in!");
            }
            else $accountHandler->logout($this->params["loginName"]);
        }

        return json_encode($this->backendResult);
    }

}