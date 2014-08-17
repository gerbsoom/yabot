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

function checkError(_xmlhttprequest, _textstatus, _message)
{
    var errorCode = _xmlhttprequest.status;
    var consoleMessage = "Network Error: " + errorCode + " (" + _textstatus + ")" + " {" + _message + "}";

    showAtStatusConsole(consoleMessage, false);
}

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
