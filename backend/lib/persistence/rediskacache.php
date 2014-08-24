<?php

require_once(__DIR__ . "/../../boot.php");

/**
 * Provides an API to store game-related data persistent into a Redis server.
 */
class RediskaCache
{
    /** @var Rediska */
    private $rediska;
    private $rediskaBase;
    private $sessionKeyHash;
    private $loggedInUsersList;
    private $registeredUserList;

    /**
     * Constructs the cache API with a given cache base key.
     *
     * @param string $_rediskaBase Defines the cache base key where the game data gets stored.
     */
    public function __construct($_rediskaBase="botgame/")
    {
        $this->rediskaBase = $_rediskaBase;
        $this->rediska = Rediska_Manager::get();
        $this->sessionKeyHash = "botgame/sessionKeyHash";
        new Rediska_Key_Hash($this->sessionKeyHash);
        $this->knownUsers = $this->rediskaBase."knownUsers";
        $this->loggedInUsersList = $this->rediskaBase."loggedInUsers";
    }

    /**
     * Checks if the provided user name is a registered user.
     *
     * @param string $_userName The user name for which the check is done.
     * @return bool True means that the provided user name is a registered user.
     */
    public function checkIfRegisteredUserExists($_userName)
    {
        //$this->rediska->exists($this->rediskaBase."registeredPlayer/testtest");
        if ($this->rediska->exists($this->rediskaBase."registeredPlayer/$_userName"))
        {
            return true;
        }
        else return false;
    }

    /**
     * Creates a new registered user account.
     *
     * toDo: Replace with a stronger hash or better zero-knowledge algorithm.
     *
     * @param string $_userName The name of the user for which the account is created.
     * @param string $_passwordHash The password hash of the user for which the account is created.
     */
    public function createUserAccount($_userName, $_passwordHash)
    {
        myLog("Creating User Account for $_userName");
        if (!$this->checkIfRegisteredUserExists($_userName))
        {
            $this->rediska->set($this->rediskaBase."registeredPlayer");
        }
        myLog("Creating necessary keys: ");
        $userCacheBase = $this->rediskaBase."registeredPlayer/$_userName";
        $this->rediska->set($userCacheBase);
        $this->rediska->set($userCacheBase."/lastActivity", time());
        myLog("Successfully created: $userCacheBase");
        $this->rediska->set($userCacheBase."/passwordHash", $_passwordHash);
        myLog("Successfully created: $userCacheBase./passwordHash");
        $chatMessages = new Rediska_Key_List($userCacheBase."/queuedChatMessages");
        $chatMessages[] = "Welcome to YaBot Game";
        $backendActions = new Rediska_Key_List($userCacheBase."/backendActions");
        $backendActions[] = "Created Account at ".date("Y-m-d H:i:s");
        $chatMessages[] = "Welcome to YaBot Game";
        myLog("Successfully created: list at $userCacheBase/queuedChatMessages");

        $this->rediska->set($userCacheBase."/registeredBots");
        $this->rediska->set($userCacheBase."/statistics/");
        $this->rediska->set($userCacheBase."/statistics/playedGames", 0);
        myLog("Successfully created: registeredBots, statisticsabd /statistics/playedGames");
    }

    /**
     * Completely deletes a user account from the cache.
     *
     * @param $_userName string The name of the user account that gets deleted.
     */
    public function deleteUserAccount($_userName)
    {
        // delete all keys created in createUserAccount
        // delete user from all lists: running, created and joined games or alter them to a new leader
        // delete all registered bots from the user
    }

    /**
     * Verifies that the given password hash fits with the stored md5 sum.
     *
     * toDo: Replace with a stronger hash or better zero-knowledge algorithm.
     *
     * @param string $_userName The user name for which the check is done.
     * @param string $_passwordHash The hash of the user that gets verified.
     * @return bool True means that the given password hash fits with the stored md5 sum.
     */
    public function verifyPasswordHash($_userName, $_passwordHash)
    {
        $passwordKey = $this->rediskaBase."registeredPlayer/$_userName/passwordHash";
        if ($this->rediska->exists($passwordKey) && $this->rediska->get($passwordKey) == $_passwordHash)
        {
            return true;
        }
        return false;
    }

    /**
     * Updates the password hash with a new version.
     *
     * @param string $_userName The user name for which the password hash is updated.
     * @param string $_passwordHash The hash of the user that replaces the old one.
     */
    public function updatePasswordHashForUser($_userName, $_passwordHash)
    {
        myLog("Updating password hash for user $_userName");
        if ($this->rediska->set($this->rediskaBase."registeredPlayer/$_userName/passwordHash", $_passwordHash));
    }

    /**
     * Add the given user name to the list of logged in users.
     *
     * @param string $_userName The user name that gets added to the list of logged in users.
     */
    public function addLoggedInUser($_userName)
    {
        $loggedInUsers = new Rediska_Key_List($this->loggedInUsersList);
        $loggedInUsers[] = $_userName;
    }

    /**
     * Returns a list of all known users to cyclically do checks on them.
     *
     * @return array The list of all known users.
     */
    public function getKnownUsers()
    {
        $knownUsers = new Rediska_Key_List($this->rediskaBase."knownUsers");
        return $knownUsers->toArray();
    }

    /**
     * Returns a list of all users that are currently logged in.
     *
     * @return array The list of all users that are currently logged in.
     */
    public function getLoggedInUsers()
    {
        $loggedInUsers = new Rediska_Key_List($this->loggedInUsersList);
        return $loggedInUsers->toArray();
    }

    /**
     * Checks if the given user name is currently logged in.
     *
     * @param string $_userName The user name for which the check is done.
     * @return bool True means that the given user name is currently logged in.
     */
    public function isUserLoggedIn($_userName)
    {
        $loggedInUsers = new Rediska_Key_List($this->loggedInUsersList);
        if (in_array($_userName, $loggedInUsers->getValues()))
        {
            return true;
        }
        else return false;
    }

    /**
     * Logs out the given user name removing it from the list of logged in users.
     *
     * @param string $_userName The user that gets logged off.
     */
    public function logOutUser($_userName)
    {
        $loggedInUsers = new Rediska_Key_List($this->loggedInUsersList);
        $beforeDelete = count($loggedInUsers);
        $loggedInUsers->remove($_userName);
        if ($beforeDelete > count($loggedInUsers))
        {
            myLog("Logged out the user $_userName");
        }
    }

    /**
     * Updates the last activity (logging the action) of a given user to prevent auto-logoff.
     *
     * @param string $_loginName The name of the user for which the last activity gets updated.
     * @param string $_backendActivity The backend activity (ex.: game::listGames) which gets logged.
     */
    public function updateLastActivity($_loginName, $_backendActivity)
    {
        $this->rediska->set($this->rediskaBase."registeredPlayer/$_loginName/lastActivity", time());
        $backendActivities = new Rediska_Key_List($this->rediskaBase."registeredPlayer/$_loginName/backendActions");
        $backendActivities[] = $_backendActivity;
    }

    /**
     * Checks if the session of the given user is time out due to too long inactivity.
     *
     * @param string $_loginName The name of the user for which the check is done.
     * @param int $_maxSessionTimeout The maximum amount of time in seconds before auto-logoff.
     * @return bool True means that the user was too long inactive and the session is timed out.
     */
    public function sessionTimedOut($_loginName, $_maxSessionTimeout = 1500)
    {
        $lastAcitivity = $this->rediska->get($this->rediskaBase."registeredPlayer/$_loginName/lastActivity");
        if (time() - $lastAcitivity > $_maxSessionTimeout)
        {
            myLog("Deleting session for user $_loginName");
            $this->logOutUser($_loginName);
            return true;
        }
        return false;
    }

    /**
     * Creates a new game with the provided parameters
     *
     * @param string $_loginName The name of the user that creates the game.
     * @param string $_gameName The name of the game that gets created.
     * @param int $_width The width of the game that gets created.
     * @param int $_height The height of the game that gets created.
     * @param int $_maxPlayer Defines the player maximum of the game that gets created.
     */
    public function createNewGame($_loginName, $_gameName, $_width, $_height, $_maxPlayer=4)
    {
        myLog("Creating ($_width x $_height) game $_gameName for user $_loginName");
        $this->rediska->set($this->rediskaBase.$_gameName);
        $this->rediska->set($this->rediskaBase.$_gameName."/width", $_width);
        $this->rediska->set($this->rediskaBase.$_gameName."/height", $_height);
        new Rediska_Key_List($this->rediskaBase.$_gameName."/botList");
        new Rediska_Key_List($this->rediskaBase.$_gameName."/fieldData");
        $this->rediska->set($this->rediskaBase.$_gameName."/owner", $_loginName);
        $this->rediska->set($this->rediskaBase.$_gameName."/lastActivity", time());
        new Rediska_Key_List($this->rediskaBase.$_gameName."/playerList");
        $this->rediska->set($this->rediskaBase.$_gameName."/maxPlayer", $_maxPlayer);
        $runningGames = new Rediska_Key_List($this->rediskaBase."runningGames");
        $runningGames[] = $_gameName;
    }

    /**
     * Deletes a specific game of a given user.
     *
     * @param string $_loginName The name of the user which deletes a game.
     * @param string $_gameName The name of the game that gets deleted.
     */
    public function deleteGame($_loginName, $_gameName)
    {
        myLog("Deleting game $_gameName of user $_loginName");
        $this->rediska->delete($this->rediskaBase.$_gameName);
        $this->rediska->delete($this->rediskaBase.$_gameName."/width");
        $this->rediska->delete($this->rediskaBase.$_gameName."/height");
        $this->rediska->delete($this->rediskaBase.$_gameName."/botList");
        $this->rediska->delete($this->rediskaBase.$_gameName."/fieldData");
        // toDo: Check if all X and Y field entries also have to be deleted
        $this->rediska->delete($this->rediskaBase.$_gameName."/owner");
        $this->rediska->delete($this->rediskaBase.$_gameName."/playerList");
        $this->rediska->delete($this->rediskaBase.$_gameName."/maxPlayer");
        // toDo: Broadcast all connected clients in the game that it ended

        $runningGames = new Rediska_Key_List($this->rediskaBase.$_gameName."/runningGames");
        $beforeDelete = count($runningGames);
        $runningGames->remove($_gameName);
        if ($beforeDelete > count($runningGames))
        {
            myLog("Deleted game $_gameName from running games list");
        }
        myLog("-->Finish");
    }

    /**
     * Returns a list of running games.
     *
     * @return array The list of running games.
     */
    public function getRunningGames()
    {
        $runningGames = new Rediska_Key_List($this->rediskaBase."runningGames");
        return $runningGames->toArray();
    }

    /**
     * Checks if the provided game name already exists as running game.
     *
     * @param string $_gameName The name of the game for which the check is done.
     * @return bool True means that the
     */
    public function checkIfGameExists($_gameName)
    {
        myLog("Checking if game $_gameName already exists");
        $runningGames = new Rediska_Key_List($this->rediskaBase."runningGames");

        foreach ($runningGames as $runningGame)
        {
            if ($_gameName == $runningGame)
            {
                myLog("-->Exists");
                return true;
            }
        }
        myLog("-->Does not yet Exist");
        return false;
    }

    /**
     * Adds a player to a running game.
     *
     * @param string $_loginName The name of the user which gets added to the provided game.
     * @param string $_gameName The name of the game where the provided user gets added.
     * @return bool True means that the user was successfully added to the game.
     */
    public function addPlayerToGame($_loginName, $_gameName)
    {
        myLog("Add player $_loginName to game $_gameName");
        $gamePlayer = new Rediska_Key_List($this->rediskaBase.$_gameName."/playerList");
        myLog("numPlayer in game: ".count($gamePlayer));
        $maxPlayer = $this->rediska->get($this->rediskaBase.$_gameName."/maxPlayer");
        myLog("MaxPlayer: $maxPlayer");
        if ($maxPlayer && is_numeric($maxPlayer))
        {// do the check only if maxPlayer is valid
            if ($gamePlayer->count() > $maxPlayer)
            {
                myLog("Game full with ".$gamePlayer->count()." from ".$maxPlayer);
                return false;
            }
        }
        $this->rediska->set($this->rediskaBase.$_gameName."/lastActivity", time());
        $gamePlayer[] = $_loginName;
        return true;
    }

    /**
     * Removes a player to a running game.
     *
     * @param string $_loginName The name of the user which gets removed to the provided game.
     * @param string $_gameName The name of the game where the provided user gets removed.
     * @return bool True means that the user was successfully removed from the game.
     */
    public function removePlayerFromGame($_loginName, $_gameName)
    {
        myLog("Remove player $_loginName to game $_gameName");
        $gamePlayer = new Rediska_Key_List($this->rediskaBase.$_gameName."/playerList");
        $gamePlayer->remove($_loginName);
        // delete game if no player left?
        return true;
    }

    /**
     * Adds a bot or its ID to a specific game.
     *
     * toDo: It could be possible to a program but for now it is just an ID in the bot list.
     *
     * @param string $_botId The bot that gets added to the game.
     * @param string $_gameName The game name where the bots gets added.
     */
    public function addBotToGame($_botId, $_gameName)
    {
        $this->rediska->set($this->rediskaBase.$_gameName."/lastActivity", time());
        $botList = new Rediska_Key_List($this->rediskaBase.$_gameName."/botList");
        // maybe there will be some criteria if a bot is allowed to join
        $botList[] = $_botId;
    }

    public function addSessionKeyToStore($_loginName, $_sessionKey)
    {
        myLog("Add session key to store '$_sessionKey' for user $_loginName");
        $sessionKeyStore = new Rediska_Key_Hash($this->sessionKeyHash);
        $sessionKeyStore[$_loginName] = $_sessionKey;
    }

}
