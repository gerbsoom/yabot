<?php

require_once("handlerbase.php");

/**
 * Executes the battlefield operations which get dispatched here by the battlefield controller.
 */
class BattlefieldHandler extends HandlerBase
{
    private $width;
    private $height;
    private $gameId;

    /**
     * Constructs the BattlefieldHandler with a provided game name.
     *
     * @param BackendResult $_backendResult The BackendResult which contains the data or an error after the operation is finished.
     * @param string $_gameName The name of the game for which the BattlefieldHandler gets constructed.
     */
    public function __construct(BackendResult $_backendResult, $_gameName)
    {
        parent::__construct($_backendResult);
        $this->gameId = $_gameName;
        $this->width = $this->rediska->get($this->rediskaBase.$_gameName."/width");
        $this->height = $this->rediska->get($this->rediskaBase.$_gameName."/height");
        myLog("Processing game $_gameName with dimensions (".$this->width.",".$this->height.")");
    }

    /**
     * Returns the complete battlefield.
     */
    public function getCurrentState()
    {
        myLog("BattlefieldManager: Generating current state");
        $data=new stdClass();
        $battlefield = array();
        for ($y=0; $y < $this->height; $y++)
        {
            for ($x=0; $x < $this->width; $x++)
            {
                if (!isset($battlefield[$x])) $battlefield[$x] = array();
                $fieldKey = $this->rediskaBase."fieldData/$x/$y/serializedFieldData";
                if ($this->rediska->exists($fieldKey))
                {
                    $battlefield[$x][$y] = $this->rediska->get($fieldKey);
                }
                else $battlefield[$x][$y] = new FieldData($x, $y);
            }
        }
        $this->backendResult->setResult("OK");
        $data->battlefield = $battlefield;
        $this->backendResult->setData($data);
    }

    /**
     * Returns the current field data at the requested position.
     *
     * @param int $_posX The X part of the requested field coordinate.
     * @param int $_posY The Y part of the requested field coordinate
     */
    public function getFieldState($_posX, $_posY)
    {
        myLog("BattlefieldManager: Generate the state of field ($_posX, $_posY)");
        $fieldKey = $this->rediskaBase."fieldData/$_posX/$_posY/serializedFieldData";
        if ($this->rediska->exists($fieldKey))
        {
            $field = $this->rediska->get($fieldKey);
        }
        else $field = new FieldData($_posX, $_posY);
        $this->backendResult->setResult("OK");
        $this->backendResult->setData($field);
    }

}
