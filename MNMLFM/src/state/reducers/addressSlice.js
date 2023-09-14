import {createSlice} from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addressList: [],
    currentAddress: null,
  },
  reducers: {
    addAddress: (state, action) => {
      state.addressList.push(action.payload);
      state.currentAddress = action.payload;
    },
    setCurrent: (state, action) => {
      state.currentAddress = action.payload;
    },
  },
});

export const {addAddress, setCurrent} = addressSlice.actions;
export default addressSlice.reducer;
