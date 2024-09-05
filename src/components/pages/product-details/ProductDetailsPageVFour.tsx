import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/utils/theme'; 
import { useClientProduct } from '@/contexts/ClientProductContext';
import { ProductModelProps } from '@/models/ProductModelProps';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');

const ProductDetails: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [isFavorite, setIsFavorite] = useState(false); 
  const { selectedProduct } = useClientProduct();
  const { authState, updateUserProfile } = useAuth();
  const { addToCart } = useCart();

  const sizes = [6, 6.5, 7, 7.5, 8]; 

  const handlePress = () => {
    if (selectedProduct) {
      const partialProduct: Partial<ProductModelProps> = {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        images: selectedProduct.images,
        quantity: 1,
        color: 'default',
        size: String(selectedSize) ?? 'default',
      };
      addToCart(partialProduct, authState.user, updateUserProfile);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      {/* Product Image Carousel */}
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.imageCarousel}>
        {selectedProduct?.images.map((imageUri, index) => (
          <Image key={index} source={{ uri: imageUri }} style={styles.productImage} />
        ))}
      </ScrollView>

      {/* Heart Icon on the Right */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleFavorite}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? 'black' : 'white'} 
          />
        </TouchableOpacity>
      </View>

      {/* Bottom Modal Section with Animation */}
      <MotiView
        from={{ translateY: 300 }} 
        animate={{ translateY: 0 }} 
        transition={{ type: 'timing', duration: 600 }} 
        style={styles.modalContent}
      >
        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>Nike Air Max 720</Text>
          <Text style={styles.productColor}>Color: Black Anthracite</Text>
        </View>

        {/* Price and Description */}
        <View style={styles.priceDescription}>
          <Text style={styles.price}>$180</Text>
          <Text style={styles.description}>
            The Nike Air Max 720 goes bigger than ever before with Nike's tallest Air unit yet, offering more air underfoot for unimaginable, all-day comfort.
          </Text>
        </View>

        {/* Size Selector */}
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

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.addToCartButton} onPress={handlePress}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          <Ionicons name="cart-outline" size={24} color="white" />
        </TouchableOpacity>
      </MotiView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
  },
  header: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  imageCarousel: {
    height: width, 
  },
  productImage: {
    width: width,
    height: width,
    resizeMode: 'cover', 
  },
  modalContent: {
    backgroundColor: 'black',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 16,
    marginTop: -20, 
  },
  productInfo: {
    paddingBottom: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  productColor: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  priceDescription: {
    paddingBottom: 16,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 8,
  },
  sizeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  sizeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  sizeOption: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedSizeOption: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  sizeText: {
    fontSize: 16,
    color: 'white',
  },
  selectedSizeText: {
    color: 'black',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 50,
  },
  addToCartButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
  },
});

export default ProductDetails;





// good
// import React, { useState } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { COLORS } from '@/utils/theme'; // Assuming you have a COLORS file
// import { useClientProduct } from '@/contexts/ClientProductContext';
// import { ProductModelProps } from '@/models/ProductModelProps';
// import { useAuth } from '@/contexts/AuthContext';
// import { useCart } from '@/contexts/CartContext';

// const { width } = Dimensions.get('window');

// const ProductDetailsPageVFour: React.FC = () => {
//   const [selectedSize, setSelectedSize] = useState<number | null>(null);
//   const [isFavorite, setIsFavorite] = useState(false); // Control heart button toggle
//   const { selectedProduct } = useClientProduct();
//   const { authState, updateUserProfile } = useAuth();
//   const { addToCart } = useCart();

//   const sizes = [6, 6.5, 7, 7.5, 8]; // Example sizes

//   const handlePress = () => {
//     if (selectedProduct) {
//       const partialProduct: Partial<ProductModelProps> = {
//         id: selectedProduct.id,
//         name: selectedProduct.name,
//         price: selectedProduct.price,
//         images: selectedProduct.images,
//         quantity: 1,
//         color: 'default',
//         size: String(selectedSize) ?? 'default',
//       };
//       addToCart(partialProduct, authState.user, updateUserProfile);
//     }
//   };

//   // Toggle the heart (favorite) icon
//   const toggleFavorite = () => {
//     setIsFavorite(!isFavorite);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Product Image Carousel */}
//       <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.imageCarousel}>
//         {selectedProduct?.images.map((imageUri, index) => (
//           <Image key={index} source={{ uri: imageUri }} style={styles.productImage} />
//         ))}
//       </ScrollView>

//       {/* Heart Icon on the Right */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={toggleFavorite}>
//           <Ionicons
//             name={isFavorite ? 'heart' : 'heart-outline'}
//             size={24}
//             color={isFavorite ? 'black' : 'white'} // Toggle color on press
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Modal for Bottom Section */}
//       <View style={styles.modalContent}>
//         {/* Product Info */}
//         <View style={styles.productInfo}>
//           <Text style={styles.productName}>Nike Air Max 720</Text>
//           <Text style={styles.productColor}>Color: Black Anthracite</Text>
//         </View>

//         {/* Price and Description */}
//         <View style={styles.priceDescription}>
//           <Text style={styles.price}>$180</Text>
//           <Text style={styles.description}>
//             The Nike Air Max 720 goes bigger than ever before with Nike's tallest Air unit yet, offering more air underfoot for unimaginable, all-day comfort.
//           </Text>
//         </View>

//         {/* Size Selector */}
//         <Text style={styles.sizeLabel}>PICK YOUR SIZE</Text>
//         <View style={styles.sizeSelector}>
//           {sizes.map((size, index) => (
//             <TouchableOpacity
//               key={index}
//               style={[styles.sizeOption, selectedSize === size && styles.selectedSizeOption]}
//               onPress={() => setSelectedSize(size)}
//             >
//               <Text style={[styles.sizeText, selectedSize === size && styles.selectedSizeText]}>{size}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Add to Cart Button */}
//         <TouchableOpacity style={styles.addToCartButton} onPress={handlePress}>
//           <Text style={styles.addToCartButtonText}>Add to Cart</Text>
//           <Ionicons name="cart-outline" size={24} color="white" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000', // Background black to avoid white gaps
//   },
//   header: {
//     position: 'absolute',
//     top: 40,
//     right: 20,
//     zIndex: 1,
//   },
//   imageCarousel: {
//     height: width, // Match width to make it square
//   },
//   productImage: {
//     width: width,
//     height: width,
//     resizeMode: 'cover', // Cover the entire area
//   },
//   modalContent: {
//     backgroundColor: 'black',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingTop: 20,
//     paddingBottom: 40,
//     paddingHorizontal: 16,
//     marginTop: -20, // Ensure no gap between image and modal
//   },
//   productInfo: {
//     paddingBottom: 16,
//   },
//   productName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   productColor: {
//     fontSize: 14,
//     color: '#999',
//     marginTop: 4,
//   },
//   priceDescription: {
//     paddingBottom: 16,
//   },
//   price: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   description: {
//     fontSize: 14,
//     color: '#aaa',
//     marginTop: 8,
//   },
//   sizeLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'white',
//     marginBottom: 8,
//   },
//   sizeSelector: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 24,
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
//     backgroundColor: 'white',
//     borderColor: 'white',
//   },
//   sizeText: {
//     fontSize: 16,
//     color: 'white',
//   },
//   selectedSizeText: {
//     color: 'black',
//   },
//   addToCartButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'white',
//     paddingVertical: 16,
//     borderRadius: 50,
//   },
//   addToCartButtonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'black',
//     marginRight: 10,
//   },
// });

// export default ProductDetailsPageVFour;







// cool siding animation
// import React, { useState } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Modal } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { COLORS } from '@/utils/theme';
// import { AWS_HOLDER_IMAGE } from '@/utils/api';
// import { useClientProduct } from '@/contexts/ClientProductContext';
// import { ProductModelProps } from '@/models/ProductModelProps';
// import { useAuth } from '@/contexts/AuthContext';
// import { useCart } from '@/contexts/CartContext';

// const { width } = Dimensions.get('window');

// const ProductDetails: React.FC = () => {
//   const [selectedSize, setSelectedSize] = useState<number | null>(null);
//   const { selectedProduct } = useClientProduct();
//   const { authState, updateUserProfile } = useAuth();
//   const { addToCart } = useCart();
//   const [isModalVisible, setIsModalVisible] = useState(true); // Control the modal

//   const sizes = [6, 6.5, 7, 7.5, 8];

//   const handlePress = () => {
//     if (selectedProduct) {
//       const partialProduct: Partial<ProductModelProps> = {
//         id: selectedProduct.id,
//         name: selectedProduct.name,
//         price: selectedProduct.price,
//         images: selectedProduct.images,
//         quantity: 1,
//         color: 'default',
//         size: String(selectedSize) ?? 'default',
//       };
//       addToCart(partialProduct, authState.user, updateUserProfile);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Product Image Carousel */}
//       <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.imageCarousel}>
//         <Image source={{ uri: AWS_HOLDER_IMAGE }} style={styles.productImage} />
//       </ScrollView>

//       {/* Heart Icon on the Right */}
//       <View style={styles.header}>
//         <TouchableOpacity>
//           <Ionicons name="heart-outline" size={24} color="black" />
//         </TouchableOpacity>
//       </View>

//       {/* Modal for Bottom Section */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={isModalVisible}
//         onRequestClose={() => setIsModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             {/* Product Info */}
//             <View style={styles.productInfo}>
//               <Text style={styles.productName}>Nike Air Max 720</Text>
//               <Text style={styles.productColor}>Color: Black Anthracite</Text>
//             </View>

//             {/* Price and Description */}
//             <View style={styles.priceDescription}>
//               <Text style={styles.price}>$180</Text>
//               <Text style={styles.description}>
//                 The Nike Air Max 720 goes bigger than ever before with Nike's tallest Air unit yet, offering more air underfoot for unimaginable, all-day comfort.
//               </Text>
//             </View>

//             {/* Size Selector */}
//             <Text style={styles.sizeLabel}>PICK YOUR SIZE</Text>
//             <View style={styles.sizeSelector}>
//               {sizes.map((size, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   style={[styles.sizeOption, selectedSize === size && styles.selectedSizeOption]}
//                   onPress={() => setSelectedSize(size)}
//                 >
//                   <Text style={[styles.sizeText, selectedSize === size && styles.selectedSizeText]}>{size}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             {/* Add to Cart Button */}
//             <TouchableOpacity style={styles.addToCartButton} onPress={handlePress}>
//               <Text style={styles.addToCartButtonText}>Add to Cart</Text>
//               <Ionicons name="cart-outline" size={24} color="white" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   header: {
//     position: 'absolute',
//     top: 40,
//     right: 20,
//     zIndex: 1,
//   },
//   imageCarousel: {
//     height: width,
//   },
//   productImage: {
//     width: width,
//     height: width,
//     resizeMode: 'cover',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'flex-end',
//   },
//   modalContent: {
//     backgroundColor: 'black', // Inverted colors
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingTop: 20,
//     paddingBottom: 40,
//     paddingHorizontal: 16,
//   },
//   productInfo: {
//     paddingBottom: 16,
//   },
//   productName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   productColor: {
//     fontSize: 14,
//     color: '#999',
//     marginTop: 4,
//   },
//   priceDescription: {
//     paddingBottom: 16,
//   },
//   price: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   description: {
//     fontSize: 14,
//     color: '#aaa',
//     marginTop: 8,
//   },
//   sizeLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'white',
//     marginBottom: 8,
//   },
//   sizeSelector: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 24,
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
//     backgroundColor: 'white',
//     borderColor: 'white',
//   },
//   sizeText: {
//     fontSize: 16,
//     color: 'white',
//   },
//   selectedSizeText: {
//     color: 'black',
//   },
//   addToCartButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'white',
//     paddingVertical: 16,
//     borderRadius: 50,
//   },
//   addToCartButtonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'black',
//     marginRight: 10,
//   },
// });

// export default ProductDetails;


// styling issues 
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

// const ProductDetailsPageVFour: React.FC = () => {
//   const [selectedSize, setSelectedSize] = useState<number | null>(null);
//   const { selectedProduct } = useClientProduct();
//   const { authState, updateUserProfile } = useAuth(); // Access authState and updateUserProfile
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
//         color:  'default', // Add color if necessary
//         size: String(selectedSize) ?? 'default', // Add size if necessary
//       };
//       addToCart(partialProduct, authState.user, updateUserProfile); // Pass authUser and updateUserProfile
//     }
//   };
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
   
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity>
//           <Ionicons name="arrow-back-outline" size={24} color="black" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Men's Shoe</Text>
//         <TouchableOpacity>
//           <Ionicons name="heart-outline" size={24} color="black" />
//         </TouchableOpacity>
//       </View>

//       {/* Product Image Carousel */}
//       <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.imageCarousel}>
//         <Image source={{ uri: AWS_HOLDER_IMAGE }} style={styles.productImage} />
//         {/* Add more images for the carousel */}
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
//       <TouchableOpacity style={styles.addToCartButton}>
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
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//   },
//   headerTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
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

// export default ProductDetailsPageVFour;

