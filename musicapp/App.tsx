/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import MainRouter from './src/routes';
import AuthProvider from './src/context';
import {ModalPortal} from 'react-native-modals';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Platform} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/stores';

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);
  return (
    <Provider store={store}>
      <AuthProvider>
        <MainRouter />
        <ModalPortal />
      </AuthProvider>
    </Provider>
  );
};

export default App;
