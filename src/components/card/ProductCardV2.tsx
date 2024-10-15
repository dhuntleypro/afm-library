import React, { FC, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
// import { COLORS, SIZES } from '@/utils/theme';
import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { ProductModelProps } from '../../../models/ProductModelProps';
// import convertToCurrency from '../../../hook/convertToCurrency';
import { COLORS, SIZES } from '@/utils/theme';
// import { Constants } from '@stripe/stripe-react-native';
import { CONSTANTS } from '@/utils/constants';
import { Link } from 'expo-router';
// import { ProductModelProps } from '@/app/models/ProductModelProps';
// import convertToCurrency from '@/hooks/convertToCurrency';
import { ProductModelProps } from '@/models/ProductModelProps';
import convertToCurrency from '@/hooks/convertToCurrency';
import { useClientProduct } from '@/contexts/ClientProductContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
// import { ProductModelProps } from '../../models/ProductModelProps';
// import convertToCurrency from '@/hooks/convertToCurrency';;
// import { CartContext } from '../../contexts/CartContext';

export const ProductCardV2: FC<ProductModelProps> = (item) => {
  const { addToCart } = useCart();
  const { authState, updateUserProfile } = useAuth();
  const { products, selectedProduct, selectProduct, isLoading, error } = useClientProduct();

  const handleProductSelect = (product: ProductModelProps) => {
    selectProduct(product);
  };

  const handleAddToCart = () => {
    if (authState?.user) {
      addToCart(item, authState.user, updateUserProfile);
    } else {
      console.error("User not logged in, cannot add to cart");
      // Optionally: redirect to login page or show message
    }
  };

  return (
    <View>
      {/* @ts-ignore */}
      <Link href={`/products/${selectedProduct?.id}`} asChild>
        <TouchableOpacity onPress={() => handleProductSelect(item)}>
          <View style={styles.container}>
            {/* Image */}
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: item.image || CONSTANTS.holderImageProductCard }} />
            </View>

            {/* Details */}
            <View style={styles.details}>
              <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.supplier} numberOfLines={1}>{item.color_code}</Text>
              <Text style={styles.price}>{convertToCurrency(item.price)}</Text>
            </View>

            {/* Button */}
            <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
              <Ionicons name='add-circle' size={35} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
};


// export default ProductCardView; 

const styles = StyleSheet.create({
    container: {
        width: 182,
        height: 240,
        marginEnd: 22,
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.secondary,
        // remove
    },
    imageContainer: {
        flex: 1,
        width: 170,
        marginLeft: SIZES.small/2,
        marginTop: SIZES.small/2,
        borderRadius: SIZES.small,
        overflow: "hidden"
    },
    image: {
        aspectRatio: 1,
        resizeMode: 'cover'
    },
    details: {
        padding: SIZES.small,
        
 
    },
    title: {
        fontFamily: "bold",
        fontSize: SIZES.small ,
        marginBottom: 2,
        height: 35

    },
    supplier: {
        fontFamily: "regular",
        fontSize: SIZES.small,
        color: COLORS.gray

    },
    price: {
        fontFamily: "bold",
        fontSize: SIZES.medium,
       
    },
    addBtn: {
        position:"absolute",
        bottom: SIZES.xSmall,
        right: SIZES.xSmall,
        


    }

})

