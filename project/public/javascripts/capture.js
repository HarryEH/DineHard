var width = document.documentElement.clientWidth / 4;
var height = 0;
var streaming = false;
var video = null;
var canvas = null;
var photo = null;
var startButton = null;

/**
 * Starts up and initialises values for the webrtc for image capture.
 */
function startup() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo-capture');
    photoText = document.getElementById('photo-text-source')
    startButton = document.getElementById('start-button');
    retakeButton = document.getElementById('retake-button');

    camera = document.getElementById('camera');
    output = document.getElementById('output');

    navigator.getMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

    navigator.getMedia(
        {
            video: true,
            audio: false
        },
        function (stream) {
            if (navigator.mozGetUserMedia) {
                video.mozSrcObject = stream;
            } else {
                var vendorURL = window.URL || window.webkitURL;
                video.src = vendorURL.createObjectURL(stream);
            }
            video.play();
        },
        function (err) {
            console.log("An error occured! " + err);
        }
    );

    video.addEventListener('canplay', function (ev) {
        if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);

            if (isNaN(height)) {
                height = width / (4 / 3);
            }

            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            streaming = true;
        }
    }, false);

    startButton.addEventListener('click', function (ev) {
        ev.preventDefault();

        takepicture();
        camera.style.display = "none";
        output.style.display = "block";
    }, false);

    retakeButton.addEventListener('click', function (ev) {
        ev.preventDefault();

        camera.style.display = "block";
        output.style.display = "none";
    }, false);

    clearphoto();
}

/**
 * Clears the canvas of the currently captured image to allow for new image capture.
 */
function clearphoto() {
    photo = document.getElementById('photo-capture');

    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
    photoText.setAttribute('value', data);
}


/**
 * Captures an image and display it in a canvas.
 */
function takepicture() {
    photo = document.getElementById('photo-capture');

    var context = canvas.getContext('2d');
    if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
        photoText.setAttribute('value', data);
    } else {
        clearphoto();
    }
}

/**
 * Shows the photo capture div and hides the file selection div.
 * @params ev form event
 */
function showCapture(ev) {
    ev.preventDefault();

    var photoCapture = document.getElementById("photo-capture-area");
    var photoUpload = document.getElementById("photo-upload-area");

    photoCapture.style.display = "block";
    photoUpload.style.display = "none";

    startup();
}

/**
 * Shows the file selection div and hides the photo capture div.
 * @params ev form event
 */
function showUpload(ev) {
    ev.preventDefault();

    var photoCapture = document.getElementById("photo-capture-area");
    var photoUpload = document.getElementById("photo-upload-area");

    photoCapture.style.display = "none";
    photoUpload.style.display = "block";
}