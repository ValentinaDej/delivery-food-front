import isCoordinateInsideUkraine from './isCoordinateInsideUkraine';
import getAddressFromCoordinates from './getAddressFromCoordinates';

import NotiflixMessage from 'shared/components/NotiflixMessage/NotiflixMessage';

const handleMarkerDragEnd = async (
  event,
  onMarkerAddressChange,
  setMarkerUserPosition
) => {
  const lat = event.latLng.lat();
  const lng = event.latLng.lng();
  const newPosition = { lat, lng };
  const isOutsideUkraine = !isCoordinateInsideUkraine(newPosition);
  if (isOutsideUkraine) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setMarkerUserPosition({ lat: latitude, lng: longitude });
          onMarkerAddressChange('');
        },
        error => {
          NotiflixMessage({
            type: 'info',
            data: error.message,
          });
        }
      );
    }
  } else {
    setMarkerUserPosition(newPosition);
    try {
      const address = await getAddressFromCoordinates(newPosition);
      onMarkerAddressChange(address);
    } catch (error) {
      NotiflixMessage({
        type: 'info',
        data: error.message,
      });
    }
  }
};

export default handleMarkerDragEnd;
