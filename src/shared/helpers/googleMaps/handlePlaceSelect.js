const handlePlaceSelect = (autocomplete, setFormValues, setUserAddress) => {
  if (autocomplete) {
    const place = autocomplete.getPlace();
    if (place && place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      setFormValues(prevValues => ({
        ...prevValues,
        address: place.formatted_address,
      }));

      setUserAddress({ lat, lng });
    }
  }
};

export default handlePlaceSelect;
