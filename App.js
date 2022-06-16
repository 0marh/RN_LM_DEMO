/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import APPRoutes from './src/routes';
import {AppQueryProvider} from './src/service/react-query';
import {PropertyProvider} from './src/context';

const App = () => {
  return (
    <AppQueryProvider>
      <SafeAreaProvider>
        <PropertyProvider>
          <APPRoutes />
        </PropertyProvider>
      </SafeAreaProvider>
    </AppQueryProvider>
  );
};

export default App;
