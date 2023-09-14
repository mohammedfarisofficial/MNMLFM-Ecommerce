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
  addIcon,
  addWhiteIcon,
  appleIcon,
  emailIcon,
  googleIcon,
  passwordIcon,
  user,
} from '../contants/icons';
import SocialLoginButton from '../components/Buttons/SocialLoginButton';
import {LogoBlack} from '../contants/logo';
import {RootStackParams} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {z} from 'zod';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {registerSchema} from '../schema/registerSchema';

import axios from 'axios';
import {useDispatch} from 'react-redux';
import {setLogin} from '../state/reducers/authSlice';

import {BASE_URL} from '@env';
import {useState} from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import Loading from '../components/Loading';
import {uploadImage} from '../utils/uploadImage';

const {width} = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParams, 'Register'>;
type FormData = z.infer<typeof registerSchema>;

const Register = ({navigation}: Props) => {
  const [imageUrl, setImageUrl] = useState<string>(
    'https://www.shutterstock.com/image-vector/male-default-avatar-profile-gray-250nw-362901365.jpg',
  );
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const {control, handleSubmit, reset} = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });
  const dispatch = useDispatch();
  const onSubmit = (data: FormData) => {
    if (isImageLoading) {
      Alert.alert('Please wait!', 'to complate image upload');
      return;
    }
    //handle submit
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/api/auth/register`, {
        email: data.email,
        password: data.password,
        name: data.name,
        imageUrl: uploadedImageUrl,
      })
      .then(response => {
        const {status, data} = response.data;
        if (status === 'PENDING') {
          setIsLoading(false);
          navigation.navigate('Verification', {data});
          reset();
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const uploadProfile = async () => {
    setIsImageLoading(true);
    try {
      const image = await ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      setImageUrl(image.path);
      const imageUploadResponse = await uploadImage(image.path);
      if (imageUploadResponse.status === 'SUCESS') {
        setUploadedImageUrl(imageUploadResponse.imageUrl);
      }
      if (imageUploadResponse.status === 'FAILED') {
        Alert.alert('Someting went wrong in Image Upload');
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsImageLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.rootContainer}>
      {/* text details  */}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <View style={{width: '100%', paddingHorizontal: 30}}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'PlusJakartaSans-Medium',
                marginVertical: 25,
                color: 'darkgrey',
              }}>
              <Text style={styles.boldText}>Register</Text> to Shop with{' '}
              <Text style={styles.boldText}>MNMLFM</Text>! Discover a world of
              shopping delights now.
            </Text>
          </View>
          <TouchableOpacity
            onPress={uploadProfile}
            style={styles.uploadProfile}>
            <Image
              style={{width: '100%', height: '100%', borderRadius: 50}}
              resizeMode="cover"
              source={{uri: imageUrl}}
            />
            <View style={styles.imageButton}>
              <Image
                style={{width: 15, borderRadius: 50}}
                resizeMode="contain"
                source={addWhiteIcon}
              />
            </View>
          </TouchableOpacity>
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
                  label="Name"
                  placeholder="John Wick"
                  icon={user}
                  onChangeText={field.onChange}
                  value={field.value}
                  isError={fieldState?.error?.message}
                />
              )}
              name="name"
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
            onPress={() => navigation.navigate('Login')}
            style={{
              width: '100%',
              alignItems: 'flex-end',
              paddingRight: 40,
              marginBottom: 10,
            }}>
            <Text>
              Already have an account?
              <Text style={{fontWeight: 600}}> Sign In</Text>
            </Text>
          </TouchableOpacity>

          <MediumButton name="Sign Up" onPress={handleSubmit(onSubmit)} />
          <DividerWithText text="or" />
          <SocialLoginButton icon={googleIcon} text="Google" />
          <SocialLoginButton icon={appleIcon} text="Apple" />
        </>
      )}
    </SafeAreaView>
  );
};

export default Register;

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
  },
  error: {
    color: 'red',
  },
  uploadProfile: {
    position: 'relative',
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor:"grey",
    borderRadius: 50,
    // overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButton: {
    position: 'absolute',
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: 'black',
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
  boldText: {
    fontFamily: 'PlusJakartaSans-Bold',
    color: 'black',
    fontSize: 15,
  },
});
