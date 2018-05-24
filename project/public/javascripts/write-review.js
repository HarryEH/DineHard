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
