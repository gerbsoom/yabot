<?php

class CacheUser  extends CacheBase
{
    private $loginName;

    /**
     * Constructs a cache user the provided loginName.
     *
     * @param UpdateChannel $_updateChannel The update channel to populate changes.
     * @param Rediska $_rediska Rediska reference where the data gets stored.
     * @param string $_rediskaBase Cache base key where the data get stored.
     * @param string $_loginName The user for which the game gets created.
     */
    function __construct(UpdateChannel $_updateChannel, Rediska $_rediska, $_rediskaBase, $_loginName)
    {
        parent::__construct($_updateChannel, $_rediska, $_rediskaBase);

        $this->log = LoggerRegistry::getLogger($this);
        $this->loginName = $_loginName;
        $this->baseKey = $_rediskaBase."registeredUser/$_loginName/";
        if ($this->rediska->exists($this->baseKey))
        {
            $this->log->debug("Loading existing user from cache");
        }
        else $this->log->debug("Creating a new cache user");

        $this->joinedGames = new Rediska_Key_List($this->baseKey."joinedGames");
        $this->createdGames = new Rediska_Key_List($this->baseKey."createdGames");
        $this->registeredBots = new Rediska_Key_List($this->baseKey."registeredBots");
        $this->queuedMessages = new Rediska_Key_List($this->baseKey."queuedMessages");
        $this->backendActions = new Rediska_Key_List($this->baseKey."backendActions");
    }

    /**
     * Verifies that the given password hash fits with the stored md5 sum.
     *
     * @param string $_passwordHash The hash of the user that gets verified.
     * @return bool True means that the given password hash fits with the stored md5 sum.
     */
    public function verifyPassword($_passwordHash)
    {
        $this->log->debug("Verifying password hash $_passwordHash");
        if ($this->rediska->get($this->baseKey."passwordHash") == $_passwordHash)
        {
            return true;
        }
        return false;
    }

    /**
     * Updates the password hash for the underlying user.
     *
     * @param string $_passwordHash The hash of the user that replaces the old one.
     */
    public function updatePassword($_passwordHash)
    {
        $this->log->debug("Updating password to $_passwordHash");
        $this->rediska->set($this->baseKey."passwordHash", $_passwordHash);
    }

    /**
     * Updates the last activity (logging the action) of the underlying user.
     *
     * @param string $_lastAction The last activity (maybe a backend activity like 'game::listGames)' which gets logged.
     */
    public function updateLastActivity($_lastAction)
    {
        $this->log->debug("Updating last activity with $_lastAction");
        $this->rediska->set($this->baseKey."lastActivity", time());
        $this->backendActions[] = $_lastAction;
    }

    /**
     * Checks if the session of the underlying user is time out due to too long inactivity.
     *
     * @param int $_maxSessionTimeout The maximum amount of time in seconds before auto-logoff.
     * @return bool True means that the user was too long inactive and the session is timed out.
     */
    public function sessionTimedOut($_maxSessionTimeout = 1500)
    {
        $this->log->debug("Checking for session timeout");
        $lastAcitivity = $this->rediska->get($this->baseKey."lastActivity");
        if (time() - $lastAcitivity > $_maxSessionTimeout)
        {
            return true;
        }
        return false;
    }

    /**
     * Constructs a cache user with the provided parameters.
     *
     * @param string $_passwordHash The password hash of the user for which the account is created.
     */
    public function createAccount($_passwordHash)
    {
        $this->log->debug("Creating new account");
        $this->rediska->set($this->baseKey);
        $this->rediska->set($this->baseKey."lastActivity", time());
        $this->rediska->set($this->baseKey."passwordHash", $_passwordHash);
        $this->backendActions[] = "Created Account at ".date("Y-m-d H:i:s");

        $this->rediska->set($this->baseKey."statistics");
        $this->rediska->set($this->baseKey."statistics/playedGames", 0);
    }

    /**
     * Completely deletes the underlying game from the cache.
     */
    public function deleteAccount()
    {
        $this->log->debug("Deleting account");
        $this->joinedGames->delete();
        $this->createdGames->delete();
        $this->registeredBots->delete();
        $this->backendActions->delete();
        $this->queuedMessages->delete();

        $this->rediska->delete($this->baseKey."statistics/playedGames");
        $this->rediska->delete($this->baseKey."statistics");
        $this->rediska->delete($this->baseKey."passwordHash");
        $this->rediska->delete($this->baseKey."lastActivity");
        $this->rediska->delete($this->baseKey);
    }

    /**
     * Add a joined game for the underlying user.
     *
     * @param string $_gameName The name of the game where the user joined.
     */
    public function addJoinedGame($_gameName)
    {
        $this->log->debug("Add joined game $_gameName");
        $this->joinedGames[] = $_gameName;
    }

    /**
     * Removes the given game from the list of joined games.
     *
     * @param string $_gameName The game which gets removed.
     */
    public function removeJoinedGame($_gameName)
    {
        $this->log->debug("Remove joined game $_gameName");
        $this->joinedGames->remove($_gameName);
    }

    /**
     * Add a created game for the underlying user.
     *
     * @param string $_gameName The name of the game that the user ha created.
     */
    public function addCreatedGame($_gameName)
    {
        $this->log->debug("Add created game $_gameName");
        $this->createdGames[] = $_gameName;
    }

    /**
     * Removes the given game from the list of created games.
     *
     * @param string $_gameName The game which gets removed.
     */
    public function removeCreatedGame($_gameName)
    {
        $this->log->debug("Remove joined game $_gameName");
        $this->createdGames->remove($_gameName);
    }

    public function addRegisteredBot($_registeredBot)
    {
        $this->log->debug("Add registered bot??? $_registeredBot");
        $this->registeredBots[] = $_registeredBot;
    }

    public function removeRegisteredBot($_registeredBot)
    {
        $this->log->debug("Remove registered bot??? $_registeredBot");
        $this->registeredBots->remove($_registeredBot);
    }

    public function addQueuedMessage($_queuedMessage)
    {
        $this->log->debug("Add queued message $_queuedMessage");
        $this->queuedMessages[] = $_queuedMessage;
    }

     /**
     * Shifts and return the next queued message.
     *
     * @return string The next queued message.
     */
    public function getQueuedMessage()
    {
        $this->log->debug("Shifting a queued message");
        return $this->queuedMessages->shift();
    }

}
