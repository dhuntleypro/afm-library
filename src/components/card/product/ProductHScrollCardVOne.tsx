import React, { FC, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import convertToCurrency from '@/hooks/convertToCurrency';
import { ProductModelProps } from '@/models/ProductModelProps';
import { useClientProduct } from '@/contexts/ClientProductContext';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import { View as MotiView } from 'moti';
import { SIZES } from '@/utils/theme';

const { width } = Dimensions.get('window');

export const ProductHScrollCardVOne: FC<{ product: ProductModelProps }> = ({ product }) => {
  const { addToCart } = useCart();
  const { selectProduct } = useClientProduct();
  const { colors } = useTheme();
  const [isPressed, setIsPressed] = useState(false); // State to track button press
  const [isAdded, setIsAdded] = useState(false); // State to track if product is added

  const handleProductPress = () => {
    selectProduct(product);
  };

  const handleAddToCartPress = () => {
    setIsPressed(true); // Start animation
    addToCart(product);
    setIsAdded(true); // Change background and icon
    setTimeout(() => {
      setIsPressed(false); // Reset the animation after 2 seconds
      setTimeout(() => setIsAdded(false), 1000); // Revert background after 1 second
    }, 2000); // Spin for 2 seconds
  };

  const styles = StyleSheet.create({
    container: {
      width: 162,
      height: 240,
      marginEnd: 22,
      borderRadius: SIZES.medium,
      backgroundColor: isAdded ? colors.primary : colors.cardBackground, // Change background color when added, revert after
      borderWidth: 2,
      borderColor: colors.border,
    },
    imageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: SIZES.medium,
      overflow: 'hidden',
      marginTop: SIZES.small / 2,
    },
    image: {
      width: 142,
      height: 142,
      borderRadius: SIZES.small,
      resizeMode: 'cover',
    },
    details: {
      padding: SIZES.small,
      color: colors.title,
    },
    title: {
      fontFamily: 'bold',
      fontSize: SIZES.small,
      marginBottom: 2,
      height: 35,
      color: colors.title,
    },
    supplier: {
      fontFamily: 'regular',
      fontSize: SIZES.small,
      color: colors.title,
    },
    price: {
      fontFamily: 'bold',
      fontSize: SIZES.medium,
      color: colors.title,
    },
    addBtn: {
      position: 'absolute',
      bottom: SIZES.xSmall,
      right: SIZES.xSmall,
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
              <TouchableOpacity
                style={styles.addBtn}
                onPress={handleAddToCartPress}
              >
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

export default ProductHScrollCardVOne;




// only select product once
// import React, { FC, useState } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { SIZES } from '@/utils/theme';
// import { Link } from 'expo-router';
// import convertToCurrency from '@/hooks/convertToCurrency';
// import { ProductModelProps } from '@/models/ProductModelProps';
// import { useClientProduct } from '@/contexts/ClientProductContext';
// import { useCart } from '@/contexts/CartContext';
// import { useAuth } from '@/contexts/AuthContext';
// import { useTheme } from '@/contexts/ThemeContext';
// import { View as MotiView } from 'moti';

// const { width } = Dimensions.get('window');

// export const ProductHScrollCardVOne: FC<{ product: ProductModelProps }> = ({ product }) => {
//   const { addToCart } = useCart();
//   const { selectProduct } = useClientProduct();
//   const { colors } = useTheme();
//   const [isPressed, setIsPressed] = useState(false); // State to track button press
//   const [isAdded, setIsAdded] = useState(false); // State to track if product is added

//   const handleProductPress = () => {
//     selectProduct(product);
//   };

//   const handleAddToCartPress = () => {
//     setIsPressed(true); // Start animation
//     addToCart(product);
//     setTimeout(() => {
//       setIsPressed(false); // Stop spinning
//       setIsAdded(true); // Change to checkmark and green background
//     }, 2000); // Spin for 2 seconds
//   };

//   const styles = StyleSheet.create({
//     container: {
//       width: 162,
//       height: 240,
//       marginEnd: 22,
//       borderRadius: SIZES.medium,
//       backgroundColor: isAdded ? 'green' : colors.cardBackground, // Change background color when added
//       borderWidth: 2,
//       borderColor: colors.border,
//     },
//     imageContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderRadius: SIZES.medium,
//       overflow: 'hidden',
//       marginTop: SIZES.small / 2,
//     },
//     image: {
//       width: 142,
//       height: 142,
//       borderRadius: SIZES.small,
//       resizeMode: 'cover',
//     },
//     details: {
//       padding: SIZES.small,
//       color: colors.title,
//     },
//     title: {
//       fontFamily: 'bold',
//       fontSize: SIZES.small,
//       marginBottom: 2,
//       height: 35,
//       color: colors.title,
//     },
//     supplier: {
//       fontFamily: 'regular',
//       fontSize: SIZES.small,
//       color: colors.title,
//     },
//     price: {
//       fontFamily: 'bold',
//       fontSize: SIZES.medium,
//       color: colors.title,
//     },
//     addBtn: {
//       position: 'absolute',
//       bottom: SIZES.xSmall,
//       right: SIZES.xSmall,
//     },
//   });

//   return (
//     <View>
//       <Link href={`/products/${product.id}` as never} asChild>
//         <TouchableOpacity onPress={handleProductPress}>
//           <View style={styles.container}>
//             {/* Image */}
//             <View style={styles.imageContainer}>
//               <Image style={styles.image} source={{ uri: product.images[0] }} />
//             </View>

//             {/* Details */}
//             <View style={styles.details}>
//               <Text style={styles.title} numberOfLines={2}>
//                 {product.name}
//               </Text>
//               <Text style={styles.supplier} numberOfLines={1}>
//                 {product.color_code}
//               </Text>
//               <Text style={styles.price}>{convertToCurrency(product.price)}</Text>
//               {product.item_type === 'subscription' && (
//                 <Text style={{ fontSize: 10 }}>/per month</Text>
//               )}
//             </View>

//             {/* Animated Button */}
//             <MotiView
//               from={{ rotate: '0deg' }}
//               animate={{ rotate: isPressed ? '360deg' : '0deg' }} // Spin animation
//               transition={{
//                 type: 'timing',
//                 duration: 2000, // 2 seconds for the full spin
//               }}
//             >
//               <TouchableOpacity
//                 style={styles.addBtn}
//                 onPress={handleAddToCartPress}
//                 disabled={isAdded} // Disable after adding to cart
//               >
//                 <Ionicons
//                   name={isAdded ? 'checkmark-circle' : 'add-circle'} // Change to checkmark after adding
//                   size={35}
//                   color={isAdded ? 'white' : colors.cardText} // Change color for checkmark
//                 />
//               </TouchableOpacity>
//             </MotiView>
//           </View>
//         </TouchableOpacity>
//       </Link>
//     </View>
//   );
// };

// export default ProductHScrollCardVOne;













// weird button animation - but works
// import React, { FC, useState } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { SIZES } from '@/utils/theme';
// import { Link } from 'expo-router';
// import convertToCurrency from '@/hooks/convertToCurrency';
// import { ProductModelProps } from '@/models/ProductModelProps';
// import { useClientProduct } from '@/contexts/ClientProductContext';
// import { useCart } from '@/contexts/CartContext';
// import { useAuth } from '@/contexts/AuthContext';
// import { useTheme } from '@/contexts/ThemeContext';
// import { View as MotiView, AnimatePresence } from 'moti';

// const { width } = Dimensions.get('window');

// export const ProductHScrollCardVOne: FC<{ product: ProductModelProps }> = ({ product }) => {
//   const { addToCart } = useCart();
//   const { selectProduct } = useClientProduct();
//   const { colors } = useTheme();
//   const [isPressed, setIsPressed] = useState(false); // State for controlling the button animation

//   const handleProductPress = () => {
//     selectProduct(product);
//   };

//   const handleAddToCartPress = () => {
//     setIsPressed(true);
//     addToCart(product);
//     setTimeout(() => setIsPressed(false), 300); // Reset the animation after 300ms
//   };

//   const styles = StyleSheet.create({
//     container: {
//       width: 162,
//       height: 240,
//       marginEnd: 22,
//       borderRadius: SIZES.medium,
//       backgroundColor: colors.cardBackground,
//       borderWidth: 2,
//       borderColor: colors.border,
//     },
//     imageContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderRadius: SIZES.medium,
//       overflow: 'hidden',
//       marginTop: SIZES.small / 2,
//     },
//     image: {
//       width: 142,
//       height: 142,
//       borderRadius: SIZES.small,
//       resizeMode: 'cover',
//     },
//     details: {
//       padding: SIZES.small,
//       color: colors.title,
//     },
//     title: {
//       fontFamily: 'bold',
//       fontSize: SIZES.small,
//       marginBottom: 2,
//       height: 35,
//       color: colors.title,
//     },
//     supplier: {
//       fontFamily: 'regular',
//       fontSize: SIZES.small,
//       color: colors.title,
//     },
//     price: {
//       fontFamily: 'bold',
//       fontSize: SIZES.medium,
//       color: colors.title,
//     },
//     addBtn: {
//       position: 'absolute',
//       bottom: SIZES.xSmall,
//       right: SIZES.xSmall,
//     },
//   });

//   return (
//     <View>
//       <Link href={`/products/${product.id}` as never} asChild>
//         <TouchableOpacity onPress={handleProductPress}>
//           <View style={styles.container}>
//             {/* Image */}
//             <View style={styles.imageContainer}>
//               <Image style={styles.image} source={{ uri: product.images[0] }} />
//             </View>

//             {/* Details */}
//             <View style={styles.details}>
//               <Text style={styles.title} numberOfLines={2}>
//                 {product.name}
//               </Text>
//               <Text style={styles.supplier} numberOfLines={1}>
//                 {product.color_code}
//               </Text>
//               <Text style={styles.price}>{convertToCurrency(product.price)}</Text>
//               {product.item_type === 'subscription' && (
//                 <Text style={{ fontSize: 10 }}>/per month</Text>
//               )}
//             </View>

//             {/* Animated Button */}
//             <MotiView
//               from={{ scale: 1 }}
//               animate={{ scale: isPressed ? 1.2 : 1 }}
//               transition={{ type: 'spring', stiffness: 150 }}
//             >
//               <TouchableOpacity
//                 style={styles.addBtn}
//                 onPress={handleAddToCartPress}
//               >
//                 <Ionicons
//                   name={product.item_type === 'subscription' ? 'arrow-forward-circle-outline' : 'add-circle'}
//                   size={35}
//                   color={colors.cardText}
//                 />
//               </TouchableOpacity>
//             </MotiView>
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
// import { View as MotiView } from 'moti';

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
//             <MotiView
//         key={`${"addtocart"}`} // Force re-render to reset animation
//         from={item.imageFrom}
//         animate={item.imageTo}
//         transition={item.imageTransition}
//       >
//             <TouchableOpacity style={styles.addBtn} onPress={() =>  addToCart(product)}>
//               <Ionicons 
//                 name={product.item_type === "subscription" ? "arrow-forward-circle-outline" : 'add-circle'} 
//                 size={35} 
//                 color={colors.cardText} 
//               />
//             </TouchableOpacity>
//             </MotiView>
//           </View>
//         </TouchableOpacity>
//       </Link>
//     </View>
//   );
// };

// export default ProductHScrollCardVOne;
