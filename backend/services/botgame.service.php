<?php

require_once(__DIR__ . "/../boot.php");
require_once(__DIR__ . "/../lib/persistence/rediskacache.php");

$rediska = Rediska_Manager::get();
$cache = new RediskaCache();

$rediskaBase = "botgame/";
// ensure existing of the base key
if (!$rediska->exists($rediskaBase))
{
    myLog("Initially create cache key at: ".$rediskaBase);
    $rediska->set($rediskaBase);
}
// quick list containing all running games
if (!$rediska->exists($rediskaBase."runningGames"))
{
    myLog("Initially create cache LIST key at: ".$rediskaBase."runningGames");
    new Rediska_Key_List($rediskaBase."runningGames");
}
// quick list containing all known users
if (!$rediska->exists($rediskaBase."knownUsers"))
{
    myLog("Initially create cache LIST key at: ".$rediskaBase."knownUsers");
    new Rediska_Key_List($rediskaBase."knownUsers");
}

$endLoop = false;

while(!$endLoop)
{
    mylog("SERVICE: Cyclically check for user that are timed out");
    // check for logged in users that are currently timed out
    foreach ($cache->getLoggedInUsers() as $loggedInUser)
    {
        myLog("Checking logged in $loggedInUser: ");
        if ($cache->sessionTimedOut($loggedInUser))
        {
            myLog("SERVICE: Logging out $loggedInUser because of session timeout");
            $cache->logOutUser($loggedInUser);
        }
    }
    foreach ($cache->getKnownUsers() as $knownUser)
    {
        myLog("Checking known usrt $knownUser: ");
        if ($cache->sessionTimedOut($knownUser))
        {
            myLog("SERVICE: Logging out $knownUser because of session timeout");
            $cache->logOutUser($knownUser);
        }
    }

    mylog("SERVICE: Cyclically check for outdated games without players");
    // old games will be deleted if no one uses them anymore
    foreach ($cache->getRunningGames() as $runningGame)
    {
        myLog("Checking running game $runningGame: ");
        $baseKey = "botgame/".$runningGame."/";
        $owner = $rediska->get($baseKey."owner");
        myLog("-->Owner: ".$owner);
        $playerList = new Rediska_Key_List($baseKey."playerList");
        $playerCount = count($playerList);
        myLog("-->PlayerCount: ".$playerCount);
        $lastActivity = $rediska->get($baseKey."lastActivity");
        if ($playerCount == 0 ||                                        // no players in the game
           ($playerCount == 1 && $lastActivity + 43200 < time()) ||     // one player for 12h AFK
           ($lastActivity + (4*43200) < time()))                        // arbitrary  but 2d AFK!
        {
            myLog("Deleting old game");
            $cache->deleteGame($owner, $runningGame);
        }

    }

    mylog("SERVICE: Going to sleep for 10 minutes");
    sleep(600);
}

