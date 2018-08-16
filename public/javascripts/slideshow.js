var slideIndex = 1;
showSlides(slideIndex);

/**
 * Moves the shown slide forward by an amount
 * @params n an amount of slides to forward
 */
function plusSlides(n) {
    showSlides(slideIndex += n);
}

/**
 * Displays the nth slide from the collection of slides
 * @params n the index of the slide to display
 */
function currentSlide(n) {
    showSlides(slideIndex = n);
}

/**
 * Displays the correct slide based on the value n
 * @params n the slide index to display
 */
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("restaurant-img");

    if (n > slides.length) {
        slideIndex = 1
    }

    if (n < 1) {
        slideIndex = slides.length
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex-1].style.display = "inline";
}

/**
 * Displays previous slide
 */
function leftArrowPressed() {
    showSlides(slideIndex -= 1);
}

/**
 * Displays next slide
 */
function rightArrowPressed() {
    showSlides(slideIndex += 1);
}

/**
 * Attaches events to pressing the left and right arrow keys
 * @params evt the event to attach
 */
document.onkeydown = function(evt) {
    evt = evt || window.event;
    switch (evt.keyCode) {
        case 37:
            leftArrowPressed();
            break;
        case 39:
            rightArrowPressed();
            break;
    }
};