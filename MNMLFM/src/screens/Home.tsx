import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import HeaderWithSearch from '../components/HeaderWithSearch';
import BillBoard from '../components/BillBoard';
import ProductHeader from '../components/ProductHeader';
import ProductCard from '../components/ProductCard';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {setProducts} from '../state/reducers/productSlice';
import {BASE_URL} from '@env';
import { BottomTabParams } from '../navigation/BottomTabNavigation';

const {width, height} = Dimensions.get('window');

type Props = NativeStackScreenProps<BottomTabParams, 'Home'>;

export type billBoardItems = {
  headText1: string;
  headText2: string;
  discount: number;
  imageURL: string;
  imageURL2: string;
};
export type productItem = {
  _id: string;
  name: string;
  imageUrls: [string];
  desc: string;
  qty: number;
  price: number;
  isTop: Boolean;
  colors: [string];
  sizes: [string];
  reviews: [string];
};
const billBoardItems: billBoardItems = {
  headText1: 'Super Sale',
  headText2: 'Discount',
  discount: 60,
  imageURL:
    'https://images.pexels.com/photos/923210/pexels-photo-923210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  imageURL2:
    'https://images.pexels.com/photos/9136310/pexels-photo-9136310.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
};

const Home = ({navigation}: Props) => {
  const [isActive, setIsActive] = useState(false);
  const {token} = useSelector(state => state.auth);
  const {products} = useSelector(state => state.product);
  const {cart} = useSelector(state => state.cart);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (cart?.length !== 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [cart, isActive]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(`${BASE_URL}/api/products`, {
          headers,
        });
        dispatch(setProducts({products: response.data}));
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderWithSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          rightAction={() => navigation.navigate('CartStackNavigation')}
          isCart
          isActive={isActive}
          label="Search your style"
        />
        <BillBoard {...billBoardItems} onPress={() => {}} onPress2={() => {}} />
        <ProductHeader text="Top Picks" onPress={() => {}} btnText="See all" />
        {/* list items  */}
        <FlatList
          contentContainerStyle={[
            styles.itemsContainer,
            {alignItems: products?.length === 1 ? 'flex-start' : 'center'},
          ]}
          data={products}
          renderItem={({item}) => (
            <ProductCard setSearchQuery={setSearchQuery} {...item} />
          )}
          keyExtractor={(item: productItem) => item._id}
          horizontal={false}
          scrollEnabled={false}
          numColumns={2}
        />
      </ScrollView>
      {/* <BottomSheetModalProvider> */}
      {/* <BottomSheetModal
            ref={bottomRef}
            index={1}
            snapPoints={snapPoints}
            enablePanDownToClose
            backgroundStyle={{ borderRadius: 40 }}
            handleIndicatorStyle={{
              width: 38,
              height: 6,
              backgroundColor: 'lightgrey',
            }}
          >
            <Text>bottom sheet</Text>
          </BottomSheetModal> */}
      {/* </BottomSheetModalProvider> */}
    </SafeAreaView>
  );
};

export default Home;

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
    alignItems: 'flex-start',
    marginTop: 20,
    paddingBottom: height * 0.2,
    paddingHorizontal: 20,
  },
});
