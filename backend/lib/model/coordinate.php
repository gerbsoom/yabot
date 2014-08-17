<?php

class Coordinate
{
    public $posX;
    public $posY;

    function __construct($_posX, $_posY)
    {
        $this->posX = $_posX;
        $this->posY = $_posY;
    }

    function posX()
    {
        return $this->posX;
    }

    function posY()
    {
        return $this->posY;
    }

    function id()
    {
        return $this->posX."x".$this->posY;
    }

}
