import {ReactNode} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

const {width} = Dimensions.get('window');
type Props = {
  children: ReactNode;
};

const FormContainer = ({children}: Props) => {
  return <View style={styles.formContainer}>{children}</View>;
};

export default FormContainer;

const styles = StyleSheet.create({
  formContainer: {
    width: width - 20,
    alignItems: 'center',
    marginVertical: 20,
  },
});
