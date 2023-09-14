import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import {productItem} from '../screens/Home';

import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

type Props = productItem & {setSearchQuery?: any};

const ProductCard = ({_id, name, price, imageUrls, setSearchQuery}: Props) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      onPress={() => {
        setSearchQuery ? setSearchQuery('') : null;
        navigation.push('Product', {productId: _id});
      }}
      style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        {imageUrls && (
          <Image style={styles.image} source={{uri: imageUrls[0]}} />
        )}
      </View>
      <View style={{alignItems: 'flex-start', width: '100%', paddingLeft: 20}}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 13,
            marginVertical: 2,
            fontFamily: 'PlusJakartaSans-Medium',
          }}>
          {name}
        </Text>
        <Text
          style={{
            fontSize: 12,
            marginRight: 10,
            color: '#919FB7',
            fontFamily: 'PlusJakartaSans-Medium',
          }}>
          $<Text style={{fontSize: 15, color: '#010203'}}>{price}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  rootContainer: {
    width: width / 2 - 20,
    height: 200,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imageContainer: {
    width: '90%',
    aspectRatio: 1,
    backgroundColor: 'lightgrey',
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
