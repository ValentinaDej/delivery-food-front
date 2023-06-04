import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';

import getCoordinatesFromAddress from 'shared/helpers/googleMaps/getCoordinatesFromAddress';
import handleMarkerDragEnd from 'shared/helpers/googleMaps/handleMarkerDragEnd';
import calculateDirections from 'shared/helpers/googleMaps/calculateDirections';
import decryptData from 'shared/helpers/crypto/decryptData';

import NotiflixMessage from 'shared/components/NotiflixMessage/NotiflixMessage';
import styles from './GoogleMapComponent.module.css';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultUserPosition = { lat: 0, lng: 0 };

const GoogleMapComponent = ({ userAddress, onMarkerAddressChange }) => {
  const lsKey = process.env.REACT_APP_LS;
  const [markerUserPosition, setMarkerUserPosition] = useState(null);
  const [markerShopPosition, setMarkerShopPosition] = useState(null);
  const [directions, setDirections] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  const [travelTime, setTravelTime] = useState(null);
  const [travelMode, setTravelMode] = useState(null);
  const [isRouting, setIsRouting] = useState(false);

  const activeShop = decryptData(localStorage.getItem('acS00q00'), lsKey);
  const activeShopAddress = activeShop ? JSON.parse(activeShop)?.address : null;

  useEffect(() => {
    if (userAddress) {
      setMarkerUserPosition(userAddress);
      setDirections(null);
      setShowDirections(false);
      return;
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setMarkerUserPosition({ lat: latitude, lng: longitude });
        },
        error => {
          setMarkerUserPosition(defaultUserPosition);
          NotiflixMessage({ type: 'info', data: error.message });
        }
      );
    } else {
      setMarkerUserPosition(defaultUserPosition);
      NotiflixMessage({
        type: 'info',
        data: 'Geolocation is not supported by this browser.',
      });
    }
  }, [userAddress]);

  useEffect(() => {
    (async () => {
      try {
        if (activeShopAddress) {
          const coordinates = await getCoordinatesFromAddress(
            activeShopAddress
          );
          setMarkerShopPosition(coordinates);
        }
      } catch (error) {
        NotiflixMessage({
          type: 'info',
          data: error.message,
        });
      }
    })();
  }, [activeShopAddress]);

  const handleDirections = async () => {
    setShowDirections(!showDirections);
    setIsRouting(true);
    setDirections(null);
    setTravelTime(null);
    setTravelMode(null);

    if (markerUserPosition && markerShopPosition) {
      const origin = `${markerUserPosition.lat},${markerUserPosition.lng}`;
      const destination = `${markerShopPosition.lat},${markerShopPosition.lng}`;

      await calculateDirections(
        origin,
        destination,
        setDirections,
        setTravelTime,
        setTravelMode,
        setIsRouting
      );
    }
  };

  return (
    <>
      <div className={styles.googleMapContainer}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={10}
          center={markerUserPosition}
        >
          {markerUserPosition && (
            <Marker
              position={markerUserPosition}
              draggable={true}
              onDragEnd={event =>
                handleMarkerDragEnd(
                  event,
                  onMarkerAddressChange,
                  setMarkerUserPosition
                )
              }
            />
          )}
          {markerShopPosition && (
            <Marker position={markerShopPosition} draggable={false} />
          )}
          {directions && showDirections && (
            <DirectionsRenderer directions={directions} />
          )}
        </GoogleMap>
      </div>

      {!isRouting && (
        <button
          onClick={handleDirections}
          disabled={!markerUserPosition || !markerShopPosition}
          className={styles.routeButton}
        >
          {showDirections ? 'Hide route' : 'Show route'}
        </button>
      )}
      {/* {isRouting && <p>Routing...</p>} */}
      {directions && showDirections && travelTime && (
        <div className={styles.duration}>
          Duration of the route: {travelTime} ({travelMode})
        </div>
      )}
    </>
  );
};

export default GoogleMapComponent;
