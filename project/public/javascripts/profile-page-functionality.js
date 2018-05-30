function reviewDeleteAjax(reviewid, divID) {
    ajax(reviewid, divID);

}

function ajax(reviewid, divID) {
    if (confirm('Are you sure you want to delete this review?')) {
        $.ajax({
            url: document.URL,
            data: JSON.stringify({
                id: reviewid
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

function showDetails(){
    var details = document.getElementById("profile-details");
    var editDetails = document.getElementById("edit-profile-details");

    editDetails.style.display = "none";
    details.style.display = "block";
}