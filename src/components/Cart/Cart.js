import { useSelector } from 'react-redux';

import {
  selectAllCartItems,
  selectQuantityCartItems,
} from 'redux/cart/cartSelectors';

import CartItem from './CartItem/CartItem';
import OrderForm from 'components/OrderForm/OrderForm';

import styles from './Cart.module.css';

const Cart = () => {
  const cartItems = useSelector(selectAllCartItems);
  const totalQuantity = useSelector(selectQuantityCartItems);

  const totalAmount = cartItems.reduce(
    (accumulator, item) => accumulator + item.totalPrice,
    0
  );

  return (
    <div className={styles.container}>
      <div className={styles.orderForm}>
        <OrderForm />
      </div>
      <div className={styles.cartContainer}>
        <h2 className={styles.orderTitle}>Your order:</h2>
        <div className={styles.cartItem}>
          <ul>
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                item={{
                  id: item.id,
                  title: item.title,
                  price: item.price,
                  quantity: item.quantity,
                  total: item.totalPrice,
                }}
              />
            ))}
          </ul>
        </div>
        <div className={styles.total}>
          Total quantity: {totalQuantity?.toFixed(0)}
        </div>
        <div className={styles.total}>
          Total amount: ${totalAmount?.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Cart;
