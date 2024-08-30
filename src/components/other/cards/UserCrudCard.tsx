import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native'
import React, { FC } from 'react'
// import { UserProps } from '../../models/UserModelProps';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SHADOWS, SIZES } from '@/utils/theme';
import convertToCurrency from '@/hooks/convertToCurrency';;
import { UserProps } from '../../../models/UserProps';
import { CONSTANTS } from '@/utils/constants';

export const UserCrudCard: FC<UserProps> = (item) => {
    const navigation = useNavigation();
    
    return (
    <View>
        
        {/* @ts-ignore */}
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("EditUser" , { item })}>

            <View style={styles.image}>
                <Image source={{uri: item.profile_image ? item.profile_image : CONSTANTS.holderUserImage }} style={styles.userImg} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.userTitle}>{item.id}</Text>
                <Text style={styles.supplier}>{item.phone_number}</Text>
            </View>
        </TouchableOpacity>
    </View>
  )
}

export default UserCrudCard

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
    userImg: {
        width: '100%',
        height: 65,
        borderRadius: SIZES.small,
        resizeMode: "cover"
    },
    textContainer: {
        flex: 1,
        marginHorizontal: SIZES.medium
    },
    userTitle: {
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