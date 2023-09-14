import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('window')
interface Props {
  name: string;
  onPress: () => void;
}

const LargeButton = ({name, onPress}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: width-50,
        height: 65,
        backgroundColor: '#112E40',
        borderRadius: 60,
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
      <Text
        style={{
          color: 'white',
          fontSize: 14,
          fontFamily: 'PlusJakartaSans-SemiBold',
        }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default LargeButton;
