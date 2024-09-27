import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { COLORS, SIZES } from '@/utils/theme';
import { ProductModelProps } from '@/models/ProductModelProps';
import { ProductCardV2 } from '@/components/card/product/ProductCardV2';
import { useClientProduct } from '@/contexts/ClientProductContext';

const { width } = Dimensions.get('window');

const CollectionProductSearchScreen = () => {
  const { authState } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<ProductModelProps[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null); // Track selected product ID

  const storeID = authState?.user ? authState.user.store_owner_id : '';
  const email = authState?.user ? authState.user.email : '';

  const { products } = useClientProduct();

  const handleSearch = (text: string) => {
    try {
      setSearchTerm(text);
      const results = products.filter((product: ProductModelProps) =>
        product.name.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(results);
    } catch (error) {
      console.log("Failed to get products", error);
    }
  };

  const handleProductSelect = (id: string) => {
    setSelectedProductId(id); // Set the selected product ID
  };

  const isProductSelected = (id: string) => id === selectedProductId; // Check if a product is selected

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons 
            name='camera-outline' 
            size={SIZES.xLarge} 
            style={styles.searchIcon}
          />
        </TouchableOpacity>

        <View style={styles.searchWrapper}>
          <TextInput 
            style={styles.searchInput} 
            value={searchTerm}
            onChangeText={handleSearch}
            placeholder='What are you looking for 1'
          />
        </View>

        <View>
          <TouchableOpacity style={styles.searchBtn} onPress={() => handleSearch(searchTerm)}>
            <Feather name='search' size={24} color={COLORS.offwhite}/>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search result */}
      <FlatList
        keyExtractor={(item: ProductModelProps) => item.id}
        data={searchTerm === '' ? products : (searchResults.length === 0 ? products : searchResults)}
        renderItem={({ item }) => (
          <View style={[
            styles.gridLayout,
            isProductSelected(item.id) ? styles.selected : {} // Apply selected style
          ]}>
            <TouchableOpacity onPress={() => handleProductSelect(item.id)}>
              <ProductCardV2 {...item} />
            </TouchableOpacity>
          </View>
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      />
    </SafeAreaView>
  );
};

export default CollectionProductSearchScreen;

export const styles = StyleSheet.create({
  gridLayout: {
    flex: 1,
    margin: 8, // Adjust the margin to space items evenly
    borderRadius: 10,
    borderColor: COLORS.gray,
    borderWidth: 2, // Default border
  },
  selected: {
    borderColor: COLORS.primary, // Highlight the selected product
    borderWidth: 3, // Increase border width for selected product
  },
  row: {
    justifyContent: 'space-between', // Ensure even spacing between items
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: SIZES.small,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    height: 50
  },
  searchIcon: {
    marginHorizontal: 10,
    color: COLORS.gray,
    marginTop: SIZES.small
  },
  searchWrapper:{ 
    flex: 1,
    backgroundColor: COLORS.secondary,
    marginRight: SIZES.small,
    borderRadius: SIZES.small
  },
  searchInput: {
    fontFamily: "regular",
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.small
  },
  searchBtn: {
    width: 50,
    height: "100%",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary
  }
});



























// colr indcator for currentlt selected ??
// import React, { useState } from 'react';
// import { SafeAreaView, View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
// import { Feather, Ionicons } from '@expo/vector-icons';
// // import { getProducts } from '../../../api/productsApi';
// import { useAuth } from '@/contexts/AuthContext';
// import { COLORS, SIZES } from '@/utils/theme';
// import { CONSTANTS } from '@/utils/constants';
// import { ProductModelProps } from '@/models/ProductModelProps';
// import {ProductCardV2} from '@/components/card/product/ProductCardV2';
// import { useClientProduct } from '@/contexts/ClientProductContext';

// const { width } = Dimensions.get('window');

// const CollectionProductSearchScreen = () => {
//   const { authState } = useAuth();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState<ProductModelProps[]>([]);

//   const storeID = authState?.user ? authState.user.store_owner_id : '';
//   const email = authState?.user ? authState.user.email : '';

//   const { products } = useClientProduct();

//   const handleSearch = (text: string) => {
//     try {
//       setSearchTerm(text);
//       const results = products.filter((product: ProductModelProps) =>
//         product.name.toLowerCase().includes(text.toLowerCase())
//       );
//       setSearchResults(results);
//     } catch (error) {
//       console.log("Failed to get products", error);
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={styles.searchContainer}>
//         <TouchableOpacity>
//           <Ionicons 
//             name='camera-outline' 
//             size={SIZES.xLarge} 
//             style={styles.searchIcon}
//           />
//         </TouchableOpacity>

//         <View style={styles.searchWrapper}>
//           <TextInput 
//             style={styles.searchInput} 
//             value={searchTerm}
//             onChangeText={handleSearch}
//             placeholder='What are you looking for 1'
//           />
//         </View>

//         <View>
//           <TouchableOpacity style={styles.searchBtn} onPress={() => handleSearch(searchTerm)}>
//             <Feather name='search' size={24} color={COLORS.offwhite}/>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Search result */}
//       <FlatList
//         keyExtractor={(item: ProductModelProps) => item.id}
//         data={searchTerm === '' ? products : (searchResults.length === 0 ? products : searchResults)}
//         renderItem={({ item }) => (
//           <View style={styles.gridLayout}>
//             <ProductCardV2 {...item} />
//           </View>
//         )}
//         numColumns={2}
//         columnWrapperStyle={styles.row}
//         contentContainerStyle={{ paddingHorizontal: 12 }}
//       />
//     </SafeAreaView>
//   );
// };

// export default CollectionProductSearchScreen;

// export const styles = StyleSheet.create({
//   gridLayout: {
//     flex: 1,
//     margin: 8, // Adjust the margin to space items evenly
//   },
//   row: {
//     justifyContent: 'space-between', // Ensure even spacing between items
//   },
//   searchContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignContent: "center",
//     marginHorizontal: SIZES.small,
//     backgroundColor: COLORS.secondary,
//     borderRadius: SIZES.medium,
//     marginVertical: SIZES.medium,
//     height: 50
//   },
//   searchIcon: {
//     marginHorizontal: 10,
//     color: COLORS.gray,
//     marginTop: SIZES.small
//   },
//   searchWrapper:{ 
//     flex: 1,
//     backgroundColor: COLORS.secondary,
//     marginRight: SIZES.small,
//     borderRadius: SIZES.small
//   },
//   searchInput: {
//     fontFamily: "regular",
//     width: "100%",
//     height: "100%",
//     paddingHorizontal: SIZES.small
//   },
//   searchBtn: {
//     width: 50,
//     height: "100%",
//     borderRadius: SIZES.medium,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: COLORS.primary
//   }
// })














// // import React, { useState } from 'react';
// // import { SafeAreaView, View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
// // import { Feather, Ionicons } from '@expo/vector-icons';
// // import { getProducts } from '../../../api/productsApi';
// // import { useAuth } from '@/contexts/AuthContext';
// // import { COLORS, SIZES } from '@/utils/theme';
// // // import ProductListItem from './ProductListItem';
// // import { CONSTANTS } from '@/utils/constants';
// // import { ProductModelProps } from '@/models/ProductModelProps';
// // // import { useClientProduct } from '@/contexts/ClientProductContext';
// // import ProductListItem from './ProductSearchTile';
// // import ProductCardV2 from '../../library/card/ProductCardV2';
// // import { useClientProduct } from '@/contexts/ClientProductContext';

// // const { width } = Dimensions.get('window');


// // const ProductSearchScreen = () => {
// //   const { authState } = useAuth();
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [searchResults, setSearchResults] = useState<ProductModelProps[]>([]);

// //   const storeID = authState?.user ? authState.user.store_owner_id : '';
// //   const email = authState?.user ? authState.user.email : '';

// //   const { products } = useClientProduct();

// //   const handleSearch = (text: string) => {
// //     try {
// //       setSearchTerm(text);
// //       const results = products.filter((product: ProductModelProps) =>
// //         product.name.toLowerCase().includes(text.toLowerCase())
// //       );
// //       setSearchResults(results);
// //     } catch (error) {
// //       console.log("Failed to get products", error);
// //     }
// //   };

// //   return (
// //     <SafeAreaView style={{ flex: 1 }}>
// //       <View style={styles.searchContainer}>
// //         <TouchableOpacity>
// //           <Ionicons 
// //             name='camera-outline' 
// //             size={SIZES.xLarge} 
// //             style={styles.searchIcon}
// //           />
// //         </TouchableOpacity>

// //         <View style={styles.searchWrapper}>
// //           <TextInput 
// //             style={styles.searchInput} 
// //             value={searchTerm}
// //             onChangeText={handleSearch}
// //             placeholder='What are you looking for'
// //           />
// //         </View>

// //         <View>
// //           <TouchableOpacity style={styles.searchBtn} onPress={() => handleSearch(searchTerm)}>
// //             <Feather name='search' size={24} color={COLORS.offwhite}/>
// //           </TouchableOpacity>
// //         </View>
// //       </View>

// //       {/* Search result */}
// //       {searchTerm === '' ? (
// //         <FlatList
// //           keyExtractor={(item: ProductModelProps) => item.id}
// //           data={products}
// //           // renderItem={({ item }) => <ProductListItem {...item} />}
// //           renderItem={({ item }) => (
          
// //             <View style={styles.gridLayout}>
// //           <ProductCardV2 {...item} />
// //           </View>

// //           )}
// //           contentContainerStyle={{ marginHorizontal: 12 }}
// //         />
// //       ) : (
// //         <FlatList
// //           keyExtractor={(item: ProductModelProps) => item.id}
// //           data={searchResults.length === 0 ? products : searchResults}
// //           // renderItem={({ item }) => <ProductListItem {...item} />}
// //           renderItem={({ item }) => (
          
// //             <View style={styles.gridLayout}>
// //           <ProductCardV2 {...item} />
// //           </View>

// //           )}
// //           contentContainerStyle={{ marginHorizontal: 12 }}
// //         />
// //       )}
// //     </SafeAreaView>
// //   );
// // };

// // export default ProductSearchScreen;

// // export const styles = StyleSheet.create({
// //   gridLayout: {
// //     width: (width / 2) - 18, // Adjust the width to leave space for margins
// //     marginBottom: 12,
// //   },
// //     searchContainer: {
// //         flexDirection: "row",
// //         justifyContent: "center",
// //         alignContent: "center",
// //         marginHorizontal: SIZES.small,
// //         backgroundColor: COLORS.secondary,
// //         borderRadius: SIZES.medium,
// //         marginVertical: SIZES.medium,
// //         height: 50

// //     },
// //     searchIcon: {
// //         marginHorizontal: 10,
// //         color: COLORS.gray,
// //         marginTop: SIZES.small
// //     },
// //     searchWrapper:{ 
// //         flex: 1,
// //         backgroundColor: COLORS.secondary,
// //         marginRight: SIZES.small,
// //         borderRadius: SIZES.small
// //     },
// //     searchInput: {
// //         fontFamily: "regular",
// //         width: "100%",
// //         height: "100%",
// //         paddingHorizontal: SIZES.small
// //     },
// //     searchBtn: {
// //         width: 50,
// //         height: "100%",
// //         borderRadius: SIZES.medium,
// //         justifyContent: "center",
// //         alignItems: "center",
// //         backgroundColor: COLORS.primary
// //     }
// // })
