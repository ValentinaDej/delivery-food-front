import encryptData from 'shared/helpers/crypto/encryptData';
import store from 'redux/store';
import { cartActions } from 'redux/cart/cartSlice';

const removeItemFromCart = (dispatch, id) => {
  const lsKey = process.env.REACT_APP_LS;
  dispatch(cartActions.removeItemFromCart(id));

  const updatedCart = store.getState().cart;
  const encryptedCart = encryptData(updatedCart, lsKey);
  localStorage.setItem('acC00q00', encryptedCart);
};

export default removeItemFromCart;
