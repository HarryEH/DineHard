/**
 * This function provides a wrapper to the generic ajax function because text has slightly different behaviour in that
 * it needs to prevent the default of submitting the form.
 * @param e the event object.
 */
function textQueryAjax(e) {
    e.preventDefault();
    genericAjax();
}

/**
 * This function provides a wrapper of the generic ajax function for the slider
 * @param e the event object
 */
function sliderAjax(e) {
    genericAjax();
}

/**
 * This function provides a wrapper of the generic ajax function for the sort drop down
 * @param e the event object
 */
function sortAjax(e) {
    genericAjax();
}

/**
 * This is the generic ajax function for the results page. It takes the parameters from the search bar and then updates
 * the results when the success function runs.
 */
function genericAjax() {
    $.ajax({
        url: document.URL,
        data: JSON.stringify({
            newKeywords: document.getElementById('results-keyword').value,
            newPostcode: document.getElementById('results-postcode').value,
            slider: document.getElementById('distRange').value,
            sortBy: document.getElementById('selectMe').value
        }),
        contentType: 'application/json',
        type: 'POST',
        dataType: "json",
        success: function (data) {
            console.log(data);
            // Code to change the page goes here
            document.getElementById('results-keyword').value = data.prevQuery.keyword;
            document.getElementById('results-postcode').value = data.prevQuery.postcode;
            document.getElementById('distRange').value = data.prevQuery.slider;
            document.getElementById('selectMe').value = data.prevQuery.sortBy;

            showAjaxSearchResults(data.html, data.results, data.prevQuery.lat, data.prevQuery.lng);
        },
        error: function (xhr, status, error) {
            console.log("err");
        }
    });
}

/**
 * This is the function that deals with the displaying of the updated results from the ajax request.
 * @param html this is the html that will get shown
 * @param results these are the results that are required for getting prices and star ratings to display properly
 * @param lat geodetic latitude, this is required for updating the modal map
 * @param lng geodetic longitude, this is required for updating the modal map
 */
function showAjaxSearchResults(html, results, lat, lng){

    document.getElementById('results-changeable').outerHTML = html;

    // The <script> doesn't get run so this is required to do that
    for (var i = 0; i < results.length; i++) {
        getStarRating(results[i].rating/results[i].noRating,"resStar" + (i+1).toString());
        getPrice(results[i].price, "resPrice" + (i+1).toString());
    }

    modalMap(lat, lng, results);

}

/**
 * This function acts when the slider changes to change the uderlying value
 */
function sliderChange(){
    var slider = document.getElementById("distRange");
    var output = document.getElementById("distVal");
    output.innerHTML = slider.value;

    slider.oninput = function() {
        output.innerHTML = this.value;
    }
}




