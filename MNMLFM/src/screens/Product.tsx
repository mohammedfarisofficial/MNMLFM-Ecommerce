import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Header from '../components/Header';
import {
  backBtn,
  heartSolidActiveIcon,
  likeIcon,
  starIcon,
  tickIcon,
} from '../contants/icons';
import ReadMore from '@fawazahmed/react-native-read-more';
import SmallButton from '../components/Buttons/SmallButton';
import ProductCard from '../components/ProductCard';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {addItem} from '../state/reducers/cartSlice';
import {
  addItem as addToWishlist,
  removeItem,
} from '../state/reducers/wishlistSlice';
import {cartItem} from './Cart';
import {productItem} from './Home';
import ReviewItem from '../components/ReviewItem';
import WriteReview from '../components/WriteReview';
import { RootStackParams } from '../navigation/RootStackNavigation';

const {width, height} = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParams, 'Product'>;

const Product = ({navigation, route}: Props) => {
  const {products} = useSelector(state => state.product);
  const {wishlist} = useSelector(state => state.wishlist);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const {productId} = route.params;
  const {cart} = useSelector(state => state.cart);
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const product = products.filter(product => product._id === productId);
    const category = product[0].category;
    const relatedProductsList = products.filter(product => {
      if (product._id === productId) {
        return;
      }
      return product.category === category;
    });
    setProduct(product[0]);
    setSelectedColor(product[0].colors[0]);
    setSelectedSize(product[0].sizes[0]);
    setRelatedProducts(relatedProductsList);
  }, [products]);

  useEffect(() => {
    //setting wishist
    const liked = wishlist.find(product => product.productId === productId);
    if (liked) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [wishlist]);

  const addToCartHandler = () => {
    const cartItem: cartItem = {
      productId,
      size: selectedSize,
      color: selectedColor,
      price: product.price,
      name: product.name,
      imageUrl: product.imageUrls[1],
    };
    dispatch(addItem(cartItem));
    console.log(cart);
  };

  const wishlistHandler = () => {
    if (isLiked) {
      dispatch(removeItem({productId}));
    } else {
      dispatch(addToWishlist(product));
      setIsLiked(true);
    }
  };
  return (
    <SafeAreaView style={[styles.rootContainer, {position: 'relative'}]}>
      <ScrollView>
        <View style={[styles.rootContainer, {paddingBottom: 100}]}>
          <Header
            leftIcon={backBtn}
            RightIcon={isLiked ? heartSolidActiveIcon : likeIcon}
            text="Product Details"
            leftAction={() => navigation.goBack()}
            rightAction={wishlistHandler}
          />

          {/* product preview section  */}
          <View style={styles.sliderContainer}>
            {product?.imageUrls && (
              <Image
                style={styles.productImage}
                resizeMode="cover"
                source={{uri: product?.imageUrls[1]}}
              />
            )}
          </View>

          {/* product details section */}
          <View style={styles.detailsContainer}>
            <Text
              style={{
                fontSize: 22,
                fontFamily: 'PlusJakartaSans-SemiBold',
                color: '#010203',
                marginBottom: 5,
              }}>
              {product?.name}

              {/* Wool Coat Lapel Collar */}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={starIcon}
                resizeMode="contain"
                style={{width: 17, aspectRatio: 1}}
              />
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 14,

                  fontFamily: 'PlusJakartaSans-Medium',
                }}>
                4.9<Text style={{color: '#919FB7'}}>(335)</Text>
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 14,
                  color: '#919FB7',
                  fontFamily: 'PlusJakartaSans-Medium',
                }}>
                · 212 <Text style={{fontSize: 13}}>reviews</Text>
              </Text>
            </View>
            <ReadMore
              numberOfLines={3}
              style={styles.decStyle}
              seeMoreStyle={{color: '#2982F4'}}
              seeLessStyle={{color: '#2982F4'}}>
              {product?.desc}
            </ReadMore>
          </View>

          {/* product color section  */}
          <View style={styles.selectionContainer}>
            <Text
              style={{fontSize: 14, fontFamily: 'PlusJakartaSans-SemiBold'}}>
              Select colour
            </Text>
            <View style={styles.colorBoxContainer}>
              {product?.colors?.map((item, index) => (
                <TouchableOpacity
                  key={index * Math.random() * 0.23432}
                  onPress={() => setSelectedColor(item)}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 6,
                    borderRadius: 7,
                    borderWidth: selectedColor === item ? 1 : 0,
                    borderColor: 'lightgrey',
                    width: 32,
                    aspectRatio: 1,
                    position: 'relative',
                  }}>
                  <View
                    style={[styles.colorBox, {backgroundColor: item}]}
                    key={index * Math.random() * 0.23432}>
                    {selectedColor === item && (
                      <Image
                        source={tickIcon}
                        resizeMode="contain"
                        style={{width: 10}}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* product size section  */}
          <View style={styles.selectionContainer}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{fontSize: 14, fontFamily: 'PlusJakartaSans-SemiBold'}}>
                Select size
              </Text>
              <TouchableOpacity onPress={() => {}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'PlusJakartaSans-SemiBold',
                    color: '#2982F4',
                  }}>
                  size guide
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.colorBoxContainer}>
              {product?.sizes?.map((item, index) => (
                <TouchableOpacity
                  key={index * Math.random() * 0.23432}
                  onPress={() => setSelectedSize(item)}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 6,
                    borderRadius: 7,
                    borderWidth: selectedSize === item ? 1 : 0,
                    borderColor: 'lightgrey',
                    width: 32,
                    aspectRatio: 1,
                    position: 'relative',
                  }}>
                  <View
                    style={[styles.colorBox, {backgroundColor: item}]}
                    key={index * Math.random() * 0.23432}>
                    <Text>{item}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/* user's reviews  */}
          {product?.reviews.length !== 0 && (
            <View style={styles.reletedContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 20,
                  marginBottom: 15,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'PlusJakartaSans-SemiBold',
                  }}>
                  Product Reviews
                </Text>
              </View>
              <View style={{paddingBottom: 20}}>
                {product?.reviews.map(review => (
                  <ReviewItem {...review} />
                ))}
              </View>
            </View>
          )}
          {/* add review  */}
          <WriteReview productId={productId} />
          {/* related products section  */}
          {relatedProducts.length !== 0 && (
            <View style={styles.reletedContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 20,
                  marginBottom: 15,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'PlusJakartaSans-SemiBold',
                  }}>
                  Releated Products
                </Text>
                <TouchableOpacity onPress={() => {}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'PlusJakartaSans-SemiBold',
                      color: '#2982F4',
                    }}>
                    see more
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                style={{backgroundColor: 'white'}}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={relatedProducts}
                renderItem={({item}) => <ProductCard {...item} />}
                keyExtractor={(item: productItem) => item._id}
              />
            </View>
          )}
        </View>
      </ScrollView>
      {/* add to cart section  */}
      <View style={styles.addContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 15, marginRight: 10, color: '#919FB7'}}>
            $
            <Text style={{fontSize: 18, color: '#010203'}}>
              {product?.price}
            </Text>
          </Text>
          <Text style={{textDecorationLine: 'line-through', color: '#919FB7'}}>
            $177.99
          </Text>
        </View>
        <SmallButton onPress={addToCartHandler} name="Add to Cart" />
      </View>
    </SafeAreaView>
  );
};

export default Product;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  sliderContainer: {
    width: width * 0.9,
    height: height * 0.35,
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    overflow: 'hidden',
  },
  detailsContainer: {
    width,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  decStyle: {
    marginVertical: 10,
    fontSize: 14,
    lineHeight: 25,
    color: '#919FB7',
    fontFamily: 'PlusJakartaSans-Medium',
  },
  selectionContainer: {
    width,
    height: 90,
    // backgroundColor:'red',
    paddingHorizontal: 20,
  },
  colorBoxContainer: {
    flexDirection: 'row',
    // backgroundColor:'red'
    paddingTop: 5,
  },
  colorBox: {
    width: '90%',
    aspectRatio: 1,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addContainer: {
    position: 'absolute',
    width,
    height: 100,
    backgroundColor: 'white',
    bottom: 0,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  reletedContainer: {
    width,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
});
