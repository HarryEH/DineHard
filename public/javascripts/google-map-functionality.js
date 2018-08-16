/**
 * This function creates a map and adds a marker to it. It also centers on the point that gets passed to it.
 * @param lat geodetic latitude.
 * @param lng geodetic longitude.
 */
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
    const map = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);

    new google.maps.Marker({
        position: {lat: lat, lng: lng},
        map: map,
        title: 'Restaurant'
    });

}

/**
 * Functions that creates a map and adds markers based on results that get passed to it. Centers on the lat and lng that
 * get passed to the function.
 * @param lat geodetic latitude
 * @param lng geodetic coordinate
 * @param results these are the restaurants that will get added to the map as markers
 */
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

        const contentString = '<div id="content" class="blackLink">'+
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