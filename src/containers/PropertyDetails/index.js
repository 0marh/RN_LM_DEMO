/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {usePropertyContext} from '../../context';
import useGetPropertyDetails from './query/getPropertyDetail';

import {ImageCarousel} from '../../components';

const Styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  closeBtnView: {
    backgroundColor: '#f7f1e9',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 50,
    left: 20,
    width: 30,
    height: 30,
    zIndex: 1,
  },
  descriptionView: {
    paddingBottom: 10,
    borderBottomColor: '#000',
    borderBottomWidth: 0.5,
  },
  typesTitle: {fontSize: 20, fontWeight: 'bold', marginBottom: 10},
  roomTypeView: {
    padding: 10,
    backgroundColor: '#c9cbaa',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  bottomFooter: {
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    height: 80,
    bottom: 0,
    backgroundColor: '#c9cbaa',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  exploreBtn: {
    width: 100,
    height: 50,
    backgroundColor: '#4d6447',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const PropertyDetails = ({navigation}) => {
  const {selectedPropertyVal} = usePropertyContext();

  const {data: PropertyDetailsData, isLoading} = useGetPropertyDetails(
    selectedPropertyVal.selectedProperty?.id,
  );

  const Images = PropertyDetailsData?.images.map(({url}) => url);

  if (isLoading) {
    return true;
  }

  return (
    <View style={Styles.screenContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={Styles.closeBtnView}>
        <Icon name={'close'} color="#000" size={20} />
      </TouchableOpacity>

      <View style={{width: '100%', height: 300}}>
        <ImageCarousel carousel={Images} />
      </View>

      <View style={{padding: 20}}>
        <View style={{marginVertical: 10}}>
          <View style={{flexDirection: 'row', width: '100%', marginBottom: 10}}>
            <Text style={{fontSize: 20}}>{PropertyDetailsData?.name}</Text>
          </View>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <Icon
              style={{paddingRight: 5}}
              name={'pin-drop'}
              color="#b26323"
              size={20}
            />
            <Text>
              {Math.round(PropertyDetailsData?.distance)} km from city center
            </Text>
          </View>
        </View>

        <View style={Styles.descriptionView}>
          <Text>{PropertyDetailsData?.description}</Text>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={Styles.typesTitle}>
            Room types available in this location
          </Text>

          <View style={{flexDirection: 'row'}}>
            {PropertyDetailsData?.unit_groups.map(unit => {
              return (
                <View style={Styles.roomTypeView}>
                  <Text>{unit.name}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      <View style={Styles.bottomFooter}>
        <Text>From 55 €/Night</Text>
        <TouchableOpacity style={Styles.exploreBtn}>
          <Text style={{color: '#fff'}}>EXPLORE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PropertyDetails;
