/**
* The autocompletion of addresses was sourced from Google, and uses google maps.
* https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform
*/
var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    postal_code: 'short_name'
};


/**
* This function creates an autocomplete object, uses google maps and geocode.
* Calls the fill in address function.
 */
function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
        {types: ['geocode']});
    autocomplete.addListener('place_changed', fillInAddress);
}

/**
* This function gets the location details from the autocomplete object and fills the form field for each element
* of the address.
 */
function fillInAddress() {
    var place = autocomplete.getPlace();
    for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
        }
    }
}

/**
* This function is called in create-restaurant.ejs
* It gets the user's geographical location, which is from navigator.geolocation in the browser.
* Uses a circle to get nearby addresses so that when the user starts typing the address, all relevant addresses
* in this range appear in the drop down.
 */
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}

/**
* This function validates user input for creating a restaurant. If there is an element missing, the user will
* be alerted, and red writing appears above the fields that are not satisfied.
* @return true if all fields contain validate input, or returns false otherwise, with an alert and the fields that
* do not contain a valid input are clearly highlighted.
 */
function validateRestaurant(){
    var name = document.forms["createRestaurantForm"]["name"].value.trim();
    var phone = document.forms["createRestaurantForm"]["phoneNo"].value.trim();
    var address = document.forms["createRestaurantForm"]["address"].value.trim();
    var doorNum = document.forms["createRestaurantForm"]["doorNumber"].value.trim();
    var postcode = document.forms["createRestaurantForm"]["postcode"].value.trim();
    var photoU = document.forms["createRestaurantForm"]["photo-upload"].value;
    var photoC = document.forms["createRestaurantForm"]["photo-capture"].getAttribute("src");
    var tags = document.forms["createRestaurantForm"]["tags"].value.trim();
    var cuisines = document.forms["createRestaurantForm"]["cuisines"];
    var website = document.forms["createRestaurantForm"]["websiteurl"].value.trim();
    var desc = document.forms["createRestaurantForm"]["description"].value.trim();

    var nError = document.getElementById("nError");
    var pError = document.getElementById("pError");
    var aError = document.getElementById("aError");
    var dnError = document.getElementById("dnError");
    var pcError = document.getElementById("pcError");
    var purlError = document.getElementById("purlError");
    var tError = document.getElementById("tError");
    var cError = document.getElementById("cError");
    var wuError = document.getElementById("wuError");
    var deError = document.getElementById("deError");

    var nHTML = "";
    var pHTML = "";
    var aHTML = "";
    var dnHTML = "";
    var pcHTML = "";
    var purlHTML = "";
    var tHTML = "";
    var cHTML = "";
    var wuHTML = "";
    var deHTML = "";

    var createOk = true;

    if(name == ""){
        nHTML = "* Please enter a restaurant name *";
        createOk = false;
    }

    if(phone == ""){
        pHTML = "* Please enter a restaurant phone number *";
        createOk = false;
    }

    if(address == "" && doorNum == "" && postcode == ""){
        aHTML = "* Please enter a restaurant address *";
        createOk = false;
    } else {
        if(doorNum == ""){
            dnHTML = "* Please enter a door number *";
            createOk = false;
        }
        if(postcode == ""){
            pcHTML = "* Please enter a postcode *";
            createOk = false;
        }
    }

    if(photoU=="" && photoC==null){
        purlHTML = "* Please select a photo for the restaurant *";
        createOk = false;
    }

    if(tags == ""){
        tHTML = "* Please enter at least one tag *";
        createOk = false;
    }

    var cuisine = false;
    for(var i=0; cuisines[i]; i++){
        if(cuisines[i].checked){
            cuisine = true;
            break;
        }
    }
    if(!cuisine){
        cHTML = "* Please select at least one cuisine type *";
        createOk = false;
    }

    if(!validateURL(website)){
        wuHTML = "* Please enter a valid restaurant website *";
        createOk = false;
    }

    if(desc == ""){
        deHTML = "* Please enter a description for the restaurant *";
        createOk = false;
    } else if (countWords(desc) < 100){
        deHTML = "* Please enter at least 100 words for the description *";
        createOk = false;
    }

    nError.innerHTML = nHTML;
    pError.innerHTML = pHTML;
    aError.innerHTML = aHTML;
    dnError.innerHTML = dnHTML;
    pcError.innerHTML = pcHTML;
    purlError.innerHTML = purlHTML;
    tError.innerHTML = tHTML;
    cError.innerHTML = cHTML;
    wuError.innerHTML = wuHTML;
    deError.innerHTML = deHTML;

    if (!createOk) {
        event.preventDefault();
        return false;
    } else {
        return true;
    }
}

/**
* Counts words for the restaurant description field, so that there must be over 100 words, as this fills
* the restaurant page.
* @return number of words
 */
function countWords(str) {
    return str.trim().split(/\s+/).length;
}

/**
 * Validates the URL to make sure it is a real website. This is dead code... the URL is not validated
 * @param website
 * @returns {boolean} boolean of whether the website is valid or not.
 */
function validateURL(website){
    return true;
}