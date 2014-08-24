<?php

class UpdateChannel
{
    /** @var  Monolog\Logger */
    private $log;
    /** @var  Rediska_PubSub_Channel */
    private $connectionChannel;
    /** @var  Rediska_PubSub_Channel */
    private $gameSessionChannel;
    /** @var  Rediska_PubSub_Channel */
    private $gameFieldDataChannel;

    public function __construct()
    {
        $this->log = LoggerRegistry::getLogger($this);
        $this->connectionChannel = new Rediska_PubSub_Channel("botgame/update/connectionChannel");
        $this->gameSessionChannel = new Rediska_PubSub_Channel("botgame/update/gameSessionChannel");
        $this->gameFieldDataChannel = new Rediska_PubSub_Channel("botgame/update/gameFieldDataChannel");
    }

    /**
     * Publishes the message on the connection channel.
     *
     * @param string $_message String/JSON-encoded message which which gets published.
     */
    function publishOnConnectionChannel($_message)
    {
        $this->log->debug("Publishing message='$_message' on connection channel");
        $this->connectionChannel->publish($_message);
    }

    /**
     * Publishes the message on the gameSession channel.
     *
     * @param string $_message String/JSON-encoded message which which gets published.
     */
    function publishOnGameSessionChannel($_message)
    {
        $this->log->debug("Publishing message='$_message' on game session channel");
        $this->gameSessionChannel->publish($_message);
    }

    /**
     * Publishes the message on the gameFieldData channel.
     *
     * @param string $_message String/JSON-encoded message which which gets published.
     */
    function publishOnGameFieldDataChannel($_message)
    {
        $this->log->debug("Publishing message='$_message' on gameFieldData channel");
        $this->gameFieldDataChannel->publish($_message);
    }

}
