<?php
/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

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
    $dirs = array("controller", "handler", "model", "service", "storage/interface", "storage/rediska", "storage/rediska/model") ;
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
}
spl_autoload_register("customAutoLoader");

LoggerRegistry::createInstance("d:/logs/botgame_monolog.log", Monolog\Logger::DEBUG);
