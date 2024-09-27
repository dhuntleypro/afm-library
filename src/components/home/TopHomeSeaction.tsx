import React, { FC, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Dimensions, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useClientStore } from "@/contexts/ClientStoreContext";
import { View as MotiView } from "moti";
import { router } from "expo-router";
import { COLORS } from "@/utils/theme";
import { useClientProduct } from "@/contexts/ClientProductContext";
import { ProductModelProps } from "@/models/ProductModelProps";
import SearchBarVOneButton from "../search/SearchBarVOneButton";
import { ROUTES } from "@/utils/Routes";
import { useTheme } from "@/contexts/ThemeContext"

const { width } = Dimensions.get("window");

interface TopHomeSeactionProps {
  product_1_Id: string;
  product_2_Id: string;
  product_3_Id: string;
  product_4_Id: string;
  product_1_Name: string;
  product_2_Name: string;
  product_3_Name: string;
  product_4_Name: string;
}

const TopHomeSeaction: FC<TopHomeSeactionProps> = (props) => {
  const { store } = useClientStore();
  const { colors } = useTheme();
  const { selectProduct, products } = useClientProduct(); // Get `selectProduct` from context

  const [isMenuVisible, setIsMenuVisible] = useState(true);

  // Toggle menu visibility
  const handleMenuPress = () => {
    setIsMenuVisible((prev) => !prev);
  };



// Handle selecting a product and navigate
const handleProductSelect = (productId: string) => {
  const selected = products.find((product) => product.id === productId); // Find the product by its ID
  if (selected) {
    selectProduct(selected); // Select the product
    // Navigate to product details using the correct string format
    router.push(`/products/${productId}` as never); // Navigate to product details
  }
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 14,
    color: colors.cardText,
  },
  menuIcon: {
    paddingVertical: 10,
  },
  titleContainer: {
    marginTop: 20,
  },
  mainTitle: {
    fontSize: 48,
    fontWeight: "bold",
    color: colors.cardText,
    lineHeight: 50,
  },
  subTitle: {
    fontSize: 48,
    fontWeight: "300",
    color: colors.cardText,
    lineHeight: 50,
  },
  productList: {
    position: "absolute",
    top: 60,
    right: 20,
    alignItems: "flex-end",
  },
  productItem: {
    fontSize: 16,
    color: colors.cardText,
    marginBottom: 5,
  },
  image: {
    width: width - 40,
    height: 300,
    borderRadius: 10,
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: colors.cardText,
    textAlign: "left",
    marginTop: 20,
  },
  shopNowButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: colors.primary,
    borderRadius: 25,
    shadowColor: colors.buttonShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
  },
  shopNowButtonText: {
    color: "white", // text
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <MotiView
          from={{ opacity: 0, translateY: 50, scale: 0.85 }}
          animate={{ opacity: 1, translateY: 0, scale: 1 }}
          transition={{ type: "timing", duration: 600, delay: 1200 }}
        >
          <Text style={styles.headerText}>Welcome to</Text>
        </MotiView>
        <MotiView
          from={{ opacity: 0, translateY: 50, scale: 0.85 }}
          animate={{ opacity: 1, translateY: 0, scale: 1 }}
          transition={{ type: "timing", duration: 600, delay: 1300 }}
        >
          <TouchableOpacity style={styles.menuIcon} onPress={handleMenuPress}>
            <Ionicons name="menu-outline" size={24} color={colors.tint}/>
          </TouchableOpacity>
        </MotiView>
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>Jays</Text>
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 600, delay: 1400 }}
        >
          <Text style={styles.subTitle}>Sea Moss</Text>
        </MotiView>
      </View>

      {/* Product List */}
      <View style={styles.productList}>
        {isMenuVisible && (
          <>
            <MotiView
              from={{ opacity: 0, translateY: 50, scale: 0.85 }}
              animate={{ opacity: 1, translateY: 0, scale: 1 }}
              transition={{ type: "timing", duration: 600, delay: 600 }}
            >
              <Pressable onPress={() => router.push("/products" as never)}>
                <Text style={styles.productItem}>All Products</Text>
              </Pressable>
            </MotiView>
            <MotiView
              from={{ opacity: 0, translateY: 50, scale: 0.85 }}
              animate={{ opacity: 1, translateY: 0, scale: 1 }}
              transition={{ type: "timing", duration: 600, delay: 700 }}
            >
              <Pressable onPress={() => handleProductSelect(props.product_1_Id)}>
                <Text style={styles.productItem}>{props.product_1_Name}</Text>
              </Pressable>
            </MotiView>
            <MotiView
              from={{ opacity: 0, translateY: 50, scale: 0.85 }}
              animate={{ opacity: 1, translateY: 0, scale: 1 }}
              transition={{ type: "timing", duration: 600, delay: 800 }}
            >
              <Pressable onPress={() => handleProductSelect(props.product_2_Id)}>
                <Text style={styles.productItem}>{props.product_2_Name}</Text>
              </Pressable>
            </MotiView>
            <MotiView
              from={{ opacity: 0, translateY: 50, scale: 0.85 }}
              animate={{ opacity: 1, translateY: 0, scale: 1 }}
              transition={{ type: "timing", duration: 600, delay: 900 }}
            >
              <Pressable onPress={() => handleProductSelect(props.product_3_Id)}>
                <Text style={styles.productItem}>{props.product_3_Name}</Text>
              </Pressable>
            </MotiView>
            <MotiView
              from={{ opacity: 0, translateY: 50, scale: 0.85 }}
              animate={{ opacity: 1, translateY: 0, scale: 1 }}
              transition={{ type: "timing", duration: 600, delay: 1000 }}
            >
              <Pressable onPress={() => handleProductSelect(props.product_4_Id)}>
                <Text style={styles.productItem}>{props.product_4_Name}</Text>
              </Pressable>
            </MotiView>
          </>
        )}
      </View>

      {/* Image */}
      <MotiView
        from={{ opacity: 0, translateY: -10, scale: 0.85 }}
        animate={{ opacity: 1, translateY: 0, scale: 1 }}
        transition={{ type: "timing", duration: 600, delay: 1500 }}
      >
        <Image
          source={{ uri: store?.images.welcome_image }} // Replace with your image URL
          style={styles.image}
          resizeMode="cover"
        />
      </MotiView>


   {/* Description */}
   <MotiView
        from={{ opacity: 0, translateX: -90, scale: 0.85 }}
        animate={{ opacity: 1, translateX: 0, scale: 1 }}
        transition={{ type: "timing", duration: 600, delay: 1500 }}
      >
        <Text style={styles.description}>
          Discover the natural benefits of Sea Moss, rich in essential minerals
          and nutrients to support your health and well-being.
        </Text>
      </MotiView>

      {/* Shop Button */}
      <MotiView
        from={{ opacity: 0, translateX: -90, scale: 0.85 }}
        animate={{ opacity: 1, translateX: 0, scale: 1 }}
        transition={{ type: "timing", duration: 600, delay: 1600 }}
      >
        <View style={{ paddingTop: 20 }}>
          <TouchableOpacity style={styles.shopNowButton} onPress={() => router.push(ROUTES.products as never)}>
            <Text style={styles.shopNowButtonText}>Shop</Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingTop: 20 }}>
          <SearchBarVOneButton path={ROUTES.products as never} />
        </View>
      </MotiView>


    </View>
  );
};

export default TopHomeSeaction;


// // import React, { FC, useState } from "react";
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   Image,
// //   TouchableOpacity,
// //   Dimensions,
// //   Pressable,
// // } from "react-native";
// // import { Ionicons } from "@expo/vector-icons";
// // import { useClientStore } from "@/contexts/ClientStoreContext";
// // import { View as MotiView } from "moti";
// // import { COLORS } from "@/utils/theme";
// // import { router } from "expo-router";
// // import SearchBarVOneButton from "../search/SearchBarVOneButton";
// // import { ROUTES } from "@/utils/Routes";

// // const { width } = Dimensions.get("window");

// // interface TopHomeSeactionProps {
// //   product_1_Id: string;
// //   product_2_Id: string;
// //   product_3_Id: string;
// //   product_4_Id: string;
// //   product_1_Name: string;
// //   product_2_Name: string;
// //   product_3_Name: string;
// //   product_4_Name: string;
// // }

// // const TopHomeSeaction: FC<TopHomeSeactionProps> = (props) => {
// //   const { store } = useClientStore();
// //   const [isMenuVisible, setIsMenuVisible] = useState(true);

// //   const handleMenuPress = () => {
// //     setIsMenuVisible((prev) => !prev); // Toggle menu visibility
// //   };

// //   return (
// //     <View style={styles.container}>
// //       {/* Header */}
// //       <View style={styles.header}>
// //         <MotiView
// //           from={{ opacity: 0, translateY: 50, scale: 0.85 }}
// //           animate={{ opacity: 1, translateY: 0, scale: 1 }}
// //           transition={{ type: "timing", duration: 600, delay: 1200 }}
// //         >
// //           <Text style={styles.headerText}>Welcome to</Text>
// //         </MotiView>
// //         <MotiView
// //           from={{ opacity: 0, translateY: 50, scale: 0.85 }}
// //           animate={{ opacity: 1, translateY: 0, scale: 1 }}
// //           transition={{ type: "timing", duration: 600, delay: 1300 }}
// //         >
// //           <TouchableOpacity style={styles.menuIcon} onPress={handleMenuPress}>
// //             <Ionicons name="menu-outline" size={24} color="black" />
// //           </TouchableOpacity>
// //         </MotiView>
// //       </View>

// //       {/* Title */}
// //       <View style={styles.titleContainer}>
// //         <Text style={styles.mainTitle}>Jays</Text>
// //         <MotiView
// //           from={{ opacity: 0, translateY: -10 }}
// //           animate={{ opacity: 1, translateY: 0 }}
// //           transition={{ type: "timing", duration: 600, delay: 1400 }}
// //         >
// //           <Text style={styles.subTitle}>Sea Moss</Text>
// //         </MotiView>
// //       </View>

// //       {/* Product List */}
// //       <View style={styles.productList}>
// //         <MotiView
// //           from={{ opacity: 0, translateY: 50, scale: 0.85 }}
// //           animate={{ opacity: isMenuVisible ? 1 : 0, translateY: isMenuVisible ? 0 : -50, scale: 1 }}
// //           transition={{
// //             type: "timing",
// //             duration: isMenuVisible ? 600 : 0,
// //             delay: isMenuVisible ? 600 : 0,
// //           }}
// //         >
// //           <Pressable onPress={() => router.push("/products" as never)}>
// //             <Text style={styles.productItem}>All Products</Text>
// //           </Pressable>
// //         </MotiView>

// //         <MotiView
// //           from={{ opacity: 0, translateY: 50, scale: 0.85 }}
// //           animate={{ opacity: isMenuVisible ? 1 : 0, translateY: isMenuVisible ? 0 : -50, scale: 1 }}
// //           transition={{
// //             type: "timing",
// //             duration: isMenuVisible ? 600 : 0,
// //             delay: isMenuVisible ? 700 : 0,
// //           }}
// //         >
// //           <Pressable onPress={() => router.push(`/products/${props.product_1_Id}` as never)}>
// //             <Text style={styles.productItem}>{props.product_1_Name}</Text>
// //           </Pressable>
// //         </MotiView>

// //         <MotiView
// //           from={{ opacity: 0, translateY: 50, scale: 0.85 }}
// //           animate={{ opacity: isMenuVisible ? 1 : 0, translateY: isMenuVisible ? 0 : -50, scale: 1 }}
// //           transition={{
// //             type: "timing",
// //             duration: isMenuVisible ? 600 : 0,
// //             delay: isMenuVisible ? 800 : 0,
// //           }}
// //         >
// //           <Pressable onPress={() => router.push(`/products/${props.product_2_Id}` as never)}>
// //             <Text style={styles.productItem}>{props.product_2_Name}</Text>
// //           </Pressable>
// //         </MotiView>

// //         <MotiView
// //           from={{ opacity: 0, translateY: 50, scale: 0.85 }}
// //           animate={{ opacity: isMenuVisible ? 1 : 0, translateY: isMenuVisible ? 0 : -50, scale: 1 }}
// //           transition={{
// //             type: "timing",
// //             duration: isMenuVisible ? 600 : 0,
// //             delay: isMenuVisible ? 900 : 0,
// //           }}
// //         >
// //           <Pressable onPress={() => router.push(`/products/${props.product_3_Id}` as never)}>
// //             <Text style={styles.productItem}>{props.product_3_Name}</Text>
// //           </Pressable>
// //         </MotiView>

// //         <MotiView
// //           from={{ opacity: 0, translateY: 50, scale: 0.85 }}
// //           animate={{ opacity: isMenuVisible ? 1 : 0, translateY: isMenuVisible ? 0 : -50, scale: 1 }}
// //           transition={{
// //             type: "timing",
// //             duration: isMenuVisible ? 600 : 0,
// //             delay: isMenuVisible ? 1000 : 0,
// //           }}
// //         >
// //           <Pressable onPress={() => router.push(`/products/${props.product_4_Id}` as never)}>
// //             <Text style={styles.productItem}>{props.product_4_Name}</Text>
// //           </Pressable>
// //         </MotiView>
// //       </View>

// //       {/* Image */}
// //       <MotiView
// //         from={{ opacity: 0, translateY: -10, scale: 0.85 }}
// //         animate={{ opacity: 1, translateY: 0, scale: 1 }}
// //         transition={{ type: "timing", duration: 600, delay: 1500 }}
// //       >
// //         <Image
// //           source={{ uri: store?.images.welcome_image }} // Replace with your image URL
// //           style={styles.image}
// //           resizeMode="cover"
// //         />
// //       </MotiView>

      // {/* Description */}
      // <MotiView
      //   from={{ opacity: 0, translateX: -90, scale: 0.85 }}
      //   animate={{ opacity: 1, translateX: 0, scale: 1 }}
      //   transition={{ type: "timing", duration: 600, delay: 1500 }}
      // >
      //   <Text style={styles.description}>
      //     Discover the natural benefits of Sea Moss, rich in essential minerals
      //     and nutrients to support your health and well-being.
      //   </Text>
      // </MotiView>

      // {/* Shop Button */}
      // <MotiView
      //   from={{ opacity: 0, translateX: -90, scale: 0.85 }}
      //   animate={{ opacity: 1, translateX: 0, scale: 1 }}
      //   transition={{ type: "timing", duration: 600, delay: 1600 }}
      // >
      //   <View style={{ paddingTop: 20 }}>
      //     <TouchableOpacity style={styles.shopNowButton} onPress={() => router.push("/products" as never)}>
      //       <Text style={styles.shopNowButtonText}>Shop</Text>
      //     </TouchableOpacity>
      //   </View>

      //   <View style={{ paddingTop: 20 }}>
      //     <SearchBarVOneButton path={ROUTES.products as never} />
      //   </View>
      // </MotiView>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "white",
// //     padding: 20,
// //   },
// //   header: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //   },
// //   headerText: {
// //     fontSize: 14,
// //     color: "black",
// //   },
// //   menuIcon: {
// //     paddingVertical: 10,
// //   },
// //   titleContainer: {
// //     marginTop: 20,
// //   },
// //   mainTitle: {
// //     fontSize: 48,
// //     fontWeight: "bold",
// //     color: "black",
// //     lineHeight: 50,
// //   },
// //   subTitle: {
// //     fontSize: 48,
// //     fontWeight: "300",
// //     color: "black",
// //     lineHeight: 50,
// //   },
// //   productList: {
// //     position: "absolute",
// //     top: 60,
// //     right: 20,
// //     alignItems: "flex-end",
// //   },
// //   productItem: {
// //     fontSize: 16,
// //     color: "black",
// //     marginBottom: 5,
// //   },
// //   image: {
// //     width: width - 40,
// //     height: 300,
// //     borderRadius: 10,
// //     marginTop: 20,
// //   },
  // description: {
  //   fontSize: 16,
  //   color: "black",
  //   textAlign: "left",
  //   marginTop: 20,
  // },
  // shopNowButton: {
  //   paddingVertical: 15,
  //   paddingHorizontal: 30,
  //   backgroundColor: COLORS.primary,
  //   borderRadius: 25,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 4 },
  //   shadowOpacity: 0.3,
  //   shadowRadius: 5,
  //   elevation: 8,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   width: "40%",
  // },
  // shopNowButtonText: {
  //   color: "white",
  //   fontWeight: "bold",
  //   fontSize: 18,
  //   letterSpacing: 1,
  //   textTransform: "uppercase",
  // },
// // });

// // export default TopHomeSeaction;



