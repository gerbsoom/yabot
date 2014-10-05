<?php
/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

/**
 * Base class for all handlers to setup some stuff which is needed everywhere.
 */
class HandlerBase
{
    /** @var  Monolog\Logger */
    protected $log;
    protected $cache;
    protected $backendResult;

    /**
     * Constructs the base handler and sets up the common stuff.
     *
     * @param BackendResult $_backendResult The BackendResult which contains the data or an error after the operation is finished.
     */
    public function __construct(BackendResult $_backendResult)
    {
        $this->cache = new CacheController();
        $this->backendResult = $_backendResult;
        $this->log = LoggerRegistry::getLogger($this);
    }

}
