export const geocodeForAddress = (address) => {
  const geocoder = new google.maps.Geocoder();
  const isOk = google.maps.GeocoderStatus.OK;

  return new Promise((resolve, reject) => {
    geocoder.geocode({ address }, (results, status) => {
      if (status !== isOk) {
        reject(status);
      }
      resolve(results);
    });
  });
};

export const getLatLng = result => {
  return new Promise( (resolve, reject) => {
    try {
      const latLng = {
        lat: result.geometry.location.lat(),
        lng: result.geometry.location.lng()
      }
      resolve(latLng);
    } catch(e) {
      reject(e);
    }
  });
}



export const geocodeForPlaceId = (placeId) => {
  const geocoder = new google.maps.Geocoder();
  const isOk = google.maps.GeocoderStatus.OK;

  return new Promise((resolve, reject) => {
    geocoder.geocode({ placeId }, (results, status) => {
      if (status !== isOk) {
        reject (status);
      }
      resolve(results);
    });
  });
}