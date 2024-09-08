import { StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native'
import React, { FC } from 'react'
import { COLORS, SIZES } from '@/utils/theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from "@expo/vector-icons"
// import { NavigationProp } from '../../screens/ProductDetails'
import BackButton from '../other/buttons/BackButton'
// import { ProductModelProps } from '../../models/ProductModelProps'
// import SearchTile from '../products/SearchTile'
// import useFetchObjects from '../../hook/useFetchObjects'
// import { getProducts } from '../../../api/productsApi'
// import useFetchObjects from '../../hook/useFetchObjects'
import SearchTile from '../card/search/SearchTile'
import { useAuth } from '../../contexts/AuthContext'
import { CONSTANTS } from '@/utils/constants'
import useFetchObjects from '@/hooks/useFetchObjects'
import { ProductModelProps } from '@/models/ProductModelProps'
import { useClientProduct } from '@/contexts/ClientProductContext'
import { useClientStore } from '@/contexts/ClientStoreContext'
// import { ProductModelProps } from '@/app/models/ProductModelProps'


const NewRivals = () => {
    // const navigation = useNavigation()
    const { authState, onLogout } = useAuth()
    const { store } = useClientStore()
    const storeID = authState?.user ? authState.user.store_owner_id : '';
    const email = authState?.user ? authState.user.email : '';
    // const { data: products, isLoading, error, refetch } = useFetchObjects(getProducts);
    // const { data: products, isLoading, error, refetch } = useFetchObjects(() => getProducts(CONSTANTS.mankind_store_id,email));
  
    const { products } = useClientProduct()
    return (
      <SafeAreaView style={styles.container}>
        <BackButton title={'Home'} />
      <View style={{paddingTop: 16}}>
        <Text style={styles.title}>{store?.store_type ?? ""}</Text>
      </View>
        <FlatList
          keyExtractor={(item: ProductModelProps) => item.id}
          data={products}
          renderItem={({ item }) => <SearchTile {...item} />}
          contentContainerStyle={{ marginHorizontal: 12 }}
        />

          {/* <View  style={styles.wrapper}>
              <View  style={styles.upperRow}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name='chevron-back-circle' size={30} color={COLORS.lightWhite}/>
                  </TouchableOpacity>
                  <Text style={styles.heading}>Products</Text>
              </View>
          </View> */}
      </SafeAreaView>
    )
  }
  
  export default NewRivals
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: COLORS.lightWhite
      },
      title: {
        fontWeight: '700',
        fontSize: 25,
        paddingHorizontal: 20,
        paddingBottom: 20
      }
  })