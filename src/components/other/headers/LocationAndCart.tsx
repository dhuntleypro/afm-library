import React, { FC, useContext } from 'react'
import { COLORS, SIZES } from '@/utils/theme'
import { TouchableOpacity, Text, View , ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons , Fontisto} from '@expo/vector-icons'
// import { NavigationProp } from '../../screens/ProductDetails'
import { useNavigation } from '@react-navigation/native'
import { CartContext, useCart } from '../../../contexts/CartContext'

 const LocationAndCart = () => {
    const navigation = useNavigation()
    const { carts , quantity} = useCart()

    return (
    <View style={styles.appBarWrapper}>
    <View style={styles.appBar}>
        
    <TouchableOpacity onPressIn={() => navigation.navigate("ProductCrud" as never)} >

            <Ionicons name='location-outline' size={24}/>
        </TouchableOpacity>
      
        <Text style={styles.location}> New York</Text>
        <View style={{alignItems: "flex-end"}}>
            <View style={styles.cartCount}>
                <Text style={styles.cartNumber}>{quantity}</Text>
            </View>
            
            <TouchableOpacity onPressIn={() => navigation.navigate("Cart" as never)} >
                <Fontisto name='shopping-bag' size={24} />
            </TouchableOpacity>
        </View> 
    </View>
</View>

  )
}

export default LocationAndCart


const styles = StyleSheet.create({
    textStyle: {
        fontFamily: "bold",
        fontSize: 40
    },
    appBarWrapper: {
        marginHorizontal: 22,
        marginTop: SIZES.small
    },
    appBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    location: {
        fontFamily: "semibold",
        fontSize: SIZES.medium,
        color: COLORS.gray
    },
    cartCount: {
        position: "absolute",
        bottom: 16,
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: "center",
        backgroundColor: "blue",
        justifyContent: "center",
        zIndex: 999
    },
    cartNumber: {
        fontFamily: "regular",
        fontWeight: "600",
        fontSize: 10,
        color: COLORS.lightWhite
    }

})


