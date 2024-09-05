


import React, { FC, useContext } from 'react'
import { COLORS, SIZES } from '@/utils/theme'
import { TouchableOpacity, Text, View , ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons , Fontisto} from '@expo/vector-icons'
// import { NavigationProp } from '../../screens/ProductDetails'
import { useNavigation } from '@react-navigation/native'
// import { Avatar } from 'react-native-paper'
import { CartContext, useCart } from '../../../contexts/CartContext'

 const CartHeader = () => {
    const navigation = useNavigation()
    const { quantity } = useCart()

    return (
    <View style={styles.appBarWrapper}>
    <View style={styles.appBar}>
        
        <TouchableOpacity onPressIn={() => navigation.navigate("Home" as never)} >
            <Ionicons name='chevron-back' size={30}/>
        </TouchableOpacity>
      
        <Text style={styles.location}>My Cart</Text>
        <View style={{alignItems: "flex-end" , borderRadius: 30,
}}>
            {/* <View style={styles.cartCount}> */}
            {/* <Text style={styles.cartNumber}>{quantity}</Text> */}
            {/* <Text>Keep shopping</Text> */}
            <Text style={{paddingRight: 10}}>{quantity}</Text>
            {/* </View> */}
            
            {/* <Avatar.Image source={{uri: 'https://appsformankind-assets.s3.amazonaws.com/Collections/Furniture/Furniture_1.jpg'}} size={40}/> */}

        </View> 
    </View> 
</View>

  )
}

export default CartHeader


const styles = StyleSheet.create({
    textStyle: {
        fontFamily: "bold",
        fontSize: 40
    },
    appBarWrapper: {
        // marginHorizontal: 22,
        // marginTop: SIZES.small
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
        height: 30,
        borderRadius: 8,
        alignItems: "center",
        backgroundColor: "green",
        justifyContent: "center",
        zIndex: 999
    },
    cartNumber: {
        fontFamily: "regular",
        fontWeight: "600",
        fontSize: 20,

        color: COLORS.white,
        backgroundColor: COLORS.primary,
        padding: 10,

    }

})


