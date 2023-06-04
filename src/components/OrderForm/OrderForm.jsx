import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Autocomplete } from '@react-google-maps/api';

import { fetchAddOrder } from 'redux/orders/ordersOperations';
import { selectLoadingOrders } from 'redux/orders/ordersSelectors';
import { cartActions } from 'redux/cart/cartSlice';
import { selectAllCartItems } from 'redux/cart/cartSelectors';

import validateData from 'shared/helpers/validation/validatedData';
import handlePlaceSelect from 'shared/helpers/googleMaps/handlePlaceSelect';
import decryptData from 'shared/helpers/crypto/decryptData';

import GoogleMapComponent from 'components/GoogleMap/GoogleMapComponent';
import LabelInput from 'shared/components/LabelInput/LabelInput';
import NotiflixMessage from 'shared/components/NotiflixMessage/NotiflixMessage';
import Loader from 'shared/components/Loader/Loader';

import fields from './fields';
import initialState from './initialState';

import styles from './OrderForm.module.css';

const OrderForm = () => {
  const lsKey = process.env.REACT_APP_LS;
  const [formValues, setFormValues] = useState(initialState);
  const [autocomplete, setAutocomplete] = useState(null);
  const [userAddress, setUserAddress] = useState();
  const [invalidFields, setInvalidFields] = useState({});

  const cartItems = useSelector(selectAllCartItems);
  const isOrdersLoading = useSelector(selectLoadingOrders);

  const activeShop = decryptData(localStorage.getItem('acS00q00'), lsKey);
  const activeShopObj = activeShop ? JSON.parse(activeShop) : null;

  const dispatch = useDispatch();

  const { name, email, phone, address } = formValues;

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formData = [
      { name: 'name', value: name },
      { name: 'address', value: address },
      { name: 'phone', value: phone },
      { name: 'email', value: email },
    ];

    return validateData(formData, setInvalidFields);
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      if (!cartItems.length) {
        NotiflixMessage({
          type: 'info',
          data: 'Your cart is empty.',
        });
        return;
      }

      const invalidObjects = validateForm();
      if (invalidObjects.length) {
        return;
      }

      const cartData = cartItems.map(({ id, price, quantity }) => ({
        name: id,
        price,
        quantity,
      }));

      const orderDetail = {
        products: cartData,
      };

      let shop = activeShopObj.id;
      if (!shop) {
        const shopFromCart = cartItems.find(item => item.activeShop);
        if (shopFromCart) {
          shop = shopFromCart.activeShop;
        }
      }
      const orderData = {
        name,
        email,
        phone,
        address,
        orderDetail,
        shop,
      };

      try {
        await dispatch(fetchAddOrder(orderData));
        dispatch(cartActions.clearCart());
        localStorage.removeItem('acC00q00');
        NotiflixMessage({
          type: 'info',
          data: 'Order submitted successfully.',
        });
        setFormValues(initialState);
        return true;
      } catch (error) {
        NotiflixMessage({
          type: 'info',
          data: error.message,
        });
      }
    } catch (error) {
      NotiflixMessage({
        type: 'info',
        data: error.message,
      });
    }
  };

  const handleAutocompleteLoad = autocomplete => {
    setAutocomplete(autocomplete);
  };

  const handleMapMarkerAddressChange = address => {
    setFormValues(prevValues => ({
      ...prevValues,
      address: address,
    }));
  };

  const autocomleteOptions = {
    componentRestrictions: { country: 'ua' },
    language: 'uk',
  };

  return (
    <div className={styles.formContainer}>
      {isOrdersLoading ? (
        <Loader />
      ) : (
        <>
          <GoogleMapComponent
            userAddress={userAddress}
            onMarkerAddressChange={handleMapMarkerAddressChange}
          />
          <form onSubmit={handleFormSubmit} className={styles.formContainer}>
            <Autocomplete
              options={autocomleteOptions}
              onLoad={handleAutocompleteLoad}
              onPlaceChanged={() =>
                handlePlaceSelect(autocomplete, setFormValues, setUserAddress)
              }
            >
              <>
                <LabelInput
                  caption="Address:"
                  value={address}
                  onChange={handleInputChange}
                  className={styles.inputGroup}
                  {...fields.address}
                />
                <span>{invalidFields.address}</span>
              </>
            </Autocomplete>
            <LabelInput
              caption="Email:"
              value={email}
              onChange={handleInputChange}
              className={styles.inputGroup}
              {...fields.email}
            />
            <span>{invalidFields.email}</span>
            <LabelInput
              caption="Phone:"
              value={phone}
              onChange={handleInputChange}
              className={styles.inputGroup}
              {...fields.phone}
            />
            <span>{invalidFields.phone}</span>
            <LabelInput
              caption="Name:"
              value={name}
              onChange={handleInputChange}
              className={styles.inputGroup}
              {...fields.name}
            />
            <span>{invalidFields.name}</span>
            <div className={styles.addButtonContainer}>
              <button type="submit" className={styles.addButton}>
                Order
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default OrderForm;
