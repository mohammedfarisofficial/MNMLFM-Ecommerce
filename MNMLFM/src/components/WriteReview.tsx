import {Dimensions, Platform, StyleSheet, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import IconButton from './Buttons/IconButton';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {BASE_URL} from '@env';
import {setProducts} from '../state/reducers/productSlice';

const {width} = Dimensions.get('window');

interface Props {
  productId: string;
}
const WriteReview = ({productId}: Props) => {
  const {_id, name, imageUrl} = useSelector(state => state.auth.user);
  const [review, setReview] = useState<string>('');

  const dispatch = useDispatch();

  const submitReview = async () => {
    try {
      if (review.length >= 3) {
        const reviewForm = {
          text: review,
          userId: _id,
          userName: name,
          productId,
          imageUrl,
          star: 2.5,
        };
        const response = await axios.post(
          `${BASE_URL}/api/review/create`,
          reviewForm,
        );
        if (response.data) {
          if (response.data.status === 'SUCESS') {
            console.log(response.data.updatedProducts);
            dispatch(setProducts({products: response.data.updatedProducts}));
            setReview("")
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{width: width - 100}}>
        <View style={styles.inputContainer}>
          <View style={styles.boxContainer}>
            <View style={{flex: 1, justifyContent: 'center', paddingLeft: 15}}>
              <TextInput
                value={review}
                onChangeText={text => setReview(text)}
                autoComplete="off"
                placeholder="Write a review..."
                style={{
                  height: Platform.OS === 'android' ? 35 : 25,
                  fontSize: 14,
                  fontFamily: 'PlusJakartaSans-SemiBold',
                }}
              />
            </View>
          </View>
        </View>
      </View>
      <View>
        <IconButton name="hi" onPress={submitReview} />
      </View>
    </View>
  );
};

export default WriteReview;

const styles = StyleSheet.create({
  container: {
    width,
    height: 80,
    // backgroundColor: 'lightgreen',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    height: 70,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  boxContainer: {
    width: '100%',
    height: '80%',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderWidth: 0.3,
    borderColor: '#929198',
    // marginBottom: 5,
  },
});
