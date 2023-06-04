const isCoordinateInsideUkraine = ({ lat, lng }) => {
    const ukraineBounds = {
      north: 52.3791,
      south: 44.2924,
      west: 22.0856,
      east: 40.2281,
    };
    return (
      lat >= ukraineBounds.south &&
      lat <= ukraineBounds.north &&
      lng >= ukraineBounds.west &&
      lng <= ukraineBounds.east
    );
  };

  
  export default isCoordinateInsideUkraine;
  