import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import Home from '../screens/Home';
import {
  cartIcon,
  cartSolidIcon,
  category,
  categorySolid,
  home,
  homeSolid,
  user,
  userSolid,
} from '../contants/icons';
import CategoryStackNavigation from './CategoryStackNavigation';
import CartStackNavigation from './CartStackNavigation';
import UserStackNavigation from './UserStackNavigation';

export type BottomTabParams = {
  Home: undefined;
  CategoryStackNavigation: undefined;
  CartStackNavigation: undefined;
  UserStackNavigation: undefined;
};
const BottomTab = createBottomTabNavigator<BottomTabParams>();

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

export default BottomTabNavigation;
