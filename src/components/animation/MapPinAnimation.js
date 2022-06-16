import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

const Styles = StyleSheet.create({
  pinViewContainer: {
    opacity: 0.85,
    width: '35%',
  },
});

const MarkerPinAnimation = () => (
  <LottieView
    source={require('./lottie/marker-pin-black.json')}
    autoPlay
    loop
  />
);

const MapPinAnimation = () => (
  <View style={Styles.pinViewContainer}>
    <MarkerPinAnimation />
  </View>
);
export default MapPinAnimation;
