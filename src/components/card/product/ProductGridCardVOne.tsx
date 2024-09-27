import React, { FC, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import convertToCurrency from '@/hooks/convertToCurrency';
import { ProductModelProps } from '@/models/ProductModelProps';
import { useClientProduct } from '@/contexts/ClientProductContext';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');

export interface ProductCardProps {
  product: ProductModelProps;
  viewTypeGrid: boolean; // A boolean to determine grid or list view
}

export const ProductGridCardVOne: FC<ProductCardProps> = ({ product, viewTypeGrid }) => {
  const { addToCart } = useCart();
  const { selectProduct } = useClientProduct();
  const { colors } = useTheme(); // Pulling colors from the custom theme
  const [isPressed, setIsPressed] = useState(false); // State for controlling the button animation
  const [isAdded, setIsAdded] = useState(false); // State to track if the product is added

  const handleProductPress = () => {
    selectProduct(product);
  };

  const handleAddToCartPress = () => {
    setIsPressed(true);
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsPressed(false); // Stop animation after 2 seconds
      setTimeout(() => setIsAdded(false), 1000); // Revert background and icon after 1 second
    }, 2000); // Spin for 2 seconds
  };

  const styles = StyleSheet.create({
    container: {
      width: viewTypeGrid ? width / 2 - 40 : width - 40, // Adjust width for grid or list view
      height: viewTypeGrid ? 250 : 240, // Adjust height for grid or list view
      margin: viewTypeGrid ? 10 : 22, // Spacing for grid or list view
      borderRadius: 10,
      backgroundColor: isAdded ? colors.primary : colors.cardBackground, // Change background to green when added
      borderWidth: 2,
      borderColor: colors.border,
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
      width: viewTypeGrid ? 140 : 160, // Adjust image size for grid or list view
      height: viewTypeGrid ? 140 : 160,
      borderRadius: 10,
      resizeMode: 'cover',
    },
    details: {
      padding: 10,
      color: colors.title,
    },
    title: {
      fontFamily: 'bold',
      fontSize: 16,
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
      fontSize: 18,
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
      <Link href={`/products/${product.id}` as never} asChild>
        <TouchableOpacity onPress={handleProductPress}>
          <View style={styles.container}>
            {/* Image */}
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: product.images[0] }} />
            </View>

            {/* Details */}
            <View style={styles.details}>
              <Text style={styles.title} numberOfLines={2}>
                {product.name}
              </Text>
              <Text style={styles.supplier} numberOfLines={1}>
                {product.color_code}
              </Text>
              <Text style={styles.price}>{convertToCurrency(product.price)}</Text>
              {product.item_type === 'subscription' && (
                <Text style={{ fontSize: 10 }}>/per month</Text>
              )}
            </View>

            {/* Animated Button */}
            <MotiView
              from={{ rotate: '0deg' }}
              animate={{ rotate: isPressed ? '360deg' : '0deg' }} // Spin animation
              transition={{
                type: 'timing',
                duration: 1500, // 2 seconds for the full spin
              }}
            >
              <TouchableOpacity style={styles.addBtn} onPress={handleAddToCartPress}>
                <Ionicons
                  name={isAdded ? 'checkmark-circle' : 'add-circle'} // Change to checkmark after adding
                  size={35}
                  color={isAdded ? 'white' : colors.cardText} // Change color for checkmark
                />
              </TouchableOpacity>
            </MotiView>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default ProductGridCardVOne;


// import React, { FC } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { Link } from 'expo-router';
// import convertToCurrency from '@/hooks/convertToCurrency';
// import { ProductModelProps } from '@/models/ProductModelProps';
// import { useClientProduct } from '@/contexts/ClientProductContext';
// import { useCart } from '@/contexts/CartContext';
// import { useTheme } from '@/contexts/ThemeContext';

// const { width } = Dimensions.get('window');

// export interface ProductCardProps {
//   product: ProductModelProps;
//   viewTypeGrid: boolean; // A boolean to determine grid or list view
// }
// // ProductGridCardVOne
// export const ProductGridCardVOne: FC<ProductCardProps> = ({ product, viewTypeGrid }) => {
//   const { addToCart } = useCart();
//   const { selectProduct } = useClientProduct();
//   const { colors } = useTheme(); // Pulling colors from the custom theme

//   const handleProductPress = () => {
//     selectProduct(product);
//   };

//   const styles = StyleSheet.create({
//     container: {
//       width: viewTypeGrid ? width / 2 - 40 : width - 40, // Adjust width for grid or list view
//       height: viewTypeGrid ? 250 : 240, // Adjust height for grid or list view
//       margin: viewTypeGrid ? 10 : 22, // Spacing for grid or list view
//       borderRadius: 10,
//       backgroundColor: colors.cardBackground,
//       borderWidth: 2,
//       borderColor: colors.border,
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
//       width: viewTypeGrid ? 140 : 160, // Adjust image size for grid or list view
//       height: viewTypeGrid ? 140 : 160,
//       borderRadius: 10,
//       resizeMode: 'cover',
//     },
//     details: {
//       padding: 10,
//       color: colors.title,
//     },
//     title: {
//       fontFamily: 'bold',
//       fontSize: 16,
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
//       fontSize: 18,
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
//       <Link href={`/products/${product.id}` as never} asChild>
//         <TouchableOpacity onPress={handleProductPress}>
//           <View style={styles.container}>
//             <View style={styles.imageContainer}>
//               <Image style={styles.image} source={{ uri: product.images[0] }} />
//             </View>

//             <View style={styles.details}>
//               <Text style={styles.title} numberOfLines={2}>{product.name}</Text>
//               <Text style={styles.supplier} numberOfLines={1}>{product.color_code}</Text>
//               <Text style={styles.price}>{convertToCurrency(product.price)}</Text>
//               {product.item_type === 'subscription' && (
//                 <Text style={{ fontSize: 10 }}>/per month</Text>
//               )}
//             </View>

//             <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(product)}>
//               <Ionicons
//                 name={product.item_type === 'subscription' ? 'arrow-forward-circle-outline' : 'add-circle'}
//                 size={35}
//                 color={colors.cardText}
//               />
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Link>
//     </View>
//   );
// };

// export default ProductGridCardVOne;








// import React, { FC } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { Link } from 'expo-router';
// import convertToCurrency from '@/hooks/convertToCurrency';
// import { ProductModelProps } from '@/models/ProductModelProps';
// import { useClientProduct } from '@/contexts/ClientProductContext';
// import { useCart } from '@/contexts/CartContext';
// import { useAuth } from '@/contexts/AuthContext';
// import { useTheme } from '@/contexts/ThemeContext';

// const { width } = Dimensions.get('window');

// interface ProductHScrollCardVOneProps {
//   product: ProductModelProps;
//   viewTypeGrid: boolean; // A boolean to determine grid or list view
// }

// export const ProductHScrollCardVOne: FC<ProductHScrollCardVOneProps> = ({ product, viewTypeGrid }) => {
//   const { addToCart } = useCart();
//   const { selectProduct } = useClientProduct();
//   const { colors } = useTheme(); // Pulling colors from the custom theme

//   const handleProductPress = () => {
//     selectProduct(product);
//   };

//   const styles = StyleSheet.create({
//     container: {
//      // width: 162,
//       //     height: 240,
//       width: viewTypeGrid ? width - 40 : width / 2 - 30 , // Adjust width for grid or list view
//       height: viewTypeGrid ? 240 : 250, // Adjust height for grid or list view
//       margin: viewTypeGrid ? 22 : 10, // Spacing for grid or list view
//       borderRadius: 10,
//       backgroundColor: colors.cardBackground,
//       borderWidth: 2,
//       borderColor: colors.border,
//     },
//     imageContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderRadius: 10,
//       overflow: "hidden",
//       marginTop: 10,
//     },
//     image: {
//       width: viewTypeGrid ? 160 : 140,
//       height: viewTypeGrid ? 160 : 140,
//       borderRadius: 10,
//       resizeMode: 'cover',
//     },
//     details: {
//       padding: 10,
//       color: colors.title,
//     },
//     title: {
//       fontFamily: "bold",
//       fontSize: 16,
//       marginBottom: 2,
//       height: 35,
//       color: colors.title,
//     },
//     supplier: {
//       fontFamily: "regular",
//       fontSize: 12,
//       color: colors.title,
//     },
//     price: {
//       fontFamily: "bold",
//       fontSize: 18,
//       color: colors.title,
//     },
//     addBtn: {
//       position: "absolute",
//       bottom: 10,
//       right: 10,
//     },
//   });

//   return (
//     <View>
//       <Link href={`/products/${product.id}` as never} asChild>
//         <TouchableOpacity onPress={handleProductPress}>
//           <View style={styles.container}>
//             <View style={styles.imageContainer}>
//               <Image style={styles.image} source={{ uri: product.images[0] }} />
//             </View>

//             <View style={styles.details}>
//               <Text style={styles.title} numberOfLines={2}>{product.name}</Text>
//               <Text style={styles.supplier} numberOfLines={1}>{product.color_code}</Text>
//               <Text style={styles.price}>{convertToCurrency(product.price)}</Text>
//               {product.item_type === "subscription" && (
//                 <Text style={{ fontSize: 10 }}>/per month</Text>
//               )}
//             </View>

//             <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(product)}>
//               <Ionicons
//                 name={product.item_type === "subscription" ? "arrow-forward-circle-outline" : 'add-circle'}
//                 size={35}
//                 color={colors.cardText}
//               />
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Link>
//     </View>
//   );
// };

// export default ProductHScrollCardVOne;































// import React, { FC, useContext } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { SIZES } from '@/utils/theme';
// import { CONSTANTS } from '@/utils/constants';
// import { Link } from 'expo-router';
// import convertToCurrency from '@/hooks/convertToCurrency';
// import { ProductModelProps } from '@/models/ProductModelProps';
// import { useClientProduct } from '@/contexts/ClientProductContext';
// import { useCart } from '@/contexts/CartContext';
// import { useAuth } from '@/contexts/AuthContext';
// import { StoreTheme, useTheme } from '@/contexts/ThemeContext';
// // import { useClientProduct } from '@/contexts/ClientProductContext';

// const { width } = Dimensions.get('window');

// export const ProductHScrollCardVOne: FC<{ product: ProductModelProps }> = ({ product }) => {
//   const navigation = useNavigation();
//   const { addToCart } = useCart()
//   const { selectProduct } = useClientProduct();
//   const { authState,  updateSingleUserItem} = useAuth()

//   const { colors } = useTheme(); // Pulling colors from the custom theme

//   const handleProductPress = () => {
//     selectProduct(product);
//   };


// const styles = StyleSheet.create({
//   container: {
//     width: 162,
//     height: 240,
//     marginEnd: 22,
//     borderRadius: SIZES.medium,
//     backgroundColor:  colors.cardBackground, // COLORS.secondary,
//     borderWidth: 2,
//     borderColor: colors.border,
//   },
//   imageContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: SIZES.medium,
//     overflow: "hidden",
//     marginTop: SIZES.small / 2,
//   },
//   image: {
//     width: 142,
//     height: 142,
//     borderRadius: SIZES.small,
//     resizeMode: 'cover',
//     shadowOpacity: 400,
//     shadowColor: 'black',
//   },
//   details: {
//     padding: SIZES.small,
//     color: colors.title
//   },
//   title: {
//     fontFamily: "bold",
//     fontSize: SIZES.small,
//     marginBottom: 2,
//     height: 35,
//     color: colors.title

//   },
//   supplier: {
//     fontFamily: "regular",
//     fontSize: SIZES.small,
//     color: colors.title
//   },
//   price: {
//     fontFamily: "bold",
//     fontSize: SIZES.medium,
//     color: colors.title

//   },
//   addBtn: {
//     position: "absolute",
//     bottom: SIZES.xSmall,
//     right: SIZES.xSmall,
//   }
// });

//   return (
//     <View>
//      <Link 
//       href={`/products/${product.id}` as never}  
//       asChild
//      >
//         <TouchableOpacity onPress={handleProductPress}>
//           <View style={styles.container}>
//             {/* Image */}
//             <View style={styles.imageContainer}>
//               <Image 
//                 style={styles.image} 
//                 source={{ uri: product.images[0]}} 
//               />
//             </View>

//             {/* Details */}
//             <View style={styles.details}>
//               <Text style={styles.title} numberOfLines={2}>{product.name}</Text>
//               <Text style={styles.supplier} numberOfLines={1}>{product.color_code}</Text>
//               <Text style={styles.price}>{convertToCurrency(product.price)}</Text>
//               {product.item_type === "subscription" && (
//                 <Text style={{ fontSize: 10 }}>/per month</Text>
//               )}
//             </View>

//             {/* Button */}
//             <TouchableOpacity style={styles.addBtn} onPress={() =>  addToCart(product)}>
//               <Ionicons 
//                 name={product.item_type === "subscription" ? "arrow-forward-circle-outline" : 'add-circle'} 
//                 size={35} 
//                 color={colors.cardText} 
//               />
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Link>
//     </View>
//   );
// };

// export default ProductHScrollCardVOne;
