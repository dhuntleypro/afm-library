import { Alert, Platform, StyleSheet, Text, View } from 'react-native'
import React, { FC, useContext, useEffect, useState } from 'react'
import { StripeProvider, usePlatformPay, PlatformPayButton, PlatformPay, usePaymentSheet } from '@stripe/stripe-react-native'
import { useFocusEffect } from '@react-navigation/native';
import { CartContext, useCart } from '@/contexts/CartContext';
import { stripeConverter } from '@/hooks/stripeConverter';
import { CONSTANTS } from '@/utils/constants';
import { createPaymentIntent } from '@/api/paymentApi';
import { useClientStore } from '@/contexts/ClientStoreContext';

 
interface PaymentPayScreenProps  {
    goBack?: () => void
    publishableKey: string
    amount: number
    shippingAmount: number
    
}


export const PaymentPayScreen: FC<PaymentPayScreenProps> = (props) => {
    const [ready, setReady] = useState(false)
    const [clientSecret, setClientSecret] = useState('')
    const { isPlatformPaySupported, confirmPlatformPayPayment } = usePlatformPay()
    // const { carts, totalSum, totalShipping, totalTax, grandTotal, deleteItemFromCart, clearData, decreaseFromCart} = useCart
    const { carts, totalSum, totalShipping, totalTax, grandTotal, deleteItemFromCart, clearData, decreaseFromCart} = useCart()

    const {store} = useClientStore()
    // const {initPaymentSheet, presentPaymentSheet, loading} = usePaymentSheet()

    useEffect(() => {
        setup()
        // initialisePaymentSheet()
        console.log("Payment set up completed")

    }, [])

    // useFocusEffect(
    //     React.useCallback(() => {
    //       // Run this function every time the screen comes into focus
    //       console.log('Screen focused');
    //      setup()
    //     // initialisePaymentSheet()
    //     console.log("Payment set up completed")

    //     }, [])
    //   );

    // const initialisePaymentSheet = async () => {
    //     const { paymentInent, ephemeralKey , customer } = await fetchPaymentSheet({

    //     })
    // }


    const setup = async () => {
        // Perform any setup here if needed
        if(!(await isPlatformPaySupported())) {
            // console.log
            Alert.alert(
                'Error',
                `${
                    Platform.OS === 'android' ? 'Google': 'Apple'
                } Pay is not supported. `
            )
            return
        } else {
           await isPlatformPaySupported()
           // setup()
            console.log("sorry..")
        }

        const paymentData = {
            amount: stripeConverter(props.amount), // Example value, replace with your actual data
            currency: "USD", // Example value, replace with your actual data
            shipping_fee: stripeConverter(props.shippingAmount), // Example value, replace with your actual data
            stripe_id: "acct_1NVCh3JEHBX7gOQA", //  store?.stripe_id ?? "", //"acct_1NVCh3JEHBX7gOQA", // Example value, replace with your actual data
            app_name: store?.store_name ?? "" // CONSTANTS.appName // Example value, replace with your actual data
          };

        const response = await createPaymentIntent(paymentData);

       // const result = response.json
        setClientSecret(response.clientSecret)
        // console.log(clientSecret)
        console.log(`This is the best button - ${response.clientSecret}`)
        setReady(true)
    }

    // async function buy() {
    //     if (ready == true) {
    //         setup()
    //     }
    //     setReady(false)

       

    //     const { error } = await confirmPlatformPayPayment(clientSecret, {
    //         applePay: {
    //             cartItems: carts.map(item => ({
    //                 label: store?.store_name, //  CONSTANTS.appName, // pay ....
    //                 amount: String(item.price),
    //                 paymentType: PlatformPay.PaymentType.Immediate
    //             })),

    //             // cartItems: [
    //             //     {
    //             //         label: CONSTANTS.appName,
    //             //         amount: String(props.amount), // '12',// 
    //             //         paymentType: PlatformPay.PaymentType.Immediate,
                        
             
                      
    //             //     }
    //             // ],
    //             merchantCountryCode: "US",
    //             currencyCode: 'USD',
            
    //             // requiredBillingContactFields: [
    //             //     ContactField.EmailAddress,
    //             //     ContactField.Name,
    //             //     ContactField.PhoneNumber,
    //             //     ContactField.PhoneticName,
    //             //     ContactField.PostalAddress
    //             // ]
                
                
    //         },
    //         googlePay: {
    //             testEnv: true,
    //             merchantName: 'My merchant name',
    //             merchantCountryCode: 'US',
    //             currencyCode: 'USD',
    //             billingAddressConfig: {
    //               format: PlatformPay.BillingAddressFormat.Full,
    //               isPhoneNumberRequired: true,
    //               isRequired: true,
    //             },
    //         },
        
    //     })

    async function buy() {
      try {
        if (ready) {
          await setup();  // Ensure setup is awaited
        }
        setReady(false);
    
        const { error } = await confirmPlatformPayPayment(clientSecret, {
          applePay: {
            cartItems: carts.map((item) => ({
              label: store?.store_name || 'Your Store Name', // Ensure fallback for label
              amount: String(item.price),
              paymentType: PlatformPay.PaymentType.Immediate,
            })),
            merchantCountryCode: 'US',
            currencyCode: 'USD',
          },
          googlePay: {
            testEnv: true,
            merchantName: 'My merchant name',
            merchantCountryCode: 'US',
            currencyCode: 'USD',
            billingAddressConfig: {
              format: PlatformPay.BillingAddressFormat.Full,
              isPhoneNumberRequired: true,
              isRequired: true,
            },
          },
        });
    
        if (error) {
          throw new Error(`Payment failed: ${error.message}`);
        }
    
        Alert.alert('Success', 'The payment was confirmed successfully');
        console.log('Success', 'The payment was confirmed successfully');
      } catch (error: any) {
        setReady(true); // Ensure ready is reset so the button can be used again
        console.error('Buy error:', error);
        Alert.alert('Payment Error', error.message || 'An error occurred during payment');
      }
    }
    
    return (
        <View style={{}}>
            <StripeProvider
                publishableKey={props.publishableKey}
                merchantIdentifier={CONSTANTS.merchant_id} // Use the correct constant
            >
                <View>
                     
                    <PlatformPayButton
                        onPress={buy}
                        disabled={!ready}
                        style={styles.payButton}
                       // appearance={PlatformPay.ButtonStyle.Black}
                        borderRadius={4}
                        type={5} //{PlatformPay.ButtonType.AddMoney}
                    />
                </View>
            </StripeProvider> 
        </View>
    )
}

export default PaymentPayScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red',
    },
    payButton: {
        backgroundColor: 'black',
        tintColor: 'red',
        width: '100%',
        height: 50,
        borderRadius: 5,
        color: 'red',
       
    },
    buttons: {
        marginTop: 20,
    }
})



// import { Alert, Platform, StyleSheet, Text, View } from 'react-native';
// import React, { FC, useContext, useEffect, useState } from 'react';
// import { StripeProvider, usePlatformPay, PlatformPayButton, PlatformPay } from '@stripe/stripe-react-native';
// import { useFocusEffect } from '@react-navigation/native';
// import { useCart } from '../../../contexts/CartContext';
// import { useClientStore } from '../../../contexts/ClientStoreContext';
// import { stripeConverter } from '../../../hooks/stripeConverter';
// import { createPaymentIntent } from '../../../api/paymentApi';
// import { CONSTANTS } from '../../../utils/constants';
// // import { CartContext } from '@/contexts/CartContext';
// // import { stripeConverter } from '@/hooks/stripeConverter';
// // import { CONSTANTS } from '@/utils/constants';
// // import { createPaymentIntent } from '@/api/paymentApi';
// // import { useClientStore } from '@/contexts/ClientStoreContext';
// // import { stripeConverter } from '@/hooks/stripeConverter';

// interface PaymentPayScreenProps {
//   goBack?: () => void;
//   publishableKey: string;
//   amount: number;
//   shippingAmount: number;
// }

// export const PaymentPayScreen: FC<PaymentPayScreenProps> = (props) => {
//   const [ready, setReady] = useState(false);
//   const [clientSecret, setClientSecret] = useState('');
//   const { isPlatformPaySupported, confirmPlatformPayPayment } = usePlatformPay();
//   const { store } = useClientStore();
//   const { carts, totalSum, totalShipping, totalTax, grandTotal, quantity, deleteItemFromCart, clearData, decreaseFromCart} = useCart()

//   useFocusEffect(
//     React.useCallback(() => {
//       console.log('Screen focused');
//       setup();
//     }, [])
//   );

//   const setup = async () => {
//     try {
//       if (!(await isPlatformPaySupported())) {
//         Alert.alert(
//           'Error',
//           `${Platform.OS === 'android' ? 'Google' : 'Apple'} Pay is not supported.`
//         );
//         return;
//       }

//       const paymentData = {
//         amount: stripeConverter(props.amount),
//         currency: 'USD',
//         shipping_fee: stripeConverter(props.shippingAmount),
//         stripe_id:  'acct_1NVCh3JEHBX7gOQA', // store?.stripe_id ??
//         app_name: store?.store_name ?? '',
//       };

//       const response = await createPaymentIntent(paymentData);
//       setClientSecret(response.clientSecret);
//       console.log(`Client Secret: ${response.clientSecret}`);
//       setReady(true);
//     } catch (error) {
//       console.error('Error during setup:', error);
//       Alert.alert('Setup Error', 'There was an error setting up the payment.');
//     }
//   };

//   const buy = async () => {
//     if (!ready) {
//       return;
//     }
    
//     setReady(false);

//     try {
//       const { error } = await confirmPlatformPayPayment(clientSecret, {
//         applePay: {
//           cartItems: carts.map(item => ({
//             label: store?.store_name ?? CONSTANTS.appName,
//             amount: String(item.price),
//             paymentType: PlatformPay.PaymentType.Immediate,
//           })),
//           merchantCountryCode: 'US',
//           currencyCode: 'USD',
//         },
//         googlePay: {
//           testEnv: true,
//           merchantName: 'My merchant name',
//           merchantCountryCode: 'US',
//           currencyCode: 'USD',
//           billingAddressConfig: {
//             format: PlatformPay.BillingAddressFormat.Full,
//             isPhoneNumberRequired: true,
//             isRequired: true,
//           },
//         },
//       });

//       if (error) {
//         setReady(true);
//         Alert.alert(`Error code: ${error.code}`, error.message);
//         console.log(`Error code: ${error.code}`, error.message);
//       } else {
//         Alert.alert('Success', 'The payment was confirmed successfully');
//         console.log('Success', 'The payment was confirmed successfully');
//       }
//     } catch (error) {
//       console.error('Payment error:', error);
//       Alert.alert('Payment Error', 'There was an error processing the payment.');
//       setReady(true);
//     }
//   };

//   return (
//     <View>
//     <View style={styles.container}>

//       <StripeProvider
//         publishableKey={props.publishableKey}
//         merchantIdentifier={CONSTANTS.merchant_id}
//       >
//         <PlatformPayButton
//           onPress={buy}
//           disabled={!ready}
//           style={styles.payButton}
//           borderRadius={4}
//           type={PlatformPay.ButtonType.Pay}
//         />
//       </StripeProvider>


//       </View>
//       </View>
//   );
// };

// export default PaymentPayScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   payButton: {
//     width: '100%',
//     height: 50,
//     borderRadius: 5,
//   },
// });


