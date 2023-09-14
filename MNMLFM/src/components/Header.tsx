import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View,Dimensions} from 'react-native';


const { width} = Dimensions.get('window')
interface Props {
  leftIcon?: any;
  RightIcon?: any;
  text: string;
  leftAction?: () => void;
  rightAction?: () => void;
}

const Header = ({
  leftIcon,
  RightIcon,
  text,
  leftAction,
  rightAction,
}: Props) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={leftAction}>
        <Image resizeMode="contain" style={styles.backBtn} source={leftIcon} />
      </TouchableOpacity>
      <View>
        <Text style={styles.text}>{text}</Text>
      </View>
      <TouchableOpacity onPress={rightAction}>
        <Image resizeMode="contain" style={styles.backBtn} source={RightIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    width,
    height: 70,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },
  text: {
    fontSize: 17,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  backBtn: {
    width: 15,
  },
});
