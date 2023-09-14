import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {location} from '../contants/icons';

interface Props {
  defaultAddress: string;
  onPress: () => void;
  isAddress?: boolean;
  itemKey?: number;
  isCurrent?: boolean;
  onLongPress?: () => {};
}
const AddressCard = ({
  defaultAddress,
  onPress,
  isAddress,
  itemKey,
  isCurrent,
  onLongPress,
}: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.deliveryContainer,
        {
          borderWidth: isCurrent ? 1 : 0,
        },
      ]}
      onLongPress={onLongPress}
      onPress={onPress}
      key={itemKey}>
      {!isAddress && (
        <View>
          <Image
            resizeMode="contain"
            style={styles.lcnIcon}
            source={location}
          />
        </View>
      )}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: 30,
        }}>
        <Text
          style={{
            color: 'grey',
            fontFamily: 'PlusJakartaSans-Medium',
            fontSize: 13,
          }}>
          Delivering to
        </Text>
        <Text
          numberOfLines={1}
          style={{
            color: 'black',
            fontFamily: 'PlusJakartaSans-SemiBold',
            fontSize: 14,
            marginTop: 5,
          }}>
          {defaultAddress}
        </Text>
      </View>
      {/* <TouchableOpacity>
        <Text
          style={{
            color: '#2982F4',
            fontFamily: 'PlusJakartaSans-SemiBold',
            fontSize: 14,
            marginTop: 5,
          }}>
          Edit
        </Text>
      </TouchableOpacity> */}
    </TouchableOpacity>
  );
};

export default AddressCard;

const styles = StyleSheet.create({
  deliveryContainer: {
    width: '90%',
    height: 80,
    backgroundColor: '#F9F9FB',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  lcnIcon: {
    width: 20,
  },
});
