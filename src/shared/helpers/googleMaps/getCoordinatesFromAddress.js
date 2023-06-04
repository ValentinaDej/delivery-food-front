import NotiflixMessage from 'shared/components/NotiflixMessage/NotiflixMessage';

const getCoordinatesFromAddress = async address => {
  const geocoder = new window.google.maps.Geocoder();
  try {
    const results = await new Promise((resolve, reject) => {
      geocoder.geocode(
        {
          address: address,
        },
        (results, status) => {
          if (
            status === window.google.maps.GeocoderStatus.OK &&
            results.length > 0
          ) {
            resolve(results);
          } else {
            reject(
              new Error(
                'Geocode was not successful for the following reason: ' + status
              )
            );
          }
        }
      );
    });

    const location = results[0].geometry.location;
    const lat = location.lat();
    const lng = location.lng();
    return { lat, lng };
  } catch (error) {
    NotiflixMessage({
      type: 'info',
      data: error.message,
    });
  }
};

export default getCoordinatesFromAddress;
