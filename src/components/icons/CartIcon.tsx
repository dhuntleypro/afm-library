import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { router } from "expo-router";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import { useCart } from "@/contexts/CartContext";
import { useTheme } from "@/contexts/ThemeContext";
// import { COLORS } from "@/utils/theme";
// import {COLORS, useCart } from "@dhuntleypro/afm-library"

const CartIcon = () => {
  const { quantity } = useCart();
  const colorScheme = useColorScheme();

  const { colors } = useTheme();
  const styles = StyleSheet.create({
    cartButton: {
      alignItems: "flex-end",
      marginRight: 10,
    },
    cartCount: {
      position: "absolute",
      bottom: 16,
      left: 14,
      width: 16,
      height: 16,
      borderRadius: 8,
      alignItems: "center",
      backgroundColor: colors.primary,
      justifyContent: "center",
      zIndex: 999,
    },
    cartNumber: {
      fontFamily: "regular",
      fontWeight: "600",
      fontSize: 10,
      color: colors.title,
    },
  });

  return (
    <TouchableOpacity
      style={styles.cartButton}
      onPress={() => router.push("/cart" as never)}
    >
      <FontAwesome name="shopping-cart" size={24} color={colors.title} />
      {quantity > 0 ? (
        <View style={styles.cartCount}>
          <Text style={styles.cartNumber}>{quantity}</Text>
        </View>
      ) : undefined}
    </TouchableOpacity>
  );
};

export default CartIcon;
