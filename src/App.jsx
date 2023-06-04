import { Route, Routes, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';

import { cartActions } from 'redux/cart/cartSlice';

import decryptData from 'shared/helpers/crypto/decryptData';

import Loader from 'shared/components/Loader/Loader';

const Layout = lazy(() => import('components/Layout/Layout'));
const ShopPage = lazy(() => import('pages/ShopPage/ShopPage'));
const CartPage = lazy(() => import('pages/CartPage/CartPage'));

export const App = () => {
  const lsKey = process.env.REACT_APP_LS;
  const dispatch = useDispatch();

  const savedCart = decryptData(localStorage.getItem('acC00q00'), lsKey);
  const savedCartObj = savedCart ? JSON.parse(savedCart) : null;

  if (savedCart) {
    dispatch(cartActions.setCart(savedCartObj));
  }

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Navigate to="/shop" replace />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<ShopPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
