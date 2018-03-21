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