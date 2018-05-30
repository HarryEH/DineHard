/**
 * Validates whether the user has a valid login form
 */
function loginValidate(){
    var user = document.forms["loginForm"]["u"].value;
    var pass = document.forms["loginForm"]["p"].value;
    var uError = document.getElementById("uError");
    var pError = document.getElementById("pError");
    var loginOk = true;

    uError.innerHTML = "";
    pError.innerHTML = "";

    if(user == ""){
        uError.innerHTML = "* Enter a Username *";
        loginOk = false;
    }
    if(pass == "") {
        pError.innerHTML = "* Enter a Password *";
        loginOk = false;
    }

    if(!loginOk)
    {
        event.preventDefault();
        return false;
    } else {
        return true;
    }
}

