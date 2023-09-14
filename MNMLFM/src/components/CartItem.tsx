import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {cartItem} from '../screens/Cart';

import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';
import { trashIcon } from '../contants/icons';

const {width} = Dimensions.get('window');

type handleProps = {
  handleDecrement: (productId: string) => void;
  handleIncrement: (productId: string) => void;
  handleRemove: (productId: string) => void;
};
type Props = cartItem & handleProps;

const CartItem = ({
  name,
  size,
  color,
  price,
  imageUrl,
  productId,
  qty,
  handleDecrement,
  handleIncrement,
  handleRemove,
}: Props) => {
  const leftSwipe = () => (
    <TouchableOpacity
      onPress={() => handleRemove(productId)}
      style={{
        width: 100,
        height: 100,
        // backgroundColor: 'blue',
        borderRadius: 20,
        justifyContent:"center",
        alignItems:'center'
      }}>
      <Image source={trashIcon} style={{width: 25}} resizeMode='contain'/>
    </TouchableOpacity>
  );
  return (
    <GestureHandlerRootView>
      <Swipeable renderLeftActions={leftSwipe}>
        <TouchableOpacity style={styles.itemContainer}>
          <View>
            <View style={styles.imageWrapper}>
              <Image
                style={{width: '100%', height: '100%'}}
                source={{
                  uri: imageUrl,
                }}
              />
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 15,
                fontFamily: 'PlusJakartaSans-Medium',
                maxWidth: 160,
              }}>
              {name}
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{fontSize: 12, fontFamily: 'PlusJakartaSans-Regular'}}>
                Size: {size}
              </Text>
              <Text
                style={{fontSize: 12, fontFamily: 'PlusJakartaSans-Regular'}}>
                Colour: {color}
              </Text>
            </View>
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
                  fontFamily: 'PlusJakartaSans-Bold',
                  color: 'black',
                }}>
                {price}
              </Text>
            </Text>
          </View>
          <View style={styles.qtyController}>
            <TouchableOpacity
              onPress={() => handleDecrement(productId)}
              style={styles.qtyBtn}>
              <Text style={styles.qtyBtnText}>-</Text>
            </TouchableOpacity>
            <Text>{qty}</Text>
            <TouchableOpacity
              onPress={() => handleIncrement(productId)}
              style={styles.qtyBtn}>
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  itemContainer: {
    width: width * 0.9,
    height: 100,
    // backgroundColor: 'red',
    marginBottom: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    width: 100,
    aspectRatio: 1,
    backgroundColor: 'grey',
    borderRadius: 20,
    overflow: 'hidden',
  },
  qtyController: {
    flex: 0.8,
    // backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  qtyBtn: {
    width: 30,
    aspectRatio: 1,
    // backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnText: {
    fontSize: 20,
    color: '#2982F4',
  },
  detailsContainer: {
    justifyContent: 'center',
  },
});
