import {CommonActions, StackActions} from '@react-navigation/native';
import type {NavigationParams, NavigationRoute} from '@react-navigation/native';

let _container; // eslint-disable-line

function setContainer(container: Object) {
  _container = container;
}

function pop(num: Number) {
  _container.dispatch(StackActions.pop(num));
}

function replace(routeName: string, params: NavigationParams) {
  _container.dispatch(StackActions.replace(routeName, params));
}

function reset(routeName: string, params?: NavigationParams) {
  _container.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [
        CommonActions.navigate({
          name: routeName,
          params,
        }),
      ],
    }),
  );
}

function stackReset(routeName: string, params?: NavigationParams) {
  _container.dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        CommonActions.navigate({
          name: routeName,
          params,
        }),
      ],
    }),
  );
}

function navigate(routeName: string, params?: NavigationParams) {
  _container.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    }),
  );
}

function navigateDeep(
  actions: {routeName: string, params?: NavigationParams}[],
) {
  _container.dispatch(
    actions.reduceRight(
      (prevAction, action): any =>
        CommonActions.navigate({
          name: action.routeName,
          params: action.params,
          action: prevAction,
        }),
      undefined,
    ),
  );
}

function getCurrentRoute(): NavigationRoute | null {
  if (!_container || !_container.state.nav) {
    return null;
  }

  return _container.state.nav.routes[_container.state.nav.index] || null;
}

export default {
  setContainer,
  navigateDeep,
  navigate,
  reset,
  getCurrentRoute,
  stackReset,
  pop,
  replace,
};
