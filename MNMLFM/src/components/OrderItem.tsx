import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextComponent,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
const {width} = Dimensions.get('window');
const OrderItem = ({productName, productImageUrl, _id}) => {
  return (
    <TouchableOpacity style={styles.itemContainer}>
      <View>
        <View style={styles.imageWrapper}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={{
              uri: productImageUrl,
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
          {productName}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 12, fontFamily: 'PlusJakartaSans-Regular'}} numberOfLines={1}>
            Order ID : {_id}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 10,
            fontFamily: 'PlusJakartaSans-Regular',
            color: 'grey',
          }}>
          Order Status:
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'PlusJakartaSans-Bold',
              color: 'black',
            }}>
            Dipatched
          </Text>
        </Text>
      </View>
      {/* <TouchableOpacity style={styles.trackContainer}>
        <Text>Track Order</Text>
      </TouchableOpacity> */}
    </TouchableOpacity>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  itemContainer: {
    width: width * 0.9,
    height: 100,
    // backgroundColor: 'red',
    marginBottom: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent:"space-evenly",
    alignItems: 'center',
  },
  imageWrapper: {
    width: 80,
    aspectRatio: 1,
    backgroundColor: 'grey',
    borderRadius: 20,
    overflow: 'hidden',
    borderRightColor: 'red',
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
    width: '70%'
    // backgroundColor:"red"
  },
  trackContainer: {
    height: '100%',
    width: 60,
    backgroundColor:"red"
  },
});
