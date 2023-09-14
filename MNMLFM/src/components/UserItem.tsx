import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {cartIcon, orderIcon} from '../contants/icons';

interface Props {
  label: string;
  onPress?: () => void;
  icon: any
}

const SettingsItem = ({label, onPress,icon}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '83%',
        height: 50,
        // backgroundColor: 'red',
        borderRadius: 20,
        marginVertical: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            width: 25,
            height: 25,
            borderRadius: 50,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image style={{width: 20}} resizeMode="contain" source={icon} />
        </View>
        <Text
          style={{
            marginLeft: 10,
            fontSize: 14,
            color: 'black',
            fontFamily: 'PlusJakartaSans-SemiBold',
          }}>
          {label}
        </Text>
      </View>
      <View
        style={{
          width: 30,
          height: 30,
          // backgroundColor: 'grey',
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}>
        {/* <Image style={{ width: 20}} resizeMode='contain' source={enter}/> */}
      </View>
    </TouchableOpacity>
  );
};

export default SettingsItem;
