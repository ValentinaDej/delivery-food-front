import { LoadScript } from '@react-google-maps/api';

import Cart from 'components/Cart/Cart';

const libraries = ['places'];

const CartPage = () => {
  const mapKey = process.env.REACT_APP_MAP;
  return (
    <LoadScript googleMapsApiKey={mapKey} libraries={libraries}>
      <div>
        <Cart />
      </div>
    </LoadScript>
  );
};

export default CartPage;
