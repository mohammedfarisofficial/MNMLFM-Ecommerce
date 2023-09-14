import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderWithSearch from '../components/HeaderWithSearch';
import ProductHeader from '../components/ProductHeader';
import CatergoryCard from '../components/CatergoryCard';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setCategory} from '../state/reducers/categorySlice';
import {BottomTabParams, CategoryStackParams} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BASE_URL} from '@env';
import Loading from '../components/Loading';

const {width, height} = Dimensions.get('window');

export type CategoryType = {
  _id: string;
  category: string;
  coverUrl: string;
};

type Props = NativeStackScreenProps<CategoryStackParams, 'Category'>;

const Category = ({navigation}: Props) => {
  const {token} = useSelector(state => state.auth);
  const {categories} = useSelector(state => state.category);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(`${BASE_URL}/api/category`, {headers});
        dispatch(setCategory({categories: response.data.categories}));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategory();
  }, []);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <HeaderWithSearch
        rightAction={() => navigation.navigate('UserStackNavigation')}
        // isCart
        isActive
        label="Search your style"
        searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ProductHeader
            text="Catergory"
            onPress={() => {}}
            btnText="See all"
          />
          {/* list items  */}
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.itemsContainer}
            data={categories}
            renderItem={({item}) => (
              <CatergoryCard
                {...item}
                onPress={() =>{
                  setSearchQuery("")
                  navigation.navigate('ListCategory', {
                    categoryName: item.category,
                    categoryId: item._id
                  })}
                }
              />
            )}
            keyExtractor={(item: CategoryType) => item._id}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Category;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  btn: {
    width: 100,
    height: 50,
    backgroundColor: 'red',
  },
  itemsContainer: {
    width,
    alignItems: 'center',
    marginTop: 6,
    paddingBottom: height * 0.2,
  },
});
