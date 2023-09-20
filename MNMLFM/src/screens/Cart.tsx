import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import {menuDots, upIcon} from '../contants/icons';
import CartItem from '../components/CartItem';
import LargeButton from '../components/Buttons/LargeButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  decrementItem,
  incrementItem,
  removeItem,
} from '../state/reducers/cartSlice';
import AddressCard from '../components/AddressCard';
import {CartStackParams} from '../navigation/CartStackNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type cartItem = {
  productId: string;
  size: string;
  color: string;
  name: string;
  price: number;
  imageUrl: string;
  qty: number;
};

const {width, height} = Dimensions.get('window');
type Props = NativeStackScreenProps<CartStackParams, 'Cart'>;

const Cart = ({navigation}: Props) => {
  const {cart} = useSelector(state => state.cart);
  const {currentAddress: isAddressExist} = useSelector(state => state.address);
  const {currentAddress: address} = useSelector(state => state.address);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [deliveryCharge, setDeliveryCharge] = useState<number>(0);
  const [subTotal, setSubTotal] = useState<number>(0);
  const dispatch = useDispatch();

  //more details animation
  const heightValue = useState(new Animated.Value(height * 0.06))[0];
  const opacityValue = useState(new Animated.Value(0))[0];
  const rotationValue = useState(new Animated.Value(0))[0];
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const spin = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const expandHanlder = () => {
    setIsOpen(!isOpen);

    const targetHeight = isOpen ? height * 0.06 : height * 0.14;
    const targetOpacity = isOpen ? 0 : 1;
    const targetRotation = isOpen ? 0 : 1;

    Animated.parallel([
      Animated.timing(heightValue, {
        toValue: targetHeight,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(opacityValue, {
        toValue: targetOpacity,
        duration: isOpen ? 200 : 500,
        delay: isOpen ? 0 : 500,
        useNativeDriver: false,
      }),
      Animated.timing(rotationValue, {
        toValue: targetRotation,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const currentAddress = address
    ? `${address?.name}, ${address?.district}, ${address?.zipcode}, ${address?.state}`
    : 'Click to add Adress';

  // cart item actions
  const handleDecrement = (productId: string) => {
    dispatch(decrementItem({productId}));
  };
  const handleIncrement = (productId: string) => {
    dispatch(incrementItem({productId}));
  };
  const handleRemove = (productId: string) => {
    dispatch(removeItem({productId}));
  };
  //set prices
  useEffect(() => {
    let calculatedSubTotal: number = 0;
    cart.forEach((item: cartItem) => {
      calculatedSubTotal += item.price * item.qty;
    });
    setDeliveryCharge(cart.length === 0 ? 0 : 10.0);
    setSubTotal(calculatedSubTotal);
    setTotalPrice(calculatedSubTotal + deliveryCharge);
  }, [cart, deliveryCharge]);

  const checkoutHandler = () => {
    if (cart.length === 0) {
      console.log('Empty cart');
    } else {
      if (isAddressExist == null) {
        console.log('try to add atleast one address');
      } else {
        navigation.navigate('Payment', {amount: totalPrice});
      }
    }
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <Header
        RightIcon={menuDots}
        text="Checkout"
        leftAction={() => {}}
        rightAction={() => {}}
      />
      {/* address container  */}

      {cart.length !== 0 && (
        <AddressCard
          isCurrent
          onPress={() => navigation.navigate('Address')}
          defaultAddress={currentAddress}
        />
      )}

      {/* {/* item container  */}
      {cart?.length !== 0 ? (
        <FlatList
          contentContainerStyle={styles.itemsContainer}
          data={cart}
          renderItem={({item}) => (
            <CartItem
              handleDecrement={handleDecrement}
              handleIncrement={handleIncrement}
              handleRemove={handleRemove}
              {...item}
            />
          )}
          keyExtractor={(item: cartItem) =>
            item.productId + Math.random() * 0.3382
          }
        />
      ) : (
        <>
          <Text style={{marginTop: 100}}>Empty Cart</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BottomTabNavigation', {screen: 'Home'})
            }>
            <Text style={{fontSize: 12}}>
              Go to <Text style={{fontWeight: 600}}>Home</Text> page
            </Text>
          </TouchableOpacity>
        </>
      )}
      {/* checkout container  */}

      <View style={styles.checkoutContainer}>
        <View style={{height: '50%', position: 'relative', width}}>
          <Animated.View
            style={[
              styles.checkoutDetailsContainer,
              {
                height: heightValue,
              },
            ]}>
            <Animated.View
              style={[
                styles.expandButtonContainer,
                {
                  transform: [{rotate: spin}],
                },
              ]}>
              <TouchableOpacity onPress={expandHanlder}>
                <Image
                  style={{width: 30}}
                  source={upIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              style={[
                styles.checkoutChildContainer,
                {
                  opacity: opacityValue,
                },
              ]}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'PlusJakartaSans-Bold',
                  color: 'grey',
                }}>
                Subtotal
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: 'PlusJakartaSans-Regular',
                  color: 'grey',
                }}>
                ${' '}
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'PlusJakartaSans-Medium',
                    color: 'black',
                  }}>
                  {subTotal}
                </Text>
              </Text>
            </Animated.View>
            <Animated.View
              style={[
                styles.checkoutChildContainer,
                {
                  opacity: opacityValue,
                },
              ]}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'PlusJakartaSans-Bold',
                  color: 'grey',
                }}>
                Delivery
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: 'PlusJakartaSans-Regular',
                  color: 'grey',
                }}>
                ${' '}
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'PlusJakartaSans-Medium',
                    color: 'black',
                  }}>
                  {deliveryCharge}
                </Text>
              </Text>
            </Animated.View>
            <View style={styles.checkoutChildContainer}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'PlusJakartaSans-Bold',
                  color: 'grey',
                }}>
                Total
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: 'PlusJakartaSans-Regular',
                  color: 'grey',
                }}>
                ${' '}
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'PlusJakartaSans-Medium',
                    color: 'black',
                  }}>
                  {totalPrice}
                </Text>
              </Text>
            </View>
          </Animated.View>
        </View>
        <View
          style={{
            width,
            height: '30%',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <LargeButton name="Checkout" onPress={checkoutHandler} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    position: 'relative',
  },
  itemsContainer: {
    width,
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: height * 0.3,
  },
  checkoutContainer: {
    width,
    height: 160,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
  },
  checkoutChildContainer: {
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  checkoutDetailsContainer: {
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    paddingBottom: 5,
  },
  expandButtonContainer: {
    width: 30,
    height: 25,
    position: 'absolute',
    right: 0,
    top: 0,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
});
