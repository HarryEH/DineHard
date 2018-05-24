function reviewDeleteAjax(reviewid) {
    ajax(reviewid);

}

function ajax(reviewid) {
    if (confirm('Are you sure you want to delete this?')) {
        $.ajax({
            url: document.URL,
            data: JSON.stringify({
                id: reviewid
            }),
            contentType: 'application/json',
            type: 'POST',
            dataType: "json",
            success: function (data) {
                //alert('Review Deleted');
            },

            error: function (xhr, status, error) {
                console.log(error);
            }
        });
    }
}


function showEdit(){
    var details = document.getElementById("profile-details");
    var editDetails = document.getElementById("edit-profile-details");

    details.style.display = "none";
    editDetails.style.display = "block";
}

function showDetails(){
    var details = document.getElementById("profile-details");
    var editDetails = document.getElementById("edit-profile-details");

    editDetails.style.display = "none";
    details.style.display = "block";
}