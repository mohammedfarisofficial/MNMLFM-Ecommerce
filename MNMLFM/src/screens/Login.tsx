import {
  StyleSheet,
  SafeAreaView,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import InputBox from '../components/InputBox';
import FormContainer from '../components/FormContainer';
import MediumButton from '../components/Buttons/MediumButton';
import DividerWithText from '../components/DividerWithText';
import {
  appleIcon,
  emailIcon,
  googleIcon,
  passwordIcon,
} from '../contants/icons';
import SocialLoginButton from '../components/Buttons/SocialLoginButton';
import {LogoBlack} from '../contants/logo';
import {RootStackParams} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {z} from 'zod';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {loginSchema} from '../schema/loginSchema';

import axios from 'axios';
import {useDispatch} from 'react-redux';
import {setLogin} from '../state/reducers/authSlice';

import {BASE_URL} from '@env';
import {useState} from 'react';
import Loading from '../components/Loading';

const {width} = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParams, 'Login'>;
type FormData = z.infer<typeof loginSchema>;

const Login = ({navigation}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {control, handleSubmit} = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });
  const dispatch = useDispatch();
  console.log(BASE_URL);

  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    //handle submit
    axios
      .post(`${BASE_URL}/api/auth/login`, {
        email: data.email,
        password: data.password,
      })
      .then(response => {
        const {token, user} = response.data;
        if (!user.verified) {
          Alert.alert('User not verified!', 'Try to register again');
          return;
        }
        dispatch(setLogin({token, user}));
        navigation.navigate('BottomTabNavigation');
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <SafeAreaView style={styles.rootContainer}>
      {/* logo section  */}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <View style={styles.logoContainer}>
            <Image
              resizeMode="contain"
              source={LogoBlack}
              style={{width: 110}}
            />
          </View>
          <View style={{width: '100%', paddingHorizontal: 30}}>
            <Text
              style={{
                fontSize: 25,
                fontFamily: 'PlusJakartaSans-Bold',
                maxWidth: '70%',
              }}>
              Go ahead and set up your account
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'PlusJakartaSans-Medium',
                marginVertical: 10,
                color: 'grey',
              }}>
              Sign-in to enjoy shopping!
            </Text>
          </View>
          {/* form section  */}
          <FormContainer>
            <Controller
              control={control}
              render={({field, fieldState}) => (
                <InputBox
                  label="Email Address"
                  placeholder="example@email.com"
                  icon={emailIcon}
                  onChangeText={field.onChange}
                  value={field.value}
                  isError={fieldState?.error?.message}
                />
              )}
              name="email"
            />
            <Controller
              control={control}
              render={({field, fieldState}) => (
                <InputBox
                  label="Password"
                  placeholder="password"
                  icon={passwordIcon}
                  onChangeText={field.onChange}
                  value={field.value}
                  isError={fieldState?.error?.message}
                  isPassword
                />
              )}
              name="password"
            />
          </FormContainer>
          {/* forgot password  */}
          <TouchableOpacity
            onPress={() => {}}
            style={{
              width: '100%',
              alignItems: 'flex-end',
              paddingRight: 40,
              marginBottom: 10,
            }}>
            <Text>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={{
              width: '100%',
              alignItems: 'flex-end',
              paddingRight: 40,
              marginBottom: 10,
            }}>
            <Text>
              Don't have an account?
              <Text style={{fontWeight: 600}}> Sign Up</Text>
            </Text>
          </TouchableOpacity>

          <MediumButton name="Sign In" onPress={handleSubmit(onSubmit)} />
          <DividerWithText text="or" />
          <SocialLoginButton icon={googleIcon} text="Google" />
          <SocialLoginButton icon={appleIcon} text="Apple" />
        </>
      )}
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
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
  error: {
    color: 'red',
  },
});
