import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Cart from '../screens/Cart';
import Payment from '../screens/Payment';
import Address from '../screens/Address';
import CreateAddress from '../screens/CreateAddress';

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
const CartStack = createNativeStackNavigator<CartStackParams>();

const CartStackNavigation = () => (
  <CartStack.Navigator screenOptions={{headerShown: false}}>
    <CartStack.Screen component={Cart} name="Cart" />
    <CartStack.Screen component={Payment} name="Payment" />
    <CartStack.Screen component={Address} name="Address" />
    <CartStack.Screen component={CreateAddress} name="CreateAddress" />
  </CartStack.Navigator>
);

export default CartStackNavigation;
