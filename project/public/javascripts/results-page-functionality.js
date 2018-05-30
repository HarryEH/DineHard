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

            showAjaxSearchResults(data.html, data.results, data.prevQuery.lat, data.prevQuery.lng);
        },
        error: function (xhr, status, error) {
            console.log("err");
        }
    });
}

function showAjaxSearchResults(html, results, lat, lng){

    document.getElementById('results-changeable').outerHTML = html;

    // The <script> doesn't get run so this is required to do that
    for (var i = 0; i < results.length; i++) {
        getStarRating(results[i].rating/results[i].noRating,"resStar" + (i+1).toString());
        getPrice(results[i].price, "resPrice" + (i+1).toString());
    }

    modalMap(lat, lng, results);

}

function radioButtonChange(){
    $(document).ready(function() {
        $('input[type=radio][name=searchArea]').change(function() {
            if (this.value == 'nearMe') {
                alert("Search Results Near Me");
            }
            else if (this.value == 'all') {
                alert("Search All Results");
            }
        });
    });
}

function sliderChange(){
    var slider = document.getElementById("distRange");
    var output = document.getElementById("distVal");
    output.innerHTML = slider.value;

    slider.oninput = function() {
        output.innerHTML = this.value;
    }
}




