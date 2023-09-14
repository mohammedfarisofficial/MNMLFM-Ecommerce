import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { sendIcon } from '../../contants/icons';

interface Props {
  name: string;
  onPress: () => void;
}

const IconButton = ({onPress, name}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 50,
        height: 50,
        backgroundColor: '#112E40',
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image style={{ width: 18}} resizeMode='contain' source={sendIcon}/>
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({});
