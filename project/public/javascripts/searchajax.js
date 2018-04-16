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
        data: JSON.stringify({newQuery: document.getElementById('results-search-text').value}),
        contentType: 'application/json',
        type: 'POST',
        dataType: "json",
        success: function (dataR) {
            document.getElementById('results-search-text').value = dataR.one + " " +  dataR.two + " " + dataR.three;
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });
}
