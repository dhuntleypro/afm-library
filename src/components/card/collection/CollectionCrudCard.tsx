import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native'
import React, { FC } from 'react'
// import { CollectionModelProps } from '../../models/CollectionModelProps';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SHADOWS, SIZES } from '@/utils/theme';
// import convertToCurrency from '@/hooks/convertToCurrency';;
import { CONSTANTS } from '@/utils/constants';
// import { CollectionModelProps } from '@/app/models/CollectionModelProps';
import convertToCurrency from '@/hooks/convertToCurrency';
import { CollectionModelProps } from '@/models/CollectionModelProps';

export const CollectionCrudCard: FC<CollectionModelProps> = (item) => {
    const navigation = useNavigation();
    
    return (
    <View>
        
        {/* @ts-ignore */}
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("EditCollection" , { item })}>

            <View style={styles.image}>
                <Image source={{uri: item.image ? item.image : CONSTANTS.holderImageCollectionCard }} style={styles.collectionImg} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.collectionTitle}>{item.title}</Text>
                <Text style={styles.supplier}>{convertToCurrency(item.amount)}</Text>
            </View>
        </TouchableOpacity>
    </View>
  )
}

export default CollectionCrudCard

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
    collectionImg: {
        width: '100%',
        height: 65,
        borderRadius: SIZES.small,
        resizeMode: "cover"
    },
    textContainer: {
        flex: 1,
        marginHorizontal: SIZES.medium
    },
    collectionTitle: {
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