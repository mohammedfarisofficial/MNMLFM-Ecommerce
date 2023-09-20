import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import {backBtn, likeIcon} from '../contants/icons';
import ProductCard from '../components/ProductCard';
import {useSelector} from 'react-redux';
import {productItem} from './Home';
import ProductHeader from '../components/ProductHeader';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { CategoryStackParams } from '../navigation/CategoryStackNavigation';

const {width, height} = Dimensions.get('window');

type Props = NativeStackScreenProps<CategoryStackParams, 'ListCategory'>;

const ListCategory = ({navigation, route}: Props) => {
  const {products} = useSelector(state => state.product);
  const {categoryName, categoryId} = route.params;
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filterByCategory = products?.filter(
      product => product?.category === categoryId,
    );
    setFilteredProducts(filterByCategory);
  }, [products, categoryId]);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          leftIcon={backBtn}
          RightIcon={likeIcon}
          text={categoryName?.toUpperCase()}
          leftAction={() => navigation.goBack()}
          rightAction={() => {}}
        />
        <ProductHeader text="Products" />
        {filteredProducts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text>No items</Text>
          </View>
        ) : (
          <FlatList
          contentContainerStyle={[
            styles.itemsContainer,
            { alignItems: filteredProducts?.length === 1 ? 'flex-start' : 'center' }
          ]}
            data={filteredProducts}
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

export default ListCategory;

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
    justifyContent:'center',
    alignItems:'center',
  }
});
