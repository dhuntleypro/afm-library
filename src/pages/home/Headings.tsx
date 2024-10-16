import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '@/utils/theme'
import { Ionicons } from "@expo/vector-icons"
import { Link } from 'expo-router'
import { useClientStore } from '@/contexts/ClientStoreContext'
import { ROUTES } from '@/utils/Routes'
// import EditScreenInfo from '../EditScreenInfo'

const SectionHeader = () => {
    const { store } = useClientStore()

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{store?.store_type ?? ""}</Text>
            <Link href={ROUTES.products as never} asChild>
            <TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate("ProductDetails", { item })}> */}
                    <Ionicons name='grid' size={SIZES.xLarge} color={COLORS.primary}/>
            </TouchableOpacity>
            </Link>
        </View>
   
    </View>
  )
}

export default SectionHeader

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.medium,
        // marginBottom: SIZES.xSmall,
        marginHorizontal: 12,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between"

    },
    headerTitle: {
       fontWeight: 'bold',
        fontSize: SIZES.xLarge -2
    }
})


