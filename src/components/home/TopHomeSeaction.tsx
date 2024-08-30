import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useClientStore } from "@/contexts/ClientStoreContext";
import { View as MotiView } from "moti";
// import RoundedButton from "@/app/(tabs)/(home)/(drawer)/(component-library)/lib-buttons/[roundedButton]";
import { COLORS } from "@/utils/theme";
import { Link, router } from "expo-router";
import SearchBarVOne from "../search/SearchBarVOne";
import SearchBar from "../search/SearchBar";
import SearchBarVOneButton from "../search/SearchBarVOneButton";
import { ROUTES } from "@/utils/Routes";
// import SearchBar from "@/components/other/general/SearchBar";

const { width } = Dimensions.get("window");

const TopHomeSeaction: React.FC = () => {
  const { store } = useClientStore();

  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const handleMenuPress = () => {
    // Toggle the visibility of the menu icon
    setIsMenuVisible((prev) => !prev);
  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <MotiView
          key={`menu`} // Force re-render to reset animation
          from={{ opacity: 0, translateY: 50, scale: 0.85 }}
          animate={{ opacity: 1, translateY: 0, scale: 1 }}
          transition={{
            type: "timing",
            duration: 600,
            delay: 1200,
          }}
        >
          <Text style={styles.headerText}>Welcome to</Text>
        </MotiView>
        <MotiView
          key={`i`} // Force re-render to reset animation
          from={{ opacity: 0, translateY: 50, scale: 0.85 }}
          animate={{ opacity: 1, translateY: 0, scale: 1 }}
          transition={{
            type: "timing",
            duration: 600,
            delay: 1300,
          }}
        >
          <TouchableOpacity style={styles.menuIcon} onPress={handleMenuPress}>
            <Ionicons name="menu-outline" size={24} color="black" />
          </TouchableOpacity>
        </MotiView>
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>Jays</Text>
        <MotiView
          key={`sea`} // Force re-render to reset animation
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "timing",
            duration: 600,
            delay: 1400,
          }}
        >
          <Text style={styles.subTitle}>Sea Moss</Text>
        </MotiView>
      </View>

      {/* Product List */}
      <View style={styles.productList}>
        <MotiView
          key={`t1`} // Force re-render to reset animation
          from={{ opacity: 0, translateY: 50, scale: 0.85 }}
          // animate={{ opacity: 1, translateY: 0, scale: 1 }}
          animate={{ opacity: isMenuVisible ? 1 : 0, translateY: isMenuVisible ? 0 : -50 , scale: isMenuVisible ? 1 : 1 }}

          transition={{
            type: "timing",
            duration: 600,
            delay:  isMenuVisible ? 600 : 0,
          }}
        >
          <Text style={styles.productItem}> All Products</Text>
        </MotiView>
        <MotiView
          key={`t2`} // Force re-render to reset animation
          from={{ opacity: 0, translateY: 50, scale: 0.85 }}
          animate={{ opacity: isMenuVisible ? 1 : 0, translateY: isMenuVisible ? 0 : -50 , scale: isMenuVisible ? 1 : 1 }}
          transition={{
            type: "timing",
            duration: 600,
            delay:  isMenuVisible ? 700 : 0,
          }}
        >
          <Text style={styles.productItem}>Raw Sea Moss</Text>
        </MotiView>
        <MotiView
          key={`t3`} // Force re-render to reset animation
          from={{ opacity: 0, translateY: 50, scale: 0.85 }}
          animate={{ opacity: isMenuVisible ? 1 : 0, translateY: isMenuVisible ? 0 : -50 , scale: isMenuVisible ? 1 : 1 }}
          transition={{
            type: "timing",
            duration: 600,
            delay:  isMenuVisible ? 800 : 0,
          }}
        >
          <Text style={styles.productItem}>Sea Moss Gel</Text>
        </MotiView>
        <MotiView
          key={`t4`} // Force re-render to reset animation
          from={{ opacity: 0, translateY: 50, scale: 0.85 }}
          animate={{ opacity: isMenuVisible ? 1 : 0, translateY: isMenuVisible ? 0 : -50 , scale: isMenuVisible ? 1 : 1 }}
          transition={{
            type: "timing",
            duration: 600,
            delay:  isMenuVisible ? 900 : 0,
          }}
        >
          <Text style={styles.productItem}>Sea Moss Capsules</Text>
        </MotiView>
        <MotiView
          key={`t5`} // Force re-render to reset animation
          from={{ opacity: 0, translateY: 50, scale: 0.85 }}
          animate={{ opacity: isMenuVisible ? 1 : 0, translateY: isMenuVisible ? 0 : -50 , scale: isMenuVisible ? 1 : 1 }}
          transition={{
            type: "timing",
            duration: 600,
            delay:  isMenuVisible ? 1000 : 0,
          }}
        >
          <Text style={styles.productItem}>Sea Moss Powder</Text>
        </MotiView>
      </View>

      {/* Image */}
      <MotiView
        key={`image`} // Force re-render to reset animation
        from={{ opacity: 0, translateY: -10, scale: 0.85 }}
        animate={{ opacity: 1, translateY: 0, scale: 1 }}
        transition={{
          type: "timing",
          duration: 600,
          delay: 1500,
        }}
      >
        <Image
          source={{ uri: store?.images.welcome_image }} // Replace with your image URL
          style={styles.image}
          resizeMode="cover"
        />
      </MotiView>

      {/* Description */}
      <MotiView
        key={`description`} // Force re-render to reset animation
        from={{ opacity: 0, translateX: -90, scale: 0.85 }}
        animate={{ opacity: 1, translateX: 0, scale: 1 }}
        transition={{
          type: "timing",
          duration: 600,
          delay: 1500,
        }}
      >
        <Text style={styles.description}>
          Discover the natural benefits of Sea Moss, rich in essential minerals
          and nutrients to support your health and well-being.
        </Text>
      </MotiView>

      <MotiView
        key={`shop`} // Force re-render to reset animation
        from={{ opacity: 0, translateX: -90, scale: 0.85 }}
        animate={{ opacity: 1, translateX: 0, scale: 1 }}
        transition={{
          type: "timing",
          duration: 600,
          delay: 1600,
        }}
      >
       
          <View style={{ paddingTop: 20 }}>
          <TouchableOpacity  style={styles.shopNowButton} onPress={() => router.push("/products")}>
          <Text style={styles.shopNowButtonText}>Shop</Text>
            </TouchableOpacity>
          </View>

          <View style={{ paddingTop: 20 }}>
          <SearchBarVOneButton path={ROUTES.products as never} />
          </View>
          {/* <SearchBar /> */}
      
      </MotiView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 14,
    color: "black",
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
    color: "black",
    lineHeight: 50,
  },
  subTitle: {
    fontSize: 48,
    fontWeight: "300",
    color: "black",
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
    color: "black",
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
    color: "black",
    textAlign: "left",
    marginTop: 20,
  },

  shopNowButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8, // Adds shadow for Android
    alignItems: "center",
    justifyContent: "center",
    width: "40%", // Adjust the width as needed
    // alignSelf: 'center', // Center the button within its parent
  },
  shopNowButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});

export default TopHomeSeaction;
