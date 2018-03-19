function getStarRating(rating, divID){
    var starDiv = document.getElementById(divID);
    var stars = Math.floor(rating);
    var starHTML = "";
    var starsRemaining = 7;

    for(i = 0; i < stars; i++){
        starHTML += "<i class='fa fa-star'></i>";
        starsRemaining -= 1;
    }

    if(starsRemaining > 0) {
        if ((Math.floor(rating * 2) % 2) == 1) {
            starHTML += "<i class='fa fa-star-half-full'></i>";
        } else {
            starHTML += "<i class='fa fa-star-o'></i>";
        }

        starsRemaining -= 1;
    }

    if(starsRemaining > 0) {
        for (i = 0; i < starsRemaining; i++) {
            starHTML += "<i class='fa fa-star-o'></i>";
        }
    }

    starDiv.innerHTML = starHTML;
}