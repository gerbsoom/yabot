<?php

/**
 * Base class for all handlers to setup some stuff which is needed everywhere.
 */
class HandlerBase
{
    protected $cache;
    protected $rediska;
    protected $rediskaBase;
    protected $backendResult;

    /**
     * Constructs the base handler and sets up the common stuff.
     *
     * @param BackendResult $_backendResult The BackendResult which contains the data or an error after the operation is finished.
     */
    public function __construct(BackendResult $_backendResult)
    {
        $this->cache = new RediskaCache();
        $this->rediska = Rediska_Manager::get();
        $this->rediskaBase = "botgame/";
        $this->backendResult = $_backendResult;
    }

}
