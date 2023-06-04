import { createSlice } from '@reduxjs/toolkit';

import { fetchAllShops } from './shopsOperations';

const shopsSlice = createSlice({
  name: 'shops',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllShops.pending, store => {
        store.isLoading = true;
        store.error = null;
      })
      .addCase(fetchAllShops.fulfilled, (store, { payload }) => {
        store.isLoading = false;
        store.items = payload;
      })
      .addCase(fetchAllShops.rejected, (store, { payload }) => {
        store.isLoading = false;
        store.error = payload;
      });
  },
});

export const { setActiveShop } = shopsSlice.actions;

export default shopsSlice.reducer;
