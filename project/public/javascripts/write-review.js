

function reviewValidate(){
    var reviewdescription = document.forms["writeReviewForm"]["reviewdecription"].value.trim();
    var dError = document.getElementById("dError");

    var reviewOk = true;

    dError.innerHTML = "";

    if(reviewdescription === ""){
        dError.innerHTML = "* Please enter a review *";
        reviewOk = false;
    }
    if(!reviewOk) {
        event.preventDefault();
        return false;
    } else {
        return true;
    }
}
