import 'react-native-gesture-handler';
import React from 'react';
//redux toolkit
import {Provider} from 'react-redux';
import store from './src/state/store';
import persistStore from 'redux-persist/es/persistStore';
//navigation
import {NavigationContainer} from '@react-navigation/native';
//payment
import {StripeProvider} from '@stripe/stripe-react-native';
import {PersistGate} from 'redux-persist/integration/react';
import RootStackNavigation from './src/navigation/RootStackNavigation';

//persist storage
const persistor = persistStore(store);

function App(): JSX.Element {
  return (
    <StripeProvider publishableKey="pk_test_51NieQPSA1068KmYjGWKcNnGk3VTORCWW9Sb08mGVoLAf5dqkk4sOvRDBBE2LILCebghRp2salO0H2hQzYQAHWqVN00sLHCjWkR">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <RootStackNavigation />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </StripeProvider>
  );
}

export default App;
