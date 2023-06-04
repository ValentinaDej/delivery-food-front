import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchAllShops } from 'redux/shops/shopsOperations';
import { selectAllShops, selectLoadingShops } from 'redux/shops/shopsSelectors';

import { fetchAllProducts } from 'redux/products/productsOperations';
import {
  selectAllProducts,
  selectLoadingProducts,
} from 'redux/products/productsSelectors';

import { selectAllCartItems } from 'redux/cart/cartSelectors';

import encryptData from 'shared/helpers/crypto/encryptData';
import decryptData from 'shared/helpers/crypto/decryptData';
import useWindowResize from 'shared/hooks/useWindowResize';

import ShopListItem from './ShopListItem/ShopListItem';
import ShopProductItem from './ShopProductItem/ShopProductItem';
import Modal from 'shared/components/Modal/Modal';
import NotiflixMessage from 'shared/components/NotiflixMessage/NotiflixMessage';
import Loader from 'shared/components/Loader/Loader';

import styles from './ShopList.module.css';

const ShopList = () => {
  const lsKey = process.env.REACT_APP_LS;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDesktop = useWindowResize();
  const dispatch = useDispatch();

  const shops = useSelector(selectAllShops);
  const isShopsLoading = useSelector(selectLoadingShops);
  const products = useSelector(selectAllProducts);
  const isProductsLoading = useSelector(selectLoadingProducts);
  const cart = useSelector(selectAllCartItems);

  const [activeShop, setActiveShop] = useState(null);

  useEffect(() => {
    dispatch(fetchAllShops());
  }, [dispatch]);

  useEffect(() => {
    const activeShop = decryptData(localStorage.getItem('acS00q00'), lsKey);
    const activeShopObj = activeShop ? JSON.parse(activeShop) : null;

    if (!activeShopObj && shops) {
      const firstObject = shops.find(obj => obj._id);
      if (firstObject) {
        const shop = { id: firstObject._id, address: firstObject.address };
        const encryptedShop = encryptData(shop, lsKey);
        localStorage.setItem('acS00q00', encryptedShop);
        setActiveShop(shop);
      }
    }
  }, [shops, dispatch, activeShop, lsKey]);

  useEffect(() => {
    const activeShop = decryptData(localStorage.getItem('acS00q00'), lsKey);
    if (activeShop) {
      const activeShopObj = JSON.parse(activeShop);
      dispatch(fetchAllProducts(activeShopObj.id));
    }
  }, [dispatch, activeShop, lsKey]);

  const handleShopSelection = (id, address) => {
    const cartItemsFromOtherShops = cart.filter(item => item.activeShop !== id);
    if (cartItemsFromOtherShops.length === 0) {
      const encryptedShop = encryptData({ id, address }, lsKey);
      localStorage.setItem('acS00q00', encryptedShop);
      setActiveShop({ id, address });
      if (!isDesktop) {
        setIsModalOpen(true);
      }
    } else {
      NotiflixMessage({
        type: 'info',
        data: 'There are other goods in the cart.',
      });
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const isShops = Boolean(shops?.length);
  const isProducts = Boolean(products?.length);

  const renderCatalogShops = () => {
    const activeShop = decryptData(localStorage.getItem('acS00q00'), lsKey);
    const activeShopObj = activeShop ? JSON.parse(activeShop) : null;

    if (activeShopObj) {
      return shops?.map(({ _id: id, name, phone, address }) => {
        const cartItemsFromShop = cart.filter(item => item.activeShop === id);
        const hasItemsInCart = cartItemsFromShop.length > 0;
        const isActive = activeShopObj.id === id;
        // console.log('hasItemsInCart', hasItemsInCart, isActive);
        const isDisabled = !isActive && hasItemsInCart;
        return (
          <ShopListItem
            key={id}
            name={name}
            number={phone}
            address={address}
            id={id}
            handleShopSelection={() => handleShopSelection(id, address)}
            isActive={isActive}
            hasItemsInCart={hasItemsInCart}
            isDisabled={isDisabled}
          />
        );
      });
    }
  };

  const renderCatalogProducts = () => {
    const activeShop = decryptData(localStorage.getItem('acS00q00'), lsKey);
    const activeShopObj = activeShop ? JSON.parse(activeShop) : null;

    return products?.map(({ _id: id, title, price, ingredients, photoURL }) => {
      const cartItem = cart.find(cartItem => cartItem.id === id);
      const quantity = cartItem ? cartItem.quantity : 0;
      return (
        <ShopProductItem
          key={id}
          title={title}
          price={price}
          id={id}
          quantity={quantity}
          activeShop={activeShopObj.id}
          ingredients={ingredients}
          photoURL={photoURL}
        />
      );
    });
  };

  return (
    <div className={styles.shopContainer}>
      {isShopsLoading || isProductsLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            {isShops && (
              <div className={styles.shopList}>{renderCatalogShops()}</div>
            )}
            {!isShops && <p>There are no shops!</p>}
          </div>
          {isDesktop ? (
            <div className={styles.productContainer}>
              {isProducts ? (
                <div className={styles.productList}>
                  {renderCatalogProducts()}
                </div>
              ) : (
                <p>There are no products!</p>
              )}
            </div>
          ) : (
            isModalOpen && (
              <Modal onClose={handleModalClose}>
                <div className={styles.modalNavigationContainer}>
                  <button
                    onClick={() => {
                      window.location.href = '/shop';
                    }}
                    className={styles.modalNavigationBtn}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => (window.location.href = '/cart')}
                    className={styles.modalNavigationBtn}
                  >
                    Cart
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className={styles.modalNavigationBtn}
                  >
                    Close
                  </button>
                </div>
                <div className={styles.productList}>
                  {renderCatalogProducts()}
                </div>
              </Modal>
            )
          )}
        </>
      )}
    </div>
  );
};

export default ShopList;
