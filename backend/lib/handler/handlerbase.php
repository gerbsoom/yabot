<?php

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
