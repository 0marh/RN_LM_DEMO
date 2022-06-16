import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Map} from '../containers';

const mapRoutesItems = [
  {
    name: 'MapRoutes',
    component: Map,
  },
];

const MapStackContainer = createStackNavigator();

const MapStackRoutes = () => (
  <MapStackContainer.Navigator
    screenOptions={{headerMode: 'none'}}
    initialRouteName={mapRoutesItems[0].name}>
    {mapRoutesItems.map(({name, component}) => (
      <MapStackContainer.Screen key={name} name={name} component={component} />
    ))}
  </MapStackContainer.Navigator>
);

export default MapStackRoutes;
