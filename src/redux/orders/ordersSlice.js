import { createSlice } from '@reduxjs/toolkit';

import { fetchAllOrders, fetchAddOrder } from './ordersOperations';

const ordersSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    success:null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllOrders.pending, store => {
        store.isLoading = true;
        store.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (store, { payload }) => {
        store.isLoading = false;
        store.items=payload;
      })
      .addCase(fetchAllOrders.rejected, (store, { payload }) => {
        store.isLoading = false;
        store.error = payload;
      })
      .addCase(fetchAddOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchAddOrder.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(fetchAddOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.success = false;
      });
  },
});

export default ordersSlice.reducer;
