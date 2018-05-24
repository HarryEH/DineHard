/**
 * Calculates and displays the formatted price string for a restaurant
 * @params price the price value of the restaurant, divID the ID of the div to display the price string
 */
function getPrice(price, divID){
    var priceDiv = document.getElementById(divID);
    var priceHTML = "";

    switch (price) {
        case 1:
            priceHTML = "£";
            break;
        case 2:
            priceHTML = "£ - ££";
            break;
        case 3:
            priceHTML = "££";
            break;
        case 4:
            priceHTML = "££ - £££";
            break;
        case 5:
            priceHTML = "£££";
            break;
        case 6:
            priceHTML = "£££ - ££££";
            break;
        case 7:
            priceHTML = "££££";
            break;
        default:
            priceHTML = "£££££";
    }

    priceDiv.innerHTML = priceHTML;
}