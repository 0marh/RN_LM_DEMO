import BottomTabs from './BottomTabsRoutes';
import {PropertyDetails} from '../containers';

/**
 * Lists all the main Routes in the Applications.
 * These are the ones that control the root logic of the App.
 */
const appRouteItems = [
  {
    name: 'Home',
    component: BottomTabs,
  },
  {
    name: 'Property',
    component: PropertyDetails,
  },
];

export default appRouteItems;
