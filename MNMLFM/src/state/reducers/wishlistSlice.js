import {createSlice} from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlist: [],
  },
  reducers: {
    addItem: (state, action) => {
      const isExist = state.wishlist.find(
        product => product._id === action.payload._id,
      );
      if (!isExist) {
        state.wishlist.push({...action.payload});
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.wishlist.filter(
        product => product._id !== action.payload._id,
      );
      state.wishlist = removeItem;
    },
    clearWishlist: (state, action) => {
      state.wishlist = [];
    },
  },
});

export const {addItem, removeItem, clearWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;
