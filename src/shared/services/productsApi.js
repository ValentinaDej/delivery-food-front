import instance from './instance';

export const getAllProducts = async ownerId => {
  if (ownerId) {
    const { data } = await instance.get(`/products/${ownerId}`);
    return data;
  }
};
