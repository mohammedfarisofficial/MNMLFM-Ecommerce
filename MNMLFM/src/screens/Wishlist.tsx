import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {backBtn} from '../contants/icons';
import Header from '../components/Header';
import ProductHeader from '../components/ProductHeader';
import ProductCard from '../components/ProductCard';
import {productItem} from './Home';
import {useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {UserStackParams} from '../navigation/UserStackNavigation';

const {width, height} = Dimensions.get('window');
type Props = NativeStackScreenProps<UserStackParams, 'Wishlist'>;
const Wishlist = ({navigation}: Props) => {
  const {wishlist} = useSelector(state => state.wishlist);
  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          leftIcon={backBtn}
          // RightIcon={likeIcon}
          text="Wishlist"
          leftAction={() => navigation.goBack()}
          rightAction={() => {}}
        />
        <ProductHeader text="Products" />
        {wishlist.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text>No items</Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={[
              styles.itemsContainer,
              {alignItems: wishlist?.length === 1 ? 'flex-start' : 'center'},
            ]}
            data={wishlist}
            renderItem={({item}) => <ProductCard {...item} />}
            keyExtractor={(item: productItem) => item._id}
            horizontal={false}
            scrollEnabled={false}
            numColumns={2}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemsContainer: {
    width,
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: height * 0.2,
    paddingHorizontal: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
