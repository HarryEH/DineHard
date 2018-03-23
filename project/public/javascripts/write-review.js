
var slider = document.getElementById("reviewslider");
var output = document.getElementById("star");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
};

function reviewValidate(){
    var reviewdescription = document.forms["reviewForm"]["reviewdecription"].value.trim();
    var dError = document.getElementById("dError");

    var reviewOk = true;

    dError.innerHTML = "";

    if(dError === ""){
        fnError.innerHTML = "* Please enter a review *";
        reviewOk = false;
    }
    if(!reviewOk) {
        event.preventDefault();
        alert("Review not complete!");
        return false;
    } else {
        alert("Review complete!");
        return true;
    }
}
