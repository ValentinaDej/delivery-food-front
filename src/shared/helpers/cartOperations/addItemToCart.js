import encryptData from 'shared/helpers/crypto/encryptData';
import store from 'redux/store';
import { cartActions } from 'redux/cart/cartSlice';

const addItemToCart = (dispatch, id, title, price, activeShop) => {
  const lsKey = process.env.REACT_APP_LS;

  const newItem = {
    id,
    title,
    price,
    activeShop,
  };

  dispatch(cartActions.addItemToCart(newItem));

  const updatedCart = store.getState().cart;
  const encryptedCart = encryptData(updatedCart, lsKey);
  localStorage.setItem('acC00q00', encryptedCart);
};

export default addItemToCart;
