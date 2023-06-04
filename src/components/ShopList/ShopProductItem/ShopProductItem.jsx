import { useDispatch } from 'react-redux';

import store from 'redux/store';

import removeItemFromCart from 'shared/helpers/cartOperations/removeItemFromCart';
import addItemToCart from 'shared/helpers/cartOperations/addItemToCart';

import NotiflixMessage from 'shared/components/NotiflixMessage/NotiflixMessage';

import styles from './ShopProductItem.module.css';

const ShopProductItem = ({
  id,
  title,
  price,
  quantity,
  activeShop,
  ingredients,
  photoURL,
}) => {
  const dispatch = useDispatch();

  const handleAddItemToCart = () => {
    const cartItems = store.getState().cart.items;
    const itemsFromOtherShops = cartItems.filter(
      item => item.activeShop !== activeShop
    );

    if (itemsFromOtherShops.length > 0) {
      NotiflixMessage({
        type: 'info',
        data: 'There are goods of other shop in the cart.',
      });
      return;
    }

    addItemToCart(dispatch, id, title, price, activeShop);
  };
  return (
    <li className={styles.productCart}>
      <div>
        <img src={photoURL} alt={title} className={styles.photoURL} />
        <div className={styles.title}>{title}</div>
        <div className={styles.ingredientsContainer}>
          <span className={styles.ingredients}>ingredients:&nbsp;</span>
          <ul>
            {ingredients?.map((ingredient, index) => (
              <li key={index} className={styles.ingredients}>
                {ingredient}
                {index === ingredients.length - 1 ? '.' : ','}&nbsp;
              </li>
            ))}
          </ul>
        </div>
        <span className={styles.title}>${price.toFixed(2)}</span>
      </div>
      <div className={styles.cartContainer}>
        {quantity > 0 ? (
          <div className={styles.quantityContainer}>
            <button
              type="button"
              className={styles.quantityButton}
              onClick={() => {
                removeItemFromCart(dispatch, id);
              }}
            >
              -
            </button>
            <span className={styles.quantity}>{quantity}</span>
            <button
              type="button"
              className={styles.quantityButton}
              onClick={handleAddItemToCart}
            >
              +
            </button>
          </div>
        ) : (
          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddItemToCart}
          >
            Add
          </button>
        )}
      </div>
    </li>
  );
};

export default ShopProductItem;
