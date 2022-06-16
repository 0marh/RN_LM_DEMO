import DefaultStackRoutes from './DefaultStackRoutes';
import MapStackRoutes from './MapStackRoutes';

/**
 * Lists all the Routes that are displayed when someone clicks on the
 * Bottom Navigation icons. These are the Main Screens of the App.
 */
const bottomTabRouteItems = [
  {
    name: 'Search',
    component: DefaultStackRoutes,
    icon: {
      active: 'search',
      inactive: 'search',
    },
  },
  {
    name: 'Map',
    component: MapStackRoutes,
    icon: {
      active: 'map',
      inactive: 'map',
    },
  },
  {
    name: 'Saved',
    component: DefaultStackRoutes,
    icon: {
      active: 'favorite',
      inactive: 'favorite',
    },
  },
  {
    name: 'Profile',
    component: DefaultStackRoutes,
    icon: {
      active: 'person',
      inactive: 'account-circle',
    },
  },
];

export default bottomTabRouteItems;
