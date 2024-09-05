import { useClientProduct } from '@/contexts/ClientProductContext';
import { useClientStore } from '@/contexts/ClientStoreContext';
import { useClientCollection } from '@/contexts/CollectionContext';
import convertToCurrency from '@/hooks/convertToCurrency';
import { CollectionModelProps } from '@/models/CollectionModelProps';
import { AWS_HOLDER_IMAGE } from '@/utils/api';
import { COLORS } from '@/utils/theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');



const CollectionPageVTwo = () => {
  const { collections, selectedCollection, selectCollection, isLoading, error } = useClientCollection();
  const {products} = useClientProduct()
  const {store} = useClientStore()
  const handleProductSelect = (product: CollectionModelProps) => {
    selectCollection(product);
  };

  const filteredProducts = selectedCollection?.title === 'All'
  ? products
  : products.filter(product =>
      selectedCollection?.relatedProductIds.includes(product.id.toString())
    );

console.log(`Filtered Products: ${JSON.stringify(filteredProducts)}`);

    // console.log(`filteredProducts: ${filteredProducts}`)
  return (
    <View style={styles.container}>
      <FlatList
        data={collections}
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
        style={styles.categoryList} // Added style to control height
      />

      <View style={styles.promoContainer}>
        <Image
          source={{ uri: store?.images.welcome_image }} // Replace with actual promo image URI
          style={styles.promoImage}
        />
        <View style={styles.promoTextContainer}>
          <Text style={styles.promoTitle}>Promo for first purchase</Text>
          <Text style={styles.promoSubtitle}>Special Offers</Text>
          <Text style={styles.promoDiscount}>40% Off Prices</Text>
        </View>
      </View>

      <View style={styles.productListContainer}>
        <FlatList
          data={filteredProducts}
          numColumns={2}
          keyExtractor={(item ) =>  String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <TouchableOpacity onPress={() => router.push(`/products/${item.id}` as never)}>
              {/* <Image source={{ uri: item.image }} style={styles.productImage} /> */}
              <Image source={{ uri: item.images[0] }} style={styles.productImage} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
  },
  categoryList: {
    maxHeight: 50, // Limit the height of the category list to prevent it from taking too much space
  },
  categoryContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryButton: {
    marginRight: 8,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30, // Adjusted the height to be more compact
  },
  selectedCategoryButton: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  categoryText: {
    fontSize: 13, // Slightly smaller font for the text
    fontWeight: 'bold',
    color: '#000000',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  promoContainer: {
    marginVertical: 10, // Reduced margin to bring elements closer
    borderRadius: 10,
    overflow: 'hidden', // corner radius
    backgroundColor: '#F5F5F5',
  },
  promoImage: {
    width: '100%',
    height: 150, // Slightly reduced height for better fit
    resizeMode: 'cover',
  },
  promoTextContainer: {
    position: 'absolute',
    top: 15,
    left: 20,
  },
  promoTitle: {
    fontSize: 20, // Adjusted font size
    fontWeight: 'bold',
    color: COLORS.white,
  },
  promoSubtitle: {
    fontSize: 14, // Adjusted font size
    color: COLORS.gray3,
    marginTop: 5,
  },
  promoDiscount: {
    fontSize: 16, // Adjusted font size
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
  selectedCollectionButton: {
    backgroundColor: '#000',
  },
  selectedCollectionText: {
    color: '#fff',
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

export default CollectionPageVTwo;












// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 10,
//   },
//   categoryList: {
//     maxHeight: 50, // Limit the height of the category list to prevent it from taking too much space
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
//     height: 30, // Adjusted the height to be more compact
//   },
//   selectedCollectionButton: {
//     backgroundColor: '#000000',
//     borderColor: '#000000',
//   },
//   categoryText: {
//     fontSize: 13, // Slightly smaller font for the text
//     fontWeight: 'bold',
//     color: '#000000',
//   },
//   selectedCollectionText: {
//     color: '#FFFFFF',
//   },
//   promoContainer: {
//     marginVertical: 10, // Reduced margin to bring elements closer
//     borderRadius: 10,
//     overflow: 'hidden', // corner radius
//     backgroundColor: '#F5F5F5',
//   },
//   promoImage: {
//     width: '100%',
//     height: 150, // Slightly reduced height for better fit
//     resizeMode: 'cover',
//   },
//   promoTextContainer: {
//     position: 'absolute',
//     top: 15,
//     left: 20,
//   },
//   promoTitle: {
//     fontSize: 20, // Adjusted font size
//     fontWeight: 'bold',
//     color: '#333333',
//   },
//   promoSubtitle: {
//     fontSize: 14, // Adjusted font size
//     color: '#666666',
//     marginTop: 5,
//   },
//   promoDiscount: {
//     fontSize: 16, // Adjusted font size
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

