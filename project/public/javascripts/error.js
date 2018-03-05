function errorCheck(errorStatus){
    var errorTitle = "";
    if(errorStatus == "404"){
        errorTitle = "<h1>Whoopsies! This page doesn't seem to exist!</h1>";
    }
    document.getElementById('errorTitle').innerHTML = errorTitle;
}