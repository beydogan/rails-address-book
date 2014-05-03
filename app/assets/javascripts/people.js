// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

window.map = null;
function initialize() {
    geocoder = new google.maps.Geocoder();
    var mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 8
    };
    map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);

    if($('#person-address') && $('#person-address').val() != ""){ //Update map when address field is not empty
        decodeAddress($('#person-address').val());
    }
}


/*
 Find location of given address and adds marker to map.
 */
function decodeAddress(address) {
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);

            marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {

        }
    });
}

function removeMarker(){
    marker.setMap(null);
}

$(document).ready(function(){
    initialize();

    $('#person-address').on('input', function() {
        removeMarker()
        decodeAddress($(this).val());
    })


})