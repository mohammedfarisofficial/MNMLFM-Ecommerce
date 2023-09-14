import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '@env';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload.userOrders;
    },
    createOrder: (state, action) => {
      const {orders} = action.payload;
      orders?.forEach(async order => {
        const response = await axios.post(
          `${BASE_URL}/api/order/create-order`,
          {
            order,
          },
        );
        console.log('new order placed:', response.data.createdOrder);
      });
    },
  },
});

export const {setOrders, createOrder} = orderSlice.actions;
export default orderSlice.reducer;
