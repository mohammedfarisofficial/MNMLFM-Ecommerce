import React, {useRef, useEffect} from 'react';
import {View, Animated, Easing, Text, Image} from 'react-native';
import {LogoBlack} from '../contants/logo';

const Loading = () => {
  const opacityValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(scaleValue, {
              toValue: 0.95, // Scale up factor, adjust as needed
              duration: 1000, // Adjust the duration as needed
              easing: Easing.linear,
              useNativeDriver: false, // You can set this to true if possible
            }),
            Animated.timing(scaleValue, {
              toValue: 1, // Back to original scale
              duration: 1000, // Adjust the duration as needed
              easing: Easing.linear,
              useNativeDriver: false, // You can set this to true if possible
            }),
          ]),
        ]),
      ).start();
    };

    startAnimation();
  }, []);

  return (
    <Animated.View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{scale: scaleValue}],
        zIndex: 99,
      }}>
      <Image style={{width: 100}} resizeMode="contain" source={LogoBlack} />
    </Animated.View>
  );
};

export default Loading;
