function sendAjaxQuery(e) {

    e.preventDefault();

    const parser = document.createElement('a');
    parser.href = document.URL;

    // parser.protocol; // => "http:"
    // parser.host;     // => "example.com:3000"
    // parser.hostname; // => "example.com"
    // parser.port;     // => "3000"
    // parser.pathname; // => "/pathname/"
    // parser.hash;     // => "#hash"
    // parser.search;   // => "?search=test"
    // parser.origin;   // => "http://example.com:3000"

    $.ajax({
        url: parser.href,
        data: JSON.stringify({newKeywords: document.getElementById('results-keyword').value, newPostcode: document.getElementById('results-postcode').value}),
        contentType: 'application/json',
        type: 'POST',
        dataType: "json",
        success: function (dataR) {
            // Code to change the page goes here
            updateResults(dataR);
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });
}

function updateResults(data) {
    document.getElementById('results-keyword').value = data.one + " " +  data.two + " " + data.three;
    document.getElementById('results-postcode').value = "pleaaase";
}

