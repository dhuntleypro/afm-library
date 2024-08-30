
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

const categories = ['All', 'Chair', 'Table', 'Lighting', 'Decor'];

const CollectionPageVTwo = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.name.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              item === selectedCategory && styles.selectedCategoryButton
            ]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text style={[
              styles.categoryText,
              item === selectedCategory && styles.selectedCategoryText
            ]}>
              {item}
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
              {/* <Image source={{ uri: item.image }} style={styles.productImage} /> */}
              <Image source={{ uri: AWS_HOLDER_IMAGE }} style={styles.productImage} />
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

export default CollectionPageVTwo;

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
    color: '#333333',
  },
  promoSubtitle: {
    fontSize: 14, // Adjusted font size
    color: '#666666',
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
















// import { AWS_HOLDER_IMAGE } from '@/utils/api';
// import React, { useState } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';

// const { width, height } = Dimensions.get('window');

// interface ProductProps {
//   id: number;
//   name: string;
//   price: string;
//   image: string;
// }

// const products: ProductProps[] = [
//   { id: 1, name: 'Facet Table Lamp', price: '$284', image: 'https://example.com/lamp.jpg' },
//   { id: 2, name: 'Carlisle Double', price: '$583', image: 'https://example.com/cabinet.jpg' },
//   { id: 3, name: 'Sofia Footstool', price: '$495', image: 'https://example.com/footstool.jpg' },
//   { id: 4, name: 'Theodore', price: '$322', image: 'https://example.com/chair.jpg' },
//   { id: 5, name: 'Lamp 2', price: '$369', image: 'https://example.com/lamp2.jpg' },
//   { id: 6, name: 'Chair 2', price: '$423', image: 'https://example.com/chair2.jpg' },
// ];

// const categories = ['All', 'Chair', 'Table', 'Lighting', 'Decor'];

// const CollectionPageVTwo = () => {
//   const [selectedCategory, setSelectedCategory] = useState<string>('All');

//   const filteredProducts = selectedCategory === 'All'
//     ? products
//     : products.filter(product => product.name.toLowerCase().includes(selectedCategory.toLowerCase()));

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={categories}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(item) => item}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[
//               styles.categoryButton,
//               item === selectedCategory && styles.selectedCategoryButton
//             ]}
//             onPress={() => setSelectedCategory(item)}
//           >
//             <Text style={[
//               styles.categoryText,
//               item === selectedCategory && styles.selectedCategoryText
//             ]}>
//               {item}
//             </Text>
//           </TouchableOpacity>
//         )}
//         contentContainerStyle={styles.categoryContainer}
//       />

//       <View style={styles.promoContainer}>
//         <Image
//           source={{ uri: AWS_HOLDER_IMAGE }} // Replace with actual promo image URI
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
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.productCard}>
//               <Image source={{ uri: item.image }} style={styles.productImage} />
//               <Text style={styles.productPrice}>{item.price}</Text>
//               <Text style={styles.productName}>{item.name}</Text>
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 10,
//     // paddingTop: 20,
//   },
//   categoryContainer: {
//     paddingVertical: 10,
//     height: 40
//     // alignItems: 'center',
//   },
//   categoryButton: {
//     marginRight: 10,
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderWidth: 1,
//     borderColor: '#000000',
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 35,
//   },
//   selectedCategoryButton: {
//     backgroundColor: '#000000',
//     borderColor: '#000000',
//   },
//   categoryText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#000000',
//   },
//   selectedCategoryText: {
//     color: '#FFFFFF',
//   },
//   promoContainer: {
//     marginVertical: 20,
//     borderRadius: 10,
//     overflow: 'hidden', // corner radius
//     backgroundColor: '#F5F5F5',
//   },
//   promoImage: {
//     width: '100%',
//     height: 160,
//     resizeMode: 'cover',
//   },
//   promoTextContainer: {
//     position: 'absolute',
//     top: 15,
//     left: 20,
//   },
//   promoTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333333',
//   },
//   promoSubtitle: {
//     fontSize: 16,
//     color: '#666666',
//     marginTop: 5,
//   },
//   promoDiscount: {
//     fontSize: 18,
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











// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';

// const { width } = Dimensions.get('window');

// interface ProductProps {
//   id: number;
//   name: string;
//   price: string;
//   image: string;
// }

// const products: ProductProps[] = [
//   { id: 1, name: 'Facet Table Lamp', price: '$284', image: 'https://example.com/lamp.jpg' },
//   { id: 2, name: 'Carlisle Double', price: '$583', image: 'https://example.com/cabinet.jpg' },
//   { id: 3, name: 'Sofia Footstool', price: '$495', image: 'https://example.com/footstool.jpg' },
//   { id: 4, name: 'Theodore', price: '$322', image: 'https://example.com/chair.jpg' },
//   { id: 5, name: 'Lamp 2', price: '$369', image: 'https://example.com/lamp2.jpg' },
//   { id: 6, name: 'Chair 2', price: '$423', image: 'https://example.com/chair2.jpg' },
// ];

// const categories = ['All', 'Chair', 'Table', 'Lighting', 'Decor'];

// const CollectionPageVTwo = () => {
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={categories}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(item) => item}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.categoryButton}>
//             <Text style={styles.categoryText}>{item}</Text>
//           </TouchableOpacity>
//         )}
//         contentContainerStyle={styles.categoryContainer}
//       />

//       <View style={styles.promoContainer}>
//         <Image
//           source={{ uri: 'https://example.com/promo.jpg' }} // Replace with actual promo image URI
//           style={styles.promoImage}
//         />
//         <View style={styles.promoTextContainer}>
//           <Text style={styles.promoTitle}>Promo for first purchase</Text>
//           <Text style={styles.promoSubtitle}>Special Offers</Text>
//           <Text style={styles.promoDiscount}>40% Off Prices</Text>
//         </View>
//       </View>

//       <FlatList
//         data={products}
//         numColumns={2}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.productCard}>
//             <Image source={{ uri: item.image }} style={styles.productImage} />
//             <Text style={styles.productPrice}>{item.price}</Text>
//             <Text style={styles.productName}>{item.name}</Text>
//           </View>
//         )}
//         contentContainerStyle={styles.productContainer}
//       />
//     </View>
//   );
// };

// export default CollectionPageVTwo;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 10,
//   },
//   categoryContainer: {
//     paddingVertical: 10,
//   },
//   categoryButton: {
//     marginRight: 15,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderWidth: 1,
//     borderColor: '#000000',
//     borderRadius: 15,
//   },
//   categoryText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#000000',
//   },
//   promoContainer: {
//     marginTop: 20,
//     marginBottom: 20,
//     borderRadius: 10,
//     overflow: 'hidden',
//     backgroundColor: '#F5F5F5',
//   },
//   promoImage: {
//     width: '100%',
//     height: 120,
//     resizeMode: 'cover',
//   },
//   promoTextContainer: {
//     position: 'absolute',
//     top: 10,
//     left: 15,
//   },
//   promoTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333333',
//   },
//   promoSubtitle: {
//     fontSize: 14,
//     color: '#666666',
//     marginTop: 5,
//   },
//   promoDiscount: {
//     fontSize: 16,
//     color: '#FF6347',
//     marginTop: 5,
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
//     height: 100,
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
// });
