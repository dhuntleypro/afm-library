import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "@/utils/theme";
// import { ProductModelProps } from "../../models/ProductModelProps";
import { useNavigation } from "@react-navigation/native";
// import useFetchObjects from "../../hook/useFetchObjects";
import ProductGridCardVOne from "@/components/card/product/ProductGridCardVOne";
import { useAuth } from "../../contexts/AuthContext";
import { ClientStateProps } from "../card/product/ProductRow";
import { CONSTANTS } from "@/utils/constants";
// import { getProducts } from "../../../api/productsApi";
// import { ProductModelProps } from "@/app/models/ProductModelProps";
import useFetchObjects from "@/hooks/useFetchObjects";
import { ProductModelProps } from "@/models/ProductModelProps";
import { useClientProduct } from "@/contexts/ClientProductContext";
// import { useProduct } from "@/contexts/ClientProductContext";
// import { getClientProducts } from "../../api/productsApi";

// const ProductList = () => {
  const ProductList: React.FC<ClientStateProps> = ({ client }) => {
    
  const navigation = useNavigation();
  const { authState } = useAuth();
  // const storeID = store?.id ?? ""// Replace 'CONSTANT_STORE_ID' with your constant store ID
  const email = authState?.user?.email || '';

  // const { data, isLoading, error, refetch } = useFetchObjects(() => getProducts(storeID, email));
  const { products, isLoading, error } = useClientProduct()
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.loadingContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <>
            <Text>Error Loading Data:</Text>
            {/* <Text>{error.message}</Text> */}
          </>
        ) : (
          <View style={styles.container}>
            <Text>Product List</Text>
            <FlatList
              keyExtractor={(item: ProductModelProps) => item.id} // Ensure id is a string or number
              data={products}
              renderItem={({ item }) => (
                <ProductGridCardVOne product={item} viewTypeGrid={true}  />)}
              horizontal
              contentContainerStyle={{ columnGap: SIZES.xSmall }}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginTop: SIZES.medium,
    // marginLeft: 12,
  },
  separator: {
    height: 16,
  },
});


















// import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
// import React, { FC } from 'react'
// import NewRivals from './NewRivals'
// import { NavigationProp } from '../../screens/ProductDetails'
// import useFetchObjects from '../../hook/useFetchObjects'
// import { getProducts } from '../../api/productsApi'
// import { COLORS, SIZES } from '@/utils/theme'
// import { FlatList } from 'react-native-gesture-handler'
// import ProductGridCardVOne from '../products/ProductGridCardVOne'
// import { ProductModelProps } from '../../models/ProductModelProps'
// import { SafeAreaView } from 'react-native-safe-area-context'

// const ProductList: FC<NavigationProp> = ({navigation}) => {

//     const { data, isLoading, error, refetch } = useFetchObjects(getProducts);

//     if(isLoading){
//         return (
//             <View style={styles.loadingContainer}>
//             <ActivityIndicator 
//                 size={SIZES.xxLarge}
//                 color={COLORS.primary}
//                 />
//             </View>
//         )
//     }

//     return (
//         <SafeAreaView>
//         <View style={styles.container}>
//         {/* <FlatList
//           keyExtractor={(item: ProductModelProps) => item.id} // Assuming id is a string or number
//           data={data}
//           renderItem={({ item }) => <ProductGridCardVOne {...item}  />}
//           horizontal
//           contentContainerStyle={styles.container}
//         /> */}
//         <Text>yoo</Text>
//         </View>
//         </SafeAreaView>
//     )
      
//     }


  

// export default ProductList

// const styles = StyleSheet.create({
//     loadingContainer: {

//     },
//     container: {

//     }
// })