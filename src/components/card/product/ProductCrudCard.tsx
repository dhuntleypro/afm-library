import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native'
import React, { FC } from 'react'
// import { ProductModelProps } from '../../models/ProductModelProps';
import { useNavigation } from '@react-navigation/native';
// import { ProductModelProps } from '../../../models/ProductModelProps';
// import convertToCurrency from '../../../hook/convertToCurrency';
import { COLORS, SHADOWS, SIZES } from '@/utils/theme';
import { CONSTANTS } from '@/utils/constants';
import { Link } from 'expo-router';
// import { ProductModelProps } from '@/app/models/ProductModelProps';
import convertToCurrency from '@/hooks/convertToCurrency';
import { ProductModelProps } from '@/models/ProductModelProps';
// import { COLORS, SHADOWS, SIZES } from '@/utils/theme';
// import convertToCurrency from '@/hooks/convertToCurrency';;

export const ProductCrudCard: FC<ProductModelProps> = (item) => {
    const navigation = useNavigation();
    
    return (
    <View>
        
        {/* @ts-ignore */}
        <Link href={"productEdit/"}>
        <TouchableOpacity style={styles.container} onPress={() => {}}>

            <View style={styles.image}>
                <Image source={{uri: item.image ? item.image : CONSTANTS.holderImageProductCard}} style={styles.productImg} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.productTitle}>{item.name}</Text>
                <Text style={styles.supplier}>{convertToCurrency(item.price)}</Text>
            </View>
        </TouchableOpacity>
        </Link>
    </View>
  )
}

export default ProductCrudCard

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