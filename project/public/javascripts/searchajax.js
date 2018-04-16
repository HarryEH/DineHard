function textQueryAjax(e) {
    e.preventDefault();
    genericAjax(function(data){
        console.log(data.one + " " +  data.two + " " + data.three);
    });
}

function sliderAjax(e) {
    genericAjax(function(data){
        console.log(data.one + " " +  data.two + " " + data.three);
    });
}

function sortAjax(e) {
    genericAjax(function(data){
        console.log(data.one + " " +  data.two + " " + data.three);
    });
}

function genericAjax(callback) {
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
            // Code to change the page goes here
            document.getElementById('results-keyword').value = data.prevQuery.keyword;
            document.getElementById('results-postcode').value = data.prevQuery.postcode;
            document.getElementById('distRange').value = data.prevQuery.slider;
            document.getElementById('selectMe').value = data.prevQuery.sortBy;
            callback(data);
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });
}




