<?php

require_once 'lib/external/Rediska.php';
require_once 'lib/external/vendor/autoload.php';

$options = array('namespace' => 'Application_', 'servers'   => array(array('host' => '127.0.0.1', 'port' => 6379)));
$rediska = new Rediska($options);

// get an autoloader to run

$logger = new Monolog\Logger("GLOBAL");
$logger->pushHandler(new Monolog\Handler\StreamHandler("d:/logs/botgame.log", Monolog\Logger::DEBUG));

// Replace with Monolog
function myLog($_message)
{
    file_put_contents("d:/logs/botgame.log", date("Y-m-d H:i:s", time())." ".$_message."\n", FILE_APPEND);
}
