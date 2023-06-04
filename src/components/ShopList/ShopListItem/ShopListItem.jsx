import useWindowResize from 'shared/hooks/useWindowResize';

import styles from './ShopListItem.module.css';

const ShopListItem = ({
  name,
  number,
  id,
  handleShopSelection,
  isActive,
  isDisabled,
  address,
}) => {
  const isDesktop = useWindowResize();

  const handleClick = () => {
    if (!isDisabled) {
      handleShopSelection(id);
    }
  };
  return (
    <div
      className={`${styles.shopListItem} ${isActive && styles.active}  ${
        isDisabled && styles.disabled
      }`}
      onClick={handleClick}
    >
      <h3>{name}</h3>
      <p>{number}</p>
      <p>{address}</p>
      {!isDesktop && <button className={styles.addButton}>Show menu</button>}
    </div>
  );
};

export default ShopListItem;
