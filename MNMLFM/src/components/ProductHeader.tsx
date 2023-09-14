import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('window');
interface Props {
  text: string;
  onPress?: () => void;
  btnText?: string;
}

const ProductHeader = ({text, onPress, btnText}: Props) => {
  return (
    <View style={styles.headerContainer}>
      <Text
        style={{
          fontSize: 17,
          fontFamily: 'PlusJakartaSans-SemiBold',
        }}>
        {text}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'PlusJakartaSans-Regular',
          }}>
          {btnText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductHeader;

const styles = StyleSheet.create({
  headerContainer: {
    width,
    height: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
});
