// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

window.map = null;
window.geocoder = null;
window.marker = null;

function initializeMap(elementId) {
    geocoder = new google.maps.Geocoder();
    var mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 8
    };
    map = new google.maps.Map(document.getElementById(elementId),
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
    if(marker)
        marker.setMap(null);
}

$(document).ready(function(){

    if($("#person-form-map").size() > 0){
        initializeMap("person-form-map");
    }

    if($("#person-show-map").size() > 0){
        initializeMap("person-show-map");
        removeMarker();
        decodeAddress($("#person-address").text());
    }

    $('#person-address').on('input', function() {
        removeMarker()
        decodeAddress($(this).val());
    })


})