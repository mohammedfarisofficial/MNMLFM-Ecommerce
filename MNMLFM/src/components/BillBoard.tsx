import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {enterIcon} from '../contants/icons';
import {billBoardItems} from '../screens/Home';

type Props = billBoardItems & {
    onPress: ()=>void;
    onPress2: ()=> void
}

const BillBoard = ({
  headText1,
  headText2,
  discount,
  imageURL,
  imageURL2,
  onPress,
  onPress2
}: Props) => {
  return (
    <View style={styles.billBoardContainer}>
      <View style={styles.primaryContainer}>
        <View style={styles.primaryBillContianer}>
          <ImageBackground
            style={{width: '100%', height: '100%', justifyContent: 'center'}}
            source={{
              uri: imageURL,
            }}>
            <View style={{paddingLeft: 20}}>
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: 'PlusJakartaSans-Bold',
                  color: 'white',
                }}>
                {headText1}
              </Text>
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: 'PlusJakartaSans-Bold',
                  color: 'white',
                }}>
                {headText2}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'PlusJakartaSans-Bold',
                  color: 'white',
                }}>
                up to{' '}
                <Text
                  style={{
                    fontSize: 30,
                    fontFamily: 'PlusJakartaSans-ExtraBold',
                    color: 'white',
                  }}>
                  {discount}%
                </Text>
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <TouchableOpacity style={styles.button} onPress={onPress}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'PlusJakartaSans-SemiBold',
                      color: 'black',
                    }}>
                    Explore Now
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: 'PlusJakartaSans-Regular',
                    color: 'lightgrey',
                  }}>
                  *Terms & conditions
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
      <View style={styles.secondaryContainer}>
        <TouchableOpacity
        onPress={onPress2}
          style={styles.secondaryBillContianer}
          activeOpacity={0.5}>
          <ImageBackground
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            source={{
              uri:imageURL2
            }}>
            <View
              style={{
                width: 45,
                height: 45,
                backgroundColor: 'white',
                borderRadius: 50,
                opacity: 0.8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                resizeMode="contain"
                style={{width: 20}}
                source={enterIcon}
              />
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BillBoard;

const styles = StyleSheet.create({
  billBoardContainer: {
    height: 230,
    // backgroundColor: 'red',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  primaryContainer: {
    flex: 2.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBillContianer: {
    width: '95%',
    height: '95%',
    backgroundColor: 'black',
    borderRadius: 30,
    overflow: 'hidden',
  },
  secondaryBillContianer: {
    width: '95%',
    height: '95%',
    backgroundColor: 'black',
    overflow: 'hidden',
    borderRadius: 30,
  },
  button: {
    height: 30,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});
