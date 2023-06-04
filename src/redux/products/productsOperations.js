import { createAsyncThunk } from '@reduxjs/toolkit';
import * as productsApi from 'shared/services/productsApi';

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',

  async (ownerId, { rejectWithValue }) => {
    try {
      const products = await productsApi.getAllProducts(ownerId);
      return products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
