import React, { FC } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useClientProduct } from "@/contexts/ClientProductContext";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext"; // Import to get authUser

export const ProductDetailsPageVTwo: FC = () => {
  const { addToCart } = useCart();
  const { selectedProduct } = useClientProduct();
  const { authState, updateSingleUserItem } = useAuth(); // Access authState and updateSingleUserItem

  const handleAddToCart = () => {
    if (selectedProduct) {
      const productToAdd = {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: 1, // Set an initial quantity of 1 for adding to the cart
        image: selectedProduct.images[0], // Assuming the first image is the main one
      };
      addToCart(productToAdd); // Pass authUser and updateSingleUserItem
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Product Images */}
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.imageCarousel}>
          {selectedProduct?.images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.productImage} />
          ))}
        </ScrollView>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{selectedProduct?.name}</Text>
          <Text style={styles.productDescription}>{selectedProduct?.description}</Text>
          <Text style={styles.productPrice}>
            <Text style={styles.salePrice}>${selectedProduct?.price}</Text>
          </Text>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartButtonText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles definition remains the same...
const { width } = Dimensions.get("window");


// Styles definition
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollViewContent: {
    paddingBottom: 100, // Space for the fixed button at the bottom
  },
  imageCarousel: {
    height: width, // Ensure the carousel height matches the width for a square aspect ratio
  },
  productImage: {
    width: width, // Full width of the screen
    height: width, // Full width of the screen to maintain aspect ratio
    resizeMode: "cover", // Cover the entire space, cropping if necessary
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
  },
  salePrice: {
    color: "red",
    fontWeight: "bold",
  },
  originalPrice: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  featuresContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  featureItem: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  benefitsContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  benefitItem: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  variantsContainer: {
    marginBottom: 16,
  },
  variantItem: {
    marginBottom: 16,
  },
  variantTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  variantDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  variantImage: {
    width: width - 32,
    height: width - 32,
    borderRadius: 8,
    marginBottom: 8,
  },
  variantPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  reviewsContainer: {
    marginBottom: 16,
  },
  reviewsScrollView: {
    flexDirection: "row",
  },
  reviewItem: {
    width: width * 0.8, // Each review takes up 80% of the screen width
    marginRight: 16,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    // shadowColor: '#000',
    // shadowOpacißty: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4, // For Android shadow
  },
  reviewUserName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  reviewTitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  reviewComment: {
    fontSize: 14,
    color: "#333",
  },
  addToCartButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  addToCartButtonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default ProductDetailsPageVTwo;

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { Link } from 'expo-router';
// import { useClientProduct } from '@/contexts/ClientProductContext';

// const { width } = Dimensions.get('window');

// const ProductDetailsPageVTwo = () => {
//   const { selectedProduct: product } = useClientProduct();

//   return (
//     <ScrollView style={styles.container}>
//       {/* Product Images */}
//       <ScrollView
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         style={styles.imageCarousel}
//       >
//         {product?.images.map((image, index) => (
//           <Image key={index} source={{ uri: image }} style={styles.productImage} />
//         ))}
//       </ScrollView>

//       {/* Product Info */}
//       <View style={styles.productInfo}>
//         <Text style={styles.productName}>{product?.name}</Text>
//         <Text style={styles.productDescription}>{product?.description}</Text>
//         <Text style={styles.productPrice}>{product?.price}</Text>

//         {/* Product Details */}
//         <View style={styles.productDetails}>
//           <Text style={styles.productDetailText}><Text style={styles.boldText}>Material: </Text>{product?.description}</Text>
//         </View>

//         {/* Add to Cart Button */}
//         <Link href="/cart" asChild>
//           <TouchableOpacity style={styles.addToCartButton}>
//             <Text style={styles.addToCartButtonText}>Add to cart</Text>
//           </TouchableOpacity>
//         </Link>
//       </View>

//       {/* Bottom Navigation Bar */}
//       <View style={styles.bottomNavBar}>
//         <TouchableOpacity style={styles.navButton}>
//           <Text style={styles.navButtonText}>home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navButton}>
//           <Text style={styles.navButtonText}>search</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navButton}>
//           <Text style={styles.navButtonText}>favourites</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navButton}>
//           <Text style={styles.navButtonText}>cart</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navButton}>
//           <Text style={styles.navButtonText}>account</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFF',
//   },
//   imageCarousel: {
//     height: width, // Ensure the carousel height matches the width for a square aspect ratio
//   },
//   productImage: {
//     width: width, // Full width of the screen
//     height: width, // Full width of the screen to maintain aspect ratio
//     resizeMode: 'cover', // Cover the entire space, cropping if necessary
//   },
//   productInfo: {
//     padding: 16,
//   },
//   productName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 8,
//   },
//   productDescription: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 8,
//   },
//   productPrice: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 16,
//   },
//   productDetails: {
//     marginBottom: 16,
//   },
//   productDetailText: {
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 8,
//   },
//   boldText: {
//     fontWeight: 'bold',
//   },
//   addToCartButton: {
//     backgroundColor: '#000',
//     paddingVertical: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 16,
//   },
//   addToCartButtonText: {
//     fontSize: 18,
//     color: '#FFF',
//     fontWeight: 'bold',
//   },
//   bottomNavBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 16,
//     paddingHorizontal: 32,
//     backgroundColor: '#000',
//   },
//   navButton: {
//     alignItems: 'center',
//   },
//   navButtonText: {
//     fontSize: 14,
//     color: '#FFF',
//   },
// });

// export default ProductDetailsPageVTwo;
