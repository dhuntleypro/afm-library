// import {  StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { FC, useState } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import BackButton from './BackButton'
// // import { createPaymentIntent } from '../../api/paymentApi'
// import Button from '../general/Button'
// import { COLORS } from '@/utils/theme'
// import { generalStyles } from '../general/Styles'
// // import { stripeConverter } from '../../hook/stripeConverter'
// import { CONSTANTS } from '@/utils/constants'
// import { useAuth } from '../../../contexts/AuthContext'
// import { stripeConverter } from '@/hooks/stripeConverter'
// import { createPaymentIntent } from '@/api/paymentApi'
// import useFetchObject from '@/hooks/useFetchObject'
// import { StoreModelProps } from '@/models/StoreModelProps'
// import { getStore } from '@/api/storeApi'

// interface PaymentButtonProp {
//   amount: number
//   shippingAmount: number
// }

 
// const CheckoutButton: FC<PaymentButtonProp> = (props) => {
//   const {authState, onLogout } = useAuth()
//   const [paymentStatus, setPaymentStatus] = useState('');
//   const { data: store } = useFetchObject<StoreModelProps>(() => getStore(CONSTANTS.store_id));



//   const handlePayment = async () => {

//     //  WORKS GETTING CLIENT ID
//     try {
//       const paymentData = {
//         amount: stripeConverter(props.amount), // Example value, replace with your actual data
//         currency: "USD", // Example value, replace with your actual data
//         shipping_fee: stripeConverter(props.shippingAmount), // Example value, replace with your actual data
//         // (FIX) - USE STORE.STRIPE
//         stripe_id: store?.stripe_id ?? "", // "acct_1NVCh3JEHBX7gOQA", // Example value, replace with your actual data
//         app_name: store?.store_name ?? ""// Example value, replace with your actual data
//       };
      
//       const response = await createPaymentIntent(paymentData);
//       // Handle successful response
//       setPaymentStatus('Payment successful!');
//       console.log(response)
//     } catch (error) {
//       // Handle error
//       setPaymentStatus('Payment failed!');
//       // setPaymentStatus(error);

//       console.error('Error creating payment intent:', error);
//     }





//   };


//     return (
//       <View  style={generalStyles.center}>

//         <Text style={{color: 'red'}}>{paymentStatus}</Text>

//         <TouchableOpacity style={styles.checkoutContainer} onPress={() => {handlePayment()}}>
//           <Text style={styles.buttonText}>Checkout</Text>
//         </TouchableOpacity>

        
        
//       </View>
//       )
//     }
// export default CheckoutButton

// const styles = StyleSheet.create({
//   checkoutContainer: {
//     backgroundColor: "black",//  "#E96E6E",
//     width: "100%",
//     marginVertical: 30,
//     borderRadius: 10
//   },
//   buttonText: {
//     fontSize: 20,
//     color: "white",
//     textAlign: "center",
//     padding: 10,
//     fontWeight: "700"


//   }
// })












// import {  StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import BackButton from './BackButton'
// import { createPaymentIntent } from '../../api/paymentApi'
// import Button from '../general/Button'
// import { COLORS } from '@/utils/theme'
// import { generalStyles } from '../general/Styles'
// import { stripeConverter } from '../../hook/stripeConverter'
// import { CONSTANTS } from '@/utils/constants'
// import { useAuth } from '../../contexts/AuthContext'
// import useFetchObjects from '../../hook/useFetchObjects'
// import { getStore,  } from '../../api/storeApi'
// import { CartContext } from '../../contexts/CartContext'

// interface PaymentButtonProp {
//   amount: number
//   shippingAmount: number
// }

 
// const CheckoutButton: FC<PaymentButtonProp> = (props) => {
//   const {authState, onLogout } = useAuth()
//   const [paymentStatus, setPaymentStatus] = useState('ijiij');
//   const { data: store, isLoading, error, refetch } = useFetchObjects(getStore);
//   const { deleteItemFromCart, addToCart , decreaseFromCart , quantity} = useContext(CartContext);

 
//   useEffect(() => {
//     refetch(); // Fetch store data when component mounts
//   }, [refetch]);

//   const handlePayment = useCallback(async () => {
//     if (!store) {
//       setPaymentStatus('Store data not available!');
//       return;
//     }

//     try {
//       const paymentData = {
//         amount: stripeConverter(props.amount * quantity),
//         currency: "USD",
//         shipping_fee: stripeConverter(props.shippingAmount),
//         stripe_id: "acct_1NVCh3JEHBX7gOQA",  // store.stripe_id,
//         app_name: CONSTANTS.appName,
//       };

//       const response = await createPaymentIntent(paymentData);
//       setPaymentStatus('Payment successful!');
//       console.log(response);
//     } catch (error) {
//       setPaymentStatus('Payment failed!');
//       console.error('Error creating payment intent:', error);
//     }
//   }, [store, props.amount, props.shippingAmount, quantity]);

//   useEffect(() => {
//     if (quantity > 0) {
//       handlePayment();
//     }
//   }, [quantity, handlePayment]);

//   if (isLoading) return <Text>Loading...</Text>;
//   if (error) return <Text>Error: {error}</Text>;


  


//     return (
//       <View  style={generalStyles.center}>

//         <Text style={{color: 'red'}}>{paymentStatus}</Text>

//         <TouchableOpacity style={styles.checkoutContainer} onPress={() => {handlePayment()}}>
//           <Text style={styles.buttonText}>Checkout</Text>
//         </TouchableOpacity>

        
        
//       </View>
//       )
//     }
// export default CheckoutButton

// const styles = StyleSheet.create({
//   checkoutContainer: {
//     backgroundColor: "black",//  "#E96E6E",
//     width: "100%",
//     marginVertical: 30,
//     borderRadius: 10
//   },
//   buttonText: {
//     fontSize: 20,
//     color: "white",
//     textAlign: "center",
//     padding: 10,
//     fontWeight: "700"


//   }
// })

