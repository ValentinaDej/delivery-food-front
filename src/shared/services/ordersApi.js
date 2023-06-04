import instance from './instance';

export const getAllOrders = async (email) => {
  if (email)
  { 
  const { data } = await instance.get(`/orders/${email}`);
  return data;
  }
};


export const createOrder = async (orderData) => {
    try {
      const response = await instance.post('/orders', orderData);
      return response;
    } catch (error) {
      throw Error('Failed to create order');
    }
  };