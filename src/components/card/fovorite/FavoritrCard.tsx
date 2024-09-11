import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, useContext, useState } from "react";
import { COLORS, SIZES } from "@/utils/theme";
// import { ProductModelProps } from '../../models/ProductModelProps'
import convertToCurrency from "@/hooks/convertToCurrency";
// import {  useFavorite } from '../../contexts/FavoriteContext'
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
// import { stripeConverter } from '../../hook/stripeConverter'
// import { useAuth } from '../../contexts/AuthContext'
// import { createPaymentIntent } from '../../api/paymentApi'
import { CONSTANTS } from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorite } from "@/contexts/FavoriteContext";
import { useTheme } from "@react-navigation/native";

const FavoriteCard = ({ item }: any) => {
  const {colors} = useTheme()
  const {
    deleteItemFromFavorite,
    addToFavorite,
    decreaseFromFavorite,
    totalSum,
  } = useFavorite();
  const [quantity, setQuantity] = useState(item.quantity);
  const { authState, onLogout } = useAuth();
  const [paymentStatus, setPaymentStatus] = useState("ijiij");



const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: "row",
  },
  img: {
    height: 125,
    width: "25%",
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 15,
    color: colors.text,
  },
  price: {
    color: "#797979",
    marginVertical: 7,
    fontSize: 18,
  },
  circleSizeContainer: {
    flexDirection: "row",
  },
  circle: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: "#444444",
  },
  sizeCircle: {
    backgroundColor: "white",
    height: 32,
    width: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  sizeText: {
    fontSize: 18,
    fontWeight: "500",
  },
  rating: {
    top: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // marginHorizontal: SIZES.large
  },
  ratingText: {
    color: COLORS.gray,
    fontFamily: "medium",
    paddingHorizontal: SIZES.xSmall,
  },
});

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{ uri: item.image ? item.image : CONSTANTS.holderImage }}
      />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>
          {convertToCurrency(item.price)} 
        </Text>
        {/* <Text style={styles.price}>{convertToCurrency(item.price * item.quantity) }</Text> */}

        {/* <View style={styles.circleSizeContainer}>
                <View style={styles.circle} />
            </View>  */}

        <View style={styles.rating}></View>
      </View>
      <TouchableOpacity onPress={() => deleteItemFromFavorite(item)}>
        <Ionicons
          name="trash-outline"
          size={SIZES.xLarge}
          color={colors.text}
        />
      </TouchableOpacity>

      <View></View>
    </View>
  );
};

export default FavoriteCard;


// import React from 'react';
// import { TouchableOpacity, View, Text, Image } from 'react-native';
// import { useFavorite } from '@/contexts/FavoriteContext';
// import { useAuth } from '@/contexts/AuthContext';
// import { ProductModelProps } from '@/models/ProductModelProps';
// // Update the FavoriteCard component to accept these props
// const FavoriteCard: React.FC<{
//     item: Partial<ProductModelProps>;
//     deleteItemFromFavorite: (item: Partial<ProductModelProps>, authUser: any, updateSingleUserItem: any) => void;
//     triggerValueChange: boolean;
//   }> = ({ item, deleteItemFromFavorite, triggerValueChange }) => {
//     // Handle favorite toggle logic here, if necessary

//     return (
//       <View style={{ padding: 10 }}>
//         {/* Example UI for the favorite item */}
//         {item.image && (
//           <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
//         )}
//         <Text>{item.name || 'Unnamed Product'}</Text>
//         <Text>{item.price || 'Price Unavailable'}</Text>

//         {/* Heart Icon */}
//         <TouchableOpacity onPress={() => deleteItemFromFavorite(item, null, null)}>
//           <Text>{'♡'}</Text> {/* Display filled heart if favorite */}
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   export default FavoriteCard;
