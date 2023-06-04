import { createAsyncThunk } from '@reduxjs/toolkit';
import * as ordersApi from 'shared/services/ordersApi';

export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAll',

  async (email, { rejectWithValue }) => {
    try {
      const orders = await ordersApi.getAllOrders(email);
      return orders;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAddOrder = createAsyncThunk(
  'orders/add',

  async (orderData, { rejectWithValue }) => {
    try {
      const orders = await ordersApi.createOrder(orderData);
      return orders.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
