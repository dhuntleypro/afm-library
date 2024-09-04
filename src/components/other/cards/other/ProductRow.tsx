import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { COLORS, SIZES } from "@/utils/theme";
import ProductCardView from "@/components/card/ProductCardView";
import { ProductModelProps } from "@/models/ProductModelProps";
// import { useClientProduct } from "@/contexts/ClientProductContext";
import { CONSTANTS } from "@/utils/constants";
import { useClientProduct } from "@/contexts/ClientProductContext";

export interface ClientStateProps {
  client: boolean;
  // storeID: string
}

const ProductRow: React.FC<ClientStateProps> = (props) => {
  const { authState } = useAuth();
  //const storeID = props.storeID // client ? authState?.user?.store_owner_id || '' : CONSTANTS.store_id;
  const email = authState?.user?.email || '';
  const { products, selectedProduct, selectProduct, isLoading, error } = useClientProduct();

  const handleProductSelect = (product: ProductModelProps) => {
    selectProduct(product);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error Loading Data: {error}</Text>
        </View>
      ) : (
        <>
          <FlatList
            keyExtractor={(item: ProductModelProps) => item.id}
            data={products}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleProductSelect(item)}>
                <ProductCardView product={item} />
              </TouchableOpacity>
            )}
            horizontal
            contentContainerStyle={{ columnGap: SIZES.medium }}
          />
          {/* {selectedProduct && (
            <View style={styles.selectedProductContainer}>
              <Text style={styles.selectedProductText}>
                Selected Product: {selectedProduct.name}
              </Text>
            </View>
          )} */}
        </>
      )}
    </View>
  );
};

export default ProductRow;

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.medium,
    marginLeft: 12,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.red,
    fontSize: SIZES.medium,
  },
  selectedProductContainer: {
    marginTop: SIZES.medium,
    padding: SIZES.medium,
    backgroundColor: COLORS.gray2,
    borderRadius: SIZES.small,
  },
  selectedProductText: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
  },
});
