import React, { useContext, useState } from "react";
import {
  Image,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFavorite } from "@/contexts/FavoriteContext";
// import FavoriteHeader from '@/components/other/headers/FavoriteHeader';
import { generalStyles } from "@/components/other/general/Styles";
// import CartCard from "@/components/cart/CartCard";
import convertToCurrency from "@/hooks/convertToCurrency";
import { CONSTANTS } from "@/utils/constants";
import FavoriteCard from "@/components/card/fovorite/FavoritrCard";
import { useTheme } from "@/contexts/ThemeContext";
// import PaymentPayScreen from './PaymentPayScreen';

// Define the FavoritePageVOne component
const FavoritesPageVOne: React.FC = () => {
  const {
    favorites,
    totalSum,
    totalShipping,
    totalTax,
    grandTotal,
    deleteItemFromFavorite,
  } = useFavorite();
  const [triggerValueChange, setTriggerValueChange] = useState(false);

  const { colors } = useTheme();
  // Stylesheet for the component
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      color: colors.title
    },
    priceContainer: {
      marginTop: 40,
    },
    priceAndTitle: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 20,
      marginVertical: 10,
      color: colors.title, // '#757575',

    },
    text: {
      color: colors.title, // '#757575',
      fontSize: 14,
    },
    divider: {
      borderWidth: 1,
      borderColor: colors.cardBorder, // '#C0C0C0',
      borderRadius: 15,
      marginVertical: 10,
    },
  });
  return (
    <View style={styles.container}>
      {favorites.length <= 0 ? (
        <View style={generalStyles.center}>
          <Text style={{color: colors.title}}>Please add items to the favorite</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={favorites}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => String(item.id)} // Convert item.id to string to ensure it's a valid key
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => (
              <FavoriteCard
                item={item}
                deleteItemFromFavorite={deleteItemFromFavorite}
                triggerValueChange={triggerValueChange}
              />
            )}
          />
          <View style={{ paddingBottom: 50 }} />
        </>
      )}
    </View>
  );
};

export default FavoritesPageVOne;
