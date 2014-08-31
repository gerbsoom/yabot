function updateLoggedInFieldLabel(_userName)
{
    var retrievedLoggedInFieldLabel = document.getElementById("loggedInFieldLabel");
    if (retrievedLoggedInFieldLabel)
    {
        retrievedLoggedInFieldLabel.innerHTML = "Logged in as: " + _userName;
    }
    else showAtStatusConsole("Error updating login label in ACCOUNT!", false);
}
