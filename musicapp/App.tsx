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

const App = () => {
  return (
    <AuthProvider>
      <MainRouter />
      <ModalPortal />
    </AuthProvider>
  );
};

export default App;
