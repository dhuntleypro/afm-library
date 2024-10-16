import React, { FC } from 'react'
import { TouchableOpacity, Text, View , ScrollView } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from "react-native";
// import { COLORS, SIZES } from "../utils/theme";


import ProductRow from '@/components/other/cards/other/ProductRow';
import { COLORS, SIZES } from '@/utils/theme';
import { TopSectionHeaderV1 } from '@/pages/home/TopSectionHeader';
import Carousel from '@/pages/home/Carousel';
import SectionHeader from '@/pages/home/Headings';
// import { useClientStore } from '@/contexts/ClientStoreContext';
// import SearchBar from '../search/SearchBar';
import SearchBarVOne from '../search/SearchBarVOne';


const HomeDesignOne = () => {
    // const { store } = useClientStore()

    return (
 
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          style={{
            backgroundColor: 'white',
            paddingTop: 10

            
          }}>
            <TopSectionHeaderV1 />
            <SearchBarVOne />
            <Carousel />
            <SectionHeader /> 
           <ProductRow client={false} />
           <View style={{paddingBottom: 200}}></View>

        </ScrollView>
  

  )
}


export default HomeDesignOne 



const styles = StyleSheet.create({
  textStyle: {
      fontFamily: "bold",
      fontSize: 40
  },
  appBarWrapper: {
      marginHorizontal: 22,
      marginTop: SIZES.small
  },
  appBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
  },
  location: {
      fontFamily: "semibold",
      fontSize: SIZES.medium,
      color: COLORS.gray
  },
  cartCount: {
      position: "absolute",
      bottom: 16,
      width: 16,
      height: 16,
      borderRadius: 8,
      alignItems: "center",
      backgroundColor: "green",
      justifyContent: "center",
      zIndex: 999
  },
  cartNumber: {
      fontFamily: "regular",
      fontWeight: "600",
      fontSize: 10,
      color: COLORS.lightWhite
  }

})
// function useClientStore(): { store: any; } {
//     throw new Error('Function not implemented.');
// }

