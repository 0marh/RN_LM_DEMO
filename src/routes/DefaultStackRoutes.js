import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {DefaultScreen} from '../containers';

const defaultRouteItems = [
  {
    name: 'DefaultScreen',
    component: DefaultScreen,
  },
];

const DefaultStackContainer = createStackNavigator();

/**
 * Screen stack that displays all the Home content

 */
const DefaultStackRoutes = () => (
  <DefaultStackContainer.Navigator
    screenOptions={{headerMode: 'none'}}
    initialRouteName={defaultRouteItems[0].name}>
    {defaultRouteItems.map(({name, component}) => (
      <DefaultStackContainer.Screen
        key={name}
        name={name}
        component={component}
      />
    ))}
  </DefaultStackContainer.Navigator>
);

export default DefaultStackRoutes;
