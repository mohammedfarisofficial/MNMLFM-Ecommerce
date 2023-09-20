import {Image, Text, TouchableOpacity} from 'react-native';
import React from 'react';

interface Props {
  text: string;
  icon: any;
}
const SocialLoginButton = ({icon, text}: Props) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        width: '90%',
        height: 55,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.3,
        borderColor: '#929198',
        marginVertical: 8,
        overflow: 'hidden',
      }}
      onPress={() => {}}>
      <Image
        style={{width: 20, marginRight: 8}}
        resizeMode="contain"
        source={icon}
      />
      <Text style={{fontFamily: 'PlusJakartaSans-Medium', color: 'black'}}>
        Sign up with {text}
      </Text>
    </TouchableOpacity>
  );
};

export default SocialLoginButton;
