import { Text, TouchableOpacity} from 'react-native';
import React from 'react';

interface Props {
  productId: string;
  onPress: (productId: string) => void;
}

const Card: React.FC<Props> = ({productId, onPress}) => {
  return (
    <TouchableOpacity
      onPress={()=>onPress(productId)}
      style={{
        width: 200,
        height: 60,
        backgroundColor: 'green',
        marginVertical: 1,
      }}>
      <Text>Product: {productId}</Text>
    </TouchableOpacity>
  );
};

export default Card;
