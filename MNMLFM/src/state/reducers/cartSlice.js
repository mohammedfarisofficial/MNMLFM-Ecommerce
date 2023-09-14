import {createSlice} from '@reduxjs/toolkit';
import {BASE_URL} from '@env';
import axios from 'axios';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addItem: (state, action) => {
      const itemInCart = state.cart.find(
        product => product.productId === action.payload.productId,
      );
      const diffSize = state.cart.find(
        product => product.size === action.payload.size,
      );
      const diffColor = state.cart.find(
        product => product.color === action.payload.color,
      );
      if (itemInCart && diffSize && diffColor) {
        itemInCart.qty++;
      } else {
        state.cart.push({...action.payload, qty: 1});
      }
    },
    incrementItem: (state, action) => {
      const cartItem = state.cart.find(
        product => product.productId === action.payload.productId,
      );
      cartItem.qty++;
    },
    decrementItem: (state, action) => {
      const product = state.cart.find(
        product => product.productId === action.payload.productId,
      );
      if (product.qty === 1) {
        product.qty = 1;
      } else {
        product.qty--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        product => product.productId !== action.payload.productId,
      );
      state.cart = removeItem;
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
  },
});

export const {addItem, incrementItem, decrementItem, removeItem, clearCart} =
  cartSlice.actions;
export default cartSlice.reducer;
