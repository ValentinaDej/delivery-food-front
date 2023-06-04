import instance from './instance';

export const getAllShops = async () => {
  const { data } = await instance.get('/shops');
  return data.result;
};
