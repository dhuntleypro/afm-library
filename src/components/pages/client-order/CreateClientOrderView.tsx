import React, { FC, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useClientOrder } from '@/contexts/ClientOrderContext';
import { COLORS, SIZES } from '@/utils/theme';
import { OrderModelProps } from '@/models/OrderModelProps';
import { generateUUID } from '@/hooks/generateUUID';
import { useAuth } from '@/contexts/AuthContext';
import { SAMPLE_ORDER_ITEMS } from '@/model-sample-data/sample-order';
interface FormInputProps {
    label: string;
    value: any;
    onChangeText: (text: string) => void;
    placeholder: string;
    keyboardType?: TextInputProps['keyboardType']; // 'default' is the default keyboard type in TextInput
    multiline?: boolean;
}

const FormInput: FC<FormInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  multiline = false,
}) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, multiline && styles.textArea]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      multiline={multiline}
    />
  </>
);

const CreateClientOrderView = () => {
  const [title, setTitle] = useState('title');
  const [total, setTotal] = useState('200');
  const [note, setNote] = useState('notes...');
  const [to_address_name, setTo_address_name] = useState('Darrien');
  const [to_address_streetOne, setTo_address_streetOne] = useState('643 Snediker Ave');
  const [to_address_streetTwo, setTo_address_streetTwo] = useState('');
  const [to_address_city, setTo_address_city] = useState('Brooklyn');
  const [to_address_state, setTo_address_state] = useState('NY');
  const [to_address_zip, setTo_address_zip] = useState('11207');
  const [to_address_country, setTo_address_country] = useState('US');
  const [to_address_phone, setTo_address_phone] = useState('3478800665');
  const [to_address_email, setTo_address_email] = useState('darrien@gmail.com');

  const { addOrder } = useClientOrder();
  const { authState } = useAuth();

  const handleSubmit = () => {
    if (!title || !total || !to_address_name || !to_address_phone || !to_address_email) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(total)) {
      Alert.alert('Validation Error', 'Please enter a valid amount.');
      return;
    }

    const newOrder: OrderModelProps = {
      id: generateUUID(8),
      stripe_id: '',
      store_id: authState?.user?.store_owner_id ?? '',
      index: 0,
      order_status: 'Pending',
      items: SAMPLE_ORDER_ITEMS,
      userId: authState?.user?.id ?? '',
      order_history: [],
      total: parseFloat(total),
      net_total: parseFloat(total),
      courier: '',
      shipping_label: '',
      return_label: '',
      from_address: {
        name: 'darrien',
        streetOne: '643 snediker ave',
        streetTwo: '',
        city: 'brooklyn NY',
        state: 'NY',
        zip: '11207',
        country: 'US',
        phone: '3478800665',
        email: authState?.user?.email ?? '',
        is_residential: false,
      },
      to_address: {
        name: to_address_name || 'tom',
        streetOne: to_address_streetOne || '343 snediker ave',
        streetTwo: to_address_streetTwo,
        city: to_address_city || 'brooklyn',
        state: to_address_state || 'NY',
        zip: to_address_zip || '11207',
        country: to_address_country || 'US',
        phone: to_address_phone || '3478800665',
        email: to_address_email || 'darrien@gmail.com',
        is_residential: false,
      },
      parcel: {
        length: '',
        width: '',
        height: '',
        distance_unit: '',
        weight: '',
        mass_unit: '',
        value_amount: 0,
        metadata: '',
        test: false,
      },
      title,
      type: '',
      coupon_code: '',
      referred_by: '',
      statement_descriptor: '',
      note,
      budget: '',
      order_placed_date: new Date().toISOString(),
      order_started_date: '',
      order_created_date: '',
      order_completed_date: '',
      tax: 0,
      stripe_fee: 0,
      afm_fee: 0,
      shipping_cost: 0,
      discount_amount: 0,
    };

    addOrder(newOrder);
    // Alert.alert('Order Created', `Order titled "${title}" has been created!`);
  };

  return (
    <ScrollView style={styles.formContainer}>
      <FormInput label="Order Title" value={title} onChangeText={setTitle} placeholder="Enter order title" />
      <Text style={styles.sectionHeader}>Customer Contact Information</Text>
      <FormInput
        label="Name"
        value={to_address_name}
        onChangeText={setTo_address_name}
        placeholder="Enter customer name"
      />
      <FormInput
        label="Phone"
        value={to_address_phone}
        onChangeText={setTo_address_phone}
        placeholder="Enter customer phone"
        keyboardType="phone-pad"
      />
      <FormInput
        label="Email"
        value={to_address_email}
        onChangeText={setTo_address_email}
        placeholder="Enter customer email"
        keyboardType="email-address"
      />
      <FormInput
        label="Address 1"
        value={to_address_streetOne}
        onChangeText={setTo_address_streetOne}
        placeholder="Enter address line 1"
      />
      <FormInput
        label="Address 2 (optional)"
        value={to_address_streetTwo}
        onChangeText={setTo_address_streetTwo}
        placeholder="Enter address line 2"
      />
      <FormInput
        label="City"
        value={to_address_city}
        onChangeText={setTo_address_city}
        placeholder="Enter city"
      />
      <FormInput
        label="State"
        value={to_address_state}
        onChangeText={setTo_address_state}
        placeholder="Enter state"
      />
      <FormInput
        label="Zip"
        value={to_address_zip}
        onChangeText={setTo_address_zip}
        placeholder="Enter zip code"
        keyboardType="numeric"
      />
      <FormInput
        label="Country"
        value={to_address_country}
        onChangeText={setTo_address_country}
        placeholder="Enter country"
      />
      <FormInput
        label="Total Amount"
        value={total}
        onChangeText={setTotal}
        placeholder="Enter total amount"
        keyboardType="numeric"
      />
      <FormInput
        label="Note"
        value={note}
        onChangeText={setNote}
        placeholder="Add a note (optional)"
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Ionicons name="checkmark-done-outline" size={24} color={COLORS.white} />
        <Text style={styles.submitButtonText}>Create Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateClientOrderView;

const styles = StyleSheet.create({
  formContainer: {
    padding: SIZES.medium,
  },
  label: {
    fontFamily: 'bold',
    fontSize: SIZES.medium,
    color: COLORS.primary,
    marginBottom: SIZES.small,
  },
  sectionHeader: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    marginBottom: SIZES.small,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: COLORS.white,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    fontFamily: 'regular',
    marginBottom: SIZES.medium,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: SIZES.medium,
    borderRadius: SIZES.medium,
    marginTop: SIZES.large,
  },
  submitButtonText: {
    fontFamily: 'bold',
    color: COLORS.white,
    fontSize: SIZES.medium,
    marginLeft: SIZES.small,
  },
});









// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useClientOrder } from '@/contexts/ClientOrderContext';
// import { COLORS, SIZES } from '@/utils/theme';
// import { OrderModelProps, SAMPLE_ORDER_ITEMS } from '@/models/OrderModelProps';
// import { generateUUID } from '@/hooks/generateUUID';
// import { useAuth } from '@/contexts/AuthContext';
// import { SAMPLE_PRODUCT } from '@/models/ProductModelProps';

// const CreateClientOrderView = () => {
//   const [title, setTitle] = useState('');
//   const [total, setTotal] = useState('');
//   const [note, setNote] = useState('');

//   const [to_address_name, setTo_address_name] = useState('');
//   const [to_address_streetOne, setTo_address_streetOne] = useState('');
//   const [to_address_streetTwo, setTo_address_streetTwo] = useState('');
//   const [to_address_city, setTo_address_city] = useState('');
//   const [to_address_state, setTo_address_state] = useState('');
//   const [to_address_zip, setTo_address_zip] = useState('');
//   const [to_address_country, setTo_address_country] = useState('');
//   const [to_address_phone, setTo_address_phone] = useState('');
//   const [to_address_email, setTo_address_email] = useState('');





//   const { getClientOrders , addOrder } = useClientOrder();
//   const { authState } = useAuth();
// //   const randomID = uuid();
//   const handleSubmit = () => {
//     if (!title || !total) {
//       Alert.alert("Validation Error", "Please fill in all required fields.");
//       return;
//     }

//     // console.warn("Replace - SAMPLE_ORDER_ITEMS with cart products for order items")
//     const newOrder: OrderModelProps = {
//       id: generateUUID(8),  // Generate a unique ID for the order
//       stripe_id: '',
//       store_id: authState?.user?.store_owner_id ?? "",
//       index: 0,// getClientOrders.length,
//       order_status: 'Pending', // Default status
//       items: SAMPLE_ORDER_ITEMS,
//       userId: authState?.user?.id ?? "",
//       order_history: [],
//       total: parseFloat(total),
//       net_total: parseFloat(total),
//       courier: '',
//       shipping_label: '',
//       return_label: '',
//       from_address: {
//         name: 'darrien',
//         streetOne: '643 snediker ave',
//         streetTwo: '',
//         city: 'brooklyn NY',
//         state: 'NY',
//         zip: '11207',
//         country: 'US',
//         phone: '3478800665',
//         email: authState?.user?.email ?? "",
//         is_residential: false,
//       },
//       to_address: {
//         name: to_address_name || "tom",
//         streetOne: to_address_streetOne || "343 snediker ave",
//         streetTwo: to_address_streetTwo,
//         city: to_address_city || "brooklyn",
//         state: to_address_state || "NY",
//         zip: to_address_zip || "11207",
//         country: to_address_country || "US",
//         phone: to_address_phone || "3478800665",
//         email: to_address_email || "darrien@gmail.com",
//         is_residential: false,
//       },
//       parcel: {
//         length: '',
//         width: '',
//         height: '',
//         distance_unit: '',
//         weight: '',
//         mass_unit: '',
//         value_amount: 0,
//         metadata: '',
//         test: false,
//       },
//       title,
//       type: '',
//       coupon_code: '',
//       referred_by: '',
//       statement_descriptor: '',
//       note,
//       budget: '',
//       order_placed_date:  new Date().toISOString(),
//       order_started_date: '',
//       order_created_date: '',
//       order_completed_date: '',
//       tax: 0,
//       stripe_fee: 0,
//       afm_fee: 0,
//       shipping_cost: 0,
//       discount_amount: 0,
//     };

//     console.log(newOrder)

//     addOrder(newOrder);
//     Alert.alert("Order Created", `Order titled "${title}" has been created!`);
//   };

//   return (
//     <ScrollView style={styles.formContainer}>
//       <Text style={styles.label}>Order Title</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter order title"
//         value={title}
//         onChangeText={setTitle}
//       />

//    {/* Contact  Section */}
//    <Text style={styles.sectionHeader}>Customer Contact Information</Text>

//    <Text style={styles.label}>Name</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter customer name"
//         value={to_address_name}
//         onChangeText={setTo_address_name}
//       />
    
//     <Text style={styles.label}>Phone</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter order phone"
//         value={to_address_phone}
//         onChangeText={setTo_address_phone}
//       />
      
//       <Text style={styles.label}>Address 1</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter order address"
//         value={to_address_streetOne}
//         onChangeText={setTo_address_streetOne}
//       />
      

//       <Text style={styles.label}>Address 2 (optional)</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter order address"
//         value={to_address_streetTwo}
//         onChangeText={setTo_address_streetTwo}
//       />
      

//       <Text style={styles.label}>City</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter order city"
//         value={to_address_city}
//         onChangeText={setTo_address_city}
//       />
      

//       <Text style={styles.label}>State</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter order state"
//         value={to_address_state}
//         onChangeText={setTo_address_state}
//       />
      

//       <Text style={styles.label}>Zip</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter order zip"
//         value={to_address_zip}
//         onChangeText={setTo_address_zip}
//       />


//       <Text style={styles.label}>Country</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter order country"
//         value={to_address_country}
//         onChangeText={setTo_address_country}
//       />
      

//       <Text style={styles.label}>Email</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter order email"
//         value={to_address_email}
//         onChangeText={setTo_address_email}
//       />
      

//       <Text style={styles.label}>Order Title</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter order title"
//         value={title}
//         onChangeText={setTitle}
//       />
      



//       <Text style={styles.label}>Total Amount</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter total amount"
//         value={total}
//         onChangeText={setTotal}
//         keyboardType="numeric"
//       />

//       <Text style={styles.label}>Note</Text>
//       <TextInput
//         style={[styles.input, styles.textArea]}
//         placeholder="Add a note (optional)"
//         value={note}
//         onChangeText={setNote}
//         multiline
//       />

//       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//         <Ionicons name="checkmark-done-outline" size={24} color={COLORS.white} />
//         <Text style={styles.submitButtonText}>Create Order</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default CreateClientOrderView;

// const styles = StyleSheet.create({

//   formContainer: {
//     padding: SIZES.medium,
//     // backgroundColor: COLORS.lightGray,
//   },
//   label: {
//     fontFamily: 'bold',
//     fontSize: SIZES.medium,
//     color: COLORS.primary,
//     marginBottom: SIZES.small,
//   },
//   sectionHeader: {
//     fontSize: SIZES.large,
//     color: COLORS.primary,
//     marginBottom: SIZES.small,
//     fontWeight: 'bold',
//   },
//   input: {
//     backgroundColor: COLORS.white,
//     padding: SIZES.small,
//     borderRadius: SIZES.small,
//     fontFamily: 'regular',
//     marginBottom: SIZES.medium,
//     shadowColor: COLORS.black,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   textArea: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   submitButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: COLORS.primary,
//     padding: SIZES.medium,
//     borderRadius: SIZES.medium,
//     marginTop: SIZES.large,
//   },
//   submitButtonText: {
//     fontFamily: 'bold',
//     color: COLORS.white,
//     fontSize: SIZES.medium,
//     marginLeft: SIZES.small,
//   },
// });





















// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, ScrollView, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
// import { useClientOrder } from '@/contexts/ClientOrderContext'; // Replace with actual import
// import { useAuth } from '@/contexts/AuthContext'; // Replace with actual import
// import { COLORS, SIZES } from '@/utils/theme'; // Replace with actual theme imports
// import { OrderModelProps, SAMPLE_ORDER_ITEMS } from '@/models/OrderModelProps';
// import { generateUUID } from '@/hooks/generateUUID';

// const CreateClientOrderView = () => {
//   const [title, setTitle] = useState('');
//   const [user_name, setUserName] = useState('');
//   const [address, setAddress] = useState('');
//   const [address_city, setAddressCity] = useState('');
//   const [address_state, setAddressState] = useState('');
//   const [address_zip, setAddressZip] = useState('');
//   const [coupon_code, setCouponCode] = useState('');
//   const [courier, setCourier] = useState('');
// //   const [orderItems, setOrderItems] = useState([]);
// //   const [selectedUser, setSelectedUser] = useState('');
  
//   const { addOrder } = useClientOrder();
//   const { authState } = useAuth();
  
//   const handleCreateOrder = () => {
//     // const newOrder = {
//     //   title,
//     //   user_name: selectedUser || user_name,
//     //   address,
//     //   address_city,
//     //   address_state,
//     //   address_zip,
//     //   coupon_code,
//     //   courier,
//     //   items: orderItems,
//     //   order_status: 'Pending',
//     //   total: calculateFullTotal(),
//     //   net_total: calculateFullTotal(),
//     //   order_placed_date: new Date().toISOString(),
//     //   note: '',
//     //   afm_fee: 5.5,
//     //   stripe_fee: 2.9 + 0.30,
//     //   store_id: authState?.user?.store_owner_id || '',
//     // };

//     const newOrder: OrderModelProps = {
//         id: generateUUID(8), // Generate a unique ID for the order
//         stripe_id: '',
//         store_id: authState?.user?.store_owner_id ?? "",
//         index: 0, // getClientOrders.length,
//         order_status: 'Pending', // Default status
//         items: SAMPLE_ORDER_ITEMS,
//         userId: authState?.user?.id ?? "",
//         order_history: [],
//         total: 20, // parseFloat(total),
//         net_total: 20, // parseFloat(total),
//         courier: '',
//         shipping_label: '',
//         return_label: '',
//         from_address: {
//             name: 'darrien',
//             streetOne: '643 snediker ave',
//             streetTwo: '',
//             city: 'brooklyn NY',
//             state: '',
//             zip: '',
//             country: '',
//             phone: '',
//             email: authState?.user?.email ?? "",
//             is_residential: false,
//         },
//         to_address: {
//             name: '',
//             streetOne: '',
//             streetTwo: '',
//             city: '',
//             state: '',
//             zip: '',
//             country: '',
//             phone: '',
//             email: 'test',
//             is_residential: false,
//         },
//         parcel: {
//             length: '',
//             width: '',
//             height: '',
//             distance_unit: '',
//             weight: '',
//             mass_unit: '',
//             value_amount: 0,
//             metadata: '',
//             test: false,
//         },
//         title,
//         type: '',
//         coupon_code: '',
//         referred_by: '',
//         statement_descriptor: '',

//         budget: '',
//         order_placed_date: "", // new Date().toISOString(),
//         order_started_date: '',
//         order_created_date: '',
//         order_completed_date: '',
//         tax: 0,
//         stripe_fee: 0,
//         afm_fee: 0,
//         shipping_cost: 0,
//         discount_amount: 0,
//         note: ''
//     };
//     addOrder(newOrder)
//       .then(() => {
//         console.log('Order created successfully');
//       })
//       .catch((error) => {
//         console.error('Failed to create order:', error);
//       });
//   };

  

// //   const calculateFullTotal = () => {
// //     let total = 0;
// //     orderItems.forEach(item => {
// //         // total += item.total_price;
// //         total += item.total_price;
// //     });
// //     const percentageAmount = total * (5.5 / 100.0); // Example percentage
// //     const fixedAmount = 0.30; // Example fixed fee
// //     return total - percentageAmount - fixedAmount;
// //   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.header}>Create Order</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Customer Name"
//         value={ user_name}
//         onChangeText={setUserName}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Address"
//         value={address}
//         onChangeText={setAddress}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="City"
//         value={address_city}
//         onChangeText={setAddressCity}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="State"
//         value={address_state}
//         onChangeText={setAddressState}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Zip"
//         value={address_zip}
//         onChangeText={setAddressZip}
//       />

//       <Text style={styles.sectionHeader}>Pricing</Text>
//       {/* <Text style={styles.label}>Net Total: ${calculateFullTotal()}</Text> */}
//       {/* <Text style={styles.label}>AFM Fee: 5.5%</Text>
//       <Text style={styles.label}>Processing Fee: 2.9% + $0.30</Text> */}

//       {/* <FlatList
//         data={orderItems}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.itemCard}>
//             <Image source={{ uri: item.image }} style={styles.itemImage} />
//             <View style={styles.itemDetails}>
//               <Text>{item.title}</Text>
//               <Text>{item.color} - {item.size}</Text>
//               <Text>${item.total_price}</Text>
//             </View>
//           </View>
//         )}
//       /> */}

//       <TouchableOpacity style={styles.createButton} onPress={handleCreateOrder}>
//         <Text style={styles.createButtonText}>Create Order</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default CreateClientOrderView;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: SIZES.medium,
//   },
//   header: {
//     fontSize: SIZES.large,
//     fontWeight: 'bold',
//     marginBottom: SIZES.medium,
//   },
//   input: {
//     padding: SIZES.small,
//     borderWidth: 1,
//     borderColor: COLORS.gray,
//     borderRadius: SIZES.small,
//     marginBottom: SIZES.medium,
//   },
//   sectionHeader: {
//     fontSize: SIZES.medium,
//     fontWeight: 'bold',
//     marginBottom: SIZES.small,
//   },
//   label: {
//     fontSize: SIZES.small,
//     marginBottom: SIZES.small,
//   },
//   itemCard: {
//     flexDirection: 'row',
//     marginBottom: SIZES.medium,
//     padding: SIZES.small,
//     backgroundColor: COLORS.white,
//     borderRadius: SIZES.small,
//     shadowColor: COLORS.black,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   itemImage: {
//     width: 60,
//     height: 60,
//     borderRadius: SIZES.small,
//   },
//   itemDetails: {
//     marginLeft: SIZES.medium,
//     justifyContent: 'center',
//   },
//   createButton: {
//     backgroundColor: COLORS.primary,
//     padding: SIZES.medium,
//     borderRadius: SIZES.medium,
//     alignItems: 'center',
//   },
//   createButtonText: {
//     color: COLORS.white,
//     fontSize: SIZES.medium,
//     fontWeight: 'bold',
//   },
// });






