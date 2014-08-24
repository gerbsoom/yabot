<?php

/**
 * Background service which creates initial cache entries and cleans up cyclically sessions and leaked games.
 */

require_once(__DIR__ . "/../boot.php");
require_once(__DIR__ . "/../lib/persistence/rediskacache.php");

$rediskaBase = "botgame/";
$cache = new RediskaCache();
$rediska = Rediska_Manager::get();

$neededCacheKeys = array("keys" => array($rediskaBase, $rediskaBase."sessionKeys/"));

foreach ($neededCacheKeys["keys"] as $neededCacheKey)
{// ensure the existence of all needed keys
    if (!$rediska->exists($neededCacheKey))
    {
        myLog("Initially create cache key at: ".$neededCacheKey);
        $rediska->set($neededCacheKey);
    }
}

while(true)
{
    mylog("SERVICE: Cyclically check for timed out user sessions and outdated games");

    foreach ($cache->getKnownUsers() as $knownUser)
    {
        if ($cache->sessionTimedOut($knownUser))
        {
            myLog("SERVICE: Logging out $knownUser because of session timeout");
            $cache->logOutUser($knownUser);
        }
    }

    foreach ($cache->getRunningGames() as $runningGame)
    {// old games will be deleted if no one uses them anymore
        if ($rediska->exists($rediskaBase.$runningGame))
        {
            myLog("Checking running game $runningGame in detail");
            $baseKey = "botgame/".$runningGame."/";
            $owner = $rediska->get($baseKey."owner");
            $playerList = new Rediska_Key_List($baseKey."playerList");
            $playerCount = count($playerList);
            $lastActivity = $rediska->get($baseKey."lastActivity");
            myLog("--> PlayerCount: ".$playerCount." Owner: ".$owner);
            if ($playerCount == 0 ||                                        // no players in the game
               ($playerCount == 1 && $lastActivity + 43200 < time()) ||     // one player for 12h AFK
               ($lastActivity + (4*43200) < time()))                        // arbitrary  but 2d AFK!
            {
                myLog("Deleting old game $runningGame");
                $cache->deleteGame($owner, $runningGame);
            }
        }
        else
        {
            myLog("Game does not exist in cache anymore, do a cleanup");
            $bogusList = new Rediska_Key_List($rediskaBase."runningGames");
            $bogusList->remove($runningGame);
        }
    }
    sleep(30);
}
