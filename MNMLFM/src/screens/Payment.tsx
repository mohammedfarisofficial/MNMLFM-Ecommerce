import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '@env';
import LargeButton from '../components/Buttons/LargeButton';
import {CardField, confirmPayment} from '@stripe/stripe-react-native';
import {backBtn} from '../contants/icons';
import Header from '../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {createOrder} from '../state/reducers/orderSlice';
import {clearCart} from '../state/reducers/cartSlice';
import Loading from '../components/Loading';

const Payment = ({navigation, route}) => {
  const {amount} = route.params;
  const {cart} = useSelector(state => state.cart);
  const {user,token} = useSelector(state => state.auth);
  const {currentAddress} = useSelector(state => state.address);
  const [cardInfo, setCardInfo] = useState(null);
  const [error, setError] = useState<any>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const fetchCardDetail = cardDetail => {
    if (cardDetail.complete) {
      setCardInfo(cardDetail);
    } else {
      setCardInfo(null);
    }
  };

  const placeOrder = () => {
    const orders = cart?.map(product => {
      return {
        userId: user._id,
        isPaid: true,
        name: user.name,
        phone: Number(currentAddress.phone),
        state: currentAddress.state,
        zipcode: currentAddress.zipcode,
        district: currentAddress.district,
        productId: product.productId,
        productName: product.name,
        productSize: product.size,
        productColor: product.color,
        qty: Number(product.qty),
      };
    });
    dispatch(createOrder({orders}));
  };

  const payHandler = async () => {
    setError('');
    if (cardInfo) {
      setIsLoading(true);
      let apiData = {
        amount,
        currency: 'INR',
      };

      try {
        const creatPaymentIntent = data => {
          return new Promise((resolve, reject) => {
            axios
              .post(`${BASE_URL}/api/payment/test-payments`, data)
              .then(function (res) {
                resolve(res);
              })
              .catch(function (error) {
                reject(error);
              });
          });
        };
        const res = await creatPaymentIntent(apiData);
        console.log('payment intent create succesfully...!!!', res);

        if (res?.data?.paymentIntent) {
          let confirmPaymentIntent = await confirmPayment(
            res?.data?.paymentIntent,
            {paymentMethodType: 'Card'},
          );
          console.log('confirmPaymentIntent res++++', confirmPaymentIntent);
          if (confirmPaymentIntent.error) {
            console.log('Payment failed:', confirmPaymentIntent.error.message);
            setError('Please try another card.');
          } else {
            Alert.alert('Payment successful');
            placeOrder();
            dispatch(clearCart());
            navigation.goBack();
          }
        }
      } catch (error) {
        console.log('Error rasied during payment intent', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      4242;
      setError('Please enter card details');
    }
  };
  return (
    <SafeAreaView style={styles.rootContainer}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header
            leftIcon={backBtn}
            text="Payment"
            leftAction={() => navigation.goBack()}
          />
          <Text
            style={{
              alignSelf: 'flex-start',
              marginLeft: 25,
              fontSize: 15,
              fontFamily: 'PlusJakartaSans-Medium',
            }}>
            Enter Card Details
          </Text>
          <CardField
            autofocus
            postalCodeEnabled={false}
            placeholders={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={styles.cardStyle}
            style={{
              width: '90%',
              height: 60,
              marginTop: 10,
              marginBottom: 12,
            }}
            onCardChange={cardDetails => {
              fetchCardDetail(cardDetails);
            }}
          />
          {error && (
            <Text
              style={{
                color: 'red',
                alignSelf: 'flex-start',
                marginLeft: 25,
                marginBottom: 30,
              }}>
              {error}
            </Text>
          )}
          <LargeButton name={`Pay Now $ ${amount}`} onPress={payHandler} />
        </>
      )}
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  cardStyle: {
    textColor: '#000',
    fontSize: 14,
    borderWidth: 2,
    borderColor: 'blue',
  },
});
