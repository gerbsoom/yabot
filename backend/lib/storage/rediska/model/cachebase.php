<?php
/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

class CacheBase
{
    /** @var Rediska */
    protected $rediska;
    protected $baseKey;
    /** @var UpdateChannel  */
    protected $updateChannel;
    /** @var  Monolog\Logger */
    protected $log;

    /**
     * Constructs a cache game with the provided parameters.
     *
     * @param UpdateChannel $_updateChannel The update channel to populate changes.
     * @param Rediska $_rediska Rediska reference where the data gets stored.
     * @param string $_rediskaBase Cache base key where the data get stored.
     */
    function __construct(UpdateChannel $_updateChannel, Rediska $_rediska, $_rediskaBase)
    {
        $this->updateChannel = $_updateChannel;
        $this->rediska = $_rediska;
    }

}
