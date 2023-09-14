import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {CategoryType} from '../screens/Category';
import { useSelector } from 'react-redux';

const {width, height} = Dimensions.get('window');

type handleProps = {
  onPress: () => void;
};

type Props = handleProps & CategoryType;

const CatergoryCard = ({category,_id: categoryId, coverUrl, onPress}: Props) => {
  const {products} = useSelector(state => state.product);
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const filterByCategory = products?.filter(
      product => product?.category === categoryId,
    );
    setFilteredProducts(filterByCategory);
  }, [products, categoryId]);
  return (
    <TouchableOpacity
      style={styles.catergoryContainer}
      activeOpacity={0.5}
      onPress={onPress}>
      <ImageBackground
        style={styles.backgroundImage}
        source={{
          uri: coverUrl,
        }}>
        <View style={styles.textContainer}>
          <Text
            style={{
              color: 'white',
              textTransform: 'uppercase',
              fontFamily: 'PlusJakartaSans-ExtraBold',
              fontSize: 20,
            }}>
            {category}
          </Text>
          <Text
            style={{
              color: 'white',
              fontFamily: 'PlusJakartaSans-Regular',
              fontSize: 12,
            }}>
            {
              filteredProducts.length ===0 ? "No Items" : `${filteredProducts.length}  Products`
            }
          </Text>
        </View>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0)', '#000000']}
          style={styles.gradientStyle}
          start={{x: 1, y: -1}}
          end={{x: 1, y: 1.2}}
          locations={[0.5, 1]}
        />
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CatergoryCard;

const styles = StyleSheet.create({
  catergoryContainer: {
    width: width * 0.9,
    backgroundColor: 'grey',
    marginVertical: 5,
    height: height * 0.18,
    borderRadius: 25,
    overflow: 'hidden',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  gradientStyle: {
    width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    zIndex: 2,
    position: 'absolute',
    paddingLeft: 20,
    paddingBottom: 20,
  },
});
