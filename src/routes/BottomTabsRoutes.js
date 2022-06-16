import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import bottomTabRouteItems from './bottomTabRouteItems';
import {BottomTabsComponent} from '../components';

const Tab = createBottomTabNavigator();

/**
 * Renders the Main Screen  of the app, that is; the bottom routes screens.
 *
 * These are the Routes that are displayed when someone clicks on the
 * Bottom Navigation icons.
 */
const BottomTabsRoutes = () => {
  return (
    <Tab.Navigator
      tabBar={props => <BottomTabsComponent {...props} />}
      initialRouteName={bottomTabRouteItems[0].name}
      screenOptions={{headerShown: false}}>
      {bottomTabRouteItems.map(
        ({name, component, icon, options, isPrivate}) => (
          <Tab.Screen
            key={name}
            name={name}
            component={component}
            initialParams={{
              icon,
              isPrivate,
            }}
            {...(options && {options})}
          />
        ),
      )}
    </Tab.Navigator>
  );
};

export default BottomTabsRoutes;
