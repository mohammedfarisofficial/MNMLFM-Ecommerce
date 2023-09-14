import {View, StyleSheet, FlatList, Dimensions, Animated} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';
import LargeButton from '../components/Buttons/LargeButton';
import OnBoardCard from '../components/OnBoardCard';

type Props = NativeStackScreenProps<RootStackParams, 'Welcome'>;

export interface IBoard {
  id: string;
  t1: string;
  t2: string;
  desc: string;
  imageURL: string;
}

const BOARDS: IBoard[] = [
  {
    id: '1',
    t1: 'Your Appearance',
    t2: 'Shows Your Quality',
    desc: 'Change the Quality of Your Appearance with MNMLFM Now!',
    imageURL:
      'https://images.unsplash.com/photo-1588117260148-b47818741c74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  },
  {
    id: '2',
    t1: 'Elevate Your Style',
    t2: 'Discover Essentials!',
    desc: "Upgrade your style with MNMLFM's curated fashion collection.",
    imageURL:
      'https://images.unsplash.com/photo-1566070143588-2f788cb17d6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  },
  {
    id: '3',
    t1: 'Unleash Your Elegance',
    t2: 'Shop Accessories!',
    desc: "Discover elegance in MNMLFM's exquisite accessories.",
    imageURL:
      'https://images.unsplash.com/photo-1495994458560-6f9d0636cc8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=754&q=80',
  },
];

const {width} = Dimensions.get('window');

const Welcome = ({navigation}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const sliderRef = useRef(null);

  const viewableItemsChanged = useRef(({viewableItems}: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  return (
    <View style={styles.rootContainer}>
      <FlatList
        style={{backgroundColor: 'white'}}
        data={BOARDS}
        renderItem={({item, index}) => <OnBoardCard {...item} index={index} />}
        pagingEnabled
        horizontal
        keyExtractor={(item: IBoard) => item.id}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        ref={sliderRef}
        bounces={false}
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
      />
      <View style={styles.navigationContainer}>
        <View style={{flexDirection: 'row'}}>
          {BOARDS?.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              index * 1 * width,
            ];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [10, 20, 10],
              extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={index}
                style={[
                  {
                    width: dotWidth,
                    opacity,
                    height: 6,
                    backgroundColor: 'orange',
                    borderRadius: 20,
                    marginBottom: 20,
                    marginHorizontal: 3,
                  },
                ]}
              />
            );
          })}
        </View>

        <LargeButton
          name="Sign Up with Email"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  navigationContainer: {
    width: '100%',
    height: '20%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 25,
  },
});
