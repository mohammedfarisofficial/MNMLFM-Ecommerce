import 'react-native-gesture-handler';
import React, {ReactNode} from 'react';
import {Image, Text} from 'react-native';
//redux toolkit
import {Provider} from 'react-redux';
import store from './src/state/store';
import persistStore from 'redux-persist/es/persistStore';
//navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//payment
import {StripeProvider} from '@stripe/stripe-react-native';
//screens
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import Product from './src/screens/Product';
import Category from './src/screens/Category';
import Cart from './src/screens/Cart';
import User from './src/screens/User';
import Payment from './src/screens/Payment';
import ListCategory from './src/screens/ListCategory';
import Address from './src/screens/Address';
import CreateAddress from './src/screens/CreateAddress';
import {
  cartIcon,
  cartSolidIcon,
  category,
  categorySolid,
  home,
  homeSolid,
  user,
  userSolid,
} from './src/contants/icons';
import Orders from './src/screens/Orders';
import Verification from './src/screens/Verification';
import Wishlist from './src/screens/Wishlist';
import { PersistGate } from 'redux-persist/integration/react';


export type RootStackParams = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Verification: {
    data?: any;
  };
  BottomTabNavigation: undefined;
  Product: {
    productId: string;
  };
};
export type BottomTabParams = {
  Home: undefined;
  CategoryStackNavigation: undefined;
  CartStackNavigation: undefined;
  UserStackNavigation: undefined;
};
export type CategoryStackParams = {
  Category: undefined;
  ListCategory: {
    categoryName: string;
    categoryId: string;
  };
};
export type CartStackParams = {
  Cart: undefined;
  Address: undefined;
  CreateAddress: {
    address?: any;
  };
  Payment: {
    amount: string;
  };
};
export type UserStackParams = {
  User: undefined;
  Orders: undefined;
  Wishlist: undefined;
};

//persist storage
const persistor =  persistStore(store)


const RootStack = createNativeStackNavigator<RootStackParams>();
const BottomTab = createBottomTabNavigator<BottomTabParams>();
const CategoryStack = createNativeStackNavigator<CategoryStackParams>();
const CartStack = createNativeStackNavigator<CartStackParams>();
const UserStack = createNativeStackNavigator<UserStackParams>();

const UserStackNavigation = () => (
  <UserStack.Navigator screenOptions={{headerShown: false}}>
    <UserStack.Screen component={User} name="User" />
    <UserStack.Screen component={Orders} name="Orders" />
    <UserStack.Screen component={Wishlist} name="Wishlist" />
  </UserStack.Navigator>
);

const CartStackNavigation = () => (
  <CartStack.Navigator screenOptions={{headerShown: false}}>
    <CartStack.Screen component={Cart} name="Cart" />
    <CartStack.Screen component={Payment} name="Payment" />
    <CartStack.Screen component={Address} name="Address" />
    <CartStack.Screen component={CreateAddress} name="CreateAddress" />
  </CartStack.Navigator>
);
const CategoryStackNavigation = () => (
  <CategoryStack.Navigator screenOptions={{headerShown: false}}>
    <CategoryStack.Screen component={Category} name="Category" />
    <CategoryStack.Screen component={ListCategory} name="ListCategory" />
  </CategoryStack.Navigator>
);
const BottomTabNavigation = () => (
  <BottomTab.Navigator
    screenOptions={{headerShown: false, tabBarShowLabel: false}}>
    <BottomTab.Screen
      component={Home}
      options={{
        tabBarIcon: ({focused}) => (
          <Image
            style={{width: 20, height: 20, marginLeft: 10}}
            resizeMode="contain"
            source={focused ? homeSolid : home}
          />
        ),
      }}
      name="Home"
    />
    <BottomTab.Screen
      component={CategoryStackNavigation}
      options={{
        tabBarIcon: ({focused}) => (
          <Image
            style={{width: 20, height: 20, marginLeft: 10}}
            resizeMode="contain"
            source={focused ? categorySolid : category}
          />
        ),
      }}
      name="CategoryStackNavigation"
    />
    <BottomTab.Screen
      component={CartStackNavigation}
      options={{
        tabBarIcon: ({focused}) => (
          <Image
            style={{width: 20, height: 20, marginLeft: 10}}
            resizeMode="contain"
            source={focused ? cartSolidIcon : cartIcon}
          />
        ),
      }}
      name="CartStackNavigation"
    />
    <BottomTab.Screen
      component={UserStackNavigation}
      options={{
        tabBarIcon: ({focused}) => (
          <Image
            style={{width: 20, height: 20, marginLeft: 10}}
            resizeMode="contain"
            source={focused ? userSolid : user}
          />
        ),
      }}
      name="UserStackNavigation"
    />
  </BottomTab.Navigator>
);

function App(): JSX.Element {
  return (
    <StripeProvider publishableKey="pk_test_51NieQPSA1068KmYjGWKcNnGk3VTORCWW9Sb08mGVoLAf5dqkk4sOvRDBBE2LILCebghRp2salO0H2hQzYQAHWqVN00sLHCjWkR">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
        <NavigationContainer>
          <RootStack.Navigator
            initialRouteName="Welcome"
            screenOptions={{headerShown: false}}>
            <RootStack.Screen name="Welcome" component={Welcome} />
            <RootStack.Screen name="Register" component={Register} />
            <RootStack.Screen name="Login" component={Login} />
            <RootStack.Screen name="Verification" component={Verification} />
            <RootStack.Screen name="Product" component={Product} />
            <RootStack.Screen
              name="BottomTabNavigation"
              component={BottomTabNavigation}
            />
          </RootStack.Navigator>
        </NavigationContainer>
        </PersistGate>
      </Provider>
    </StripeProvider>
  );
}

export default App;
