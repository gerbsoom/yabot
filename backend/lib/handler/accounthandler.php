<?php

/**
 * Executes the account operations which get dispatched here by the account controller.
 *
 * For this type the separation between controller and handler is suboptimal and parts are done here.
 */
class AccountHandler extends HandlerBase
{
    /**
     * Verifies the authentication and logs the user in.
     *
     * @param string $_userName The user that gets logged in if the password hash can be verified.
     * @param string $_passwordHash The hash used for password verification.
     * @return bool True means that the user is logged in.
     */
    public function login($_userName, $_passwordHash)
    {
        if ($this->cache->checkIfRegisteredUserExists($_userName) == false)
        {
            $this->backendResult->setResult("Not OK", "Requested username does not exist!");
        }
        else if ($this->cache->verifyPasswordHash($_userName, $_passwordHash))
        {
            $this->cache->addLoggedInUser($_userName);
            $this->backendResult->setResult("OK");
            return true;
        }
        else $this->backendResult->setResult("Not OK", "The provided password is not correct!");

        return false;
    }

    /**
     * Updates the registered user information.
     *
     * @param string $_userName The user that gets logged in if the password hash can be verified.
     * @param string $_passwordHash The hash used for password verification.
     * @param string $_newPasswordHash The updated password hash used for next login.
     */
    public function update($_userName, $_passwordHash, $_newPasswordHash)
    {
        if ($this->cache->checkIfRegisteredUserExists($_userName) == false)
        {
            $this->backendResult->setResult("Not OK", "Requested username does not exist!");
        }
        else if ($this->cache->verifyPasswordHash($_userName, $_passwordHash))
        {
            $this->cache->updatePasswordHashForUser($_userName, $_newPasswordHash);
            $this->backendResult->setResult("OK");
        }
        else $this->backendResult->setResult("Not OK", "The provided password is not correct!");
    }

    /**
     * Logs out the provided user.
     *
     * toDo: Operation must not be called without a valid session
     *
     * @param string $_userName The user that gets logged off.
     */
    public function logout($_userName)
    {
        $this->cache->logOutUser($_userName);
        $this->backendResult->setResult("OK");
    }

    /**
     * Registers a users setting up a new account.
     *
     * @param string $_userName The user name with which the account is registered.
     * @param string $_passwordHash The password hash used for account registration.
     */
    public function register($_userName, $_passwordHash)
    {
        if ($this->cache->checkIfRegisteredUserExists($_userName))
        {
            $this->backendResult->setResult("Not OK", "Requested username already exists!");
        }
        else
        {
            $this->cache->createUserAccount($_userName, $_passwordHash);
            $this->backendResult->setResult("OK");
        }
    }

    /**
     * Deletes a user account.
     *
     * @param string $_userName The user name for which the account is deleted.
     * @param string $_passwordHash The hash used for password verification.
     */
    public function delete($_userName, $_passwordHash)
    {
        if ($this->cache->checkIfRegisteredUserExists($_userName) == false)
        {
            $this->backendResult->setResult("Not OK", "Requested username does not exist!");
        }
        else if ($this->cache->verifyPasswordHash($_userName, $_passwordHash))
        {
            $this->cache->deleteUserAccount($_userName);
            $this->backendResult->setResult("OK");
        }
        else $this->backendResult->setResult("Not OK", "The provided password is not correct!");
    }

}
