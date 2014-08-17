#Region ;**** Directives created by AutoIt3Wrapper_GUI ****
#AutoIt3Wrapper_Icon=..\..\Users\Desmodul\Pictures\Bots\bender_32.ico
#AutoIt3Wrapper_UseUpx=y
#EndRegion ;**** Directives created by AutoIt3Wrapper_GUI ****
$redisPath = "C:/Program Files (x86)/Redis/redis-server.exe"
$nodeCommand = "node C:/xampp/htdocs/botgame/backend/node/server.js"
$botGameService = "php C:/xampp/htdocs/botgame/backend/service/botgame.service.php"
$logTailCommand = "C:\Program Files\Logging\Tail.exe"

$pidRedis = Run($redisPath)
$pidNodeJS = Run($nodeCommand)
$pidBotGame = Run($botGameService)
$pidLogTail = Run($logTailCommand)


MsgBox(0, "Progress", "PIDs=[" & $pidRedis & "]" & "[" & $pidNodeJS & "]" & "[" & $pidBotGame & "]" & "[" & $pidLogTail & "]");
Exit