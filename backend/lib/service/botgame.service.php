<?php

/**
 * Background service which creates initial cache entries and cleans up cyclically sessions and leaked games.
 */

require_once(__DIR__ . "/../../boot.php");

$rediskaBase = "botgame/";
$cache = new CacheController();
$rediska = Rediska_Manager::get();

/** @var Monolog\Logger */
$log = LoggerRegistry::getLogger("botgame.service");

$neededCacheKeys = array("keys" => array($rediskaBase, $rediskaBase."sessionKeys/"));

foreach ($neededCacheKeys["keys"] as $neededCacheKey)
{// ensure the existence of all needed keys
    if (!$rediska->exists($neededCacheKey))
    {
        $log->debug("Initially create cache key at: ".$neededCacheKey);
        $rediska->set($neededCacheKey);
    }
}

while(true)
{
    $log->debug("SERVICE: Cyclically check for timed out user sessions and outdated games");

    foreach ($cache->getRegisteredUsers() as $registeredUser)
    {
        if ($cache->sessionTimedOut($registeredUser))
        {
            $log->debug("SERVICE: Logging out $registeredUser because of session timeout");
            $cache->logOutUser($registeredUser);
        }
    }

    foreach ($cache->getRunningGames() as $runningGame)
    {// old games will be deleted if no one uses them anymore
        if ($rediska->exists($rediskaBase.$runningGame))
        {
            $log->debug("Checking running game $runningGame in detail");
            $baseKey = "botgame/".$runningGame."/";
            $owner = $rediska->get($baseKey."owner");
            $playerList = new Rediska_Key_List($baseKey."playerList");
            $playerCount = count($playerList);
            $lastActivity = $rediska->get($baseKey."lastActivity");
            $log->debug("--> PlayerCount: ".$playerCount." Owner: ".$owner);
            if ($playerCount == 0 ||                                        // no players in the game
               ($playerCount == 1 && $lastActivity + 43200 < time()) ||     // one player for 12h AFK
               ($lastActivity + (4*43200) < time()))                        // arbitrary  but 2d AFK!
            {
                $log->debug("Deleting old game $runningGame");
                $cache->deleteGame($owner, $runningGame);
            }
        }
        else
        {
            $log->debug("Game does not exist in cache anymore, do a cleanup");
            $bogusList = new Rediska_Key_List($rediskaBase."runningGames");
            $bogusList->remove($runningGame);
        }
    }
    sleep(30);
}
