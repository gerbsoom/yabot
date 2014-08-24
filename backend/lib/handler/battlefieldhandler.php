<?php

/**
 * Executes the battlefield operations which get dispatched here by the battlefield controller.
 */
class BattlefieldHandler extends HandlerBase
{
    /**
     * Returns the complete battlefield.
     *
     * @param string $_gameName The name of the game from which the current state is returned.
     */
    public function getCurrentBattlefieldState($_gameName)
    {
        $this->log->debug("BattlefieldManager: Retrieving current state");
        $data=new stdClass();
        $battlefield = array();
        for ($y=0; $y < $this->cache->getGameHeight($_gameName); $y++)
        {
            for ($x=0; $x < $this->cache->getGameWidth($_gameName); $x++)
            {
                if (!isset($battlefield[$x])) $battlefield[$x] = array();
                $battlefield[$x][$y] = $this->cache->getFieldData($_gameName, $x, $y);
            }
        }
        $this->backendResult->setResult("OK");
        $data->battlefield = $battlefield;
        $this->backendResult->setData($data);
    }

    /**
     * Returns the current field data at the requested position.
     *
     * @param string $_gameName The name of the game from which the field is returned.
     * @param int $_posX The X part of the requested field coordinate.
     * @param int $_posY The Y part of the requested field coordinate
     */
    public function getFieldState($_gameName, $_posX, $_posY)
    {
        $this->log->debug("BattlefieldManager: Generate the state of field ($_posX, $_posY)");
        $field = $this->cache->getFieldData($_gameName, $_posX, $_posY);
        $this->backendResult->setResult("OK");
        $this->backendResult->setData($field);
    }

    /**
     * Adds a bot to the given name.
     *
     * @param string $_loginName The loginName of the player who adds the bot.
     * @param string $_botId The unique ID of the bot that gets added to the game.
     * @param string $_gameName The name of the game where the bot gets added.
     */
    public function addBot($_loginName, $_botId, $_gameName)
    {
        $this->log->debug("Adding bot $_botId for user $_loginName to game $_gameName");
        // add the given bot to the game after doing following checks: gameExists - userLoggedIn - numBots < numMax
        $this->cache->addBotToGame($_botId, $_gameName);
        $data = new stdClass();
        $data->playerId = 1;
        // get the amount of used player IDs in the game
        $data->numPlayer = 1;
        // get the current position of the bot on the battlefield
        $data->posX = 7;
        $data->posY = 7;

        $this->backendResult->setData($data);
        $this->backendResult->setResult("OK");
    }

}
