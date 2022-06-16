/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {View, useWindowDimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';

const CarouselItem = ({item}) => (
  <FastImage
    style={{
      aspectRatio: 3 / 3.5,
      opacity: item ? 1 : 0,
    }}
    source={{uri: item}}
    aspectRatio={3 / 3.5}
    width="100%"
    height="100%"
    resizeMode={FastImage.resizeMode.cover}
  />
);

const CarouselPagination = ({carouselCount, carRef, activeSlide}) => (
  <Pagination
    activeDotIndex={activeSlide}
    carouselRef={carRef}
    dotsLength={carouselCount}
    tappableDots
    containerStyle={{
      padding: 0,
      margin: 0,
      borderColor: 'pink',
      marginTop: -64,
    }}
    dotStyle={{
      paddingHorizontal: 0,
      backgroundColor: 'white',
      borderWidth: 2,
      height: 12,
      width: 12,
      borderRadius: 12,
      borderColor: '#BE9855',
    }}
    inactiveDotStyle={{
      borderWidth: 2,
      borderColor: 'white',
      marginVertical: 0,
    }}
    inactiveDotOpacity={0.4}
    inactiveDotScale={0.6}
  />
);

const ImageCarousel = ({carousel}) => {
  const {width} = useWindowDimensions();
  const galleryRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View>
      <Carousel
        onSnapToItem={itemIndex => setActiveIndex(itemIndex)}
        inactiveSlideOpacity={0.2}
        renderItem={CarouselItem}
        sliderWidth={width}
        itemWidth={width}
        ref={galleryRef}
        data={carousel}
        loop
      />
      <CarouselPagination
        carouselCount={carousel.length}
        activeSlide={activeIndex}
        carRef={galleryRef}
      />
    </View>
  );
};

export default ImageCarousel;
