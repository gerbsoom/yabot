/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

/**
 * Contains all available functions to store and retrieve persistent data from the local storage.
 */

var usersKey = "/user/list";
var joinedGame = "/game/joined";
var loggedInUser = "/user/loggedIn";
var createdGamesKey = "/games/created";
var gameSessionKey = "/game/sessionKey";
var battlefieldBaseKey = "/games/battlefields/";

/**
 * Returns all known users.
 *
 * @returns {string} Contains all known users.
 */
function getUsers()
{
    if (localStorage.getItem(usersKey))
    {
        return JSON.parse(localStorage.getItem(usersKey));
    }
    return null;
}

/**
 * Sets the joined game.
 *
 * @param {string} _joinedGame The joined game.
 */
function setJoinedGame(_joinedGame)
{
    localStorage.setItem(joinedGame, _joinedGame);
}

/**
 * Returns the joined game.
 *
 * @returns {string} The joined game.
 */
function getJoinedGame()
{
    return localStorage.getItem(joinedGame);
}

/**
 * Deletes the joined game.
 *
 * @returns {boolean} True means that the deletion succeeded.
 */
function deleteJoinedGame()
{
    return localStorage.removeItem(joinedGame);
}

/**
 * Returns the game session key.
 *
 * @returns {string} The game session key.
 */
function getGameSessionKey()
{
    return localStorage.getItem(gameSessionKey);
}

/**
 * Deletes the game session key.
 *
 * @returns {boolean} True means that the deletion succeeded.
 */
function deleteGameSessionKey()
{
    return localStorage.removeItem(gameSessionKey);
}

/**
 * Stores the game session key.
 *
 * @param {string} _sessionKey The game session key.
 */
function setGameSessionKey(_sessionKey)
{
    localStorage.setItem(gameSessionKey, _sessionKey);
}

/**
 * Returns all created games.
 *
 * @returns {string} Contains all created games.
 */
function getCreatedGames()
{
    if (localStorage.getItem(createdGamesKey))
    {
        return JSON.parse(localStorage.getItem(createdGamesKey));
    }
    return null;
}

/**
 * Adds the provided user into the array of valid users.
 *
 * @param {string} _userName The userName which gets added into the array of valid users.
 * @returns {boolean} True means that the user did not existed in the array of valid users and was added.
 */
function addValidUser(_userName)
{
    var validUsers = [];
    if (localStorage.getItem(usersKey))
    {// if it exists it must already be an array
        validUsers = JSON.parse(localStorage.getItem(usersKey));
    }
    if (validUsers.indexOf(_userName) == -1)
    {// user does not exist in the string
        validUsers.push(_userName);
        localStorage.setItem(usersKey, JSON.stringify(validUsers));
        return true;
    }
    return false;
}

/**
 * Adds the provided game into the array of created games.
 *
 * @param {string} _createdGame The gameName which gets added into the array of of created games.
 * @returns {boolean} True means that the game did not existed in the array of of created games and was added.
 */
function addCreatedGame(_createdGame)
{
    var createdGames = [];
    if (localStorage.getItem(createdGamesKey))
    {// if it exists it must already be an array
        createdGames = JSON.parse(localStorage.getItem(createdGamesKey));
    }
    if (createdGames.indexOf(_createdGame) == -1)
    {// game does not exist in the string
        createdGames.push(_createdGame);
        localStorage.setItem(createdGamesKey, JSON.stringify(createdGames));
        return true;
    }
    return false;
}

/**
 * Gets the logged-in user.
 *
 * toDo: On page reload, the returned session has to be evaluated and this value maybe deleted.
 *
 * @returns {string} The logged-in user..
 */
function getLoggedInUser()
{
    if (localStorage.getItem(loggedInUser) !== null)
    {
        return localStorage.getItem(loggedInUser);
    }
    return null;
}

/**
 * Sets the provided user as logged-in.
 *
 * toDo: On page reload, the returned session has to be evaluated and this value maybe deleted.
 *
 * @param {string} _userName The user from which the state gets set to logged-in.
 * @returns {boolean} True means that setting the user state succeeded.
 */
function setLoggedInUser(_userName)
{
    localStorage.setItem(loggedInUser, _userName);
    return true;
}

/**
 * Stores the complete battlefield data in the local storage.
 *
 * @param {string} _loginName The name of the user that created the game.
 * @param {string} _gameName The name of the game that gets stored in the local storage.
 * @param {string} _battlefield The complete battlefield returned by the the backend action 'getBattlefieldData'.
 */
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

/**
 * Returns the stored battlefield.
 *
 * @param {string} _gameName The name of the game that should be retrieved.
 * @returns {int[][]} The stored battlefield.
 */
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
