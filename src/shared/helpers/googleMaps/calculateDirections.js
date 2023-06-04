const calculateDirections = async (
  origin,
  destination,
  setDirections,
  setTravelTime,
  setTravelMode,
  setIsRouting
) => {
  const directionsServiceOptions = {
    destination,
    origin,
    travelMode: 'DRIVING',
    //WALKING
  };

  const directionsServiceCallback = (result, status) => {
    if (status === 'OK') {
      setDirections(result);

      const duration = result.routes[0]?.legs[0]?.duration?.text;
      setTravelTime(duration);

      const mode = result.request?.travelMode;
      setTravelMode(mode);
    }
    setIsRouting(false);
  };

  const directionsService = new window.google.maps.DirectionsService();
  directionsService.route(directionsServiceOptions, directionsServiceCallback);
};

export default calculateDirections;
