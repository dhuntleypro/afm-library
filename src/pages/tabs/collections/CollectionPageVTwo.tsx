import { useClientProduct } from '@/contexts/ClientProductContext';
import { useClientStore } from '@/contexts/ClientStoreContext';
import { useClientCollection } from '@/contexts/ClientCollectionContext';
import convertToCurrency from '@/hooks/convertToCurrency';
import { ProductModelProps } from '@/models/ProductModelProps';
import { AWS_HOLDER_IMAGE } from '@/utils/api';
import { COLORS } from '@/utils/theme';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useTheme } from "@/contexts/ThemeContext"

const { width } = Dimensions.get('window');

const CollectionPageVTwo = () => {
  const { collections, selectedCollection, selectCollection } = useClientCollection();
  const { products, selectProduct } = useClientProduct();
  const { store } = useClientStore();
  const { colors } = useTheme();

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    // paddingHorizontal: 10,
  },
  categoryList: {
    maxHeight: 50,
  },
  categoryContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20
  },
  categoryButton: {
    marginRight: 8,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border, // '#000000',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  selectedCollectionButton: {
    backgroundColor:  colors.cardText, //,  '#000',
    color:  colors.buttonText //,  '#000',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.cardText // '#000000',
  },
  selectedCollectionText: {
    color: colors.buttonText //'#FFFFFF',
  },
  promoContainer: {
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    padding: 15
  },
  promoImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  promoTextContainer: {
    position: 'absolute',
    top: 15,
    left: 20,
    padding: 20,
    borderRadius: 16
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  promoSubtitle: {
    fontSize: 14,
    color: COLORS.gray3,
    marginTop: 5,
  },
  promoDiscount: {
    fontSize: 16,
    color: '#FF6347',
    marginTop: 5,
  },
  productListContainer: {
    flex: 1,
  },
  productContainer: {
    paddingBottom: 20,
  },
  productCard: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  productImage: {
    width: width / 2 - 40,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  productName: {
    fontSize: 14,
    color: '#333333',
    marginTop: 5,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777777',
    marginTop: 20,
  },
});

  // Define the "All" collection with default values
  const allCollection = {
    id: 'all',
    store_id: 'all-store',
    user_id: 'all-user',
    index: 0,
    timestamp: new Date().toISOString(),
    title: 'All',
    description: 'All available products',
    caption: '',
    amount: 0,
    likes: 0,
    isliked: false,
    onSale: false,
    relatedProductIds: products.map((product) => product.id.toString()),
    image: '',
    images: [],
    tags: [],
    active: true,
  };

  // Add the "All" collection to the collections array
  const collectionsWithAll = [allCollection, ...collections];

  // Select "All" collection by default on initial render
  useEffect(() => {
    if (!selectedCollection) {
      selectCollection(allCollection);
    }
  }, [selectedCollection, selectCollection]);

  // Handle selecting a product
  const handleProductSelect = (product: ProductModelProps) => {
    selectProduct(product);
    // Ensure navigation to the correct product route within the selected collection
    if (selectedCollection?.id && product.id) {
      router.push(`/collections/${selectedCollection.id}/products/${product.id}` as never);
    }
  };

  // Filter products based on the selected collection
  const filteredProducts: ProductModelProps[] = selectedCollection?.id === 'all'
    ? products // Show all products when "All" is selected
    : products.filter(product =>
        selectedCollection?.relatedProductIds.includes(product.id.toString())
      );

  return (
    <View style={styles.container}>
      {/* Collection Selection List */}
      <FlatList
        data={collectionsWithAll}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              item.id === selectedCollection?.id && styles.selectedCollectionButton
            ]}
            onPress={() => selectCollection(item)}
          >
            <Text style={[
              styles.categoryText,
              item.id === selectedCollection?.id && styles.selectedCollectionText
            ]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.categoryContainer}
        style={styles.categoryList}
      />

      {/* Promo Section */}
      <View style={styles.promoContainer}>
        <Image
          source={{ uri: store?.images?.welcome_image || AWS_HOLDER_IMAGE }}
          style={styles.promoImage}
        />
        <View style={styles.promoTextContainer}>
          <Text style={styles.promoTitle}>Promo for first purchase</Text>
          <Text style={styles.promoSubtitle}>Special Offers</Text>
          <Text style={styles.promoDiscount}>40% Off Prices</Text>
        </View>
      </View>

      {/* Products List */}
      <View style={styles.productListContainer}>
        <FlatList
          data={filteredProducts}
          numColumns={2}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <TouchableOpacity onPress={() => handleProductSelect(item)}>
                <Image source={{ uri: item.images[0] || AWS_HOLDER_IMAGE }} style={styles.productImage} />
                <Text style={styles.productPrice}>{convertToCurrency(item.price)}</Text>
                <Text style={styles.productName}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.productContainer}
          ListEmptyComponent={<Text style={styles.emptyMessage}>No products available</Text>}
        />
      </View>
    </View>
  );
};

export default CollectionPageVTwo;












































// import { useClientProduct } from '@/contexts/ClientProductContext';
// import { useClientStore } from '@/contexts/ClientStoreContext';
// import { useClientCollection } from '@/contexts/ClientCollectionContext';
// import convertToCurrency from '@/hooks/convertToCurrency';
// import { ProductModelProps } from '@/models/ProductModelProps';
// import { AWS_HOLDER_IMAGE } from '@/utils/api';
// import React, { useEffect } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
// import { useTheme } from "@/contexts/ThemeContext";
// import { router } from 'expo-router';

// const { width } = Dimensions.get('window');

// const CollectionPageVTwo = () => {
//   const { collections, selectedCollection, selectCollection } = useClientCollection();
//   const { products, selectProduct } = useClientProduct();
//   const { store } = useClientStore();
//   const { colors } = useTheme();


//    // Define the "All" collection with default values
//   const allCollection = {
//     id: 'all',
//     store_id: 'all-store',
//     user_id: 'all-user',
//     index: 0,
//     timestamp: new Date().toISOString(),
//     title: 'All',
//     description: 'All available products',
//     caption: '',
//     amount: 0,
//     likes: 0,
//     isliked: false,
//     onSale: false,
//     relatedProductIds: products.map((product) => product.id.toString()),
//     image: '',
//     images: [],
//     tags: [],
//     active: true,
//   };


//   const collectionsWithAll = [allCollection, ...collections];

//   useEffect(() => {
//     if (!selectedCollection) {
//       selectCollection(allCollection);
//     }
//   }, [selectedCollection, selectCollection]);

//   const handleProductSelect = (product: ProductModelProps) => {
//     selectProduct(product);
//     if (selectedCollection?.id && product.id) {
//       router.push(`/collections/${selectedCollection.id}/products/${product.id}` as never);
//     }
//   };

//   const filteredProducts: ProductModelProps[] = selectedCollection?.id === 'all'
//     ? products
//     : products.filter(product =>
//         selectedCollection?.relatedProductIds.includes(product.id.toString())
//       );




// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   categoryList: {
//     maxHeight: 50,
//     padding: 20
//   },
//   categoryContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   categoryButton: {
//     color: colors.buttonText,
//     marginRight: 8,
//     paddingVertical: 5,
//     paddingHorizontal: 12,
//     borderWidth: 1,
//     borderColor: colors.border,
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 30,
//   },
//   selectedCollectionButton: {
//     backgroundColor: colors.cardBackground,
//   },
//   categoryText: {
//     fontSize: 13,
//     fontWeight: 'bold',
//     color: colors.cardText,
//   },
//   selectedCollectionText: {
//     color: colors.title,
//   },
//   promoContainer: {
//     marginVertical: 10,
//     // borderRadius: 10,
//     overflow: 'hidden',
//     // backgroundColor: colors.cardBackground,
//     padding: 15,
//   },
//   promoImage: {
//     width: '100%',
//     height: 150,
//     resizeMode: 'cover',
//   },
//   promoTextContainer: {
//     position: 'absolute',
//     top: 15,
//     left: 20,
//     padding: 20
//   },
//   promoTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: colors.title,
//   },
//   promoSubtitle: {
//     fontSize: 14,
//     color: colors.subtitle,
//     marginTop: 5,
//   },
//   promoDiscount: {
//     fontSize: 16,
//     color: '#FF6347',
//     marginTop: 5,
//   },
//   productListContainer: {
//     flex: 1,
//   },
//   productContainer: {
//     paddingBottom: 20,
//   },
//   productCard: {
//     flex: 1,
//     margin: 10,
//     borderRadius: 10,
//     backgroundColor: colors.cardBackground,
//     padding: 10,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: colors.border,
//     width: width / 2 - 30,
//   },

//   productImage: {
//     width: width / 2 - 40,
//     height: 120,
//     resizeMode: 'cover',
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   productPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: colors.cardText,
//   },
//   productName: {
//     fontSize: 14,
//     color: colors.cardText,
//     marginTop: 5,
//   },
//   emptyMessage: {
//     textAlign: 'center',
//     fontSize: 16,
//     color: colors.subtitle,
//     marginTop: 20,
//   },
// });

//   return (
//     <View style={styles.container}>
//       <View>
//       <FlatList
//         data={collectionsWithAll}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[
//               styles.categoryButton,
//               item.id === selectedCollection?.id && styles.selectedCollectionButton
//             ]}
//             onPress={() => selectCollection(item)}
//           >
//             <Text style={[
//               styles.categoryText,
//               item.id === selectedCollection?.id && styles.selectedCollectionText
//             ]}>
//               {item.title}
//             </Text>
//           </TouchableOpacity>
//         )}
//         contentContainerStyle={styles.categoryContainer}
//         style={styles.categoryList}
//       />
// </View>
//       <View style={styles.promoContainer}>
//         <Image
//           source={{ uri: store?.images?.welcome_image || AWS_HOLDER_IMAGE }}
//           style={styles.promoImage}
//         />
//         <View style={styles.promoTextContainer}>
//           <Text style={styles.promoTitle}>Promo for first purchase</Text>
//           <Text style={styles.promoSubtitle}>Special Offers</Text>
//           <Text style={styles.promoDiscount}>40% Off Prices</Text>
//         </View>
//       </View>

//       <View style={styles.productListContainer}>
//         <FlatList
//           data={filteredProducts}
//           numColumns={2}
//           keyExtractor={(item) => String(item.id)}
//           renderItem={({ item }) => (
//             <View style={styles.productCard}>
//               <TouchableOpacity onPress={() => handleProductSelect(item)}>
//                 <Image source={{ uri: item.images[0] || AWS_HOLDER_IMAGE }} style={styles.productImage} />
//                 <Text style={styles.productPrice}>{convertToCurrency(item.price)}</Text>
//                 <Text style={styles.productName}>{item.name}</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//           contentContainerStyle={styles.productContainer}
//           ListEmptyComponent={<Text style={styles.emptyMessage}>No products available</Text>}
//         />
//       </View>
//     </View>
//   );
// };

// export default CollectionPageVTwo;












// All not included
// import { useClientProduct } from '@/contexts/ClientProductContext';
// import { useClientStore } from '@/contexts/ClientStoreContext';
// import { useClientCollection } from '@/contexts/ClientCollectionContext';
// import convertToCurrency from '@/hooks/convertToCurrency';
// import { ProductModelProps } from '@/models/ProductModelProps';
// import { AWS_HOLDER_IMAGE } from '@/utils/api';
// import { COLORS } from '@/utils/theme';
// import { router } from 'expo-router';
// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';

// const { width } = Dimensions.get('window');

// const CollectionPageVTwo = () => {
//   const { collections, selectedCollection, selectCollection } = useClientCollection();
//   const { products, selectProduct } = useClientProduct();
//   const { store } = useClientStore();

//   // Handle selecting a product
//   const handleProductSelect = (product: ProductModelProps) => {
//     selectProduct(product);
//     // Ensure navigation to the correct product route within the selected collection
//     if (selectedCollection?.id && product.id) {
//       router.push(`/collections/${selectedCollection.id}/products/${product.id}` as never);
//     }
//   };

//   // Filter products based on the selected collection
//   const filteredProducts = selectedCollection?.title === 'All'
//     ? products
//     : products.filter(product =>
//         selectedCollection?.relatedProductIds.includes(product.id.toString())
//       );

//   return (
//     <View style={styles.container}>
//       {/* Collection Selection List */}
//       <FlatList
//         data={collections}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[
//               styles.categoryButton,
//               item.id === selectedCollection?.id && styles.selectedCollectionButton
//             ]}
//             onPress={() => selectCollection(item)}
//           >
//             <Text style={[
//               styles.categoryText,
//               item.id === selectedCollection?.id && styles.selectedCollectionText
//             ]}>
//               {item.title}
//             </Text>
//           </TouchableOpacity>
//         )}
//         contentContainerStyle={styles.categoryContainer}
//         style={styles.categoryList}
//       />

//       {/* Promo Section */}
//       <View style={styles.promoContainer}>
//         <Image
//           source={{ uri: store?.images?.welcome_image || AWS_HOLDER_IMAGE }}
//           style={styles.promoImage}
//         />
//         <View style={styles.promoTextContainer}>
//           <Text style={styles.promoTitle}>Promo for first purchase</Text>
//           <Text style={styles.promoSubtitle}>Special Offers</Text>
//           <Text style={styles.promoDiscount}>40% Off Prices</Text>
//         </View>
//       </View>

//       {/* Products List */}
//       <View style={styles.productListContainer}>
//         <FlatList
//           data={filteredProducts}
//           numColumns={2}
//           keyExtractor={(item) => String(item.id)}
//           renderItem={({ item }) => (
//             <View style={styles.productCard}>
//               <TouchableOpacity onPress={() => handleProductSelect(item)}>
//                 <Image source={{ uri: item.images[0] || AWS_HOLDER_IMAGE }} style={styles.productImage} />
//                 <Text style={styles.productPrice}>{convertToCurrency(item.price)}</Text>
//                 <Text style={styles.productName}>{item.name}</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//           contentContainerStyle={styles.productContainer}
//           ListEmptyComponent={<Text style={styles.emptyMessage}>No products available</Text>}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 10,
//   },
//   categoryList: {
//     maxHeight: 50,
//   },
//   categoryContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   categoryButton: {
//     marginRight: 8,
//     paddingVertical: 5,
//     paddingHorizontal: 12,
//     borderWidth: 1,
//     borderColor: '#000000',
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 30,
//   },
//   selectedCollectionButton: {
//     backgroundColor: '#000',
//   },
//   categoryText: {
//     fontSize: 13,
//     fontWeight: 'bold',
//     color: '#000000',
//   },
//   selectedCollectionText: {
//     color: '#FFFFFF',
//   },
//   promoContainer: {
//     marginVertical: 10,
//     borderRadius: 10,
//     overflow: 'hidden',
//     backgroundColor: '#F5F5F5',
//   },
//   promoImage: {
//     width: '100%',
//     height: 150,
//     resizeMode: 'cover',
//   },
//   promoTextContainer: {
//     position: 'absolute',
//     top: 15,
//     left: 20,
//   },
//   promoTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: COLORS.white,
//   },
//   promoSubtitle: {
//     fontSize: 14,
//     color: COLORS.gray3,
//     marginTop: 5,
//   },
//   promoDiscount: {
//     fontSize: 16,
//     color: '#FF6347',
//     marginTop: 5,
//   },
//   productListContainer: {
//     flex: 1,
//   },
//   productContainer: {
//     paddingBottom: 20,
//   },
//   productCard: {
//     flex: 1,
//     margin: 10,
//     borderRadius: 10,
//     backgroundColor: '#FFFFFF',
//     padding: 10,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   productImage: {
//     width: width / 2 - 40,
//     height: 120,
//     resizeMode: 'cover',
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   productPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000000',
//   },
//   productName: {
//     fontSize: 14,
//     color: '#333333',
//     marginTop: 5,
//   },
//   emptyMessage: {
//     textAlign: 'center',
//     fontSize: 16,
//     color: '#777777',
//     marginTop: 20,
//   },
// });

// export default CollectionPageVTwo;


















