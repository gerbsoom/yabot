<?php

/**
 * Represents a single tile (wall or free field) on the battlefield.
 */
class FieldData
{
    public $posX;
    public $posY;
    public $type;
    /** @var  Bot */
    public $bot;

    /**
     * Constructs the FieldData object for the given values.
     *
     * @param int $_posX The X-value of the FieldData position.
     * @param int $_posY The Y-value of the FieldData position.
     * @param int $_type The type of the FieldData.
     * @param Bot $_bot A possible Bot object.
     */
    function __construct($_posX, $_posY, $_type=0, $_bot=null)
    {
        $this->posX = $_posX;
        $this->posY = $_posY;
        $this->type = $_type;
        $this->bot = $_bot;
    }

    /**
     * Set a Bot to be standing at this field.
     *
     * @param Bot $_bot The bot which stands at this field.
     */
    function setBot(Bot $_bot)
    {
        $this->bot = $_bot;
    }

    /**
     * Return the Bot which stands at this field.
     */
    function getBot()
    {
        return $this->bot;
    }

    /**
     * Returns the ASCII-representation of this field.
     *
     * @return string The ASCII-representation of this field.
     */
    function toAscii()
    {
        if ($this->type == 0) return " ";
        else if ($this->type <= 5) return ".";
        else return "*";
    }

}
