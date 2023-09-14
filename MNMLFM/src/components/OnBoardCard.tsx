import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const {width,height} = Dimensions.get('window');

const OnBoardCard = ({ id,t1,t2,desc,imageURL}: any) => {
  return (
    <View key={id}>
      <View style={styles.imageContainer}>
        <ImageBackground
          resizeMode="cover"
          style={{width: '100%', height: '100%'}}
          source={{
            uri: imageURL
          }}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0)', '#ffffff']}
            style={styles.gradientStyle}
            start={{x: 1, y: 0}}
            end={{x: 1, y: 1}}
            locations={[0.6, 1]}
          />
        </ImageBackground>
      </View>
      <View style={styles.textContainer}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              fontFamily: 'PlusJakartaSans-Bold',
              color: 'black',
            }}>
            {t1}
          </Text>
          <Text
            style={{
              fontSize: 29,
              fontFamily: 'PlusJakartaSans-Medium',
              color: 'black',
            }}>
            {t2}
          </Text>
          <Text style={styles.subTitle}>
            {desc}
          </Text>
        </View> 
      </View>
    </View>
  );
};

export default OnBoardCard;

const styles = StyleSheet.create({
  imageContainer: {
    width,
    height:'70%',
  },
  gradientStyle: {
    width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  subTitle: {
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-Regular',
    maxWidth: '60%',
    marginTop: 20,
    color: '#838687',
  },
});
