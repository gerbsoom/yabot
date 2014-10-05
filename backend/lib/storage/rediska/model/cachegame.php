<?php
/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

class CacheGame extends CacheBase
{
    private $gameName;

    /**
     * Constructs a cache game with the provided parameters.
     *
     * @param UpdateChannel $_updateChannel The update channel to populate changes.
     * @param Rediska $_rediska Rediska reference where the data gets stored.
     * @param string $_rediskaBase Cache base key where the data get stored.
     * @param string $_gameName The name of the game that gets created.
     */
    function __construct(UpdateChannel $_updateChannel, Rediska $_rediska, $_rediskaBase, $_gameName)
    {
        parent::__construct($_updateChannel, $_rediska, $_rediskaBase);

        $this->log = LoggerRegistry::getLogger($this);
        $this->gameName = $_gameName;
        $this->baseKey = $_rediskaBase."games/$_gameName/";
        if ($this->rediska->exists($this->baseKey))
        {
            $this->log->debug("Loading existing game from cache");
        }
        else $this->log->debug("Creating a new cache game");

        $this->bots = new Rediska_Key_List($this->baseKey."botList");
        $this->users = new Rediska_Key_List($this->baseKey."userList");
    }

    /**
     * Constructs a cache game with the provided parameters.
     *
     * @param string $_loginName The name of the user that creates the game.
     * @param int $_width The width of the game that gets created.
     * @param int $_height The height of the game that gets created.
     * @param int $_maxPlayer Defines the player maximum of the game that gets created.
     * @param int $_maxBots Defines the maximum of allowed bots in the game that gets created.
     */
    public function createGame($_loginName, $_width, $_height, $_maxPlayer=4, $_maxBots=4)
    {
        $this->log->debug("Creating cache ($_width x $_height) game with [$_maxPlayer|$_maxBots] for user $_loginName");
        $this->rediska->set($this->baseKey);
        $this->rediska->set($this->baseKey."width", $_width);
        $this->rediska->set($this->baseKey."height", $_height);
        $this->rediska->set($this->baseKey."fieldData");
        $this->rediska->set($this->baseKey."owner", $_loginName);
        $this->rediska->set($this->baseKey."lastActivity", time());
        $this->rediska->set($this->baseKey."maxPlayer", $_maxPlayer);
        $this->rediska->set($this->baseKey."maxBots", $_maxBots);
    }

    /**
     * @param $_loginName
     * @return bool
     */
    public function isOwner($_loginName)
    {
        $this->log->debug("Checking ownership for user $_loginName");
        if ($this->rediska->get($this->baseKey."owner") == $_loginName)
        {
            $this->log->debug("_-> confirmed");
            return true;
        }
        $this->log->debug("_-> NOT confirmed");
        return false;
    }

    /**
     * Completely deletes the underlying game from the cache.
     */
    public function deleteGame()
    {
        $this->log->debug("Deleting game");
        $this->bots->delete();
        $this->users->delete();
        for ($x=0; $x<$this->baseKey."width"; $x++)
        {
            for ($y=0; $y<$this->baseKey."height"; $y++)
            {
                $this->rediska->delete($this->baseKey."fieldData");
            }
        }
        $this->rediska->delete($this->baseKey."width");
        $this->rediska->delete($this->baseKey."height");
        $this->rediska->delete($this->baseKey."fieldData");
        $this->rediska->delete($this->baseKey."owner");
        $this->rediska->delete($this->baseKey."lastActivity");
        $this->rediska->delete($this->baseKey."maxPlayer");
        $this->rediska->delete($this->baseKey."maxBots");
        $this->rediska->delete($this->baseKey);
    }

    /**
     * Writes the provided FieldData into the game cache.
     *
     * @param FieldData $_fieldData The FieldData that gets inserted into the game cache.
     * @param int $_posX The X-values of the inserted FieldData.
     * @param int $_posY The Y-values of the inserted FieldData.
     */
    public function setFieldData(FieldData $_fieldData, $_posX, $_posY)
    {
        $this->log->debug("Setting field data '".$_fieldData->type."' at ($_posX x $_posY)");
        $this->rediska->set($this->baseKey."fieldData/$_posX/$_posY/", $_fieldData);
        $gameUpdate = new stdClass();
        $gameUpdate->event = "singleFieldChange";
        $gameUpdate->gameName = $this->gameName;
        $gameUpdate->posX = $this->gameName;
        $gameUpdate->posY = $this->gameName;
        // loginName?
        $this->updateChannel->publishOnGameFieldDataChannel(json_encode($gameUpdate));
    }

    /**
     * Retrieves the current FieldData for the requested coordinate.
     *
     * @param int $_posX The X-values of the requested FieldData.
     * @param int $_posY The Y-values of the requested FieldData.
     * @return FieldData The current FieldData at the requested coordinate.
     */
    public function getFieldData($_posX, $_posY)
    {
        $this->log->debug("Getting field data at ($_posX x $_posY)");
        return $this->rediska->get($this->baseKey."fieldData/$_posX/$_posY/");
    }

    /**
     * Returns the width of the underlying game.
     *
     * @return int The width of the game.
     */
    function getWidth()
    {
        $this->log->debug("getWidth()");
        return $this->rediska->get($this->baseKey."width");
    }

    /**
     * Returns the height of the underlying game.
     *
     * @return int The height of the game.
     */
    function getHeight()
    {
        $this->log->debug("getHeight()");
        return $this->rediska->get($this->baseKey."height");
    }

    /**
     * Returns if the game has a free slot for another user.
     *
     * @return bool True means that the game has a free slot for another user.
     */
    public function userSlotAvailable()
    {
        $numUser = $this->users->count();
        $maxPlayer = $this->rediska->get($this->baseKey."maxPlayer");
        $this->log->debug("userSlotAvailable() with $numUser of $maxPlayer");
        if ($numUser + 1 <= $maxPlayer)
        {
            return true;
        }
        return false;
    }

    /**
     * Add the given user to the game.
     *
     * @param string $_loginName The user which gets added the game.
     */
    public function addUser($_loginName)
    {
        $this->log->debug("Adding user $_loginName");
        $this->users[] = $_loginName;
        $gameUpdate = new stdClass();
        $gameUpdate->event = "userJoin";
        $gameUpdate->loginName = $_loginName;
        $gameUpdate->gameName = $this->gameName;

        $this->updateChannel->publishOnGameFieldDataChannel(json_encode($gameUpdate));
    }

    /**
     * Removes the given user from the game.
     *
     * @param string $_loginName The user which gets removed from the game.
     */
    public function removeUser($_loginName)
    {
        $this->log->debug("Removing user $_loginName");
        $this->users->remove($_loginName);
        $gameUpdate = new stdClass();
        $gameUpdate->event = "userDisconnect";
        $gameUpdate->loginName = $_loginName;
        $gameUpdate->gameName = $this->gameName;

        $this->updateChannel->publishOnGameFieldDataChannel(json_encode($gameUpdate));
    }

    /**
     * Returns if the game has a free slot for another bot.
     *
     * toDo: bots per user?
     *
     * @return bool True means that the game has a free slot for another bot.
     */
    public function botSlotAvailable()
    {
        $numBots = $this->bots->count();
        $maxBots = $this->rediska->get($this->baseKey."maxBots");
        $this->log->debug("botSlotAvailable() with $numBots of $maxBots");
        if ($numBots + 1 <= $maxBots)
        {
            return true ;
        }
        return false;
    }

    /**
     * Add the given bot to the game.
     *
     * @param string $_botId The unique ID of the bot that joined the game.
     */
    public function addBot($_botId)
    {
        $this->log->debug("Adding bot $_botId");
        $this->bots[] = $_botId;
        $this->rediska->set($this->baseKey."lastActivity", time());
        $gameUpdate = new stdClass();
        $gameUpdate->event = "botJoin";
        $gameUpdate->botId = $_botId;
        $gameUpdate->gameName = $this->gameName;

        $this->updateChannel->publishOnGameFieldDataChannel(json_encode($gameUpdate));
    }

    /**
     * Removes the given bot from the game.
     *
     * @param string $_botId The bot which gets removed from the game.
     */
    public function removeBot($_botId)
    {
        $this->log->debug("Removing bot $_botId");
        $this->bots->remove($_botId);
        $this->rediska->set($this->baseKey."lastActivity", time());

        $gameUpdate = new stdClass();
        $gameUpdate->event = "botDisconnect";
        $gameUpdate->botId = $_botId;
        $gameUpdate->gameName = $this->gameName;

        $this->updateChannel->publishOnGameFieldDataChannel(json_encode($gameUpdate));
    }

}
