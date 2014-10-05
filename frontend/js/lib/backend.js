/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

/**
 * Executes an (jQuery) AJAX call with the provided parameters at \c _url.
 *
 * If the call succeeds without an error the result is passed to \c _successCallback.
 * In error cases the result is passed to \c _errorCallback.
 *
 * @param _url
 * @param type
 * @param _postData
 * @param _dataType
 * @param _successCallback
 * @param _errorCallback
 */
function doPostRequest(_url, type, _postData, _dataType, _successCallback, _errorCallback)
{
    $.ajax({
        url: _url,                                   // servlet URL that gets first option as parameter and returns JSON of to-be-populated options
        type: type,                                     // request type, can be GET
        cache: false,                                   // do not cache returned data
        data: _postData,                                // data to be sent to the server
        dataType: _dataType,                            // type of data returned
        timeout: 10000,
        success: function(_response)
        {
            _successCallback(_response);
        },
        error: function(_xmlhttprequest, _textstatus, _message)
        {
            _errorCallback(_xmlhttprequest, _textstatus, _message);
        }
    });
}

function getServerUrl()
{
    return "../backend/index.php";
}

/**
 * Error callback which gets processed if the call ends in an error state.
 *
 * @param _xmlhttprequest
 * @param _textstatus
 * @param _message
 */
function checkError(_xmlhttprequest, _textstatus, _message)
{
    var errorCode = _xmlhttprequest.status;
    var consoleMessage = "Network Error: " + errorCode + " (" + _textstatus + ")" + " {" + _message + "}";

    showAtStatusConsole(consoleMessage, false);
}

/**
 * Success callback which gets processed if the call ends in an state without errors.
 *
 * @param _result Contains the complete backend result as JSON string.
 * @returns bool True means that the status in the result is 'OK'.
 */
function checkResult(_result)
{
    var command = "[" + _result.controller + "::" + _result.action + "]";
    var status = "(" + _result.status + ")";

    var statusMessage = command + " " + status + "\n";
    if (_result.status != "OK") statusMessage += " {" + _result.errorMessage + "}";

    showAtStatusConsole(statusMessage, false);

    if (_result.errorMessage.contains("Session was timed out"))
    {
        setLoggedInUser(null);
        updateLoggedInFieldLabel("Null");
        showAtStatusConsole("\nSession is timed out!\n", true);
    }

    return _result.status == "OK";
}

function initWebSocketGameChannel(_sessionKey)
{
    var socket = io('http://localhost:8080');
    socket.emit("provideSessionKey", { loginName: getLoggedInUser(), sessionKey: _sessionKey });
    socket.on('echo', function (data) {
        console.log(data);
        showAtStatusConsole("Echo message from Server: " + data.state, false);
    });
    socket.on("PrivilegedChannel", function (data)
    {
        var message = "Websocket Game channel established";
        showAtStatusConsole(message, false);
        showAtGameConsole(getJoinedGame(), message, false);
    });
    socket.on("GameUpdate", function (data)
    {
        var message = "[" + data.botId + "] moves to (" + data.posX + "," + data.posY + ")";
        var gameName = getJoinedGame();
        showAtGameConsole(gameName, message, false);
        console.log("GameUpdate");
        drawBotAt(data.botId, new Coordinate(data.posX, data.posY), getCurrentBotPos(data.botId), getBattleFielData(getJoinedGame()));
    });
}
