function reviewAjax(e) {
    e.preventDefault();
    ajax();
}

var socket;

function ajax() {
    $.ajax({
        url: document.URL,
        data: JSON.stringify({
            slider: document.getElementById('slider').value,
            review: document.getElementById('review-text').value
        }),
        contentType: 'application/json',
        type: 'POST',
        dataType: "json",
        success: function (data) {
            document.getElementById('reviewForm').style.display='none'
            console.log(data);
            emitEvent(data);
            // Code to change the page goes here
        },
        error: function (xhr, status, error) {
            console.log("err");
        }
    });
}

function handleSocket(data){
    console.log("/////////////////");
    console.log(data);
    console.log("/////////////////");
}

function setupSocket() {
    socket = io('http://localhost:3000');
    socket.on('review', handleSocket);
}

function emitEvent(data) {
    socket.emit("new-review", {restaurant: data});
}





