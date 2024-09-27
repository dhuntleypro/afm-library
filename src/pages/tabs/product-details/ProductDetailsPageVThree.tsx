import React, { FC, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/utils/theme'; // Assuming you have a COLORS file
import { AWS_HOLDER_IMAGE } from '@/utils/api';
import { useClientProduct } from '@/contexts/ClientProductContext';
import { ProductModelProps } from '@/models/ProductModelProps';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import convertToCurrency from '@/hooks/convertToCurrency';
import { useFavorite } from '@/contexts/FavoriteContext';
import { useTheme } from "@/contexts/ThemeContext";

const { width } = Dimensions.get('window');

export interface ProductDetailsPageVThreeProps {
  showSize: boolean;
}

const ProductDetailsPageVThree: FC<ProductDetailsPageVThreeProps> = (props) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false); // State for heart icon toggle
  const { selectedProduct } = useClientProduct();
  const { authState } = useAuth(); // Access authState and updateSingleUserItem
  const { addToCart } = useCart();
  const { colors } = useTheme();
  const { addToFavorite, favorites } = useFavorite();

  const sizes = [6, 6.5, 7, 7.5, 8]; // Example sizes

  // Sample benefits data
  const benefits = [
    { name: "Boosts Immunity", icon: "shield-checkmark-outline" },
    { name: "Rich in Nutrients", icon: "nutrition-outline" },
    { name: "Promotes Digestion", icon: "leaf-outline" },
    { name: "Increases Energy", icon: "flash-outline" },
    { name: "Supports Skin", icon: "water-outline" },
  ];

  const handlePress = () => {
    if (selectedProduct) {
      const partialProduct: Partial<ProductModelProps> = {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        images: selectedProduct.images,
        quantity: 1, // Default quantity
        color: 'default', // Add color if necessary
        size: String(selectedSize) ?? 'default', // Add size if necessary
      };
      addToCart(partialProduct); // Pass authUser and updateSingleUserItem
    }
  };

  // Check if product is already a favorite when favorites or selectedProduct changes
  useEffect(() => {
    if (selectedProduct && favorites.some((fav) => fav.id === selectedProduct.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favorites, selectedProduct]); // Dependency array: Runs when favorites or selectedProduct changes

  const toggleFavorite = async () => {
    if (selectedProduct) {
      const currentFavorites = authState?.user?.favoriteItems || [];

      // Check if the product is already a favorite
      const updatedFavorites = currentFavorites.includes(selectedProduct.id)
        ? currentFavorites.filter((itemId) => itemId !== selectedProduct.id) // Remove from favorites
        : [...currentFavorites, selectedProduct.id]; // Add to favorites

      setIsFavorite(!isFavorite); // Toggle UI state

      // Add the product to the favorites list in the context
      addToFavorite(selectedProduct);
    }
  };

  // Styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background
    },
    scrollContainer: {
      paddingBottom: 120, // Space for the fixed Add to Cart button
    },
    heartIconWrapper: {
      position: 'absolute',
      top: 16,
      right: 16,
      zIndex: 10, // Keep it on top
    },
    imageCarousel: {
      height: width,
    },
    productImage: {
      width: width,
      height: width,
      resizeMode: 'cover',
    },
    productInfo: {
      padding: 16,
    },
    productName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.pageText
    },
    productColor: {
      fontSize: 14,
      color: '#666',
      marginTop: 4,
    },
    priceDescription: {
      padding: 16,
    },
    price: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.pageText
    },
    description: {
      fontSize: 14,
      color: colors.pageText,
      marginTop: 8,
    },
    sectionContainer: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      backgroundColor: colors.background,
      marginBottom: 10,
      borderRadius: 8,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.pageText,
    },
    sectionContent: {
      fontSize: 14,
      color: colors.pageText,
      marginTop: 4,
    },
    benefitItem: {
      width: 100,
      alignItems: 'center',
      marginRight: 20,
    },
    benefitName: {
      fontSize: 14,
      color: colors.pageText,
      marginTop: 5,
      textAlign: 'center',
    },
    reviewContainer: {
      marginVertical: 8,
    },
    reviewTitle: {
      fontWeight: 'bold',
      fontSize: 16,
      color: colors.pageText,
    },
    reviewContent: {
      fontSize: 14,
      color: colors.pageText,
      marginTop: 2,
    },
    sizeLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.pageText,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    sizeSelector: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: 16,
      marginTop: 8,
    },
    sizeOption: {
      borderRadius: 50,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 12,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedSizeOption: {
      backgroundColor: '#000',
      borderColor: '#000',
    },
    sizeText: {
      fontSize: 16,
      color: '#000',
    },
    selectedSizeText: {
      color: '#fff',
    },
    fixedBottomButtonContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    addToCartButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.buttonBackground,
      paddingVertical: 16,
      borderRadius: 50,
    },
    addToCartButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.buttonText,
      marginRight: 10,
    },
  });

  return (
    <View style={styles.container}>
      {/* Heart Icon (Favorite) */}
      <View style={styles.heartIconWrapper}>
        <TouchableOpacity onPress={toggleFavorite}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"} // Toggle between filled and outline
            size={24}
            color={isFavorite ? "black" : "black"} // Set black when active
          />
        </TouchableOpacity>
      </View>

      {/* Product Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Product Image Carousel */}
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.imageCarousel}>
          {selectedProduct?.images?.map((imageUri, index) => (
            <Image key={index} source={{ uri: imageUri || AWS_HOLDER_IMAGE }} style={styles.productImage} />
          ))}
        </ScrollView>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{selectedProduct?.name}</Text>
          <Text style={styles.productColor}>Color: {selectedProduct?.color}</Text>
        </View>

        {/* Price and Description */}
        <View style={styles.priceDescription}>
          <Text style={styles.price}>{convertToCurrency(selectedProduct?.price ?? 0)}</Text>
          <Text style={styles.description}>{selectedProduct?.description}</Text>
        </View>

        {/* Benefits Horizontal Roller */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Benefits</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Ionicons name={benefit.icon as keyof typeof Ionicons.glyphMap} size={36} color={colors.primary} />
                <Text style={styles.benefitName}>{benefit.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Ingredients Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <Text style={styles.sectionContent}>- 100% Natural Sea Moss</Text>
          <Text style={styles.sectionContent}>- Vegetable Cellulose (Capsule)</Text>
        </View>

        {/* Customer Reviews Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Customer Reviews</Text>
          {selectedProduct?.reviews?.map((review, index) => (
            <View key={index} style={styles.reviewContainer}>
              <Text style={styles.reviewTitle}>{review.userName}</Text>
              <Text style={styles.reviewContent}>{review.comment}</Text>
            </View>
          ))}
        </View>

        {/* Size Selector */}
        {props.showSize ? (
          <>
            <Text style={styles.sizeLabel}>PICK YOUR SIZE</Text>
            <View style={styles.sizeSelector}>
              {sizes.map((size, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.sizeOption, selectedSize === size && styles.selectedSizeOption]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={[styles.sizeText, selectedSize === size && styles.selectedSizeText]}>{size}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <View />
        )}
      </ScrollView>

      {/* Add to Cart Button - Fixed at the bottom */}
      <View style={styles.fixedBottomButtonContainer}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handlePress}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          <Ionicons name="cart-outline" size={24} color={colors.buttonText} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailsPageVThree;

// import React, { FC, useEffect, useState } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { COLORS } from '@/utils/theme'; // Assuming you have a COLORS file
// import { AWS_HOLDER_IMAGE } from '@/utils/api';
// import { useClientProduct } from '@/contexts/ClientProductContext';
// import { ProductModelProps } from '@/models/ProductModelProps';
// import { useAuth } from '@/contexts/AuthContext';
// import { useCart } from '@/contexts/CartContext';
// import convertToCurrency from '@/hooks/convertToCurrency';
// import { useFavorite } from '@/contexts/FavoriteContext';
// import { useTheme } from "@/contexts/ThemeContext"

// const { width, height } = Dimensions.get('window');

// export interface ProductDetailsPageVThreeProps {
//   showSize: boolean
// }

// const ProductDetailsPageVThree: FC<ProductDetailsPageVThreeProps> = (props) => {
//   const [selectedSize, setSelectedSize] = useState<number | null>(null);
//   const [isFavorite, setIsFavorite] = useState<boolean>(false); // State for heart icon toggle
//   const { selectedProduct } = useClientProduct();
//   const { authState, updateSingleUserItem} = useAuth(); // Access authState and updateSingleUserItem
//   const { addToCart } = useCart();
//   const { colors } = useTheme();
//   const { addToFavorite, favorites } = useFavorite();

//   const sizes = [6, 6.5, 7, 7.5, 8]; // Example sizes

//   const handlePress = () => {
//     if (selectedProduct) {
//       const partialProduct: Partial<ProductModelProps> = {
//         id: selectedProduct.id,
//         name: selectedProduct.name,
//         price: selectedProduct.price,
//         images: selectedProduct.images,
//         quantity: 1, // Default quantity
//         color: 'default', // Add color if necessary
//         size: String(selectedSize) ?? 'default', // Add size if necessary
//       };
//       addToCart(partialProduct); // Pass authUser and updateSingleUserItem
//     }
//   };
// // Check if product is already a favorite when favorites or selectedProduct changes
// useEffect(() => {
//   if (selectedProduct && favorites.some((fav) => fav.id === selectedProduct.id)) {
//     setIsFavorite(true);
//   } else {
//     setIsFavorite(false);
//   }
// }, [favorites, selectedProduct]); // Dependency array: Runs when favorites or selectedProduct changes

// const toggleFavorite = async () => {
//   console.log("Fav selected 3")
//   if (selectedProduct) {
//     const currentFavorites = authState?.user?.favoriteItems || [];

//     // Check if the product is already a favorite
//     const updatedFavorites = currentFavorites.includes(selectedProduct.id)
//       ? currentFavorites.filter((itemId) => itemId !== selectedProduct.id) // Remove from favorites
//       : [...currentFavorites, selectedProduct.id]; // Add to favorites

//     setIsFavorite(!isFavorite); // Toggle UI state

//     // Call the `updateSingleUserItem` function with the updated favorites list
//     // await updateSingleUserItem('favoriteItems', updatedFavorites);

//     // Add the product to the favorites list in the context
//     addToFavorite(selectedProduct);
//   }
// };



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background
//   },
//   scrollContainer: {
//     paddingBottom: 120, // Space for the fixed Add to Cart button
//   },
//   heartIconWrapper: {
//     position: 'absolute',
//     top: 16,
//     right: 16,
//     zIndex: 10, // Keep it on top
//   },
//   imageCarousel: {
//     height: width,
//   },
//   productImage: {
//     width: width,
//     height: width,
//     resizeMode: 'cover',
//   },
//   productInfo: {
//     padding: 16,
//   },
//   productName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: colors.pageText
//   },
//   productColor: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 4,
//   },
//   priceDescription: {
//     padding: 16,
//   },
//   price: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: colors.pageText
//   },
//   description: {
//     fontSize: 14,
//     color: colors.pageText, //'#555',
//     marginTop: 8,
//   },
//   sizeLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: colors.pageText, // '#000',
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   sizeSelector: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingHorizontal: 16,
//     marginTop: 8,
//   },
//   sizeOption: {
//     borderRadius: 50,
//     borderWidth: 1,
//     borderColor: colors.border, // '#ddd',
//     padding: 12,
//     width: 50,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   selectedSizeOption: {
//     backgroundColor: '#000',
//     borderColor: '#000',
//   },
//   sizeText: {
//     fontSize: 16,
//     color: '#000',
//   },
//   selectedSizeText: {
//     color: '#fff',
//   },
//   fixedBottomButtonContainer: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     // backgroundColor: 'transpart',
//   },
//   addToCartButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: colors.buttonBackground, //'#000',
//     paddingVertical: 16,
//     borderRadius: 50,
//   },
//   addToCartButtonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: colors.buttonText,// '#fff',
//     marginRight: 10,
//   },
// });

//   return (
//     <View style={styles.container}>
//       {/* Heart Icon (Favorite) */}
//       <View style={styles.heartIconWrapper}>
//         <TouchableOpacity onPress={toggleFavorite}>
//           <Ionicons
//             name={isFavorite ? "heart" : "heart-outline"} // Toggle between filled and outline
//             size={24}
//             color={isFavorite ? "black" : "black"} // Set black when active
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Product Scrollable Content */}
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         {/* Product Image Carousel */}
//         <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.imageCarousel}>
//           {selectedProduct?.images?.map((imageUri, index) => (
//             <Image key={index} source={{ uri: imageUri || AWS_HOLDER_IMAGE }} style={styles.productImage} />
//           ))}
//         </ScrollView>

//         {/* Product Info */}
//         <View style={styles.productInfo}>
//           <Text style={styles.productName}>{selectedProduct?.name}</Text>
//           <Text style={styles.productColor}>Color: {selectedProduct?.color}</Text>
//         </View>

//         {/* Price and Description */}
//         <View style={styles.priceDescription}>
//           <Text style={styles.price}>{convertToCurrency(selectedProduct?.price ?? 0) }</Text>
//           <Text style={styles.description}>
//             {selectedProduct?.description}
//           </Text>
//         </View>
// {/* Size Selector */}
// {props.showSize ? (
//   <>
//     <Text style={styles.sizeLabel}>PICK YOUR SIZE</Text>
//     <View style={styles.sizeSelector}>
//       {sizes.map((size, index) => (
//         <TouchableOpacity
//           key={index}
//           style={[styles.sizeOption, selectedSize === size && styles.selectedSizeOption]}
//           onPress={() => setSelectedSize(size)}
//         >
//           <Text style={[styles.sizeText, selectedSize === size && styles.selectedSizeText]}>{size}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   </>
// ) : (
//   <View />
// )}

        
       
//       </ScrollView>
  

//       {/* Add to Cart Button - Fixed at the bottom */}
//       <View style={styles.fixedBottomButtonContainer}>
//         <TouchableOpacity style={styles.addToCartButton} onPress={handlePress}>
//           <Text style={styles.addToCartButtonText}>Add to Cart</Text>
//           <Ionicons name="cart-outline" size={24} color={colors.primary} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };


// export default ProductDetailsPageVThree;



// cart button in scroll view
// import React, { useState } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { COLORS } from '@/utils/theme'; // Assuming you have a COLORS file
// import { AWS_HOLDER_IMAGE } from '@/utils/api';
// import { useClientProduct } from '@/contexts/ClientProductContext';
// import { ProductModelProps } from '@/models/ProductModelProps';
// import { useAuth } from '@/contexts/AuthContext';
// import { useCart } from '@/contexts/CartContext';

// const { width } = Dimensions.get('window');

// const ProductDetailsPageVThree: React.FC = () => {
//   const [selectedSize, setSelectedSize] = useState<number | null>(null);
//   const [isFavorite, setIsFavorite] = useState<boolean>(false); // State for heart icon toggle
//   const { selectedProduct } = useClientProduct();
//   const { authState, updateSingleUserItem } = useAuth(); // Access authState and updateSingleUserItem
//   const { addToCart } = useCart();

//   const sizes = [6, 6.5, 7, 7.5, 8]; // Example sizes

//   const handlePress = () => {
//     if (selectedProduct) {
//       const partialProduct: Partial<ProductModelProps> = {
//         id: selectedProduct.id,
//         name: selectedProduct.name,
//         price: selectedProduct.price,
//         images: selectedProduct.images,
//         quantity: 1, // Default quantity
//         color: 'default', // Add color if necessary
//         size: String(selectedSize) ?? 'default', // Add size if necessary
//       };
//       addToCart(partialProduct); // Pass authUser and updateSingleUserItem
//     }
//   };

//   const toggleFavorite = () => {
//     setIsFavorite(!isFavorite); // Toggle the heart icon
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Heart Icon (Favorite) */}
//       <View style={styles.heartIconWrapper}>
//         <TouchableOpacity onPress={toggleFavorite}>
//           <Ionicons
//             name={isFavorite ? "heart" : "heart-outline"} // Toggle between filled and outline
//             size={24}
//             color={isFavorite ? "black" : "black"} // Set black when active
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Product Image Carousel */}
//       <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.imageCarousel}>
//         {selectedProduct?.images?.map((imageUri, index) => (
//           <Image key={index} source={{ uri: imageUri || AWS_HOLDER_IMAGE }} style={styles.productImage} />
//         ))}
//       </ScrollView>

//       {/* Product Info */}
//       <View style={styles.productInfo}>
//         <Text style={styles.productName}>Nike Air Max 720</Text>
//         <Text style={styles.productColor}>Color: Black Anthracite</Text>
//       </View>

//       {/* Price and Description */}
//       <View style={styles.priceDescription}>
//         <Text style={styles.price}>$180</Text>
//         <Text style={styles.description}>
//           The Nike Air Max 720 goes bigger than ever before with Nike's tallest Air unit yet, offering more air underfoot for unimaginable, all-day comfort.
//         </Text>
//       </View>

//       {/* Size Selector */}
//       <Text style={styles.sizeLabel}>PICK YOUR SIZE</Text>
//       <View style={styles.sizeSelector}>
//         {sizes.map((size, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[styles.sizeOption, selectedSize === size && styles.selectedSizeOption]}
//             onPress={() => setSelectedSize(size)}
//           >
//             <Text style={[styles.sizeText, selectedSize === size && styles.selectedSizeText]}>{size}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Add to Cart Button */}
//       <TouchableOpacity style={styles.addToCartButton} onPress={handlePress}>
//         <Text style={styles.addToCartButtonText}>Add to Cart</Text>
//         <Ionicons name="cart-outline" size={24} color="white" />
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#F5F5F5',
//     paddingBottom: 40,
//   },
//   heartIconWrapper: {
//     position: 'absolute',
//     top: 16,
//     right: 16,
//     zIndex: 10, // Keep it on top
//   },
//   imageCarousel: {
//     height: width,
//   },
//   productImage: {
//     width: width,
//     height: width,
//     resizeMode: 'cover',
//   },
//   productInfo: {
//     padding: 16,
//   },
//   productName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   productColor: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 4,
//   },
//   priceDescription: {
//     padding: 16,
//   },
//   price: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   description: {
//     fontSize: 14,
//     color: '#555',
//     marginTop: 8,
//   },
//   sizeLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   sizeSelector: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingHorizontal: 16,
//     marginTop: 8,
//   },
//   sizeOption: {
//     borderRadius: 50,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     padding: 12,
//     width: 50,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   selectedSizeOption: {
//     backgroundColor: '#000',
//     borderColor: '#000',
//   },
//   sizeText: {
//     fontSize: 16,
//     color: '#000',
//   },
//   selectedSizeText: {
//     color: '#fff',
//   },
//   addToCartButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#000',
//     paddingVertical: 16,
//     marginHorizontal: 16,
//     borderRadius: 50,
//     marginTop: 24,
//   },
//   addToCartButtonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginRight: 10,
//   },
// });

// export default ProductDetailsPageVThree;


// simple
// import React, { FC, useState } from 'react';
// import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
// import { useCart } from '@/contexts/CartContext';
// import { useClientProduct } from '@/contexts/ClientProductContext';
// import convertToCurrency from '@/hooks/convertToCurrency';
// import GlitterButton from '@/components/buttons/GlitterButtom';
// import { ProductModelProps } from '@/models/ProductModelProps';
// import { useAuth } from '@/contexts/AuthContext';

// const ProductDetailsPageVThree: FC = () => {
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);
//   const [selectedSize, setSelectedSize] = useState<string | null>(null);
//   const { addToCart } = useCart();
//   const { selectedProduct } = useClientProduct();
//   const { authState, updateSingleUserItem } = useAuth(); // Access authState and updateSingleUserItem

//   const handlePress = () => {
//     if (selectedProduct) {
//       const partialProduct: Partial<ProductModelProps> = {
//         id: selectedProduct.id,
//         name: selectedProduct.name,
//         price: selectedProduct.price,
//         images: selectedProduct.images,
//         quantity: 1, // Default quantity
//         color: selectedColor ?? 'default', // Add color if necessary
//         size: selectedSize ?? 'default', // Add size if necessary
//       };
//       addToCart(partialProduct); // Pass authUser and updateSingleUserItem
//     }
//   };

//   const description = selectedProduct?.description ?? "";

//   return (
//     <View style={{ backgroundColor: 'white' }}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={styles.imageContainer}>
//           <Image 
//             source={{ uri: selectedProduct?.images[0] }} // Replace with actual image URI
//             style={styles.productImage}
//           />
//           <View style={styles.textOverlay}>
//             <Text style={styles.overlayTitle}>{selectedProduct?.name}</Text>
//             <Text style={styles.overlaySubtitle}>{description}</Text>
//           </View>
//         </View>
        
//         <View style={styles.section}>
//           <View style={styles.productInfo}>
//             <Text style={styles.productTitle}>{selectedProduct?.name}</Text>
//             <Text style={styles.productSubtitle}>
//               {description.length > 11 ? description.slice(0, 11) + '...' : description}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.section}>
//           <View style={styles.priceSection}>
//             <Text style={styles.priceLabel}>Price</Text>
//             <Text style={styles.divider}>|</Text>
//             <View style={styles.priceInfo}>
//               <Text style={styles.price}>
//                 {convertToCurrency(selectedProduct?.price ?? 10000)}
//               </Text>
//               <Text style={styles.description}>{description}</Text>
//             </View>
//           </View>
//         </View>

//         <GlitterButton onPress={handlePress} buttonText={'Add To Cart'} />
//       </ScrollView>
//     </View>
//   );
// };

// export default ProductDetailsPageVThree;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#FFFFFF',
//     padding: 16,
//   },
//   imageContainer: {
//     position: 'relative',
//   },
//   productImage: {
//     width: '100%',
//     height: 400,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   textOverlay: {
//     position: 'absolute',
//     top: 20,
//     left: 20,
//     right: 20,
//   },
//   overlayTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     marginBottom: 5,
//   },
//   overlaySubtitle: {
//     fontSize: 16,
//     color: '#FFFFFF',
//   },
//   productInfo: {
//     marginBottom: 20,
//   },
//   productTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#000000',
//   },
//   productSubtitle: {
//     fontSize: 16,
//     color: '#7D7D7D',
//     marginTop: 5,
//   },
//   section: {
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 10,
//     padding: 16,
//     marginBottom: 20,
//   },
//   priceSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   priceLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000000',
//     marginRight: 10, // Added margin to separate label from price
//   },
//   divider: {
//     fontSize: 16,
//     color: '#E0E0E0',
//     marginHorizontal: 10, // Divider spacing
//   },
//   priceInfo: {
//     flex: 1,
//   },
//   price: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#000000',
//     marginBottom: 5,
//   },
//   description: {
//     fontSize: 14,
//     color: '#7D7D7D',
//   },
// });


// import React, { FC, useState } from 'react';
// import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
// import { COLORS, SIZES } from '@/utils/theme';
// import { useCart } from '@/contexts/CartContext';
// import { useClientProduct } from '@/contexts/ClientProductContext';
// import convertToCurrency from '@/hooks/convertToCurrency';
// import GlitterButton from '@/components/buttons/GlitterButtom';

// const ProductDetailsPageVThree: FC = () => {
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);
//   const [selectedSize, setSelectedSize] = useState<string | null>(null);
//   const { addToCart } = useCart();
//   const { selectedProduct } = useClientProduct();

//   const [isPressed, setIsPressed] = useState(false);

//   const handlePress = () => {
//     if (selectedProduct) {
//       const partialProduct: Partial<typeof selectedProduct> = {
//         ...selectedProduct,
//         quantity: 1, // Default quantity
//         color: selectedColor ?? 'default', // Add color if necessary
//         size: selectedSize ?? 'default', // Add size if necessary
//       };
//       addToCart(partialProduct); // Add the product to the cart
//       setIsPressed(true);

//       // Reset animation state after some time
//       setTimeout(() => setIsPressed(false), 500);
//     }
//   };

//   const description = selectedProduct?.description ?? "";

//   return (
//     <View style={{ backgroundColor: 'white' }}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={styles.imageContainer}>
//           <Image 
//             source={{ uri: selectedProduct?.images[0] }} // Replace with actual image URI
//             style={styles.productImage}
//           />
//           <View style={styles.textOverlay}>
//             <Text style={styles.overlayTitle}>{selectedProduct?.name}</Text>
//             <Text style={styles.overlaySubtitle}>{description}</Text>
//           </View>
//         </View>
        
//         <View style={styles.section}>
//           <View style={styles.productInfo}>
//             <Text style={styles.productTitle}>{selectedProduct?.name}</Text>
//             <Text style={styles.productSubtitle}>
//               {description.length > 11 ? description.slice(0, 11) + '...' : description}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.section}>
//           <View style={styles.priceSection}>
//             <Text style={styles.priceLabel}>Price</Text>
//             <Text style={styles.divider}>|</Text>
//             <View style={styles.priceInfo}>
//               <Text style={styles.price}>
//                 {convertToCurrency(selectedProduct?.price ?? 10000)}
//               </Text>
//               <Text style={styles.description}>{description}</Text>
//             </View>
//           </View>
//         </View>

//         <GlitterButton onPress={handlePress} buttonText={'Add To Cart'} />
//       </ScrollView>
//     </View>
//   );
// };

// export default ProductDetailsPageVThree;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#FFFFFF',
//     padding: 16,
//   },
//   imageContainer: {
//     position: 'relative',
//   },
//   productImage: {
//     width: '100%',
//     height: 400,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   textOverlay: {
//     position: 'absolute',
//     top: 20,
//     left: 20,
//     right: 20,
//   },
//   productInfo: {
//     marginBottom: 20,
//   },
//   productTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#000000',
//   },
//   productSubtitle: {
//     fontSize: 16,
//     color: '#7D7D7D',
//     marginTop: 5,
//   },
//   overlayTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     marginBottom: 5,
//   },
//   overlaySubtitle: {
//     fontSize: 16,
//     color: '#FFFFFF',
//   },
//   section: {
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 10,
//     padding: 16,
//     marginBottom: 20,
//   },
//   priceSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   priceLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000000',
//     marginRight: 10, // Added margin to separate label from price
//   },
//   divider: {
//     fontSize: 16,
//     color: '#E0E0E0',
//     marginHorizontal: 10, // Divider spacing
//   },
//   priceInfo: {
//     flex: 1,
//   },
//   price: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#000000',
//     marginBottom: 5,
//   },
 






// import React, { FC, useContext, useState } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { COLORS, SIZES } from '@/utils/theme'; // Adjust based on your theme structure
// import { CartContext } from '@/contexts/CartContext';
// import { useClientProduct } from '@/contexts/ClientProductContext';
// // import SizesView from '@/components/card/SizesView';
// import ProductColorPickerView from '@/components/views/ProductColorPickerView';
// import SizesView from '@/components/views/SizesView';
// import { ProductModelProps } from '@/models/ProductModelProps';
// import convertToCurrency from '@/hooks/convertToCurrency';

// const ProductDetailsPageVThree: FC<ProductModelProps> = (props) => {
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);
//   const [selectedSize, setSelectedSize] = useState<string | null>(null);
//   const { addToCart } = useContext(CartContext);
//   const { selectedProduct } = useClientProduct();

//   const colors = ['#F5F5DC', '#000000', '#A0522D'];
//   const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

//   const description = selectedProduct?.description ?? ""
//   return (
//     <View style={{backgroundColor: "white"}}>
//     <ScrollView contentContainerStyle={styles.container}>
//       <Image 
//         source={{ uri: selectedProduct?.images[0] }} // Replace with actual image URI
//         style={styles.productImage}
//       />
      
//       <View style={styles.section}>
//         <View style={styles.productInfo}>
//           <Text style={styles.productTitle}>{selectedProduct?.name}</Text>
//           <Text style={styles.productSubtitle}>{description.length > 11 ? description.slice(0, 11) + '...' : description}
//           </Text>
//         </View>
//       </View>




// {/* Variants  */}
// {/* <ProductColorPickerView colors={colors} selectedColor={selectedColor} onColorSelect={setSelectedColor} /> */}    
// {/* <SizesView sizes={sizes} selectedSize={selectedSize} onSizeSelect={setSelectedSize} /> */}


//       <View style={styles.section}>
//       <View style={styles.priceSection}>
//         <Text style={styles.priceLabel}>Price</Text>

//         <Text style={styles.divider}>|</Text>
//         <View style={styles.priceInfo}>
//         <Text style={styles.price}>{ convertToCurrency(selectedProduct?.price ?? 10000) }</Text>

//           <Text style={styles.description}>
//             {selectedProduct?.description ?? ""}
//           </Text>
//         </View>
//       </View>
//     </View>
//       <TouchableOpacity style={styles.buyButton} onPress={() => {
//           if (selectedProduct) {
//             addToCart(selectedProduct);

//           }
//       }}>
//         <Text style={styles.buyButtonText}>Add To Cart</Text>
//       </TouchableOpacity>
//     </ScrollView>
//     </View>
//   );
// };

// export default ProductDetailsPageVThree;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#FFFFFF',
//     padding: 16,
//   },
//    divider: {
//     fontSize: 16,
//     color: '#E0E0E0',
//     marginHorizontal: 10, // Divider spacing
//   },
//   productImage: {
//     width: '100%',
//     height: 400,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   section: {
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 10,
//     padding: 16,
//     marginBottom: 20,
//   },
//   productInfo: {
//     marginBottom: 20,
//   },
//   productTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#000000',
//   },
//   productSubtitle: {
//     fontSize: 16,
//     color: '#7D7D7D',
//     marginTop: 5,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000000',
//     marginBottom: 10,
//   },
//   colorOptions: {
//     flexDirection: 'row',
//   },
//   colorCircle: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   selectedColorCircle: {
//     borderWidth: 2,
//     borderColor: '#000000',
//   },
//   sizeOptions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   sizeButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 5,
//   },
//   selectedSizeButton: {
//     backgroundColor: '#000000',
//   },
//   sizeText: {
//     fontSize: 14,
//     color: '#000000',
//   },
//   selectedSizeText: {
//     color: '#FFFFFF',
//   },
//   priceSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   priceLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000000',
//   },
//   priceInfo: {
//     flex: 1, // Allows priceInfo to take up remaining space
//   },
//   price: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#000000',
//     marginRight: 10,
//   },
//   descriptionContainer: {
//     flex: 1,
//   },
//   description: {
//     fontSize: 14,
//     color: '#7D7D7D',
//     flexWrap: 'wrap', // Allows text to wrap within the container
//   },
//   buyButton: {
//     backgroundColor: '#FFFFFF',
//     borderWidth: 2,
//     borderColor: '#000000',
//     borderRadius: 25,
//     paddingVertical: 15,
//     alignItems: 'center',
//     marginTop: 20, // Added margin to ensure it's visible
//   },
//   buyButtonText: {
//     color: '#000000',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });
