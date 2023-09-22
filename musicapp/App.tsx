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

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);
  return (
    <AuthProvider>
      <MainRouter />
      <ModalPortal />
    </AuthProvider>
  );
};

export default App;
