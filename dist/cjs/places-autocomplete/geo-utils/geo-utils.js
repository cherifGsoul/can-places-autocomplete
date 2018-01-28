/*can-places-autocomplete@0.0.1-dev#places-autocomplete/geo-utils/geo-utils*/
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var geocodeForAddress = exports.geocodeForAddress = function geocodeForAddress(address) {
    var geocoder = new google.maps.Geocoder();
    var isOk = google.maps.GeocoderStatus.OK;
    return new Promise(function (resolve, reject) {
        geocoder.geocode({ address: address }, function (results, status) {
            if (status !== isOk) {
                reject(status);
            }
            resolve(results);
        });
    });
};
var getLatLng = exports.getLatLng = function getLatLng(result) {
    return new Promise(function (resolve, reject) {
        try {
            var latLng = {
                lat: result.geometry.location.lat(),
                lng: result.geometry.location.lng()
            };
            resolve(latLng);
        } catch (e) {
            reject(e);
        }
    });
};
var geocodeForPlaceId = exports.geocodeForPlaceId = function geocodeForPlaceId(placeId) {
    var geocoder = new google.maps.Geocoder();
    var isOk = google.maps.GeocoderStatus.OK;
    return new Promise(function (resolve, reject) {
        geocoder.geocode({ placeId: placeId }, function (results, status) {
            if (status !== isOk) {
                reject(status);
            }
            resolve(results);
        });
    });
};