/**
* This function validates user input for registering an account. If there is an element missing, the user will
* be alerted, and red writing appears above the fields that are not satisfied.
* @return true if all fields contain validate input, or returns false otherwise, with an alert and the fields that
* do not contain a valid input are clearly highlighted.
 */
function registerValidate(){
    var fname = document.forms["registerForm"]["f"].value.trim();
    var sname = document.forms["registerForm"]["s"].value.trim();
    var email = document.forms["registerForm"]["e"].value.trim();
    var user = document.forms["registerForm"]["u"].value.trim();
    var pass = document.forms["registerForm"]["p"].value;
    var cPass = document.forms["registerForm"]["c"].value;
    var fnError = document.getElementById("fnError");
    var snError = document.getElementById("snError");
    var emError = document.getElementById("emError");
    var uError = document.getElementById("uError");
    var pError = document.getElementById("pError");
    var cpError = document.getElementById("p2Error");
    var registerOk = true;

    fnError.innerHTML = "";
    snError.innerHTML = "";
    emError.innerHTML = "";
    uError.innerHTML = "";
    pError.innerHTML = "";
    cpError.innerHTML = "";

    if(fname == ""){
        fnError.innerHTML = "* Please enter a Forename *";
        registerOk = false;
    }
    if(sname == "") {
        snError.innerHTML = "* Please enter a Surname *";
        registerOk = false;
    }

    if(email == "") {
        emError.innerHTML = "* Please enter an Email *";
        registerOk = false;
    } else if(!validateEmail(email))
    {
        emError.innerHTML = "* Please enter a correct Email Address *"
        registerOk = false;
    }

    if(user == ""){
        uError.innerHTML = "* Please enter an Username *";
        registerOk = false;
    } else if(validateUsername(user)){
        uError.innerHTML = "* Usernames cannot contain special symbols or spaces *";
        registerOk = false;
    } else if(user.length < 6 || user.length > 16)
    {
        uError.innerHTML = "* Usernames must be between 6 - 16 characters *";
        registerOk = false;
    }

    if(pass == "") {
        pError.innerHTML = "* Please enter a Password *";
        registerOk = false;
    } else if(cPass == ""){
        cpError.innerHTML = "* Please confirm your Password *";
        registerOk = false;
    } else if(pass.length < 8)
    {
        pError.innerHTML = "* Passswords must be at least 8 characters *";
        registerOk = false;
    }else if(pass !== cPass){
        cpError.innerHTML = "* Passwords do not match *"
        registerOk = false;
    }

    if(!registerOk)
    {
        event.preventDefault();
        return false;
    } else {
        return true;
    }
}

/**
* Regexes the email to check if it is valid*
* @return true if regex is true, false if regex is false
 */
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
* Regexes the username to check if it is valid*
* @return true if regex is true, false if regex is false
 */
function validateUsername(user) {
    var re = /[^A-Za-z0-9_-]/;
    return re.test(String(user).toLowerCase());
}
