function registerValidate(){
    var fname = document.forms["registerForm"]["f"].value;
    var sname = document.forms["registerForm"]["s"].value;
    var email = document.forms["registerForm"]["e"].value;
    var user = document.forms["registerForm"]["u"].value;
    var pass = document.forms["registerForm"]["p"].value;
    var cPass = document.forms["registerForm"]["c"].value;
    var fnError = document.getElementById("fnError");
    var snError = document.getElementById("snError");
    var emError = document.getElementById("emError");
    var uError = document.getElementById("uError");
    var pError = document.getElementById("pError");
    var cpError = document.getElementById("p2Error");
    var registerOk = true;

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
    }
    if(user == ""){
        uError.innerHTML = "* Please enter an Username *";
        registerOk = false;
    }
    if(pass == "") {
        pError.innerHTML = "* Please enter a Password *";
        registerOk = false;
    } else if(cpass = ""){
        cpError.innerHTML = "* Please confirm your Password *";
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