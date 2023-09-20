import {createNativeStackNavigator} from '@react-navigation/native-stack';
import User from '../screens/User';
import Orders from '../screens/Orders';
import Wishlist from '../screens/Wishlist';

export type UserStackParams = {
  User: undefined;
  Orders: undefined;
  Wishlist: undefined;
};
const UserStack = createNativeStackNavigator<UserStackParams>();

const UserStackNavigation = () => (
  <UserStack.Navigator screenOptions={{headerShown: false}}>
    <UserStack.Screen component={User} name="User" />
    <UserStack.Screen component={Orders} name="Orders" />
    <UserStack.Screen component={Wishlist} name="Wishlist" />
  </UserStack.Navigator>
);

export default UserStackNavigation;
