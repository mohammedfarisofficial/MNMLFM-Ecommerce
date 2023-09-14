import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

interface Props {
  text: string;
}
const {width} = Dimensions.get('window');

const DividerWithText = ({text}: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
        width,
        paddingHorizontal: 30,
      }}>
      <View style={styles.line} />
      <Text style={{marginHorizontal: 5, color: '#929198'}}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
};

export default DividerWithText;

const styles = StyleSheet.create({
  line: {
    flex: 1,
    height: 0.6,
    backgroundColor: 'lightgrey',
  },
});
