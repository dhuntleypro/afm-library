import { useClientCollection } from '@/contexts/CollectionContext';
import { CollectionModelProps } from '@/models/CollectionModelProps';
import { AWS_HOLDER_IMAGE } from '@/utils/api';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface ProductProps {
  id: number;
  name: string;
  price: string;
  image: string;
}

const products: ProductProps[] = [
  { id: 1, name: 'Facet Table Lamp', price: '$284', image: 'https://example.com/lamp.jpg' },
  { id: 2, name: 'Carlisle Double', price: '$583', image: 'https://example.com/cabinet.jpg' },
  { id: 3, name: 'Sofia Footstool', price: '$495', image: 'https://example.com/footstool.jpg' },
  { id: 4, name: 'Theodore', price: '$322', image: 'https://example.com/chair.jpg' },
  { id: 5, name: 'Lamp 2', price: '$369', image: 'https://example.com/lamp2.jpg' },
  { id: 6, name: 'Chair 2', price: '$423', image: 'https://example.com/chair2.jpg' },
];

const CollectionPageVTwo = () => {
  const { collections, selectedCollection, selectCollection, isLoading, error } = useClientCollection();

  const handleProductSelect = (product: CollectionModelProps) => {
    selectCollection(product);
  };

  const filteredProducts = selectedCollection?.title === 'All'
    ? products
    : products.filter(product => product.name.toLowerCase().includes(selectedCollection?.title.toLowerCase() || ''));

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
          source={{ uri: AWS_HOLDER_IMAGE }} // Replace with actual promo image URI
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
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <TouchableOpacity onPress={() => router.push(`/products/${item.id}` as never)}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productPrice}>{item.price}</Text>
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
    backgroundColor: '#fff',
  },
  categoryContainer: {
    paddingVertical: 10,
  },
  categoryList: {
    height: 60, // Example fixed height for category list
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedCollectionButton: {
    backgroundColor: '#000',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  selectedCollectionText: {
    color: '#fff',
  },
  promoContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  promoImage: {
    width: width * 0.9,
    height: height * 0.25,
    borderRadius: 10,
  },
  promoTextContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  promoSubtitle: {
    fontSize: 16,
    color: '#777',
  },
  promoDiscount: {
    fontSize: 18,
    color: '#ff0000',
  },
  productListContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  productCard: {
    flex: 1,
    margin: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  productName: {
    fontSize: 14,
    color: '#777',
  },
  productContainer: {
    paddingBottom: 20,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
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

