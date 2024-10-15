import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
// import { useClientProduct } from '@/contexts/ClientProductContext';
import { COLORS, SIZES } from '@/utils/theme';
import convertToCurrency from '@/hooks/convertToCurrency';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { useClientProduct } from '@/contexts/ClientProductContext';

const ProductDetailsPageVOne = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { selectedProduct: product } = useClientProduct();

  // if (!selectedProduct) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Product not found</Text>
  //     </View>
  //   );
  // }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: SIZES.xLarge }}>
      <Stack.Screen
        options={{
          headerTitle: `${product?.name}`,
        }}
      />

      <Image
        source={{ uri: product?.image || 'https://via.placeholder.com/300' }}
        style={styles.productImage}
      />

      <MotiView
        from={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500 }}
        style={[styles.detailsContainer, styles.sectionSpacing]}
      >
        <Text style={styles.productTitle}>{product?.name}</Text>
        <Text style={styles.productDescription}>{product?.description}</Text>

        <Text style={styles.productPrice}>{convertToCurrency(product?.price ?? 0)}</Text>
        {product?.item_type === 'subscription' && (
          <Text style={styles.subscriptionText}>/ per month</Text>
        )}

        <TouchableOpacity style={styles.previewButton}>
          <Ionicons name="eye-outline" size={24} color={COLORS.white} />
          <Text style={styles.previewButtonText}>Preview</Text>
        </TouchableOpacity>
      </MotiView>

      {/* Variant Information Section */}
      {product?.variants && product?.variants.length > 0 && (
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500, delay: 200 }}
          style={[styles.variantContainer, styles.sectionSpacing]}
        >
          <Text style={styles.sectionTitle}>Variants</Text>
          {product?.variants.map((variant) => (
            <View key={variant.id} style={styles.variantItem}>
              <Image
                source={{ uri: variant.image || 'https://via.placeholder.com/60' }}
                style={styles.variantImage}
              />
              <View style={styles.variantDetails}>
                <Text style={styles.variantTitle}>{variant.title}</Text>
                <Text style={styles.variantColor}>Color: {variant.color_code}</Text>
                <Text style={styles.variantPrice}>{convertToCurrency(variant.price)}</Text>
                <Text style={styles.variantDescription}>{variant.description}</Text>
              </View>
            </View>
          ))}
        </MotiView>
      )}

      {/* Sizing and Inventory Section
      {product?.sizes && product?.sizes.length > 0 && (
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500, delay: 300 }}
          style={[styles.sizingContainer, styles.sectionSpacing]}
        >
          <Text style={styles.sectionTitle}>Sizing & Inventory</Text>
          {product?.sizes.map((size) => {
            const variant = product?.variants.find(v => v.title === size);
            return (
              <View key={size} style={styles.sizingItem}>
                <Text style={styles.sizingText}>Size: {size}</Text>
                <Text style={styles.inventoryText}>Inventory: {variant?.inventory || 'N/A'}</Text>
                <Text style={styles.sizingPrice}>
                  {convertToCurrency(variant?.price || product?.price)}
                </Text>
              </View>
            );
          })}
        </MotiView>
      )} */}

      {/* Reviews Section */}
      {product?.reviews && product?.reviews.length > 0 && (
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500, delay: 400 }}
          style={[styles.reviewsContainer, styles.sectionSpacing]}
        >
          <Text style={styles.sectionTitle}>Customer Reviews</Text>
          {product?.reviews.map((review, index) => (
            <View key={`review-${index}`} style={styles.reviewItem}>
              <Text style={styles.reviewUserName}>{review.userName}</Text>
              <Text style={styles.reviewTitle}>{review.title}</Text>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}
        </MotiView>
      )}

      {/* Checkout Section */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 500 }}
        style={styles.checkoutContainer}
      >
        <TouchableOpacity style={styles.checkoutButton} onPress={() => {}}>
          <Text style={styles.checkoutButtonText}>Go to Checkout</Text>
          <Ionicons name="arrow-forward-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </MotiView>
    </ScrollView>
  );
};

export default ProductDetailsPageVOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray2,
    padding: SIZES.medium,
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: SIZES.small,
    marginBottom: SIZES.medium,
    resizeMode: 'cover',
  },
  detailsContainer: {
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderRadius: SIZES.medium,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionSpacing: {
    marginBottom: SIZES.xLarge,
  },
  productTitle: {
    fontFamily: 'bold',
    fontSize: SIZES.large,
    marginBottom: SIZES.small,
  },
  productDescription: {
    fontFamily: 'regular',
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginBottom: SIZES.medium,
  },
  productPrice: {
    fontWeight: 'bold',
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginBottom: SIZES.small,
  },
  subscriptionText: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginBottom: SIZES.medium,
  },
  previewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    justifyContent: 'center',
  },
  previewButtonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    marginLeft: SIZES.small,
  },
  sectionTitle: {
    fontFamily: 'bold',
    fontSize: SIZES.large,
    marginBottom: SIZES.medium,
  },
  variantContainer: {
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderRadius: SIZES.medium,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  variantItem: {
    flexDirection: 'row',
    marginBottom: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray2,
    paddingBottom: SIZES.medium,
  },
  variantImage: {
    width: 60,
    height: 60,
    borderRadius: SIZES.small,
    marginRight: SIZES.medium,
  },
  variantDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  variantTitle: {
    fontFamily: 'bold',
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  variantColor: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  variantPrice: {
    fontFamily: 'bold',
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginBottom: SIZES.small,
  },
  variantDescription: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  sizingContainer: {
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderRadius: SIZES.medium,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sizingItem: {
    marginBottom: SIZES.medium,
  },
  sizingText: {
    fontFamily: 'bold',
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  inventoryText: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  sizingPrice: {
    fontFamily: 'bold',
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginTop: SIZES.small,
  },
  reviewsContainer: {
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderRadius: SIZES.medium,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  reviewItem: {
    marginBottom: SIZES.medium,
  },
  reviewUserName: {
    fontFamily: 'bold',
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  reviewTitle: {
    fontFamily: 'bold',
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  reviewComment: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  checkoutContainer: {
    alignItems: 'center',
    marginBottom: SIZES.xLarge,
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.medium,
    paddingHorizontal: 100,
    borderRadius: SIZES.medium,
    justifyContent: 'center',
  },
  checkoutButtonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    marginRight: SIZES.small,
  },
});
