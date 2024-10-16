

import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '@/utils/theme';
import { Stack } from 'expo-router';

const { width, height } = Dimensions.get('window');
const orderImage = { uri: "https://appsformankind-assets.s3.amazonaws.com/Store/Apps_For_Mankind/orderImage.png" };
const NoOrdersView = () => {
  return (
    <View style={styles.container}>
        {/* <Stack.Screen options={{headerShown: false}}/> */}
      <Image 
        source={orderImage}
        
        style={styles.image}
      />
      <Text style={styles.message}>
        Orders will be listed here. To add an order manually, simply click the + in the top left.
      </Text>
    </View>
  );
};

export default NoOrdersView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.5,
    height: height * 0.25,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: COLORS.darkGray,
    textAlign: 'center',
  },
});




// // If mobile and web is different

// // Make sure to also create the folder in components

// export {default} from '@/components/pages/client-order/ClientOrdersView' 