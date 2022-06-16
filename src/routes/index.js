import React, {useRef} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import NavigatorService from '../utils/navigator';
import appRouteItems from './appRouteItems';

/**
 * Simple app theme, that will provide app wide styling.
 *
 * TODO: Move this to a separate file for easier extension.
 */
const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(247,241,233)',
  },
};

const RootStack = createStackNavigator();
const StackContainer = createStackNavigator();

/**
 * Entry Point to all Navigation Routes in the App.
 * Contains the main Application Navigation screens.
 * - `BottomTabs` that provides the base bottom navigation for the entire app.
 */
const Routes = () => {
  const navigationRef = useRef();
  const routeNameRef = useRef();

  const handleRef = navigatorRef => {
    NavigatorService.setContainer(navigatorRef);
    navigationRef.current = navigatorRef;
  };

  const handleOnReady = () => {
    routeNameRef.current = navigationRef.current.getCurrentRoute().name;
  };

  const handleOnStateChange = async () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current.getCurrentRoute().name;

    if (previousRouteName !== currentRouteName) {
      routeNameRef.current = currentRouteName;
    }
  };

  return (
    <NavigationContainer
      theme={Theme}
      ref={handleRef}
      onReady={handleOnReady}
      onStateChange={handleOnStateChange}>
      <RootStack.Navigator
        presentation="modal"
        screenOptions={{headerMode: 'screen'}}
        initialRouteName={appRouteItems[0].name}>
        {appRouteItems.map(({name, component, options}) => (
          <StackContainer.Screen
            key={name}
            name={name}
            component={component}
            options={options || {headerShown: false}}
          />
        ))}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
