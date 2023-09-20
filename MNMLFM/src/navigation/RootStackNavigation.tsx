import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from '../screens/Welcome';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Verification from '../screens/Verification';
import Product from '../screens/Product';
import BottomTabNavigation from './BottomTabNavigation';
import Cart from '../screens/Cart';

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
const RootStack = createNativeStackNavigator<RootStackParams>();

const RootStackNavigation = () => (
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
);

export default RootStackNavigation;
