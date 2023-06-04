const getAddressFromCoordinates = position => {
  return new Promise((resolve, reject) => {
    const { lat, lng } = position;
    const geocoder = new window.google.maps.Geocoder();

    if (geocoder) {
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            resolve(results[0].formatted_address);
          }
        } else {
          reject(
            new Error(
              'Geocode was not successful for the following reason: ' + status
            )
          );
        }
      });
    }
  });
};

export default getAddressFromCoordinates;
