/**
 * Formats a date into a formatted string
 * @params dateDay the day of the month, dateMonth the month of the date, dateYear the year of the date,
 *         divID the ID of the div in which to display the date
 */
function formatDate(dateDay, dateMonth, dateYear, divID){
    var dateDiv = document.getElementById(divID);
    var dateHTML = "";

    if(dateDay < 9){
        dateHTML += "0";
    }

    dateHTML += dateDay.toString() + "-";

    dateMonth++;

    if(dateMonth < 9){
        dateHTML += "0";
    }

    dateHTML += dateMonth.toString() + "-" + dateYear.toString();

    dateDiv.innerHTML = dateHTML;
}