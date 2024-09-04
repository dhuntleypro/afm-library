import React, { FC, useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '@/utils/theme';
import { CartContext } from '@/contexts/CartContext';
import { useClientProduct } from '@/contexts/ClientProductContext';
import { ProductModelProps } from '@/models/ProductModelProps';
import convertToCurrency from '@/hooks/convertToCurrency';
import { MotiView } from 'moti';
import GlitterButton from '@/components/buttons/GlitterButtom';

const ProductDetailsPageVThree: FC<ProductModelProps> = (props) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addToCart } = useContext(CartContext);
  const { selectedProduct } = useClientProduct();

  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    if (selectedProduct) {
      addToCart(selectedProduct);
      setIsPressed(true);

      // Reset animation state after some time
      setTimeout(() => setIsPressed(false), 500);
    }
  };

  const description = selectedProduct?.description ?? "";

  return (
    <View style={{ backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: selectedProduct?.images[0] }} // Replace with actual image URI
            style={styles.productImage}
          />
          <View style={styles.textOverlay}>
            <Text style={styles.overlayTitle}>{selectedProduct?.name}</Text>
            <Text style={styles.overlaySubtitle}>{description}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
         <View style={styles.productInfo}>
           <Text style={styles.productTitle}>{selectedProduct?.name}</Text>
           <Text style={styles.productSubtitle}>{description.length > 11 ? description.slice(0, 11) + '...' : description}
           </Text>
         </View>
       </View>

        <View style={styles.section}>
          <View style={styles.priceSection}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.divider}>|</Text>
            <View style={styles.priceInfo}>
              <Text style={styles.price}>{convertToCurrency(selectedProduct?.price ?? 10000)}</Text>
              <Text style={styles.description}>
                {description}
              </Text>
            </View>
          </View>
        </View>


        <GlitterButton onPress={handlePress} buttonText={'Add To Cart'} />
      </ScrollView>
    </View>
  );
};

export default ProductDetailsPageVThree;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    marginBottom: 20,
  },
  textOverlay: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
  },

  productInfo: {
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },
  productSubtitle: {
    fontSize: 16,
    color: '#7D7D7D',
    marginTop: 5,
  },
  overlayTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  overlaySubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  section: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  colorOptions: {
    flexDirection: 'row',
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedColorCircle: {
    borderWidth: 2,
    borderColor: '#000000',
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginRight: 10, // Added margin to separate label from price
  },
  divider: {
    fontSize: 16,
    color: '#E0E0E0',
    marginHorizontal: 10, // Divider spacing
  },
  priceInfo: {
    flex: 1,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#7D7D7D',
    flexWrap: 'wrap',
  },
  buyButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buyButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});






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
