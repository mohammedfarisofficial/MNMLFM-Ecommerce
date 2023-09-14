import {
  Button,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import {backBtn} from '../contants/icons';
import {useDispatch, useSelector} from 'react-redux';
import {setOrders} from '../state/reducers/orderSlice';
import {BASE_URL} from '@env';
import axios from 'axios';
import OrderItem from '../components/OrderItem';
import Loading from '../components/Loading';

const {width, height} = Dimensions.get('window');

const Orders = ({navigation}) => {
  const {_id: userId} = useSelector(state => state.auth.user);
  const {orders} = useSelector(state => state.order);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/order/user-orders/${userId}`,
        );
        dispatch(setOrders(response.data));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <Header
        leftIcon={backBtn}
        text="My Orders"
        leftAction={() => navigation.goBack()}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
        showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.itemsContainer}
          data={orders}
          renderItem={({item}) => <OrderItem {...item} />}
          keyExtractor={item => item._id}
        />
      )}
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
  },
  itemsContainer: {
    paddingBottom: height * 0.2,
  },
});
