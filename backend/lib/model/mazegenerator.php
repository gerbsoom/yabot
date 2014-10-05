<?php
/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

require_once(__DIR__ . "/../../boot.php");

/**
 * Generates a battlefield with the provided parameters for a new bot game.
 *
 * The field is fully surrounded with a border out of walls but it could be possible to add some warp zones.
 * The players will start randomly in their base corner with some fields (3x3) free without walls.
 * In the middle, there will always be a free neutral zone without walls
 */
class MazeGenerator
{
    /** @var Monolog\Logger */
    private $log;
    private $width;
    private $height;
    private $player;

    const FIELD_RANDOM = 0;
    const FIELD_NEUTRAL = 1;
    const FIELD_BLUE_BOT = 2;
    const FIELD_BLACK_BOT = 3;
    const FIELD_LIGHTBLUE_BOT = 4;
    const FIELD_LIGHTBLACK_BOT = 5;

    const WALL_BRICK = 6;
    const WALL_VERTICAL = 7;
    const WALL_HORIZONTAL = 8;
    const WALL_CONNECTOR = 9;

    private $backupDir;
    private $backupMaze;
    private $battleMaze;

    private $playerBases = array();
    private $processedFields = array();
    private $middlePositions = array();
    private $coordPathToMiddle = array();

    /**
     * Constructs a MazeGenerator with the provided values.
     *
     * More Parameters:
     *  - maxBotsPerGame/Player
     *  - initialRandomItems/spawnRate
     *  - proportionBetweenFieldsAndWalls
     *
     * @param int $_width The width with which the battlefield is generated.
     * @param int $_height The height with which the battlefield is generated.
     * @param int $_player Defines the maximum of players that can join the game.
     */
    function __construct($_width=16, $_height=16, $_player=2)
    {
        $this->log = LoggerRegistry::getLogger($this);
        $this->width = $_width;
        $this->height = $_height;
        $this->player = $_player;
        // init all needed arrays
        $this->battleMaze = array();
        for ($x=0; $x < $_width; $x++)
        {
            $this->battleMaze[$x] = array();
        }
        for ($p=0; $p < $_player; $p++)
        {
            $this->coordPathToMiddle[$p] = array();
        }
        // shuffle the starting positions of the player bases
        $startPoints = array("left", "top", "right", "bottom");
        while (count($startPoints) > 0)
        {
            $index = rand(0, count($startPoints));
            if (isset($startPoints[$index]))
            {
                $this->playerBases[] = $startPoints[$index];
                unset($startPoints[$index]);
                $startPoints = array_values($startPoints);
            }
        }
        $this->backupDir = "D:/logs/bg_tmp/";
        $this->log->debug("Backup directory at: ".$this->backupDir);
    }

    /**
     * Sets a new backup location.
     *
     * @param string $_backupDir The new backup location.
     */
    function setLogDir($_backupDir)
    {
        $this->log->debug("Change backup location to $_backupDir");
        $this->backupDir = $_backupDir;
    }

    /**
     * Generates randomly the battlefield without overwriting the border, middle and player bases.
     *
     * Iterates the field generation until the validation succeeded (field/wall-ratio could be adapted from run to run).
     *
     * @return array[] 2-dimensional array containing the complete battlefield.
     */
    function generateMaze()
    {
        $this->log->debug("Generating (".$this->width."x".$this->height.") maze for ".$this->player. " player");
        $cnt = 0;
        $this->createBorder();
        $this->createMiddleField();
        $this->createPlayerBases();
        $this->addSomeRandomItems();

        // store the fixed part for reusing
        $this->backupMaze = $this->battleMaze;
        while ($cnt < 1000)
        {
            for ($x=1; $x < $this->width-1; $x++)
            {
                for ($y=1; $y < $this->height-1; $y++)
                {
                    if (!isset($this->battleMaze[$x][$y]))
                    {
                        if (rand(0,1000) % 3 == 0)
                        {
                            $this->battleMaze[$x][$y] = self::WALL_BRICK;
                        }
                        else $this->battleMaze[$x][$y] = self::FIELD_NEUTRAL;
                    }
                }
            }
            if ($this->validate())
            {
                $this->log->debug("Battlefield validated after $cnt iterations");
                break;
            }
            else $cnt++;
            // restore the empty backup over the buggy version
            $this->battleMaze = $this->backupMaze;
        }
        // backup the battlefield and display ASCII version in log
        $this->backupBattlefield();
        $this->debugField();

        return $this->battleMaze;
    }

    /**
     * Creates the border which completely surrounds the battlefield.
     */
    private function createBorder()
    {
        $this->battleMaze[0][0] = self::WALL_CONNECTOR;
        $this->battleMaze[$this->width-1][0] = self::WALL_CONNECTOR;
        $this->battleMaze[0][$this->height-1] = self::WALL_CONNECTOR;
        $this->battleMaze[$this->width-1][$this->height-1] = self::WALL_CONNECTOR;
        for ($x=1; $x < $this->width-1; $x++)
        {
            $this->battleMaze[$x][0]  = self::WALL_HORIZONTAL;
            $this->battleMaze[$x][$this->height-1]  = self::WALL_HORIZONTAL;
        }
        for ($y=1; $y < $this->height-1; $y++)
        {
            $this->battleMaze[0][$y]  = self::WALL_VERTICAL;
            $this->battleMaze[$this->width-1][$y]  = self::WALL_VERTICAL;
        }
    }

    /**
     * Creates a wall-free neutral zone (6x6) in the middle of the battlefield.
     */
    private function createMiddleField()
    {
        $ops = 0;
        $midX = (int)($this->width / 2);
        $midY = (int)($this->height / 2);
        for ($x=$midX-3; $x<$midX+3; $x++)
        {
            for ($y=$midY-3; $y<$midY+3; $y++)
            {
                $ops++;
                $this->battleMaze[$x][$y] = self::FIELD_NEUTRAL;
                $this->middlePositions[] = $x."x".$y;
            }
        }
    }

    /**
     * Creates the player bases (3x3) in the corners of the battlefield.
     */
    private function createPlayerBases()
    {
        for ($i=0; $i < $this->player; $i++)
        {
            if ($this->playerBases[$i] == "left"){
                for ($x=1; $x < 4; $x++){
                    for ($y=$this->height-4; $y < $this->height-1; $y++){
                        $this->battleMaze[$x][$y] = self::FIELD_BLUE_BOT;
                    }
                }
                $this->log->debug("Player $i starting left_down corner");
            }
            else if ($this->playerBases[$i] == "top"){
                for ($x=1; $x < 4; $x++){
                    for ($y=1; $y < 4; $y++){
                        $this->battleMaze[$x][$y] = self::FIELD_BLACK_BOT;
                    }
                }
                $this->log->debug("Player $i starting top_left corner");
            }
            else if ($this->playerBases[$i] == "right"){
                for ($x=$this->width-4; $x < $this->width-1; $x++){
                    for ($y=1; $y < 4; $y++){
                        $this->battleMaze[$x][$y] = self::FIELD_LIGHTBLUE_BOT;
                    }
                }
                $this->log->debug("Player $i starting right_top corner");
            }
            else if ($this->playerBases[$i] == "bottom"){
                for ($x=$this->width-4; $x < $this->width-1; $x++){
                    for ($y=$this->height-4; $y < $this->height-1; $y++){
                        $this->battleMaze[$x][$y] = self::FIELD_LIGHTBLACK_BOT;
                    }
                }
                $this->log->debug("Player $i starting bottom_right corner");
            }
        }
    }

    /**
     * Adds a random amount of random items to the battlefield.
     */
    private function addSomeRandomItems()
    {
        $numRandomItems = rand(2, max(4, (int)$this->width/2));
        for ($i=1; $i < $numRandomItems; $i++)
        {
            $posX = rand(4, $this->width-4);
            $posY = rand(4, $this->height-4);
            $this->battleMaze[$posX][$posY] = MazeGenerator::FIELD_RANDOM;
            $this->log->debug("Add random item at pos: ($posX x $posY)");
        }
    }

    /**
     * Validates the battlefield for players that are stuck in their base without access to the middle.
     *
     * @return bool True means that all players have a valid route to the middle and so to each other.
     */
    private function validate()
    {
        for ($playerId=0; $playerId < $this->player; $playerId++)
        {
            // reset the processed from a previous run
            $this->processedFields = array();
            if ($this->playerBases[$playerId] == "left")
            {
                $cord = new Coordinate(1, $this->height - 2);
                if (!$this->middleReachable(array($cord), array(), $playerId))
                {
                    return false;
                }
            }
            else if ($this->playerBases[$playerId] == "top")
            {
                $cord = new Coordinate(1, 1);
                if (!$this->middleReachable(array($cord), array(), $playerId))
                {
                    return false;
                }
            }
            else if ($this->playerBases[$playerId] == "right")
            {
                $cord = new Coordinate($this->width - 2, 1);
                if (!$this->middleReachable(array($cord), array(), $playerId))
                {
                    return false;
                }
            }
            else if ($this->playerBases[$playerId] == "bottom")
            {
                $cord = new Coordinate($this->width - 2, $this->height - 2);
                if (!$this->middleReachable(array($cord), array(), $playerId))
                {
                    return false;
                }
            }
        }
        // all player have a valid route to the middle fields
        return true;
    }

    /**
     * Checks if there exist a direct path from the provided start point to the middle.
     *
     * Initially the \c $__neighborFields array only contains the start point Coordinate.
     *
     * @param Coordinate[] $_neighborFields Contains all (neighbor) fields that were not processed yet.
     * @param array $_currentPath Contains the currently computed path from start to a middle field.
     * @param int $_playerId The ID of the player for which the check is done.
     * @return bool
     */
    private function middleReachable($_neighborFields, $_currentPath, $_playerId)
    {
        if (count($_neighborFields) == 0)
        {// no field left to reach the middle
            $this->log->debug("Player (#$_playerId) Giving up after ".count($this->processedFields)." processed fields");
            return false;
        }
        /** @var Coordinate $coord */
        $coord = array_pop($_neighborFields);
        $_currentPath[] = $coord;
        if (!in_array($coord->id(), $this->processedFields))
        {// entry not processed yet, check if it is a middle field to end or add all valid neighbors for next run
            if (in_array($coord->id(), $this->middlePositions))
            {// well there is a middle field and we can finish with success
                $this->log->debug("Player (#$_playerId) Reach middle after ".count($this->processedFields)." processed fields");
                $stringPath = "PATH=";
                /*foreach ($_currentPath as $currentCoord)
                {/** @var Coordinate $currentCoord */
                /*    $stringPath .= "[".$currentCoord->id()."]";
                    // insert the next coordinate of the complete path to the middle (debug purposes)
                    $this->battleMaze[$currentCoord->posX()][$currentCoord->posY()] = $_playerId + 2;
                }*/
                $this->log->debug("Path: $stringPath");
                $this->coordPathToMiddle[$_playerId] = $_currentPath;
                // return the success recursively to validate method
                return true;
            }
            else $this->processedFields[] = $coord->id();

            // get the neighbors and add all valid unprocessed ones
            $up = new Coordinate($coord->posX(), $coord->posY() - 1);
            $down = new Coordinate($coord->posX(), $coord->posY() + 1);
            $left = new Coordinate($coord->posX() - 1, $coord->posY());
            $right = new Coordinate($coord->posX() + 1, $coord->posY());
            $neighbors = array($up, $down, $left, $right);
            foreach ($neighbors as $neighbor)
            {/** @var Coordinate $neighbor*/
                if ($neighbor->posX() >= 0 && $neighbor->posX() < $this->width &&       // still valid X-pos
                    $neighbor->posY() >= 0 && $neighbor->posY() < $this->height &&      // still valid Y-pos
                    $this->battleMaze[$neighbor->posX()][$neighbor->posY()] <= 5 &&     // pos is NOT a wall
                    !in_array($neighbor->id(), $this->processedFields)                  // Not yet processed
                )
                {// valid field to be processed in the next run
                    $_neighborFields[] = $neighbor;
                }
            }
        }
        return $this->middleReachable($_neighborFields, $_currentPath, $_playerId);
    }

    /**
     * Prints an ASCII-representation of the field into the log.
     */
    private function debugField()
    {
        for ($y=0; $y < $this->height; $y++)
        {
            $currentLine = "";
            for ($x=0; $x < $this->width; $x++)
            {
                if (!isset($this->battleMaze[$x][$y]) || $this->battleMaze[$x][$y] <= 1)
                {
                    $currentLine .= " ";
                }
                else if ($this->battleMaze[$x][$y] <= 5)
                {
                    $currentLine .= $this->battleMaze[$x][$y];
                }
                else $currentLine .= "*";
            }
            $this->log->debug(str_pad($y, 2, " ") . ": " . $currentLine);
        }
    }

    /**
     * Creates a backup of the created battlefield.
     */
    private function backupBattlefield()
    {
        $dateInfix = date("Y-m-d H-i-s", time());
        $asciiFile = $this->backupDir."/battlefield_ascii_$dateInfix (".$this->width."x".$this->height.").txt";
        $fullDataFile = $this->backupDir."/battlefield_full_$dateInfix (".$this->width."x".$this->height.").txt";

        $currentTypeCodeLine = "";
        for ($y=0; $y < $this->height; $y++)
        {
            $currentASCIILine = "";
            for ($x=0; $x < $this->width; $x++)
            {
                if (!isset($this->battleMaze[$x][$y]) || $this->battleMaze[$x][$y] <= 5)
                {
                    $currentASCIILine .= " ";
                }
                else $currentASCIILine .= "*";

                if (!isset($this->battleMaze[$x][$y]))
                {
                    $currentTypeCodeLine .= "0,";
                }
                else $currentTypeCodeLine .= $this->battleMaze[$x][$y].",";
            }
            file_put_contents($asciiFile, $currentASCIILine."\n", FILE_APPEND);
            $currentTypeCodeLine .= "\n";
        }
        file_put_contents($fullDataFile, $currentTypeCodeLine."\n", FILE_APPEND);
    }

}
