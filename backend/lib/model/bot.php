<?php
/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

/**
 * Represents a bot which corresponds to a specific player and game.
 */
class Bot
{

    public $posX;
    public $posY;
    public $botId;
    public $gameName;
    public $loginName;

    /**
     * Constructs a Bot object.
     *
     * @param string $_botId The ID of the constructed bot.
     * @param string $_gameName The name of the game where the bot belongs to.
     * @param string $_loginName The name of the player where the bot belongs to.
     */
    function __construct($_botId, $_gameName, $_loginName="CPU")
    {
        $this->botId = $_botId;
        $this->gameName = $_gameName;
        $this->loginName = $_loginName;
    }

    /**
     * Sets the bot to a new position.
     *
     * @param int $_posX The X-value of the new position.
     * @param int $_posY The Y-value of the new position.
     */
    public function setPos($_posX, $_posY)
    {
        $this->posX = $_posX;
        $this->posY = $_posY;
    }

    /**
     * Returns the current X-position of the bot.
     *
     * @return int The current X-position of the bot.
     */
    public function getPosX()
    {
        return $this->posX;
    }

    /**
     * Returns the current Y-position of the bot.
     *
     * @return int The current Y-position of the bot.
     */
    public function getPosY()
    {
        return $this->posY;
    }

}
