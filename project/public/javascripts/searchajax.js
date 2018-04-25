function textQueryAjax(e) {
    e.preventDefault();
    genericAjax();
}

function sliderAjax(e) {
    genericAjax();
}

function sortAjax(e) {
    genericAjax();
}

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

            showAjaxSearchResults(data.html, data.results);
        },
        error: function (xhr, status, error) {
            console.log("err");
        }
    });
}

function showAjaxSearchResults(html, results){

    document.getElementById('results-changeable').outerHTML = html;

    // The <script> doesn't get run so this is required to do that
    for (var i = 0; i < results.length; i++) {
        getStarRating(results[i].rating/results[i].noRating,"resStar" + (i+1).toString());
        getPrice(results[i].price, "resPrice" + (i+1).toString());
    }

}




