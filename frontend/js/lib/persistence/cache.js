var usersKey = "/user/list";
var joinedGame = "/game/joined";
var loggedInUser = "/user/loggedIn";
var createdGamesKey = "/games/created";
var gameSessionKey = "/game/sessionKey";
var battlefieldBaseKey = "/games/battlefields/";

function getUsers()
{
    if (localStorage.getItem(usersKey))
    {
        return JSON.parse(localStorage.getItem(usersKey));
    }
    return null;
}

function setJoinedGame(_joinedGame)
{
    localStorage.setItem(joinedGame, _joinedGame);
}

function getJoinedGame()
{
    return localStorage.getItem(joinedGame);
}

function deleteJoinedGame()
{
    return localStorage.removeItem(joinedGame);
}

function getGameSessionKey()
{
    return localStorage.getItem(gameSessionKey);
}

function deleteGameSessionKey()
{
    return localStorage.removeItem(gameSessionKey);
}

function setGameSessionKey(_sessionKey)
{
    localStorage.setItem(gameSessionKey, _sessionKey);
}

function getCreatedGames()
{
    if (localStorage.getItem(createdGamesKey))
    {
        return JSON.parse(localStorage.getItem(createdGamesKey));
    }
    return null;
}

function addValidUser(_userName)
{
    var validUsers = [];
    if (localStorage.getItem(usersKey))
    {// if it exists it must already be an array
        validUsers = JSON.parse(localStorage.getItem(usersKey));
    }
    if (validUsers.indexOf(_userName) == -1)
    {
        validUsers.push(_userName);
        localStorage.setItem(usersKey, JSON.stringify(validUsers));
        return true;
    }
    return false;
}

function addCreatedGame(_createdGame)
{
    var createdGames = [];
    if (localStorage.getItem(createdGamesKey))
    {// if it exists it must already be an array
        createdGames = JSON.parse(localStorage.getItem(createdGamesKey));
    }
    if (createdGames.indexOf(_createdGame) == -1)
    {
        createdGames.push(_createdGame);
        localStorage.setItem(createdGamesKey, JSON.stringify(createdGames));
        return true;
    }
    return false;
}

function getLoggedInUser()
{
    if (localStorage.getItem(loggedInUser) !== null)
    {
        return localStorage.getItem(loggedInUser);
    }
    return null;
}

function setLoggedInUser(_userName)
{
    localStorage.setItem(loggedInUser, _userName);
    return true;
}

function storeBattleFieldData(_loginName, _gameName, _battlefield)
{
    var gameBaseKey = battlefieldBaseKey + _gameName + "/";
    if (localStorage.getItem(gameBaseKey) !== null)
    {// overwrite an outdated entry at this pos
        localStorage.removeItem(gameBaseKey)
    }
    localStorage.setItem(gameBaseKey, new Date().getTime() / 1000);

    // field has to be padded to square
    var dimension = _battlefield.length;
    var now = new Date().getTime() / 1000;
    localStorage.setItem(gameBaseKey + "data", now);
    localStorage.setItem(gameBaseKey + "width", dimension);
    localStorage.setItem(gameBaseKey + "height", dimension);
    localStorage.setItem(gameBaseKey + "creator", _loginName);

    var check = [];
    for (var x=0; x < _battlefield.length; x++)
    {
        check[x] = [];
        for (var y=0; y < _battlefield.length; y++)
        {
            localStorage.setItem(gameBaseKey+"data/"+x+"/"+y, _battlefield[x][y].type);
            check[x][y] = _battlefield[x][y].type;
        }
    }
    console.log(check);
}

function getBattleFielData(_gameName)
{
    var gameBaseKey = battlefieldBaseKey + _gameName + "/";
    if (localStorage.getItem(gameBaseKey) === null)
    {
        console.log("Error retrieving BattleFieldData from cache!!!");
        return null;
    }
    var fieldWith = localStorage.getItem(gameBaseKey + "width");
    var fieldHeight = localStorage.getItem(gameBaseKey + "height");
    var result = [];
    for (var x=0; x < fieldWith; x++)
    {
        result[x] = [];
        for (var y=0; y < fieldHeight; y++)
        {
            result[x][y] = localStorage.getItem(gameBaseKey+"data/"+x+"/"+y);
        }
    }
    return result;
}
