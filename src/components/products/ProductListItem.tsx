import { StyleSheet, Text, View , Image, TouchableOpacity, Pressable} from 'react-native'
import React, { FC } from 'react'
import { ProductModelProps } from '../../models/ProductModelProps';
import convertToCurrency from '../../hooks/convertToCurrency';;
import { CONSTANTS } from '../../utils/constants';
import { COLORS, SHADOWS, SIZES } from '../../utils/theme';
import { Link, router } from 'expo-router';
// import { CONSTANTS } from '@/utils/constants'; 
// import { COLORS, SHADOWS, SIZES } from '@/utils/theme';
// 

const ProductListItem: FC<ProductModelProps> = (item) => {
    // const navigation = useNavigation();
  return (
    <View>
        <Link href={`products/${item.id}` as never} asChild>
        {/* <Link href={`products/${item.id}`} asChild> */}

        {/* @ts-ignore */}
      
        {/* <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("ProductDetails" , { item })}> */}
        <Pressable style={styles.container} >
            <View style={styles.image}>
                <Image source={{uri: item.image  ? item.image : CONSTANTS.holderImageProductCard}} style={styles.productImg} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.productTitle}>{item.name}</Text>
                <Text style={styles.supplier}>{item.color_code}</Text>
                <Text style={styles.supplier}>{convertToCurrency(item.price)}</Text>
            </View>
        </Pressable>
     </Link>
    </View>
  )
}

export default ProductListItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: SIZES.small,
        flexDirection: "row",
        padding: SIZES.medium,
        borderRadius: SIZES.small,
        backgroundColor: "#fff",
        ...SHADOWS.medium,
        shadowColor: COLORS.lightWhite,
        // height: 120
    },
    image: {
        width: 70,
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignContent: "center"
    },
    productImg: {
        width: '100%',
        height: 65,
        borderRadius: SIZES.small,
        resizeMode: "cover"
    },
    textContainer: {
        flex: 1,
        marginHorizontal: SIZES.medium
    },
    productTitle: {
        fontSize: SIZES.medium,
        fontFamily: "bold",
        color: COLORS.primary

    },
    supplier: {
        fontSize: SIZES.small + 2,
        fontFamily: "bold",
        color: COLORS.gray,
        marginTop: 3

    }
})