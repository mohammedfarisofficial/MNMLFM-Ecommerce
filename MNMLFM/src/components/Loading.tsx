import React, {useRef, useEffect} from 'react';
import {Animated, Easing, Image} from 'react-native';
import {LogoBlack} from '../contants/logo';

const Loading = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(scaleValue, {
              toValue: 0.95,
              duration: 1000,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
            Animated.timing(scaleValue, {
              toValue: 1,
              duration: 1000,
              easing: Easing.linear,
              useNativeDriver: false,
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
