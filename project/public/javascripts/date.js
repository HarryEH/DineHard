function formatDate(dateDay, dateMonth, dateYear, divID){
    var dateDiv = document.getElementById(divID);
    var dateHTML = "";

    if(dateDay < 9){
        dateHTML += "0";
    }

    dateHTML += dateDay.toString() + "-";

    if(dateMonth < 9){
        dateHTML += "0";
    }

    dateHTML += dateMonth.toString() + "-" + dateYear.toString();

    dateDiv.innerHTML = dateHTML;
}