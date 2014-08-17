<?php

class ComponentManager
{
    public function getCmdController()
    {
        return array("battlefield"=>"BattlefieldController", "account"=>"AccountController", "game"=>"GameController");
    }

    public function getValidCommands()
    {
        return array("account"=>array("actions"=>array("register", "login", "logout", "selectServer"), "params"=>array("loginName", "passwordHash", "server")),
                     "game"=>array("actions"=>array("createGame", "joinGame", "deleteGame", "listGames", "sendMessage"), "params"=>array("loginName", "gameName", "chatMessage", "gameWidth", "gameHeight", "gameNumPlayer")),
                     "battlefield"=>array("actions"=>array("getCurrentBattlefieldState"), "params"=>array("loginName", "gameName"))
                    );
    }
}
