import { createSlice } from '@reduxjs/toolkit';

import { fetchAllProducts } from './productsOperations';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllProducts.pending, store => {
        store.isLoading = true;
        store.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (store, { payload }) => {
        store.isLoading = false;
        store.items=payload;
      })
      .addCase(fetchAllProducts.rejected, (store, { payload }) => {
        store.isLoading = false;
        store.error = payload;
      });
  },
});

export default productsSlice.reducer;
