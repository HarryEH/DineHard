/**
 * This function wraps the ajax call and does calls such as preventing the default form send and getting the photo
 * @param e the event object
 */
function reviewAjax(e) {
    e.preventDefault();
    var uri = document.getElementById('photo-text-source').value;
    console.log(uri.length);
    ajax(uri);
}

var socket;

/**
 * This is the ajax POST request that sends the new review and also emits the socket event that will cause everyones
 * page to update.
 * @param photoData this the data for the photo
 */
function ajax(photoData) {
    $.ajax({
        url: document.URL,
        data: JSON.stringify({
            slider: document.getElementById('slider').value,
            review: document.getElementById('review-text').value,
            photo: photoData
        }),
        contentType: 'application/json',
        type: 'POST',
        dataType: "json",
        success: function (data) {
            document.getElementById('reviewForm').style.display='none';
            document.getElementById('slider').value = 3;
            document.getElementById('star').value = 3;
            document.getElementById('review-text').value = "";

            emitEvent(data);
        },

        error: function (xhr, status, error) {
            console.log("err");
        }
    });
}

/**
 * This handles the socket code that is run when the message is broadcast from the server. It adds the new review
 * @param data this is the data sent in the broadcasted message.
 */
function handleSocket(data){

    if (document.URL.includes(data.restaurant._id)) {
        document.getElementById('updateable').outerHTML = data.rendered;
        // The <script> doesn't get run so this is required to do that

        const x = data.restaurant.rating;
        var y = data.restaurant.noRating;

        if(y == 0) {
            y = 1;
        }

        getStarRating(x/y, "starRating");

        if (document.getElementById('no-reviews-yet') !== null) {
            document.getElementById('no-reviews-yet').style.display = 'none';
        }

        document.getElementById("ratingText").innerText = Math.round((x/y) * 100) / 100 + " with " + y + " reviews";

        for (var i = 0; i < data.results.length; i++) {
            var divID = "review-star" + (i+1).toString();
            getStarRating(data.results[i].rating, divID);
            divID = "review-date" + (i+1).toString();
            const date = new Date(data.results[i].date);
            formatDate(date.getDate(),date.getMonth(), date.getFullYear(), divID);

        }
    }

}

/**
 * This is the functiont that sets up socket.io to listen for the new review
 */
function setupSocket() {
    socket = io('http://localhost:3000');
    socket.on('review', handleSocket);
}

/**
 * This is the function that emits the event to the backend that says a new review has been created.
 * @param data
 */
function emitEvent(data) {
    socket.emit("new-review", {restaurant: data});
}

/**
 * This is the code that validates the review
 * @param e the event object
 * @returns {boolean} true if the review passes the validation
 */
function reviewValidate(e){
    e.preventDefault();
    var reviewdescription = document.forms["writeReviewForm"]["review-text"].value.trim();
    var dError = document.getElementById("dError");

    dError.innerHTML = "";

    if(reviewdescription === "") {
        dError.innerHTML = "* Please enter a review *";
        return false;
    }

    reviewAjax(e);
    return true;
}






