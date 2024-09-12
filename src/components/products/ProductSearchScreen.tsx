import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { COLORS, SIZES } from '@/utils/theme';
import { ProductModelProps } from '@/models/ProductModelProps';
import { useClientProduct } from '@/contexts/ClientProductContext';
import ProductGridCardVOne from '@/components/card/product/ProductGridCardVOne';
import { useTheme } from '@/contexts/ThemeContext';
import SearchBarVTwo from '../search/SearchBarVTwo';

const { width } = Dimensions.get('window');

const ProductSearchScreen = () => {
  const { authState } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<ProductModelProps[]>([]);

  const { products } = useClientProduct();
  const { colors } = useTheme();

  const handleSearch = (text: string) => {
    try {
      setSearchTerm(text);
      const results = products.filter((product: ProductModelProps) =>
        product.name.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(results);
    } catch (error) {
      console.log('Failed to get products', error);
    }
  };

  const styles = StyleSheet.create({

    flatListContent: {
      paddingHorizontal: 16, // Adjust padding to make it even on both sides
    },
    row: {
      justifyContent: 'space-between', // Ensure items are evenly spaced between columns
    },
    container: {
      width: (width / 2) - 24, // Half of the screen width minus some padding to fit two items per row
      height: 250,
      marginBottom: 16, // Space between rows
      backgroundColor: colors.cardBackground,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    gridLayout: {
      marginBottom: 16,
    },
    imageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      overflow: 'hidden',
      marginTop: 10,
    },
    image: {
      width: 140,
      height: 140,
      borderRadius: 10,
      resizeMode: 'cover',
    },
    details: {
      padding: 10,
    },
    title: {
      fontFamily: 'bold',
      fontSize: 14,
      marginBottom: 2,
      height: 35,
      color: colors.title,
    },
    supplier: {
      fontFamily: 'regular',
      fontSize: 12,
      color: colors.title,
    },
    price: {
      fontFamily: 'bold',
      fontSize: 16,
      color: colors.title,
    },
    addBtn: {
      position: 'absolute',
      bottom: 10,
      right: 10,
    },
  });

  return (
    <View>
     <SearchBarVTwo searchTerm={searchTerm} handleSearch={handleSearch} />

      {/* Search result */}
      <FlatList
        keyExtractor={(item: ProductModelProps) => item.id}
        data={searchTerm === '' ? products : (searchResults.length === 0 ? products : searchResults)}
        renderItem={({ item }) => (
          <ProductGridCardVOne product={item} viewTypeGrid={true} />
        )}
        numColumns={2}
        columnWrapperStyle={styles.row} // Ensure even spacing between columns
        contentContainerStyle={styles.flatListContent} // Padding for both sides of the list
      />
    </View>
  );
};

export default ProductSearchScreen;










// import React, { useState } from 'react';
// import { SafeAreaView, View, TextInput, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
// import { Feather, Ionicons } from '@expo/vector-icons';
// import { useAuth } from '@/contexts/AuthContext';
// import { COLORS, SIZES } from '@/utils/theme';
// import { ProductModelProps } from '@/models/ProductModelProps';
// import { useClientProduct } from '@/contexts/ClientProductContext';
// import ProductGridCardVOne from '@/components/card/product/ProductGridCardVOne';
// import { useTheme } from '@/contexts/ThemeContext';

// const { width } = Dimensions.get('window');

// const ProductSearchScreen = () => {
//   const { authState } = useAuth();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState<ProductModelProps[]>([]);

//   const storeID = authState?.user ? authState.user.store_owner_id : '';
//   const email = authState?.user ? authState.user.email : '';

//   const { products } = useClientProduct();
//   const { colors } = useTheme();

//   const handleSearch = (text: string) => {
//     try {
//       setSearchTerm(text);
//       const results = products.filter((product: ProductModelProps) =>
//         product.name.toLowerCase().includes(text.toLowerCase())
//       );
//       setSearchResults(results);
//     } catch (error) {
//       console.log('Failed to get products', error);
//     }
//   };

//   const styles = StyleSheet.create({
//     searchContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       padding: SIZES.medium,
//       backgroundColor: colors.background,
//     },
//     searchIcon: {
//       marginRight: SIZES.small,
//       color: colors.title,
//     },
//     searchWrapper: {
//       flex: 1,
//       backgroundColor: colors.cardBackground,
//       borderRadius: SIZES.medium,
//       marginRight: SIZES.small,
//       height: 40,
//       justifyContent: 'center',
//     },
//     searchInput: {
//       paddingLeft: SIZES.small,
//       color: colors.title,
//     },
//     searchBtn: {
//       backgroundColor: COLORS.primary,
//       padding: SIZES.small,
//       borderRadius: SIZES.medium,
//     },
//     flatListContent: {
//       paddingHorizontal: 16, // Adjust padding to make it even on both sides
//     },
//     row: {
//       justifyContent: 'space-between', // Ensure items are evenly spaced between columns
//     },
//     container: {
//       width: (width / 2) - 24, // Adjust container width to make items fit the grid properly
//       height: 250,
//       marginBottom: 16, // Space between rows
//       backgroundColor: colors.cardBackground,
//       borderRadius: 10,
//       borderWidth: 1,
//       borderColor: colors.border,
//       overflow: 'hidden',
//     },
//     gridLayout: {
//       marginBottom: 16,
//     },
//     imageContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderRadius: 10,
//       overflow: 'hidden',
//       marginTop: 10,
//     },
//     image: {
//       width: 140,
//       height: 140,
//       borderRadius: 10,
//       resizeMode: 'cover',
//     },
//     details: {
//       padding: 10,
//     },
//     title: {
//       fontFamily: 'bold',
//       fontSize: 14,
//       marginBottom: 2,
//       height: 35,
//       color: colors.title,
//     },
//     supplier: {
//       fontFamily: 'regular',
//       fontSize: 12,
//       color: colors.title,
//     },
//     price: {
//       fontFamily: 'bold',
//       fontSize: 16,
//       color: colors.title,
//     },
//     addBtn: {
//       position: 'absolute',
//       bottom: 10,
//       right: 10,
//     },
//   });

//   return (
//     <View>
//       <View style={styles.searchContainer}>
//         <TouchableOpacity>
//           <Ionicons name="search" size={SIZES.xLarge} style={styles.searchIcon} />
//         </TouchableOpacity>

//         <View style={styles.searchWrapper}>
//           <TextInput
//             style={styles.searchInput}
//             value={searchTerm}
//             onChangeText={handleSearch}
//             placeholder="What are you looking for 2"
//             placeholderTextColor={colors.subtitle}
//           />
//         </View>

//         <View>
//           <TouchableOpacity style={styles.searchBtn} onPress={() => handleSearch(searchTerm)}>
//             <Feather name="search" size={24} color={COLORS.offwhite} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Search result */}
//       <FlatList
//         keyExtractor={(item: ProductModelProps) => item.id}
//         data={searchTerm === '' ? products : (searchResults.length === 0 ? products : searchResults)}
//         renderItem={({ item }) => (
//           // <View style={styles.gridLayout}>
//             <ProductGridCardVOne product={item} viewTypeGrid={true} />
//           // </View>
//         )}
//         numColumns={2}
//         columnWrapperStyle={styles.row} // Ensure even spacing between columns
//         contentContainerStyle={styles.flatListContent} // Padding for both sides of the list
//       />
//     </View>
//   );
// };

// export default ProductSearchScreen;
































// import React, { useState } from 'react';
// import { SafeAreaView, View, TextInput, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
// import { Feather, Ionicons } from '@expo/vector-icons';
// import { useAuth } from '@/contexts/AuthContext';
// import { COLORS, SIZES } from '@/utils/theme';
// import { ProductModelProps } from '@/models/ProductModelProps';
// import { useClientProduct } from '@/contexts/ClientProductContext';
// import ProductGridCardVOne from '@/components/card/product/ProductGridCardVOne';
// import { useTheme } from '@/contexts/ThemeContext';

// const { width } = Dimensions.get('window');

// const ProductSearchScreen = () => {
//   const { authState } = useAuth();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState<ProductModelProps[]>([]);

//   const storeID = authState?.user ? authState.user.store_owner_id : '';
//   const email = authState?.user ? authState.user.email : '';

//   const { products } = useClientProduct();
//   const { colors } = useTheme();

//   const handleSearch = (text: string) => {
//     try {
//       setSearchTerm(text);
//       const results = products.filter((product: ProductModelProps) =>
//         product.name.toLowerCase().includes(text.toLowerCase())
//       );
//       setSearchResults(results);
//     } catch (error) {
//       console.log('Failed to get products', error);
//     }
//   };

//   const styles = StyleSheet.create({
//     searchContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       padding: SIZES.medium,
//       backgroundColor: colors.background,
//     },
//     searchIcon: {
//       marginRight: SIZES.small,
//       color: colors.text,
//     },
//     searchWrapper: {
//       flex: 1,
//       backgroundColor: colors.cardBackground,
//       borderRadius: SIZES.medium,
//       marginRight: SIZES.small,
//       height: 40,
//       justifyContent: 'center',
//     },
//     searchInput: {
//       paddingLeft: SIZES.small,
//       color: colors.text,
//     },
//     searchBtn: {
//       backgroundColor: COLORS.primary,
//       padding: SIZES.small,
//       borderRadius: SIZES.medium,
//     },
//     flatListContent: {
//       paddingHorizontal: 16, // Adjust padding to make it even on both sides
//     },
//     row: {
//       justifyContent: 'space-between', // Ensure items are evenly spaced between columns
//     },
//     container: {
//       width: (width / 2) - 24, // Adjust container width to make items fit the grid properly
//       height: 250,
//       marginBottom: 16, // Space between rows
//       backgroundColor: colors.cardBackground,
//       borderRadius: 10,
//       borderWidth: 1,
//       borderColor: colors.border,
//       overflow: 'hidden',
//     },
//     gridLayout: {
//       marginBottom: 16,
//     },
//     imageContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderRadius: 10,
//       overflow: 'hidden',
//       marginTop: 10,
//     },
//     image: {
//       width: 140,
//       height: 140,
//       borderRadius: 10,
//       resizeMode: 'cover',
//     },
//     details: {
//       padding: 10,
//     },
//     title: {
//       fontFamily: 'bold',
//       fontSize: 14,
//       marginBottom: 2,
//       height: 35,
//       color: colors.title,
//     },
//     supplier: {
//       fontFamily: 'regular',
//       fontSize: 12,
//       color: colors.title,
//     },
//     price: {
//       fontFamily: 'bold',
//       fontSize: 16,
//       color: colors.title,
//     },
//     addBtn: {
//       position: 'absolute',
//       bottom: 10,
//       right: 10,
//     },
//   });

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={styles.searchContainer}>
//         <TouchableOpacity>
//           <Ionicons name="camera-outline" size={SIZES.xLarge} style={styles.searchIcon} />
//         </TouchableOpacity>

//         <View style={styles.searchWrapper}>
//           <TextInput
//             style={styles.searchInput}
//             value={searchTerm}
//             onChangeText={handleSearch}
//             placeholder="What are you looking for"
//             placeholderTextColor={colors.placeholder}
//           />
//         </View>

//         <View>
//           <TouchableOpacity style={styles.searchBtn} onPress={() => handleSearch(searchTerm)}>
//             <Feather name="search" size={24} color={COLORS.offwhite} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Search result */}
//       <FlatList
//         keyExtractor={(item: ProductModelProps) => item.id}
//         data={searchTerm === '' ? products : (searchResults.length === 0 ? products : searchResults)}
//         renderItem={({ item }) => (
//           <View style={styles.gridLayout}>
//             <ProductGridCardVOne product={item} viewTypeGrid={true} />
//           </View>
//         )}
//         numColumns={2}
//         columnWrapperStyle={styles.row} // Ensure even spacing between columns
//         contentContainerStyle={styles.flatListContent} // Padding for both sides of the list
//       />
//     </SafeAreaView>
//   );
// };

// export default ProductSearchScreen;



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














// import React, { useState } from 'react';
// import { SafeAreaView, View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
// import { Feather, Ionicons } from '@expo/vector-icons';
// import { getProducts } from '../../../api/productsApi';
// import { useAuth } from '@/contexts/AuthContext';
// import { COLORS, SIZES } from '@/utils/theme';
// // import ProductListItem from './ProductListItem';
// import { CONSTANTS } from '@/utils/constants';
// import { ProductModelProps } from '@/models/ProductModelProps';
// // import { useClientProduct } from '@/contexts/ClientProductContext';
// import ProductListItem from './ProductSearchTile';
// import ProductCardV2 from '../../library/card/ProductCardV2';
// import { useClientProduct } from '@/contexts/ClientProductContext';

// const { width } = Dimensions.get('window');


// const ProductSearchScreen = () => {
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
//             placeholder='What are you looking for'
//           />
//         </View>

//         <View>
//           <TouchableOpacity style={styles.searchBtn} onPress={() => handleSearch(searchTerm)}>
//             <Feather name='search' size={24} color={COLORS.offwhite}/>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Search result */}
//       {searchTerm === '' ? (
//         <FlatList
//           keyExtractor={(item: ProductModelProps) => item.id}
//           data={products}
//           // renderItem={({ item }) => <ProductListItem {...item} />}
//           renderItem={({ item }) => (
          
//             <View style={styles.gridLayout}>
//           <ProductCardV2 {...item} />
//           </View>

//           )}
//           contentContainerStyle={{ marginHorizontal: 12 }}
//         />
//       ) : (
//         <FlatList
//           keyExtractor={(item: ProductModelProps) => item.id}
//           data={searchResults.length === 0 ? products : searchResults}
//           // renderItem={({ item }) => <ProductListItem {...item} />}
//           renderItem={({ item }) => (
          
//             <View style={styles.gridLayout}>
//           <ProductCardV2 {...item} />
//           </View>

//           )}
//           contentContainerStyle={{ marginHorizontal: 12 }}
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// export default ProductSearchScreen;

// export const styles = StyleSheet.create({
//   gridLayout: {
//     width: (width / 2) - 18, // Adjust the width to leave space for margins
//     marginBottom: 12,
//   },
//     searchContainer: {
//         flexDirection: "row",
//         justifyContent: "center",
//         alignContent: "center",
//         marginHorizontal: SIZES.small,
//         backgroundColor: COLORS.secondary,
//         borderRadius: SIZES.medium,
//         marginVertical: SIZES.medium,
//         height: 50

//     },
//     searchIcon: {
//         marginHorizontal: 10,
//         color: COLORS.gray,
//         marginTop: SIZES.small
//     },
//     searchWrapper:{ 
//         flex: 1,
//         backgroundColor: COLORS.secondary,
//         marginRight: SIZES.small,
//         borderRadius: SIZES.small
//     },
//     searchInput: {
//         fontFamily: "regular",
//         width: "100%",
//         height: "100%",
//         paddingHorizontal: SIZES.small
//     },
//     searchBtn: {
//         width: 50,
//         height: "100%",
//         borderRadius: SIZES.medium,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: COLORS.primary
//     }
// })
