
import React, { FC, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SIZES } from '@/utils/theme';
import { CONSTANTS } from '@/utils/constants';
import { Link } from 'expo-router';
import convertToCurrency from '@/hooks/convertToCurrency';
import { ProductModelProps } from '@/models/ProductModelProps';
import { useClientProduct } from '@/contexts/ClientProductContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { StoreTheme, useTheme } from '@/contexts/ThemeContext';
// import { useClientProduct } from '@/contexts/ClientProductContext';

const { width } = Dimensions.get('window');

export const ProductHScrollCardVOne: FC<{ product: ProductModelProps }> = ({ product }) => {
  const navigation = useNavigation();
  const { addToCart } = useCart()
  const { selectProduct } = useClientProduct();
  const { authState,  updateSingleUserItem} = useAuth()

  const { colors } = useTheme(); // Pulling colors from the custom theme

  const handleProductPress = () => {
    selectProduct(product);
  };


const styles = StyleSheet.create({
  container: {
    width: 162,
    height: 240,
    marginEnd: 22,
    borderRadius: SIZES.medium,
    backgroundColor:  colors.cardBackground, // COLORS.secondary,
    borderWidth: 2,
    borderColor: colors.border,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.medium,
    overflow: "hidden",
    marginTop: SIZES.small / 2,
  },
  image: {
    width: 142,
    height: 142,
    borderRadius: SIZES.small,
    resizeMode: 'cover',
    shadowOpacity: 400,
    shadowColor: 'black',
  },
  details: {
    padding: SIZES.small,
    color: colors.title
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.small,
    marginBottom: 2,
    height: 35,
    color: colors.title

  },
  supplier: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    color: colors.title
  },
  price: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
    color: colors.title

  },
  addBtn: {
    position: "absolute",
    bottom: SIZES.xSmall,
    right: SIZES.xSmall,
  }
});

  return (
    <View>
     <Link 
      href={`/products/${product.id}` as never}  
      asChild
     >
        <TouchableOpacity onPress={handleProductPress}>
          <View style={styles.container}>
            {/* Image */}
            <View style={styles.imageContainer}>
              <Image 
                style={styles.image} 
                source={{ uri: product.images[0]}} 
              />
            </View>

            {/* Details */}
            <View style={styles.details}>
              <Text style={styles.title} numberOfLines={2}>{product.name}</Text>
              <Text style={styles.supplier} numberOfLines={1}>{product.color_code}</Text>
              <Text style={styles.price}>{convertToCurrency(product.price)}</Text>
              {product.item_type === "subscription" && (
                <Text style={{ fontSize: 10 }}>/per month</Text>
              )}
            </View>

            {/* Button */}
            <TouchableOpacity style={styles.addBtn} onPress={() =>  addToCart(product)}>
              <Ionicons 
                name={product.item_type === "subscription" ? "arrow-forward-circle-outline" : 'add-circle'} 
                size={35} 
                color={colors.cardText} 
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default ProductHScrollCardVOne;
