import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {hideIcon, showIcon} from '../contants/icons';

interface Props {
  isPassword?: Boolean;
  isError?: string;
  label: string;
  placeholder: string;
  icon?: any;
  value?: string;
  onChangeText: any;
}

const InputBox = ({
  isPassword,
  label,
  placeholder,
  isError,
  icon,
  value,
  onChangeText,
}: Props) => {
  const [isShown, setIsShown] = useState(true);

  return (
    <View style={styles.inputContainer}>
      <View style={styles.boxContainer}>
        {icon && (
          <View>
            <Image style={{width: 20}} resizeMode="contain" source={icon} />
          </View>
        )}
        <View style={{flex: 1, justifyContent: 'center', paddingLeft: 15}}>
          <Text style={{fontSize: 12, color: '#929198',marginBottom: Platform.OS === "android"? -5 : 0}}>{label}</Text>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            autoComplete="off"
            placeholder={placeholder}
            style={{
              height: Platform.OS==="android"? 35: 25,
              fontSize: 14,
              fontFamily: 'PlusJakartaSans-SemiBold',
            }}
            secureTextEntry={isPassword && isShown ? true : false}
          />
        </View>
        {isPassword && (
          <TouchableOpacity
            onPress={prev => setIsShown(!isShown)}
            style={{
              height: '100%',
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}>
            {isShown ? (
              <Image
                style={{width: 20}}
                resizeMode="contain"
                source={showIcon}
              />
            ) : (
              <Image
                style={{width: 20}}
                resizeMode="contain"
                source={hideIcon}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
      {isError && (
        <Text style={{color: '#FE1240', marginRight: 10}}>{isError}</Text>
      )}
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  inputContainer: {
    width: '90%',
    height:72,
    marginVertical: 6,
    alignItems: 'flex-end',
  },
  boxContainer: {
    width: '100%',
    height: '80%',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderWidth: 0.3,
    borderColor: '#929198',
    marginBottom: 5,
  },
});
