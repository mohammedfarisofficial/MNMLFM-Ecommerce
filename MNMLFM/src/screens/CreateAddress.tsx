import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import {backBtn} from '../contants/icons';
import InputBox from '../components/InputBox';
import {useDispatch, useSelector} from 'react-redux';
import LargeButton from '../components/Buttons/LargeButton';
import {addAddress} from '../state/reducers/addressSlice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { CartStackParams } from '../navigation/CartStackNavigation';

type Props = NativeStackScreenProps<CartStackParams,"CreateAddress">

const CreateAddress = ({navigation,route}:Props) => {
  const {name: defaultName} = useSelector(state => state.auth.user);
  const [name, setName] = useState(defaultName);
  const [phone, setPhone] = useState();
  const [state, setState] = useState('Kerala');
  const [zipcode, setZipcode] = useState();
  const [district, setDistrict] = useState();
  const [address, setAddress] = useState();
  console.log(route.params)

  const dispatch = useDispatch();

  const addAddressHandler = () => {
    const newOrder = {
      name,
      phone,
      state,
      zipcode,
      address,
      district,
      date: Date.now(),
    };
    dispatch(addAddress(newOrder));
    navigation.goBack()
  };
  return (
    <SafeAreaView style={styles.rootContainer}>
      <Header
        leftIcon={backBtn}
        text="Select Address"
        leftAction={() => navigation.goBack()}
      />
      <InputBox
        label="Full Name"
        placeholder="John Wick"
        onChangeText={setName}
        value={name}
      />
      <InputBox
        label="Phone"
        placeholder="+91 987654321"
        onChangeText={setPhone}
        value={phone}
      />
      <InputBox
        label="State"
        placeholder="Kerala"
        onChangeText={setState}
        value={state}
      />
      <InputBox
        label="Zipcode"
        placeholder="679601"
        onChangeText={setZipcode}
        value={zipcode}
      />
      <InputBox
        label="District"
        placeholder="Palakkad"
        onChangeText={setDistrict}
        value={district}
      />
      <InputBox
        label="Address"
        placeholder="Flat No / Your Area"
        onChangeText={setAddress}
        value={address}
      />
      <LargeButton name="Save Address" onPress={addAddressHandler} />
    </SafeAreaView>
  );
};

export default CreateAddress;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
