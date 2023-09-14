import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {productItem} from '../screens/Home';

const {width} = Dimensions.get('window');
interface Prop {
  onPress: () => void;
}
type Props = Prop & productItem;

const SearchItem = ({onPress, name}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};
export default SearchItem;

const styles = StyleSheet.create({
  container: {
    width,
    height: 30,
    marginVertical: 4,
    paddingHorizontal: 40,
  },
  text: {
    fontFamily: 'PlusJakartaSans-Medium',
  },
});
