import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import UserItem from '../components/UserItem';
import SmallButton from '../components/Buttons/SmallButton';
import {LogoBlack} from '../contants/logo';
import {orderIcon, signOutIcon, heartSolidIcon} from '../contants/icons';
import {useDispatch, useSelector} from 'react-redux';
import {setLogout} from '../state/reducers/authSlice';


const {width} = Dimensions.get('window');

const User = ({navigation}) => {
  const { user} = useSelector(state=>state.auth)
  const dispatch = useDispatch();


  const logOutHandler = () => {
    dispatch(setLogout);
    navigation.navigate('Login');
  };

  console.log(user?.imageUrl)

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.logoContainer}>
        <Image resizeMode="contain" source={LogoBlack} style={{width: 110}} />
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={{width: '100%', height: '100%', borderRadius: 50}}
            resizeMode="cover"
            source={{
              uri: user?.imageUrl
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            marginTop: 10,
            fontWeight: '500',
            color: '#000',
            marginBottom: 10,
            fontFamily: 'PlusJakartaSans-Bold',
          }}>
          {user?.name}
        </Text>
        <SmallButton name="Edit Profile" onPress={()=>{}} />
      </View>
      <UserItem
        icon={orderIcon}
        onPress={() => navigation.navigate('Orders')}
        label="View Orders"
      />
      <UserItem
        icon={heartSolidIcon}
        onPress={() => navigation.navigate('Wishlist')}
        label="Wishlist"
      />
      <UserItem icon={orderIcon} label="Account" />
      <UserItem icon={signOutIcon} onPress={logOutHandler} label="Sign Out" />
    </SafeAreaView>
  );
};

export default User;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  titleContainer: {
    width,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    color: '#000',
    fontWeight: '500',
  },
  profileContainer: {
    width,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 50,
    overflow: 'hidden',
  },
  logoContainer: {
    width,
    height: 70,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
});

('Upload preset must be specified when using unsigned upload');
