import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useContext, useState } from 'react'
import { COLORS, SIZES } from '@/utils/theme'
// import { ProductModelProps } from '../../models/ProductModelProps'
import convertToCurrency from '@/hooks/convertToCurrency';
// import {  useCart } from '../../contexts/CartContext'
import { Ionicons , SimpleLineIcons} from "@expo/vector-icons"
// import { stripeConverter } from '../../hook/stripeConverter'
// import { useAuth } from '../../contexts/AuthContext'
// import { createPaymentIntent } from '../../api/paymentApi'
import { CONSTANTS } from '@/utils/constants'
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from "@/contexts/ThemeContext"

const CartCard = ({ item }: any) => {
    const { deleteItemFromCart, addToCart , decreaseFromCart, totalSum} = useCart()
    const [quantity, setQuantity] = useState(item.quantity);
    const {authState, onLogout} = useAuth()
    const [paymentStatus, setPaymentStatus] = useState('ijiij');

    const { colors } = useTheme()
    // Plus
    const increment = () => {
        // handlePayment(totalSum, 10)

        addToCart(item)
    };

    // Minus
    const decrement = () => {
        // handlePayment(totalSum, 10)
        if (item.quantity === 1) {
          // remove it or do nothing..
          console.log("do nothing")

        } else {
            console.log("remove 1")
            decreaseFromCart(item)
        }
    };

  
  
  
  
    // async function handlePayment(amount: number, shippingAmount: number) {
  
    //   //  WORKS GETTING CLIENT ID
    //   try {
    //     const paymentData = {
    //       amount: stripeConverter(amount), // Example value, replace with your actual data
    //       currency: "USD", // Example value, replace with your actual data
    //       shipping_fee: stripeConverter(shippingAmount), // Example value, replace with your actual data
    //       // (FIX) - USE STORE.STRIPE
    //       stripe_id: "acct_1NVCh3JEHBX7gOQA", // Example value, replace with your actual data
    //       app_name: CONSTANTS.appName // Example value, replace with your actual data
    //     };
        
    //     const response = await createPaymentIntent(paymentData);
    //     // Handle successful response
    //     setPaymentStatus('Payment successful!');
    //     console.log(response)
    //   } catch (error) {
    //     // Handle error
    //     setPaymentStatus('Payment failed!');
    //     // setPaymentStatus(error);
  
    //     console.error('Error creating payment intent:', error);
    //   }
    // };
  
        
    
const styles = StyleSheet.create({
    container: {
     marginVertical: 10,
     flexDirection: 'row'
    },
    img : {
      height: 125,
      width: "25%",
      borderRadius: 10
    },
    cardContent: {
        flex: 1,
        marginHorizontal: 10
    },
    title: {
        fontSize: 15,
        color: colors.title // "#444444"
    },
    price: {
        color: "#797979",
        marginVertical: 7,
        fontSize: 18
    },
    circleSizeContainer: {
        flexDirection: "row",
       
    },
    circle: {
        height: 32,
        width: 32,
        borderRadius: 16,
        backgroundColor: "#444444",
       
    },
    sizeCircle: {
        backgroundColor: "white",
        height: 32,
        width: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: "center",
       
    },
    sizeText: {
        fontSize: 18,
        fontWeight: "500"
    },
    rating : {
        top: SIZES.large,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        // marginHorizontal: SIZES.large
    
      }, 
      ratingText: {
        color: COLORS.gray,
        fontFamily: "medium",
         paddingHorizontal: SIZES.xSmall
      },
    
  })

  return (
   
      <View style={styles.container}>
     
        <Image style={styles.img} source={{uri: item.images[0]  ? item.images[0] : CONSTANTS.holderImage}}/>
        <View style={styles.cardContent}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.price}>{convertToCurrency(item.price)} x {item.quantity}</Text>
            {/* <Text style={styles.price}>{convertToCurrency(item.price * item.quantity) }</Text> */}
            
            {/* <View style={styles.circleSizeContainer}>
                <View style={styles.circle} />
            </View>  */}
                
<View style={styles.rating}>
        <TouchableOpacity onPress={()=>increment()}>
          <SimpleLineIcons  style={{color: item.quantity === 1 ? colors.title : colors.title }}  name='plus' size={20} />
        </TouchableOpacity>

        <Text style={styles.ratingText}>{item.quantity}</Text>

        <TouchableOpacity  onPress={()=> decrement()}>
          <SimpleLineIcons style={{color: item.quantity === 1 ? 'gray': colors.title}} name='minus' size={20} />
        </TouchableOpacity>
 

                {/* <View style={styles.sizeCircle}> */}
                    {/* <Text style={styles.sizeText}>L</Text>
                </View>    */}

              
            </View>

        </View>
        <TouchableOpacity onPress={() => deleteItemFromCart(item)}>
            <Ionicons name='trash-outline' size={SIZES.xLarge} color={colors.title}/>
        </TouchableOpacity>    

        <View>

        </View>
      </View>
  
  )
}

export default CartCard
