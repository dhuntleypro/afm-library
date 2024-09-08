import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native'
import React, { FC } from 'react'
// import { CouponModelProps } from '../../models/CouponModelProps';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SHADOWS, SIZES } from '@/utils/theme';
import { CouponModelProps } from '@/models/CouponModelProps';
// import convertToCurrency from '@/hooks/convertToCurrency';import { CouponModelProps } from '@/app/models/CouponModelProps';


export const CouponCrudCard: FC<CouponModelProps> = (item) => {
    const navigation = useNavigation();
    
    return (
    <View>
        
        {/* @ts-ignore */}
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("EditCoupon" , { item })}>

            <View style={styles.image}>
                {/* <Image source={{uri: item.}} style={styles.couponImg} /> */}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.couponTitle}>{item.title}</Text>
                <Text style={styles.supplier}>{(item.couponCode)}</Text>
            </View>
        </TouchableOpacity>
    </View>
  )
}

export default CouponCrudCard

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
    couponImg: {
        width: '100%',
        height: 65,
        borderRadius: SIZES.small,
        resizeMode: "cover"
    },
    textContainer: {
        flex: 1,
        marginHorizontal: SIZES.medium
    },
    couponTitle: {
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