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