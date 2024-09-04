import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, ScrollView, Linking } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useClientProduct } from '@/contexts/ClientProductContext';
import { COLORS, SIZES } from '@/utils/theme';
import { ProductModelProps } from '@/models/ProductModelProps';

const ClientProductDetailsPage = () => {
  const { selectedProduct, removeProduct, addProduct } = useClientProduct();
  const router = useRouter();
  const [productDetails, setProductDetails] = useState<ProductModelProps | null>(null);

  // State variables to handle product details
  const [status, setStatus] = useState('');
  const [total, setTotal] = useState(0.0);
  const [address, setAddress] = useState('');
  const [addressZip, setAddressZip] = useState('');
  const [addressState, setAddressState] = useState('');
  const [addressCity, setAddressCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [productPlacedDate, setProductPlacedDate] = useState('');
  const [productCompletedDate, setProductCompletedDate] = useState('');

  useEffect(() => {
    if (selectedProduct) {
      // Populate state variables with selected product details
      // setStatus(selectedProduct.active);
      setTotal(selectedProduct.price);
      // setAddress(selectedProduct.to_address.streetOne);
      // setAddressZip(selectedProduct.to_address.zip);
      // setAddressState(selectedProduct.to_address.state);
      // setAddressCity(selectedProduct.to_address.city);
      // setPhoneNumber(selectedProduct.to_address.phone);
      // setProductPlacedDate(selectedProduct.product_placed_date);
      // setProductCompletedDate(selectedProduct.product_completed_date);
   
   
    }
  }, [selectedProduct]);

  const handleCallCustomer = () => {
    // Trigger phone dialer with customer's phone number
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      Alert.alert('Error', 'Phone number is not available.');
    }
  };



  const handleUpdateProduct = () => {
    if (!productDetails) return;

    Alert.alert(
      'Confirmation',
      'Are you sure you want to proceed?',
      [
        {
          text: 'Yes',
          onPress: () => {
            // Your update logic here
            addProduct(productDetails);
            // navigation.goBack();
          },
        },
        { text: 'No', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteProduct = () => {
    if (!selectedProduct?.id) {
      Alert.alert('Error', 'Product ID is missing.');
      return;
    }
  
    Alert.alert('Confirmation', 'Are you sure you want to delete this product?', [
      {
        text: 'Yes',
        onPress: () => {
         // removeProduct(selectedProduct.id);
          router.back();
        },
      },
      {
        text: 'No',
        style: 'cancel',
      },
    ]);
  };
  

  return (
   <ScrollView style={styles.container}>
        <Stack.Screen options={{ title: selectedProduct?.name || 'Product Details' }} />

       <View style={styles.section}>
             <Text style={styles.sectionHeader}>Status</Text>
         <Text style={styles.text}>{selectedProduct?.active}</Text>
       </View>

       <View style={styles.section}>
         <Text style={styles.sectionHeader}>General</Text>
        <Button title="Call Customer" onPress={handleCallCustomer} />
       {/* <Button title="Email Customer" onPress={handleEmailCustomer} /> */}
        <Button
          title="Edit Shipping Information"
        //   onPress={() => navigation.navigate('EditShippingInfo', {
        //      address: productDetails.to_address?.streetOne,
        //     city: productDetails.to_address?.city,
        //      state: productDetails.to_address?.state,
        //    zip: productDetails.to_address?.zip,
        //   })}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Personal Information</Text>
        {/* <Text style={styles.text}>Address: {selectedProduct?.to_address.streetOne}</Text>
        <Text style={styles.text}>City: {selectedProduct?.to_address?.city}</Text>
        <Text style={styles.text}>State: {selectedProduct?.to_address?.state}</Text>
        <Text style={styles.text}>Zip: {selectedProduct?.to_address?.zip}</Text> */}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Time Stamp</Text>
        {/* <Text style={styles.text}>Created: {selectedProduct?.product_created_date}</Text>
        <Text style={styles.text}>Placed: {selectedProduct?.product_placed_date}</Text>
        <Text style={styles.text}>Shipped: {selectedProduct?.product_started_date}</Text>
        <Text style={styles.text}>Completed: {selectedProduct?.product_completed_date}</Text>
      </View> */}
      </View> 
      <Button title="Update Product" onPress={handleUpdateProduct} />
    </ScrollView>
  );
};

export default ClientProductDetailsPage;




const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: COLORS.lightGray,
      padding: SIZES.medium,
    },
    section: {
      marginBottom: SIZES.large,
    },
    sectionHeader: {
      fontSize: SIZES.large,
      fontWeight: 'bold',
      color: COLORS.primary,
      marginBottom: SIZES.small,
    },
    text: {
      fontSize: SIZES.medium,
      color: COLORS.gray,
      marginBottom: SIZES.small,
    },
  });



// const styles = StyleSheet.create({
//   container: {
//     padding: SIZES.medium,
//     // backgroundColor: COLORS.lightGray,
//   },
//   section: {
//     marginBottom: SIZES.medium,
//   },
//   label: {
//     fontSize: SIZES.medium,
//     color: COLORS.primary,
//     marginBottom: SIZES.small,
//   },
//   value: {
//     fontSize: SIZES.large,
//     color: COLORS.gray,
//   },
//   buttonContainer: {
//     marginTop: SIZES.large,
//   },
// });
// function addProduct(arg0: {}) {
//     throw new Error('Function not implemented.');
// }

