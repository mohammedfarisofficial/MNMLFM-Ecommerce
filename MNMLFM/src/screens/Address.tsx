import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import {addIcon, backBtn} from '../contants/icons';
import AddressCard from '../components/AddressCard';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrent} from '../state/reducers/addressSlice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CartStackParams} from '../navigation/CartStackNavigation';

type Props = NativeStackScreenProps<CartStackParams, 'Address'>;
const Address = ({navigation}: Props) => {
  const {addressList} = useSelector(state => state.address);
  const {currentAddress} = useSelector(state => state.address);

  const dispatch = useDispatch();
  const setCurrentHandler = item => {
    console.log(item);
    dispatch(setCurrent(item));
  };
  return (
    <SafeAreaView style={styles.rootContainer}>
      <Header
        leftIcon={backBtn}
        text="Select Address"
        leftAction={() => navigation.goBack()}
        RightIcon={addIcon}
        rightAction={() => navigation.navigate('CreateAddress')}
      />
      {addressList ? (
        <>
          {addressList?.map((item, index: number) => {
            if (item === currentAddress) {
              return (
                <AddressCard
                  key={index}
                  itemKey={index * Math.random()}
                  isAddress
                  isCurrent
                  onLongPress={() =>
                    navigation.navigate('CreateAddress', {item})
                  }
                  onPress={() => setCurrentHandler(item)}
                  defaultAddress={`${item?.name}, ${item?.district}, ${item?.zipcode}, ${item?.state}`}
                />
              );
            } else
              return (
                <AddressCard
                  key={index}
                  itemKey={index * Math.random()}
                  isAddress
                  onLongPress={() =>
                    navigation.navigate('CreateAddress', {item})
                  }
                  onPress={() => setCurrentHandler(item)}
                  defaultAddress={`${item?.name}, ${item?.district}, ${item?.zipcode}, ${item?.state}`}
                />
              );
          })}
          <Text style={{fontSize: 12, color: 'grey'}}>
            {addressList?.length === 0
              ? 'Click + to add address'
              : 'Long press to edit the address'}
          </Text>
        </>
      ) : (
        <Text>No address added yet! </Text>
      )}
    </SafeAreaView>
  );
};

export default Address;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
});
