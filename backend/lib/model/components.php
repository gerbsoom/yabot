<?php

class Components
{
    public function getController()
    {
        return array("battlefield"=>"BattlefieldController", "account"=>"AccountController", "game"=>"GameController");
    }

    public function getActions()
    {
        return array("account"=>array("actions"=>array("register", "login", "logout"), "params"=>array("loginName", "passwordHash", "server")),
                     "game"=>array("actions"=>array("createGame", "joinGame", "deleteGame", "disconnectGame", "listGames", "sendMessage"), "params"=>array("loginName", "gameName", "gameWidth", "gameHeight", "gameNumPlayer")),
                     "battlefield"=>array("actions"=>array("getCurrentBattlefieldState", "getFieldState", "addBot"), "params"=>array("loginName", "gameName", "botId", "posX", "posY"))
                    );
    }
}
