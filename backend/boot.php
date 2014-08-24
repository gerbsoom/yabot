<?php

require_once 'lib/external/vendor/autoload.php';

$options = array('servers' => array(array('host' => '127.0.0.1', 'port' => 6379)));
$rediska = new Rediska($options);

/**
 * Custom auto loader for own files.
 *
 * @param string $_className The name of the class that gets sourced.
 */
function customAutoLoader($_className)
{
    $found = false;
    $dirs = array("controller", "handler", "model", "persistence") ;
    foreach ($dirs as $dir)
    {
        $file = __DIR__."/lib/".$dir."/".$_className. '.php';
        if (file_exists($file))
        {
            require $file;
            $found = true;
            break;
        }
    }
    if (!$found) myLog("Not finding class: $_className");
}
spl_autoload_register("customAutoLoader");

//$logger = new Monolog\Logger("GLOBAL");
//$logger->pushHandler(new Monolog\Handler\StreamHandler("d:/logs/botgame.log", Monolog\Logger::DEBUG));

// Replace with Monolog
function myLog($_message)
{
    file_put_contents("d:/logs/botgame.log", date("Y-m-d H:i:s", time())." ".$_message."\n", FILE_APPEND);
}
