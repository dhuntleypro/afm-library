import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native'
import React, { FC } from 'react'
// import { OrderModelProps } from '../../models/OrderModelProps';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SHADOWS, SIZES } from '@/utils/theme';
import convertToCurrency from '@/hooks/convertToCurrency';;
import { CONSTANTS } from '@/utils/constants';
import { OrderModelProps } from '@/models/OrderModelProps';
// import { OrderModelProps } from '@/app/models/OrderModelProps';

const OrderCrudCard: FC<OrderModelProps> = (item) => {
    const navigation = useNavigation();
    
    return (
    <View>
        
        {/* @ts-ignore */}
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("EditOrder" , { item })}>

            <View style={styles.image}>
                <Image source={{uri: CONSTANTS.holderImageOrderCard }} style={styles.orderImg} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.orderTitle}>{item.title}</Text>
                <Text style={styles.supplier}>{convertToCurrency(item.total)}</Text>
            </View>
        </TouchableOpacity>
    </View>
  )
}

export default OrderCrudCard

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
    orderImg: {
        width: '100%',
        height: 65,
        borderRadius: SIZES.small,
        resizeMode: "cover"
    },
    textContainer: {
        flex: 1,
        marginHorizontal: SIZES.medium
    },
    orderTitle: {
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