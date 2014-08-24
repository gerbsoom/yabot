<?php

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

       if ($action == "register")
        {
            $this->log->debug("Registering account for user ".$this->params["loginName"]);
            $accountHandler->register($this->params["loginName"], $this->params["passwordHash"]);
        }
        else if ($this->params["action"] == "delete")
        {
            $this->log->debug("Deleting account for user ".$this->params["loginName"]);
            $accountHandler->delete($this->params["loginName"], $this->params["passwordHash"]);
        }
        else if ($action == "login")
        {
            $this->log->debug("Login into account for user".$this->params["loginName"]);
            if ($this->cache->isUserLoggedIn($this->params["loginName"]))
            {// toDo: Play with OK/Not Ok and get the frontend to handle both cases better
                $this->backendResult->setResult("Not Ok", "Not possible to login when already logged in!");
                $loggedIn = true;
            }
            else $loggedIn = $accountHandler->login($this->params["loginName"], $this->params["passwordHash"]);

            if ($loggedIn) $this->cache->updateLastActivity($this->params["loginName"], "account::".$this->params["action"]);
        }
        else if ($action == "logout")
        {
            $this->log->debug("Logout user ".$this->params["loginName"]);
            if (!$this->cache->isUserLoggedIn($this->params["loginName"]))
            {// toDo: Play with OK/Not Ok and get the frontend to handle both cases better
                $this->backendResult->setResult("Not Ok", "Not possible to logout when NOT logged in!");
            }
            else $accountHandler->logout($this->params["loginName"]);
        }

        return json_encode($this->backendResult);
    }

}
