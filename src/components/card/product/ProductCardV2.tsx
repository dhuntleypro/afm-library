// import React, { FC } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { SIZES } from '@/utils/theme';
// import { CONSTANTS } from '@/utils/constants';
// import { Link } from 'expo-router';
// import { ProductModelProps } from '@/models/ProductModelProps';
// import convertToCurrency from '@/hooks/convertToCurrency';
// import { useClientProduct } from '@/contexts/ClientProductContext';
// import { useCart } from '@/contexts/CartContext';
// import { useAuth } from '@/contexts/AuthContext';
// import { useTheme } from '@/contexts/ThemeContext';

// export const ProductCardV2: FC<ProductModelProps> = (item) => {
//   const { addToCart } = useCart();
//   const { authState } = useAuth();
//   const { selectProduct } = useClientProduct();
//   const { colors } = useTheme();

//   const handleProductSelect = (product: ProductModelProps) => {
//     selectProduct(product);
//   };

//   const handleAddToCart = () => {
//     if (authState?.user) {
//       addToCart(item);
//     } else {
//       console.error("User not logged in, cannot add to cart");
//     }
//   };


// // const toggleFavorite = async () => {

// //   handleProductSelect
// //   console.log("Fav selected 3")
// //   if (selectedProduct) {
   
// //     setIsFavorite(!isFavorite); // Toggle UI state

// //     addToFavorite(selectedProduct);
// //   }
// // };

//   return (
//      <Link href={`/products/${item.id}` as never} asChild>

//     <View style={[styles.container, { backgroundColor: colors.card }]}>
//       {/* Heart icon
//       <TouchableOpacity style={styles.heartIcon} onPress={() => toggleFavorite}>
//         <Ionicons name="heart-outline" size={24} color={colors.primary} />
//       </TouchableOpacity> */}

//       <TouchableOpacity onPress={() => handleProductSelect(item)}>
//         <View style={styles.imageContainer}>
//           <Image 
//             style={styles.image} 
//             source={{ uri: item.images[0] || CONSTANTS.holderImageProductCard }} 
//           />

           

//         </View>

//         <View style={styles.details}>
//           <Text style={[styles.title, { color: colors.title }]} numberOfLines={2}>{item.name}</Text>
//           <Text style={[styles.subtitle, { color: colors.subtitle }]} numberOfLines={1}>{item.color_code}</Text>
//           <Text style={[styles.price, { color: colors.title }]}>{convertToCurrency(item.price)}</Text>

//           {/* Add to Cart Button */}
//           <TouchableOpacity style={[styles.addToCartButton, { backgroundColor: colors.primary }]} onPress={handleAddToCart}>
//             <Text style={[styles.addToCartText, { color: colors.title }]}>Add To Cart</Text>
//             <Ionicons name="cart-outline" size={18} color={colors.title} style={{ marginLeft: 5 }} />
//           </TouchableOpacity>
//         </View>
//       </TouchableOpacity>
//     </View>
//     </Link>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: 190,  // Adjusted width for better fit
//     margin: 8,
//     borderRadius: SIZES.small,
//     borderColor: "gray",
//     borderWidth: 1,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   imageContainer: {
//     width: '100%',
//     height: 150,  // Image height to maintain proportions
//     borderRadius: SIZES.small,
//     overflow: 'hidden',
//   },
//   image: {
//     width: '110%',
//     height: '100%',
//     resizeMode: 'cover',  // Ensure the image fills the space
//   },
//   details: {
//     padding: SIZES.small,
//     alignItems: 'center',
//   },
//   title: {
//     fontFamily: 'bold',
//     fontSize: SIZES.small,
//     marginBottom: 2,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontFamily: 'regular',
//     fontSize: SIZES.xSmall,
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   price: {
//     fontFamily: 'bold',
//     fontSize: SIZES.medium,
//     textAlign: 'center',
//     marginBottom: 10,  // Space before the Add to Cart button
//   },
//   heartIcon: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     zIndex: 1,
//   },
//   addToCartButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: SIZES.small,
//   },
//   addToCartText: {
//     fontSize: SIZES.small,
//     fontFamily: 'bold',
//   },
// });






import React, { FC } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SIZES } from '@/utils/theme';
import { CONSTANTS } from '@/utils/constants';
import { Link } from 'expo-router';
import { ProductModelProps } from '@/models/ProductModelProps';
import convertToCurrency from '@/hooks/convertToCurrency';
import { useClientProduct } from '@/contexts/ClientProductContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext'; // Using your custom useTheme

export const ProductCardV2: FC<ProductModelProps> = (item) => {
  const { addToCart } = useCart();
  const { authState } = useAuth();
  const { selectProduct } = useClientProduct();
  
  // Using colors from the custom theme
  const { colors } = useTheme();

  const handleProductSelect = (product: ProductModelProps) => {
    selectProduct(product);
  };

  const handleAddToCart = () => {
    if (authState?.user) {
      addToCart(item);
    } else {
      console.error("User not logged in, cannot add to cart");
    }
  };

  return (
    <View>
      {/* @ts-ignore */}
      <Link href={`/products/${item.id}`} asChild>
        <TouchableOpacity onPress={() => handleProductSelect(item)}>
          <View style={[styles.container, { backgroundColor: colors.card }]}>
            {/* Image */}
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: item.image || CONSTANTS.holderImageProductCard }} />
            </View>

            {/* Details */}
            <View style={styles.details}>
              <Text style={[styles.title, { color: colors.cardText }]} numberOfLines={2}>{item.name}</Text>
              <Text style={[styles.supplier, { color: colors.cardSecondaryText }]} numberOfLines={1}>{item.color_code}</Text>
              <Text style={[styles.price, { color: colors.primary }]}>{convertToCurrency(item.price)}</Text>
            </View>

            {/* Add to Cart Button */}
            <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
              <Ionicons name='add-circle' size={35} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    width: 182,
    height: 240,
    marginEnd: 22,
    borderRadius: SIZES.medium,
  },
  imageContainer: {
    flex: 1,
    width: 170,
    marginLeft: SIZES.small / 2,
    marginTop: SIZES.small / 2,
    borderRadius: SIZES.small,
    overflow: "hidden",
  },
  image: {
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  details: {
    padding: SIZES.small,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.small,
    marginBottom: 2,
    height: 35,
  },
  supplier: {
    fontFamily: "regular",
    fontSize: SIZES.small,
  },
  price: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
  },
  addBtn: {
    position: "absolute",
    bottom: SIZES.xSmall,
    right: SIZES.xSmall,
  },
});


























// import React, { FC, useContext } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { COLORS, SIZES } from '@/utils/theme';
// import { CONSTANTS } from '@/utils/constants';
// import { Link } from 'expo-router';
// import { ProductModelProps } from '@/models/ProductModelProps';
// import convertToCurrency from '@/hooks/convertToCurrency';
// import { useClientProduct } from '@/contexts/ClientProductContext';
// import { useCart } from '@/contexts/CartContext';
// import { useAuth } from '@/contexts/AuthContext';
// import { useTheme } from "@/contexts/ThemeContext"

// export const ProductCardV2: FC<ProductModelProps> = (item) => {
//   const { addToCart } = useCart();
//   const { authState, updateSingleUserItem } = useAuth();
//   const { products, selectedProduct, selectProduct, isLoading, error } = useClientProduct();

//   const { colors } = useTheme()
//   const handleProductSelect = (product: ProductModelProps) => {
//     selectProduct(product);
//   };

//   const handleAddToCart = () => {
//     if (authState?.user) {
//       addToCart(item);
//     } else {
//       console.error("User not logged in, cannot add to cart");
//       // Optionally: redirect to login page or show message
//     }
//   };

//   return (
//     <View>
//       {/* @ts-ignore */}
//       <Link href={`/products/${selectedProduct?.id}`} asChild>
//         <TouchableOpacity onPress={() => handleProductSelect(item)}>
//           <View style={styles.container}>
//             {/* Image */}
//             <View style={styles.imageContainer}>
//               <Image style={styles.image} source={{ uri: item.image || CONSTANTS.holderImageProductCard }} />
//             </View>

//             {/* Details */}
//             <View style={styles.details}>
//               <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
//               <Text style={styles.supplier} numberOfLines={1}>{item.color_code}</Text>
//               <Text style={styles.price}>{convertToCurrency(item.price)}</Text>
//             </View>

//             {/* Button */}
//             <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
//               <Ionicons name='add-circle' size={35} color={COLORS.primary} />
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Link>
//     </View>
//   );
// };


// // export default ProductGridCardVOne; 

// const styles = StyleSheet.create({
//     container: {
//         width: 182,
//         height: 240,
//         marginEnd: 22,
//         borderRadius: SIZES.medium,
//         backgroundColor: COLORS.secondary,
//         // remove
//     },
//     imageContainer: {
//         flex: 1,
//         width: 170,
//         marginLeft: SIZES.small/2,
//         marginTop: SIZES.small/2,
//         borderRadius: SIZES.small,
//         overflow: "hidden"
//     },
//     image: {
//         aspectRatio: 1,
//         resizeMode: 'cover'
//     },
//     details: {
//         padding: SIZES.small,
        
 
//     },
//     title: {
//         fontFamily: "bold",
//         fontSize: SIZES.small ,
//         marginBottom: 2,
//         height: 35

//     },
//     supplier: {
//         fontFamily: "regular",
//         fontSize: SIZES.small,
//         color: COLORS.gray

//     },
//     price: {
//         fontFamily: "bold",
//         fontSize: SIZES.medium,
       
//     },
//     addBtn: {
//         position:"absolute",
//         bottom: SIZES.xSmall,
//         right: SIZES.xSmall,
        


//     }

// })

