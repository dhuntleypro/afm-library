import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { COLORS } from '@/utils/theme'
// import { Status } from '@stripe/stripe-react-native/lib/typescript/src/types/PaymentIntent'
import { Ionicons , Fontisto} from '@expo/vector-icons'
// import { NavigationProp } from '../../screens/ProductDetails'
import { useNavigation } from '@react-navigation/native'

const MenuAndCart = () => {
    const navigation = useNavigation()

  return (
    <View style={styles.container}>
        {/* <StatusBar /> */}
        <View style={styles.itemsContainer}>
            <TouchableOpacity style={styles.menuItem} onPressIn={() => navigation.navigate("ProductCrud" as never)} >
                <Ionicons name='location-outline' size={24}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cartItem} onPressIn={() => navigation.navigate("Cart" as never)} >
                <Fontisto name='shopping-bag' size={24} />
            </TouchableOpacity>

             
        </View>
    </View>
  )
}

export default MenuAndCart

const styles = StyleSheet.create({
    container: {
      
    },
    itemsContainer: {
        width: '100%',
       flexDirection: 'row',
       justifyContent: 'space-between',
       padding: 16
     },
     menuItem: {
        fontSize: 18,
        color: COLORS.backgroundMedium,
        padding: 12,
        borderRadius: 10,
        backgroundColor: COLORS.backgroundLight
     },
     cartItem: {
        fontSize: 18,
        color: COLORS.backgroundMedium,
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: COLORS.backgroundLight
     }
 

})