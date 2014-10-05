<?php
/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

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
