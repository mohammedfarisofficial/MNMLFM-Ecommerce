import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

interface Props {
  name: string;
  onPress: () => void;
}

const MediumButton = ({name, onPress}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '90%',
        height: 55,
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

export default MediumButton;

const styles = StyleSheet.create({});
