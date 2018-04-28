function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
    }
}

function hiddenFields() {
    const lat = sessionStorage.getItem("userLat");
    const lng = sessionStorage.getItem("userLong");

    console.log(lat);
    console.log(lng);

    $( "input#lat" ).val( lat );

    $( "input#lng" ).val( lng );

}

function setPosition(position) {
    sessionStorage.setItem("userLat", position.coords.latitude);
    sessionStorage.setItem("userLong", position.coords.longitude);
}

function myMap(){
    const mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 17,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
    };
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

function addMarkers(lat,lng) {

    const mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 17,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
    };
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    new google.maps.Marker({
        position: {lat: lat, lng: lng},
        map: map,
        title: 'Restaurant'
    });

}

function modalMap(lat, lng, results){

    const mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 11,
        scrollwheel: true,
        navigationControl: true,
        mapTypeControl: true,
        scaleControl: true,
        draggable: true,
    };

    const map = new google.maps.Map(document.getElementById("map-container"), mapOptions);

    for (const x in results){

        const tmp = results[x];

        const contentString = '<div id="content">'+
            '<h1 id="firstHeading" class="firstHeading">'+tmp.name+'</h1>'+
            '<div id="bodyContent">'+
            '<p>Website: <a href="'+"restaurant-" + tmp.name.replace(/\s/g, '-') + "?rId="+ tmp._id+'">'+
            'Here</a></p>'+
            '</div>'+
            '</div>';

        const marker = new google.maps.Marker({
            position: {lat: tmp.lat, lng: tmp.lng},
            map: map,
            title: tmp.name,
            html: contentString
        });

        const infowindow = new google.maps.InfoWindow();

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(this.html);
            infowindow.open(map, this);
        });

    }

    // Does this even do anything
    $('#map-container').on('shown.bs.modal', function () {
        google.maps.event.trigger(map, "resize");
    });

    window.onresize = function(event) {
        google.maps.event.trigger(map, "resize");
    };

}