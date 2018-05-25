/**
 * When the client gets off-line, it sets the onsumbit of the form to be a function that stores the details in session storage
 */
window.addEventListener('offline', function(e) {
    // Queue up events for server.
    console.log("You are offline");
    handleGoingOfflineRestaurant();
}, false);

/**
 * When the client gets online, it sends the stored form details, resets them
 * and sets the onsubmit function to be the appropriate function
 */
window.addEventListener('online', function(e) {
    // Resync data with server.
    console.log("You are online");
    handleGoingOnlineRestaurant();
}, false);


function handleGoingOfflineRestaurant() {
    // Set the onsubmit to a custom function
    document.getElementById("createRestaurantForm").addEventListener('submit',
        storeCreateRestaurantInfoInSessionStorage);
}

function storeCreateRestaurantInfoInSessionStorage() {

    event.preventDefault();

    sessionStorage.setItem("name", document.forms["createRestaurantForm"]["name"].value.trim());
    sessionStorage.setItem("phone", document.forms["createRestaurantForm"]["phoneNo"].value.trim());
    sessionStorage.setItem("address", document.forms["createRestaurantForm"]["address"].value.trim());
    sessionStorage.setItem("doorNum", document.forms["createRestaurantForm"]["doorNumber"].value.trim());
    sessionStorage.setItem("postcode", document.forms["createRestaurantForm"]["postcode"].value.trim());
    sessionStorage.setItem("photoU", document.forms["createRestaurantForm"]["photo-upload"].value);
    sessionStorage.setItem("photoC", document.forms["createRestaurantForm"]["photo-capture"].getAttribute("src"));
    sessionStorage.setItem("tags", document.forms["createRestaurantForm"]["tags"].value.trim());
    sessionStorage.setItem("cuisines", document.forms["createRestaurantForm"]["cuisines"]);
    sessionStorage.setItem("website", document.forms["createRestaurantForm"]["websiteurl"].value.trim());
    sessionStorage.setItem("desc", document.forms["createRestaurantForm"]["description"].value.trim());

}

function handleGoingOnlineRestaurant() {

    // submit a form that has been cached

    console.log("i despise you");

    // reset the Session Storage Form

    // Set the onsubmit of the function to be the correct function
    document.getElementById("createRestaurantForm").removeEventListener('submit',
        storeCreateRestaurantInfoInSessionStorage);

}

function submitSessionStorageFormViaPost() {
    $.ajax({
        url: document.URL,
        data: JSON.stringify({
            name: "",
            newPostcode: "",
            slider: "",
            sortBy: ""
        }),
        contentType: 'application/json',
        type: 'POST',
        dataType: "json",
        success: function (data) {
            "do something"
        },
        error: function (xhr, status, error) {
            console.log("err");
        }
    });

}

function resetSessionStorageForm() {

}