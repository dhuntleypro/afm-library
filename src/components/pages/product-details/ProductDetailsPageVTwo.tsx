import React, { FC, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { CartContext } from "@/contexts/CartContext";
// import { useClientProduct } from "@/contexts/ClientProductContext";
import { ProductModelProps } from "@/models/ProductModelProps";
import { useClientProduct } from "@/contexts/ClientProductContext";

const { width } = Dimensions.get("window");

// const ProductDetailsPageVTwo: React.FC = () => {

export const ProductDetailsPageVTwo: FC<ProductModelProps> = () => {
  const { addToCart } = useContext(CartContext);
  const { selectedProduct } = useClientProduct();

  // Static image URLs
  const images = [
    "https://appsformankind-assets.s3.amazonaws.com/Store/Jays_Sea_Moss/rock.jpg",
    "https://appsformankind-assets.s3.amazonaws.com/Store/Jays_Sea_Moss/gel.jpg",
    "https://appsformankind-assets.s3.amazonaws.com/Store/Jays_Sea_Moss/waterfall.jpg",
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Product Images */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.imageCarousel}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={styles.productImage}
            />
          ))}
        </ScrollView>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>Sample Sea Moss Product</Text>
          <Text style={styles.productDescription}>
            This is a sample product description that highlights key features
            and benefits of Sea Moss products.
          </Text>
          <Text style={styles.productPrice}>
            <Text style={styles.salePrice}>$149.99</Text>{" "}
            <Text style={styles.originalPrice}>$199.99</Text>
          </Text>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <Text style={styles.sectionTitle}>Features:</Text>
            <Text style={styles.featureItem}>
              - Rich in essential minerals and vitamins
            </Text>
            <Text style={styles.featureItem}>
              - Supports overall health and wellness
            </Text>
            <Text style={styles.featureItem}>
              - Can be used in various recipes and remedies
            </Text>
          </View>

          {/* Sea Moss Benefits */}
          <View style={styles.benefitsContainer}>
            <Text style={styles.sectionTitle}>Benefits of Sea Moss:</Text>
            <Text style={styles.benefitItem}>
              - Boosts immune system and overall health
            </Text>
            <Text style={styles.benefitItem}>
              - Improves digestion and gut health
            </Text>
            <Text style={styles.benefitItem}>
              - Supports skin health and promotes a healthy complexion
            </Text>
            <Text style={styles.benefitItem}>
              - Provides a natural source of iodine, aiding in thyroid function
            </Text>
            <Text style={styles.benefitItem}>
              - Rich in Omega-3 fatty acids, which support heart health
            </Text>
          </View>

          {/* Variants
          <View style={styles.variantsContainer}>
            <Text style={styles.sectionTitle}>Available Variants:</Text>
            <View style={styles.variantItem}>
              <Text style={styles.variantTitle}>Sea Moss Gel</Text>
              <Text style={styles.variantDescription}>
                A convenient, ready-to-use Sea Moss gel, perfect for adding to
                smoothies or skincare routines.
              </Text>
              <Image
                source={{
                  uri: "https://appsformankind-assets.s3.amazonaws.com/Store/Jays_Sea_Moss/gel.jpg",
                }}
                style={styles.variantImage}
                resizeMode="cover"
              />
              <Text style={styles.variantPrice}>
                <Text style={styles.salePrice}>$129.99</Text>{" "}
                <Text style={styles.originalPrice}>$149.99</Text>
              </Text>
            </View>
            <View style={styles.variantItem}>
              <Text style={styles.variantTitle}>Raw Sea Moss</Text>
              <Text style={styles.variantDescription}>
                Raw, organic Sea Moss, ideal for those who prefer to prepare it
                themselves.
              </Text>
              <Image
                source={{
                  uri: "https://appsformankind-assets.s3.amazonaws.com/Store/Jays_Sea_Moss/rock.jpg",
                }}
                style={styles.variantImage}
                resizeMode="cover"
              />
              <Text style={styles.variantPrice}>
                <Text style={styles.salePrice}>$109.99</Text>{" "}
                <Text style={styles.originalPrice}>$129.99</Text>
              </Text>
            </View>
          </View> */}

          {/* Reviews */}
          <View style={styles.reviewsContainer}>
            <Text style={styles.sectionTitle}>Customer Reviews:</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.reviewsScrollView}
            >
              <View style={styles.reviewItem}>
                <Text style={styles.reviewUserName}>John Doe</Text>
                <Text style={styles.reviewTitle}>Great product!</Text>
                <Text style={styles.reviewComment}>
                  I really enjoyed using this Sea Moss product. Highly recommend
                  it!
                </Text>
              </View>
              <View style={styles.reviewItem}>
                <Text style={styles.reviewUserName}>Jane Smith</Text>
                <Text style={styles.reviewTitle}>Good value for money</Text>
                <Text style={styles.reviewComment}>
                  This Sea Moss offers great value for the price.
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Button - Fixed at the Bottom */}

      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => {
          if (selectedProduct) {
            addToCart(selectedProduct);
          }
        }}
      >
        <Text style={styles.addToCartButtonText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
};

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
