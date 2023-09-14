import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('window');

const ReviewItem = ({_id, userName, text, imageUrl}) => {
  return (
    <TouchableOpacity style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
          source={{
            uri: imageUrl,
          }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={{fontFamily: 'PlusJakartaSans-Medium', fontSize: 14}}>
          {userName}
        </Text>
        <Text
          style={{
            fontFamily: 'PlusJakartaSans-Regular',
            fontSize: 13,
            marginTop: 5,
            color: '#919FB7',
          }}
          numberOfLines={2}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ReviewItem;

const styles = StyleSheet.create({
  rootContainer: {
    width,
    height: 70,
    // backgroundColor: 'lightblue',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 5,
    alignItems:'center'
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
  },
  textContainer: {
    // backgroundColor: 'lightgreen',
    width: '80%',
    height: '100%',
    paddingHorizontal: 10,
    paddingTop: 5,
  },
});
