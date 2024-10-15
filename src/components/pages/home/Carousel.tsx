import React, { FC, FunctionComponent, useRef } from 'react';
import { Animated, Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import { CONSTANTS } from '@/utils/constants';

import { useClientStore } from '@/contexts/ClientStoreContext';

// const images: string[] = [
//   'https://appsformankind-assets.s3.amazonaws.com/Collections/Furniture/Furniture_1.jpg',
//   'https://appsformankind-assets.s3.amazonaws.com/Collections/Furniture/Furniture_3.jpg',
//   'https://appsformankind-assets.s3.amazonaws.com/Collections/Furniture/Furniture_4.jpg',
// ];

const { width } = Dimensions.get('screen');

const Carousel: FunctionComponent = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  // const { data: mankindStore } = useFetchObject<StoreModelProps>(() => getStore(CONSTANTS.store_id));
  // const { data: store } = useFetchObject<StoreProps>(() => getStore(authState?.user?.id));

  const { store : mankindStore } = useClientStore()
  const storeImages: string[] = [
    mankindStore?.images.about_object_image ?? CONSTANTS.holderCarouselImageOne,
    mankindStore?.images.doubleImageHero_left_image ?? CONSTANTS.holderCarouselImageTwo,
    mankindStore?.images.profile_image ?? CONSTANTS.holderCarouselImageThree
  ]

  return (
    <View style={style.container}>
      <View style={style.topContainer}>  
        <Animated.FlatList
          data={storeImages}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: animatedValue } } }],
            { useNativeDriver: false },
          )}
          pagingEnabled={true}
          keyExtractor={(_, index : any) => index}
          renderItem={({ item }) => {
            return (
              <View style={style.imageContainer}>
                <Image style={style.image} source={{ uri: item ? item : CONSTANTS.holderImage }} />
              </View>
            );
          }}
        />
      </View>
      <View style={style.bottomContainer}>
        <FlatList
          horizontal
          data={storeImages}
          keyExtractor={(_, index: any) => index}
          renderItem={({ index }) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            //  [ middle none selected color , selected color, none selected color  ]
            const colorOutputRange = ['#000', '#fff', '#000'];
            const scaleOutputRange = [1, 2, 1];
            const dotScale = animatedValue.interpolate({
              inputRange,
              outputRange: scaleOutputRange,
              extrapolate: 'clamp',
            });
            const color = animatedValue.interpolate({
              inputRange,
              outputRange: colorOutputRange,
              extrapolate: 'clamp',
            });
            return (
              <View  style={[style.dotContainer, { borderStartColor:  'clear'}]}>

                <PagingDot color={color} scale={dotScale} />
               

              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const PagingDot: FC<{ scale: any, color: any }> = ({ scale, color }) => {
  return (
    <Animated.View
      style={[style.pagingDot, { backgroundColor: color, transform: [{ scale }] }]}
    />
  );
};

const style = StyleSheet.create({
  container: {
    flex: 3,
  },
  topContainer: {
    flex: 2,
  },
  bottomContainer: {
    flex: 1,
    width,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute', 
   bottom: 10
  },
  imageContainer: {
    justifyContent: 'flex-end',
    // paddingBottom: 40,
    alignItems: 'center',
    width,
  },
  image: {
    width: '92%',
    height: 220,
    borderRadius: 15,
  },
  pagingDot: {
    width: 7,
    height: 7,
    borderRadius: 7,
    borderWidth: 2,
    // borderColor: "#000",
  },
  dotContainer: {
   width: 30,
   padding: 10,
  
  },
});

export default Carousel;


