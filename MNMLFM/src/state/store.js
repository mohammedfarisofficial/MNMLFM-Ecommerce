import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {composeWithDevTools} from 'redux-devtools-extension';
import {applyMiddleware} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
//reducers
import authReducer from './reducers/authSlice';
import productReducer from './reducers/productSlice';
import categoryReducer from './reducers/categorySlice';
import cartReducer from './reducers/cartSlice';
import addressReducer from './reducers/addressSlice';
import orderReducer from './reducers/orderSlice';
import wishlistReducer from './reducers/wishlistSlice';

//persist states
import persistReducer from 'redux-persist/es/persistReducer';
import AsyncStorage from '@react-native-community/async-storage';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  category: categoryReducer,
  cart: cartReducer,
  address: addressReducer,
  order: orderReducer,
  wishlist: wishlistReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

const store = configureStore(
  {
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
  },
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
