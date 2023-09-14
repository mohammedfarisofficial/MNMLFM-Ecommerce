import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {cartIcon, clearIcon, searchIcon} from '../contants/icons';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import SearchItem from './SearchItem';
import {productItem} from '../screens/Home';

const relatedProducts = [
  {
    id: 1,
    name: "Men's Performance Pants",
    imageUrls: [
      'https://backoffice.kuhl.com//media/versions/pdp/5120_ms_renegade_pant_khaki_back__category_section_item.jpg',
      'https://backoffice.kuhl.com//media/versions/pdp/5232_kk_s3_-14_v3_category_section_item.jpg',
    ],
    desc: 'A modern look plus the hardworking details you need from climbing to the conference room, our Stretch Zion Slim Pant II has your back. Made with ReZion™, the more Earth-friendly evolution of our bestselling performance fabric, you can adventure confidently knowing there are over two decades of tried and trusted durability backing you up.A modern look plus the hardworking details you need from climbing to the conference room, our Stretch Zion Slim Pant II has your back. Made with ReZion™, the more Earth-friendly evolution of our bestselling performance fabric, you can adventure confidently knowing there are over two decades of tried and trusted durability backing you up.A modern look plus the hardworking details you need from climbing to the conference room, our Stretch Zion Slim Pant II has your back. Made with ReZion™, the more Earth-friendly evolution of our bestselling performance fabric, you can adventure confidently knowing there are over two decades of tried and trusted durability backing you up.',
    qty: 210,
    category: '64de31055d8f21178d7bf39c',
    isTop: true,
    colors: ['64d0af3c58324585e0e3df36', '64d0af3c58324585e0e3df36'],
    sizes: ['64d0b0b1523650dfd1df8e2f', '64d0b0b1523650dfd1df8e2f'],
    price: 404.0,
  },
  {
    id: 2,
    name: "Men's Performance Pants",
    imageUrls: [
      'https://backoffice.kuhl.com//media/versions/pdp/5120_ms_renegade_pant_khaki_back__category_section_item.jpg',
      'https://backoffice.kuhl.com//media/versions/pdp/5232_kk_s3_-14_v3_category_section_item.jpg',
    ],
    desc: 'A modern look plus the hardworking details you need from climbing to the conference room, our Stretch Zion Slim Pant II has your back. Made with ReZion™, the more Earth-friendly evolution of our bestselling performance fabric, you can adventure confidently knowing there are over two decades of tried and trusted durability backing you up.A modern look plus the hardworking details you need from climbing to the conference room, our Stretch Zion Slim Pant II has your back. Made with ReZion™, the more Earth-friendly evolution of our bestselling performance fabric, you can adventure confidently knowing there are over two decades of tried and trusted durability backing you up.A modern look plus the hardworking details you need from climbing to the conference room, our Stretch Zion Slim Pant II has your back. Made with ReZion™, the more Earth-friendly evolution of our bestselling performance fabric, you can adventure confidently knowing there are over two decades of tried and trusted durability backing you up.',
    qty: 210,
    category: '64de31055d8f21178d7bf39c',
    isTop: true,
    colors: ['64d0af3c58324585e0e3df36', '64d0af3c58324585e0e3df36'],
    sizes: ['64d0b0b1523650dfd1df8e2f', '64d0b0b1523650dfd1df8e2f'],
    price: 404.0,
  },
  {
    id: 3,
    name: "Men's Performance Pants",
    imageUrls: [
      'https://backoffice.kuhl.com//media/versions/pdp/5120_ms_renegade_pant_khaki_back__category_section_item.jpg',
      'https://backoffice.kuhl.com//media/versions/pdp/5232_kk_s3_-14_v3_category_section_item.jpg',
    ],
    desc: 'A modern look plus the hardworking details you need from climbing to the conference room, our Stretch Zion Slim Pant II has your back. Made with ReZion™, the more Earth-friendly evolution of our bestselling performance fabric, you can adventure confidently knowing there are over two decades of tried and trusted durability backing you up.A modern look plus the hardworking details you need from climbing to the conference room, our Stretch Zion Slim Pant II has your back. Made with ReZion™, the more Earth-friendly evolution of our bestselling performance fabric, you can adventure confidently knowing there are over two decades of tried and trusted durability backing you up.A modern look plus the hardworking details you need from climbing to the conference room, our Stretch Zion Slim Pant II has your back. Made with ReZion™, the more Earth-friendly evolution of our bestselling performance fabric, you can adventure confidently knowing there are over two decades of tried and trusted durability backing you up.',
    qty: 210,
    category: '64de31055d8f21178d7bf39c',
    isTop: true,
    colors: ['64d0af3c58324585e0e3df36', '64d0af3c58324585e0e3df36'],
    sizes: ['64d0b0b1523650dfd1df8e2f', '64d0b0b1523650dfd1df8e2f'],
    price: 404.0,
  },
];

const {width} = Dimensions.get('window');
interface Props {
  rightAction: () => void;
  rightActionIcon?: any;
  isCart?: boolean;
  isActive?: boolean;
  label: string;
  setSearchQuery?: any;
  searchQuery?: string;
}
const HeaderWithSearch = ({
  rightAction,
  isActive,
  rightActionIcon,
  isCart,
  label,
  searchQuery,
  setSearchQuery,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const {user} = useSelector(state => state.auth);
  const {products} = useSelector(state => state.product);
  const navigation = useNavigation();
  const inputRef = useRef(null);
  const [searchItems, setSearchItems] = useState([]);

  useEffect(() => {
    if (searchQuery === '') {
      setSearchItems([]);
    } else {
      const searchItemsList = products?.filter((product: productItem) => {
        return product.name?.toLowerCase().includes(searchQuery);
      });
      console.log(searchItemsList);
      setSearchItems(searchItemsList);
    }
  }, [searchQuery]);
  return (
    <View style={{position: 'relative', zIndex: 99}}>
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            autoFocus={false}
            style={{width: '90%', paddingLeft: 20}}
            placeholder={label}
            onFocus={() => {
              if (searchQuery !== '') {
                setIsVisible(true);
              } else {
                setIsVisible(false);
              }
            }}
            onBlur={() => setIsVisible(false)}
            ref={inputRef}
            value={searchQuery}
            onChangeText={text => {
              setSearchQuery(text.toLowerCase());
              if (text === '') {
                setIsVisible(false);
              } else {
                setIsVisible(true);
              }
            }}
          />

          {searchQuery !== '' && (
            <TouchableOpacity
            onPress={()=>setSearchQuery("")}
              style={{
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={clearIcon}
                resizeMode="contain"
                style={{width: 20}}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.rightActionContainer}>
          {isCart ? (
            <TouchableOpacity
              onPress={rightAction}
              style={{
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
                backgroundColor: '#F1F1F1',
                position: 'relative',
              }}>
              <Image
                source={cartIcon}
                resizeMode="contain"
                style={{width: 20}}
              />
              {isActive && <View style={styles.notificationIndicator} />}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={rightAction}
              style={{
                width: 55,
                height: 55,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
                position: 'relative',
                overflow: 'hidden',
              }}>
              <Image
                source={{
                  uri: user?.imageUrl,
                }}
                resizeMode="cover"
                style={{width: '100%', height: '100%'}}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          width,
          position: 'absolute',
          top: 70,
          display: isVisible ? 'block' : 'none',
        }}>
        <ScrollView horizontal={true} style={{width: '100%'}}>
          <FlatList
            style={{backgroundColor: 'white'}}
            data={searchItems}
            renderItem={({item}) => (
              <SearchItem
                {...item}
                onPress={() => {
                  setSearchQuery('');
                  setIsVisible(false);
                  navigation.navigate('Product', {
                    productId: item._id,
                  });
                }}
              />
            )}
            keyExtractor={(item: productItem) => item._id}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default HeaderWithSearch;

const styles = StyleSheet.create({
  headerContainer: {
    width,
    height: 70,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    flex: 4,
    backgroundColor: '#F1F1F1',
    height: 50,
    borderRadius: 20,
    alignItems: 'center',
    paddingRight: 20,
  },
  rightActionContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  notificationIndicator: {
    width: 10,
    borderRadius: 50,
    height: 10,
    backgroundColor: 'red',
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
