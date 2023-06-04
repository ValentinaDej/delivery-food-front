import { createAsyncThunk } from '@reduxjs/toolkit';
import * as shopsApi from 'shared/services/shopsApi';

export const fetchAllShops = createAsyncThunk(
  'shops/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const shops = await shopsApi.getAllShops();
      return shops;
    } catch ({ response }) {
      return rejectWithValue(response.data.message);
    }
  }
);
