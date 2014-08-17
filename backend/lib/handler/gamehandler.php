<?php

require_once("handlerbase.php");
require_once(__DIR__ . "/../model/mazegenerator.php");

/**
 * Executes the game operations which get dispatched here by the game controller.
 */
class GameHandler extends HandlerBase
{
    /**
     * Creates a new game with a random battlefield using the provided dimension.
     *
     * @param string $_loginName The name of the user for which the game is created.
     * @param string$_gameName The unique name of the game that gets created.
     * @param int $_width The width of the game that gets created.
     * @param int $_height The height of the game that gets created
     * @param int $_gameNumPlayer Defines the amount of game player.
     * @return bool True means that the game was created successfully.
     */
    public function createGame($_loginName, $_gameName, $_width, $_height, $_gameNumPlayer)
    {
        myLog("GameManager: Creating new ($_width,$_height) game $_gameName for player $_loginName with maxPlayer: $_gameNumPlayer");

        if ($this->cache->checkIfGameExists($_gameName))
        {
            $this->backendResult->setResult("Not Ok", "Requested game is already in use!");
            myLog("Error: The requested game $_gameName is already in use!");
            return false;
        }

        $this->cache->createNewGame($_loginName, $_gameName, $_width, $_height, $_gameNumPlayer);

        $mazeGenerator = new MazeGenerator($_width, $_height, $_gameNumPlayer);
        $maze = $mazeGenerator->generateMaze();
        for ($y=0; $y < $_height; $y++)
        {
            for ($x=0; $x < $_width; $x++)
            {
                $currentField = new FieldData($x, $y, $maze[$x][$y]);
                $fieldKey = $this->rediskaBase."fieldData/$x/$y/serializedFieldData";
                $this->rediska->set($fieldKey, $currentField);
            }
        }
        $this->backendResult->setData($maze);
        $this->backendResult->setResult("OK");

        return true;
    }

    /**
     * Deletes a specific game of a given user.
     *
     * @param string $_loginName The name of the user which deletes a game.
     * @param string $_gameName The name of the game that gets deleted.
     * @return bool True means that the game was deleted successfully.
     */
    public function deleteGame($_loginName, $_gameName)
    {
        $this->cache->deleteGame($_loginName, $_gameName);
        $this->backendResult->setResult("OK");
    }

    /**
     * Returns a list of all currently running games.
     */
    public function listGames()
    {
        $runningGames = new Rediska_Key_List($this->rediskaBase."runningGames");
        $data = new stdClass();
        $data->gameList = array();
        foreach($runningGames as $runningGame)
        {
            $data->gameList[] = $runningGame;
        }
        myLog("Returning a list of ".count($data->gameList)." running games");
        $this->backendResult->setData($data);
        $this->backendResult->setResult("OK");
    }

    /**
     * Tries to add the given user to the given game and results if it succeeded.
     *
     * @param string $_loginName The user which gets added to the game.
     * @param string $_gameName The game where the user gets added.
     * @return bool True means that the user could be added to the game.
     */
    public function joinGame($_loginName, $_gameName)
    {
        $runningGames = new Rediska_Key_List($this->rediskaBase."runningGames");
        foreach($runningGames as $runningGame)
        {
            if ($_gameName == $runningGame)
            {
                if ($this->cache->addPlayerToGame($_loginName, $_gameName))
                {// the game had a free slot and added us
                    $this->backendResult->setResult("OK");
                    return true;
                }
                else $this->backendResult->setResult("Not Ok", "Requested game did not add us!");
                return false;
            }
        }

        $this->backendResult->setResult("Not Ok", "Requested game does not exit anymore!");
        return false;
    }

    /**
     * Removes a player from a game.
     *
     * @param string $_loginName The player which gets removed from the game.
     * @param string $_gameName The name of the game from which the player is removed.
     * @return bool True means that the player was successfully removed from the game.
     */
    public function quitGame($_loginName, $_gameName)
    {
        if ($this->cache->removePlayerFromGame($_loginName, $_gameName))
        {
            return true;
        }
        return true;
    }

    public function addBot($_loginName, $_botId, $_gameName)
    {

    }

}
