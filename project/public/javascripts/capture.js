    // The width and height of the captured photo. We will set the
    // width to the value defined here, but the height will be
    // calculated based on the aspect ratio of the input stream.

    var width = document.documentElement.clientWidth / 4;    // We will scale the photo width to this
    var height = 0;     // This will be computed based on the input stream

    console.error(width);

    // |streaming| indicates whether or not we're currently streaming
    // video from the camera. Obviously, we start at false.

    var streaming = false;

    // The various HTML elements we need to configure or control. These
    // will be set by the startup() function.

    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;

    function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo-capture');
        photoText = document.getElementById('photo-text-source')
        startbutton = document.getElementById('start-button');
        retakebutton = document.getElementById('retake-button');

        camera = document.getElementById('camera');
        output = document.getElementById('output');

        navigator.getMedia = ( navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);

        navigator.getMedia(
            {
                video: true,
                audio: false
            },
            function(stream) {
                if (navigator.mozGetUserMedia) {
                    video.mozSrcObject = stream;
                } else {
                    var vendorURL = window.URL || window.webkitURL;
                    video.src = vendorURL.createObjectURL(stream);
                }
                video.play();
            },
            function(err) {
                console.log("An error occured! " + err);
            }
        );

        video.addEventListener('canplay', function(ev){
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth/width);

                // Firefox currently has a bug where the height can't be read from
                // the video, so we will make assumptions if this happens.

                if (isNaN(height)) {
                    height = width / (4/3);
                }

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
            }
        }, false);

        startbutton.addEventListener('click', function(ev){
            ev.preventDefault();

            takepicture();
            camera.style.display = "none";
            output.style.display = "block";
        }, false);

        retakebutton.addEventListener('click', function (ev) {
            ev.preventDefault();

            camera.style.display = "block";
            output.style.display = "none";
        }, false);

        clearphoto();
    }

    // Fill the photo with an indication that none has been
    // captured.

    function clearphoto() {
        photo = document.getElementById('photo-capture');

        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
        photoText.setAttribute('value', data);
    }

    // Capture a photo by fetching the current contents of the video
    // and drawing it into a canvas, then converting that to a PNG
    // format data URL. By drawing it on an offscreen canvas and then
    // drawing that to the screen, we can change its size and/or apply
    // other changes before drawing it.

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

function showCapture(ev){
    ev.preventDefault();

    var photoCapture = document.getElementById("photo-capture-area");
    var photoUpload = document.getElementById("photo-upload-area");

    photoCapture.style.display = "block";
    photoUpload.style.display = "none";

    startup();
}

function showUpload(ev){
    ev.preventDefault();

    var photoCapture = document.getElementById("photo-capture-area");
    var photoUpload = document.getElementById("photo-upload-area");

    photoCapture.style.display = "none";
    photoUpload.style.display = "block";
}