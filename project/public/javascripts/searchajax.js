function textQueryAjax(e) {
    e.preventDefault();
    genericAjax(updateResults);
}

function updateResults(data) {
    document.getElementById('results-keyword').value = data.one + " " +  data.two + " " + data.three;
    document.getElementById('results-postcode').value = "pleaaase";
}

function sliderAjax(e) {
    genericAjax(function(data){
        console.log(dataR.one + " " +  dataR.two + " " + dataR.three);
    });
}

function sortAjax(e) {
    genericAjax(function(data){
        console.log(dataR.one + " " +  dataR.two + " " + dataR.three);
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
        success: function (dataR) {
            // Code to change the page goes here
            callback(dataR);
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });
}




