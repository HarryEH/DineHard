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
        alert("Register not fine!");
        return false;
    } else {
        alert("Register fine!");
        return true;
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}









function register() {
    var form = document.getElementById('registerForm');
    sendAjaxQuery("/register", JSON.stringify(serialiseForm()));
}

function serialiseForm(){
    var formArray= $("form").serializeArray();
    var data={};
    for (index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }
    return data;
}

function sendAjaxQuery(url, stringifieddata) {
    $.ajax({
        url: url ,
        data: stringifieddata,
        contentType: 'application/json',

        type: 'POST',
        success: function (dataR) {

            var ret = dataR;
            // in order to have the object printed by alert
            // we need to JSON stringify the object
            // otherwise the alert will just print ‘[Object]’
            alert('Success: ' + JSON.stringify(ret));
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });
}