import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '@/utils/theme'
import { SafeAreaView } from 'react-native-safe-area-context'
// import useFetchObject from '@/hooks/useFetchObject'
// import { StoreProps } from '@/app/models/StoreProps'
// import { getStore } from '../../api/storeApi'
// import { Constants } from '@stripe/stripe-react-native'
import { CONSTANTS } from '@/utils/constants'
import useFetchObject from '@/hooks/useFetchObject'
// import { StoreProps } from '@/models/StoreProps'
import { getStore } from '@/api/storeApi'
import { StoreModelProps } from '@/models/StoreModelProps'
import { useClientStore } from '@/contexts/ClientStoreContext'
// import { StoreProps } from '@/app/models/StoreProps'

const TopSectionHeaderV1 = () => {
  const { store } = useClientStore()
  // const { data: store } = useFetchObject<StoreModelProps>(() => getStore(CONSTANTS.store_id));
  // const { data: store } = useFetchObject<StoreProps>(() => getStore(authState?.user?.id));

  return (
    <View style={styles.container}>
        <Text style={styles.line1}>{store?.store_name}</Text>
        <Text style={[styles.line2, { marginTop: 0, color: COLORS.black }]}>We Build Apps</Text>
    </View>
  )
}


const TopSectionHeaderV2 = () => {
    return (
      <View style={styles.container}>
          <Text style={[styles.welcomeTxtStyle, { marginTop: 0, color: COLORS.black }]}>Apps For</Text>
          <Text style={[styles.welcomeTxtStyle, { marginTop: 0, color: COLORS.primary }]}>Mankind</Text>
      </View>
    )
  }

  
  const TopSectionHeaderV3 = () => {
    return (
      <View style={styles.container}>
          <Text style={[styles.welcomeTxtStyle, { marginTop: 0, color: COLORS.black }]}>Apps For</Text>
          <Text style={[styles.welcomeTxtStyle, { marginTop: 0, color: COLORS.primary }]}>Mankind</Text>
      </View>
    )
  }

  

  export { TopSectionHeaderV1, TopSectionHeaderV2, TopSectionHeaderV3 };

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginLeft: 15
      },
      line1: {
        marginTop: 0, 
        color: COLORS.gray , 
        fontSize: 14
      }, 
      line2: {
        marginTop: 0, 
        color: COLORS.black , 
        fontSize: 33,
        fontWeight: 700
      },
      line3: {
        marginTop: 0, 
        color: COLORS.black , 
        fontSize: 14
      },
      welcomeTxtStyle: {
        fontFamily: "bold",
        fontSize: SIZES.xxLarge -7, // Example value, replace with your own
        marginTop: 0, // Example value, replace with your own
        color:  '#000', // Use provided color or fallback to black if not provided
          marginHorizontal: 12
      },
})