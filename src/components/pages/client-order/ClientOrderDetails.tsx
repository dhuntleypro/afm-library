// import React, { useEffect, useState } from 'react';
// import { View, Text, Button, Alert, ScrollView, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useClientOrder } from '@/contexts/ClientOrderContext';
// import { COLORS, SIZES } from '@/utils/theme';
// import { OrderModelProps } from '@/models/OrderModelProps';

// const EditClientOrderCrud = () => {
//   const { selectedOrder, updateOrder } = useClientOrder();
//   const [isShowingConfirmation, setIsShowingConfirmation] = useState(false);
//   const navigation = useNavigation();

//   const [orderDetails, setOrderDetails] = useState<OrderModelProps | null>(null);

//   useEffect(() => {
//     if (selectedOrder) {
//       setOrderDetails(selectedOrder);
//     }
//   }, [selectedOrder]);

//   const handleUpdateOrder = () => {
//     if (!orderDetails) return;

//     Alert.alert(
//       'Confirmation',
//       'Are you sure you want to proceed?',
//       [
//         {
//           text: 'Yes',
//           onPress: () => {
//             // Your update logic here
//             updateOrder(orderDetails);
//             navigation.goBack();
//           },
//         },
//         { text: 'No', style: 'cancel' },
//       ],
//       { cancelable: true }
//     );
//   };

//   const handleCallCustomer = () => {
//     // Logic to call customer
//     if (orderDetails?.to_address?.phone) {
//       // Logic to open the phone app with the number
//       console.log(`Calling ${orderDetails.to_address.phone}`);
//     }
//   };

//   const handleEmailCustomer = () => {
//     // Logic to email customer
//     if (orderDetails?.to_address?.email) {
//       // Logic to open the email app with the address
//       console.log(`Emailing ${orderDetails.to_address.email}`);
//     }
//   };

//   if (!orderDetails) {
//     return (
//       <View style={styles.container}>
//         <Text>Order not found</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.section}>
//         <Text style={styles.sectionHeader}>Status</Text>
//         <Text style={styles.text}>{orderDetails.order_status}</Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionHeader}>General</Text>
//         <Button title="Call Customer" onPress={handleCallCustomer} />
//         <Button title="Email Customer" onPress={handleEmailCustomer} />
//         <Button
//           title="Edit Shipping Information"
//         //   onPress={() => navigation.navigate('EditShippingInfo', {
//         //     address: orderDetails.to_address?.streetOne,
//         //     city: orderDetails.to_address?.city,
//         //     state: orderDetails.to_address?.state,
//         //     zip: orderDetails.to_address?.zip,
//         //   })}
//         />
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionHeader}>Personal Information</Text>
//         <Text style={styles.text}>Address: {orderDetails.to_address?.streetOne}</Text>
//         <Text style={styles.text}>City: {orderDetails.to_address?.city}</Text>
//         <Text style={styles.text}>State: {orderDetails.to_address?.state}</Text>
//         <Text style={styles.text}>Zip: {orderDetails.to_address?.zip}</Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionHeader}>Time Stamp</Text>
//         <Text style={styles.text}>Created: {orderDetails.order_created_date}</Text>
//         <Text style={styles.text}>Placed: {orderDetails.order_placed_date}</Text>
//         <Text style={styles.text}>Shipped: {orderDetails.order_started_date}</Text>
//         <Text style={styles.text}>Completed: {orderDetails.order_completed_date}</Text>
//       </View>

//       <Button title="Update Order" onPress={handleUpdateOrder} />
//     </ScrollView>
//   );
// };

// export default EditClientOrderCrud;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.lightGray,
//     padding: SIZES.medium,
//   },
//   section: {
//     marginBottom: SIZES.large,
//   },
//   sectionHeader: {
//     fontSize: SIZES.large,
//     fontWeight: 'bold',
//     color: COLORS.primary,
//     marginBottom: SIZES.small,
//   },
//   text: {
//     fontSize: SIZES.medium,
//     color: COLORS.black,
//     marginBottom: SIZES.small,
//   },
// });










import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, ScrollView, Linking } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useClientOrder } from '@/contexts/ClientOrderContext';
import { COLORS, SIZES } from '@/utils/theme';
import { OrderModelProps } from '@/models/OrderModelProps';

const OrderDetailsPage = () => {
  const { selectedOrder, removeOrder, addOrder } = useClientOrder();
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<OrderModelProps | null>(null);

  // State variables to handle order details
  const [status, setStatus] = useState('');
  const [total, setTotal] = useState(0.0);
  const [address, setAddress] = useState('');
  const [addressZip, setAddressZip] = useState('');
  const [addressState, setAddressState] = useState('');
  const [addressCity, setAddressCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orderPlacedDate, setOrderPlacedDate] = useState('');
  const [orderCompletedDate, setOrderCompletedDate] = useState('');

  useEffect(() => {
    if (selectedOrder) {
      // Populate state variables with selected order details
      setStatus(selectedOrder.order_status);
      setTotal(selectedOrder.total);
      setAddress(selectedOrder.to_address.streetOne);
      setAddressZip(selectedOrder.to_address.zip);
      setAddressState(selectedOrder.to_address.state);
      setAddressCity(selectedOrder.to_address.city);
      setPhoneNumber(selectedOrder.to_address.phone);
      setOrderPlacedDate(selectedOrder.order_placed_date);
      setOrderCompletedDate(selectedOrder.order_completed_date);
   
   
    }
  }, [selectedOrder]);

  const handleCallCustomer = () => {
    // Trigger phone dialer with customer's phone number
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      Alert.alert('Error', 'Phone number is not available.');
    }
  };

  const handleEmailCustomer = () => {
    // Trigger email client with customer's email
    if (selectedOrder?.to_address.email) {
      Linking.openURL(`mailto:${selectedOrder.to_address.email}`);
    } else {
      Alert.alert('Error', 'Email address is not available.');
    }
  };


  const handleUpdateOrder = () => {
    if (!orderDetails) return;

    Alert.alert(
      'Confirmation',
      'Are you sure you want to proceed?',
      [
        {
          text: 'Yes',
          onPress: () => {
            // Your update logic here
            addOrder(orderDetails);
            // navigation.goBack();
          },
        },
        { text: 'No', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteOrder = () => {
    if (!selectedOrder?.id) {
      Alert.alert('Error', 'Order ID is missing.');
      return;
    }
  
    Alert.alert('Confirmation', 'Are you sure you want to delete this order?', [
      {
        text: 'Yes',
        onPress: () => {
          removeOrder(selectedOrder.id);
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
        <Stack.Screen options={{ title: selectedOrder?.title || 'Order Details' }} />

       <View style={styles.section}>
             <Text style={styles.sectionHeader}>Status</Text>
         <Text style={styles.text}>{selectedOrder?.order_status}</Text>
       </View>

       <View style={styles.section}>
         <Text style={styles.sectionHeader}>General</Text>
        <Button title="Call Customer" onPress={handleCallCustomer} />
       <Button title="Email Customer" onPress={handleEmailCustomer} />
        <Button
          title="Edit Shipping Information"
        //   onPress={() => navigation.navigate('EditShippingInfo', {
        //      address: orderDetails.to_address?.streetOne,
        //     city: orderDetails.to_address?.city,
        //      state: orderDetails.to_address?.state,
        //    zip: orderDetails.to_address?.zip,
        //   })}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Personal Information</Text>
        <Text style={styles.text}>Address: {selectedOrder?.to_address.streetOne}</Text>
        <Text style={styles.text}>City: {selectedOrder?.to_address?.city}</Text>
        <Text style={styles.text}>State: {selectedOrder?.to_address?.state}</Text>
        <Text style={styles.text}>Zip: {selectedOrder?.to_address?.zip}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Time Stamp</Text>
        <Text style={styles.text}>Created: {selectedOrder?.order_created_date}</Text>
        <Text style={styles.text}>Placed: {selectedOrder?.order_placed_date}</Text>
        <Text style={styles.text}>Shipped: {selectedOrder?.order_started_date}</Text>
        <Text style={styles.text}>Completed: {selectedOrder?.order_completed_date}</Text>
      </View>

      <Button title="Update Order" onPress={handleUpdateOrder} />
    </ScrollView>
  );
};

export default OrderDetailsPage;




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
// function addOrder(arg0: {}) {
//     throw new Error('Function not implemented.');
// }

