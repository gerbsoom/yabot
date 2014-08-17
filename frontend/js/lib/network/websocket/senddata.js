function sendMessage(_connection, _message)
{
    _connection.send(_message);
}

function sendCanvasImage(_connection, _canvasContext)
{
    var img = _canvasContext.getImageData(0, 0, 100, 100);
    var binary = new Uint8Array(img.data.length);
    for (var i = 0; i < img.data.length; i++)
    {
        binary[i] = img.data[i];
    }
    _connection.send(binary.buffer);
}

function selectAndSendFile(_connection)
{
    var file = document.querySelector('input[type="file"]').files[0];
    _connection.send(file);
}

/*
     To receive binary data (image or file blob) server has to register following input

     // Setting binaryType to accept received binary as either 'blob' or 'arraybuffer'
     connection.binaryType = 'arraybuffer';
     connection.onmessage = function(e) {
     console.log(e.data.byteLength); // ArrayBuffer object if binary
     };
 */
