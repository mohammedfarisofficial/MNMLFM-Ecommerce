import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import LargeButton from '../components/Buttons/LargeButton';
import axios from 'axios';
import {BASE_URL} from '@env';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';

type Props = NativeStackScreenProps<RootStackParams, 'Verification'>;

const Verification = ({navigation, route}: Props) => {
  const {email, userId} = route.params.data;
  const [resendOtp, setResendOtp] = useState(false);
  const [otp, setOtp] = useState({first: '', second: '', third: '', forth: ''});

  const firstNumRef = useRef();
  const secondNumRef = useRef();
  const thirdNumRef = useRef();
  const forthNumRef = useRef();

  const submitOtpHandler = () => {
    //handle otp submit
    console.log(otp.first + otp.second + otp.third + otp.forth, email, userId);
    axios
      .post(`${BASE_URL}/api/auth/verifyOTP`, {
        userId,
        otp: otp.first + otp.second + otp.third + otp.forth,
      })
      .then(response => {
        const {status, message} = response.data;
        console.log(status, message);
        if (status === 'FAILED') {
          Alert.alert('Otp not same!');
          setResendOtp(true);
        }
        if (status === 'VERIFIED') {
          console.log('Verified', message);
          navigation.navigate('Login');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
  };
  const resendOtpHandler = () => {
    axios
      .post(`${BASE_URL}/api/auth/resendOTPVerificationCode`, {
        userId,
        email,
      })
      .then(response => {
        const {status, message} = response.data;
        console.log(status, message);
        if (status === 'FAILED') {
          Alert.alert('Otp not same!');
          setResendOtp(true);
        }
        if (status === 'VERIFIED') {
          console.log('Verified', message);
          navigation.navigate('Login');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <KeyboardAvoidingView
        style={styles.rootContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.otpContainer}>
          <View style={{ width: '100%'}}>
            <Text style={{fontSize: 25, fontFamily: 'PlusJakartaSans-Bold'}}>
              Verify
            </Text>
            <Text
              style={{
                fontFamily: 'PlusJakartaSans-Regular',
                marginVertical: 10,
              }}>
              Please verify the code sent to{' '}
              <Text style={{fontSize: 12, fontFamily: 'PlusJakartaSans-Bold'}}>
                {email}
              </Text>
            </Text>
          </View>
         <View style={{flexDirection: "row"}}>
         <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={firstNumRef}
              onChangeText={text => {
                setOtp({...otp, first: text});
                text && secondNumRef.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={secondNumRef}
              onChangeText={text => {
                setOtp({...otp, second: text});
                text
                  ? thirdNumRef.current.focus()
                  : firstNumRef.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={thirdNumRef}
              onChangeText={text => {
                setOtp({...otp, third: text});
                text
                  ? forthNumRef.current.focus()
                  : secondNumRef.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={forthNumRef}
              onChangeText={text => {
                setOtp({...otp, forth: text});
                !text && thirdNumRef.current.focus();
              }}
            />
          </View>
         </View>
        </View>
        {resendOtp && (
          <TouchableOpacity onPress={resendOtpHandler}>
            <Text
              style={{fontFamily: 'PlusJakartaSans-Regular', marginBottom: 20}}>
              Resent OTP to
              <Text style={{fontSize: 12, fontFamily: 'PlusJakartaSans-Bold'}}>
                {email}
              </Text>
            </Text>
          </TouchableOpacity>
        )}
        <LargeButton name="Verify OTP" onPress={submitOtpHandler} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Verification;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
  },
  otpBox: {
    borderRadius: 2,
    borderColor: 'black',
    borderWidth: 1,
    margin: 5,
  },
  otpText: {
    fontSize: 25,
    color: 'black',
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
});
