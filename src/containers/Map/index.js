import React, {useState, useRef} from 'react';
import {
  View,
  useWindowDimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

// import {MapPinAnimation} from '../../components';
import {usePropertyContext} from '../../context';
import useGetCityProperties from './query/getProperties';

const Styles = StyleSheet.create({
  screenContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  propertyBox: {
    backgroundColor: '#f7f1e9',
    flex: 0.15,
    bottom: 0,
    top: '80%',
  },
  propertyItem: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#000',
  },
  imageContainer: {width: '35%', height: '100%'},
  imageStyles: {width: '100%', height: '100%'},
  propertyDetailsView: {width: '65%', height: '100%', padding: 10},
  distanceView: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#000',
    marginTop: 10,
  },
});

const Map = ({navigation}) => {
  const {selectedPropertyVal} = usePropertyContext();

  const [projectedCamera, setCamera] = useState(defaultCamera);
  // const [selectedProperty, setSelectedProperty] = useState(null);
  const [showPropertyBox, setShowPropertyBox] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const listRef = useRef();

  const {data: propertiesList, isLoading} = useGetCityProperties(32);

  const {width, height} = useWindowDimensions();

  const ASPECT_RATIO = width / height;
  const defaultCamera = {
    altitude: 1,
    center: {
      latitude: 52.5484571,
      longitude: 13.4108582,
    },
    pitch: 0,
    heading: 0,
    zoom: 12,
  };

  const initialRegion = {
    latitude: 52.5484571,
    longitude: 13.4108582,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0922 * ASPECT_RATIO,
  };
  const ANCHOR = {x: 0.1, y: 0.4};

  if (isLoading) {
    return true;
  }

  function updateCamera(property) {
    const zoomedInToPropertyCamera = {
      center: {
        latitude: parseFloat(property.location.lat),
        longitude: parseFloat(property.location.lng),
      },
      pitch: 0,
      heading: 0,
      altitude: 0,
      zoom: 15,
    };

    setCamera(zoomedInToPropertyCamera);
  }

  function onMapViewPress() {
    if (showPropertyBox) {
      return setShowPropertyBox(false);
    } else {
      return null;
    }
  }

  function handleMarkerPress(property) {
    selectedPropertyVal.setSelectedProperty(property);
    setShowPropertyBox(true);

    updateCamera(property);
    if (listRef.current) {
      listRef.current.scrollToOffset({animated: false, offset: 0});
    }
  }

  function handleOnPropertyBoxPress() {
    // selectedPropertyVal.setSelectedProperty(null);
    setShowPropertyBox(false);

    navigation.navigate('Property');
  }

  function onMapMovementComplete() {
    setCamera(projectedCamera);
    setIsMapLoaded(() => true);
  }

  return (
    <View style={Styles.screenContainer}>
      <MapView
        animateCamera={{camera: defaultCamera, duration: 5500}}
        {...(isMapLoaded ? {camera: defaultCamera} : {})}
        onRegionChangeComplete={onMapMovementComplete}
        onPress={() => onMapViewPress()}
        style={{width, height: height - 90}}
        initialRegion={initialRegion}
        provider={PROVIDER_GOOGLE}
        showsPointsOfInterest
        zoomControlEnabled
        moveOnMarkerPress
        showsBuildings
        loadingEnabled>
        {propertiesList.map(property => (
          <Marker
            onPress={() => handleMarkerPress(property)}
            {...(Platform.OS === 'android' ? {anchor: ANCHOR} : {})}
            key={`${property?.name}`}
            coordinate={{
              latitude: property.location.lat,
              longitude: property.location.lng,
            }}
            pinColor={'blue'}
            // title={`${property.name}`}6
          >
            {/* <MapPinAnimation /> */}
          </Marker>
        ))}
      </MapView>

      <Modal
        isVisible={showPropertyBox}
        style={Styles.propertyBox}
        animationOut="slideOutDown"
        animationIn="slideInUp"
        hasBackdrop={false}
        coverScreen={false}>
        <TouchableOpacity
          onPress={() => handleOnPropertyBoxPress()}
          style={Styles.propertyItem}>
          <View style={Styles.imageContainer}>
            <Image
              source={{
                uri: selectedPropertyVal.selectedProperty?.images[0].url,
              }}
              style={Styles.imageStyles}
            />
          </View>
          <View style={Styles.propertyDetailsView}>
            <Text>{selectedPropertyVal.selectedProperty?.name}</Text>
            <View style={Styles.distanceView}>
              <Icon
                // eslint-disable-next-line react-native/no-inline-styles
                style={{paddingRight: 5}}
                name={'pin-drop'}
                color="#b26323"
                size={20}
              />
              <Text>
                {Math.round(selectedPropertyVal.selectedProperty?.distance)} km
                from city center
              </Text>
            </View>
            <Text>
              From{' '}
              {selectedPropertyVal.selectedProperty?.lowest_price_per_night ||
                55}
              €/Night
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Map;
