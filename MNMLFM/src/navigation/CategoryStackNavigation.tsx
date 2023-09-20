import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Category from '../screens/Category';
import ListCategory from '../screens/ListCategory';

export type CategoryStackParams = {
  Category: undefined;
  ListCategory: {
    categoryName: string;
    categoryId: string;
  };
};

const CategoryStack = createNativeStackNavigator<CategoryStackParams>();

const CategoryStackNavigation = () => (
  <CategoryStack.Navigator screenOptions={{headerShown: false}}>
    <CategoryStack.Screen component={Category} name="Category" />
    <CategoryStack.Screen component={ListCategory} name="ListCategory" />
  </CategoryStack.Navigator>
);

export default CategoryStackNavigation;
