/**
 * This function performs an ajax POST request to the server for a review which deletes it.
 * @param reviewID this is the ID (_id in database) of the review that has been passed
 * @param divID this is the div of the review that has been passed
 */
function reviewDeleteAjax(reviewID, divID) {
    if (confirm('Are you sure you want to delete this review?')) {
        $.ajax({
            url: document.URL,
            data: JSON.stringify({
                id: reviewID
            }),
            contentType: 'application/json',
            type: 'POST',
            dataType: "json",
            success: function (data) {
                document.getElementById(divID).parentNode.removeChild(document.getElementById(divID));
            },

            error: function (xhr, status, error) {
                console.log(error);
            }
        });
    }
}

/**
 * This function shows the profile details
 */
function showDetails(){
    var details = document.getElementById("profile-details");
    var editDetails = document.getElementById("edit-profile-details");

    editDetails.style.display = "none";
    details.style.display = "block";
}