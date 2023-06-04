import { NavLink } from 'react-router-dom';

import styles from 'components/Navbar/Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <NavLink to="/shop" className={styles.link}>
        Shop
      </NavLink>
      <NavLink to="/cart" className={styles.link}>
        Cart
      </NavLink>
    </div>
  );
};

export default Navbar;
