import {createSlice} from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
  },
  reducers: {
    setCategory: (state, action) => {
      state.categories = action.payload.categories;
    },
  },
});

export const {setCategory} = categorySlice.actions;
export default categorySlice.reducer;
