function onlogin() {
    var form = document.getElementById('loginForm');
    sendAjaxQuery("/login", JSON.stringify(serialiseForm()));
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

function validate(){
    var user = document.forms["loginForm"]["u"].value;
    var pass = document.forms["loginForm"]["p"].value;
    var uError = document.getElementById("uError");
    var pError = document.getElementById("pError");
    var loginOk = true;

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

