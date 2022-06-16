/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Styles = StyleSheet.create({
  shadowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4d6447',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingHorizontal: 15,
    borderTopColor: '#fff',
    borderBottomColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
  },
  TabStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyles: {
    color: '#fff',
    marginTop: 7,
    fontSize: 12,
  },
});

const BottomTabsComponent = ({state, descriptors, navigation}) => {
  const insets = useSafeAreaInsets();

  const handleTabPress = useCallback(({isFocused, routeName}) => {
    if (!isFocused) {
      navigation.navigate(routeName);
    }
  });

  return (
    <View
      style={[Styles.shadowContainer, {paddingBottom: insets.bottom || 30}]}>
      {state.routes.map((route, index) => {
        const {
          name,
          key: routeKey,
          params: {icon},
        } = route;
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : name;

        const isFocused = state.index === index;

        const iconName = isFocused ? icon.active : icon.inactive;

        return (
          <TouchableOpacity
            key={routeKey}
            accessibilityRole="button"
            testID={options.tabBarTestID}
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={() => handleTabPress({routeName: name, isFocused})}
            style={Styles.TabStyle}>
            <Icon
              // eslint-disable-next-line react-native/no-inline-styles
              style={{paddingRight: 5}}
              name={iconName}
              color="#fff"
              size={24}
            />
            <Text style={Styles.labelStyles}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTabsComponent;
