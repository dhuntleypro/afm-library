


import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { useClientStore } from "@/contexts/ClientStoreContext";
import TopHomeSeaction from "./TopHomeSeaction";
import Carousel from "@/pages/tabs/home/Carousel";
import SectionHeader from "@/pages/tabs/home/Headings";
import { AWS_HOLDER_IMAGE } from "@/utils/api";
import { router } from "expo-router";
import { ROUTES } from "@/utils/Routes";
import ProductRow from "../card/product/ProductRow";
import { useTheme } from "@/contexts/ThemeContext";
import { useClientProduct } from "@/contexts/ClientProductContext";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductGridCardVOneVTwo, { ProductHScrollCardVOne } from "../card/product/ProductHScrollCardVOne";
// import ProductGridCardVOneVTwo from "../card/product/ProductGridCardVOneVTwo";

const { width } = Dimensions.get("window");

const HomeDesignTwo = () => {
  const { store } = useClientStore();
  const { colors } = useTheme();
  const {products} = useClientProduct()

  if (products.length < 4 ){
    return(
      <SafeAreaView>
      <Text>
        Need More products to use
      </Text>
      </SafeAreaView>
    )
  }


// card
const styles = StyleSheet.create({
  card: {
    // width: width * 0.9,
    backgroundColor: 'transparent',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 3,
    marginVertical: 10,
  },
  profileImage: {
    width: width - 40,
    height: 500,
    borderRadius: 10,
    marginBottom: 20,

  },
  healthTip: {
    marginTop: 10,
    fontSize: 14,
    color: 'green',
    fontStyle: 'italic',
  },  
  name: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
    color: colors.cardText
  },
  title: {
    fontSize: 16,
    color: '#6e6e6e',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    // fontWeight: '900',
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    color: '#6e6e6e',
    textAlign: 'center',
  },
});


  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: colors.background,
        paddingTop: 30,
        paddingBottom: 200,
      }}
    >
      <TopHomeSeaction product_1_Id={products[0].id} product_2_Id={products[1].id} product_3_Id={products[2].id} product_4_Id={products[3].id} product_1_Name={products[0].name} product_2_Name={products[1].name} product_3_Name={products[2].name} product_4_Name={products[3].name} />
      <SectionHeader />
      <ProductRow client={true} card={ProductHScrollCardVOne} />
      <View style={styles.card}>
        <Image
          source={{ uri: store?.images.welcome_image ?? AWS_HOLDER_IMAGE }} 
          style={styles.profileImage}
        />
        {/* <Text style={styles.name}>JACOB JAMES</Text> */}
        <Text style={styles.name}>YOUR NAME HERE</Text>
        <Text style={styles.title}>
          Founder of {store?.store_name ?? ""} Co.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push(ROUTES.products as never)}
        >
          <Text style={styles.buttonText}>EXPLORE PRODUCTS</Text>
        </TouchableOpacity>
        <Text style={{ padding: 10, fontSize: 40, paddingBottom: 30 }}> 🌿</Text>
        <Text style={styles.description}>
          Leading the way in natural wellness with a focus on the incredible
          benefits of sea moss...
        </Text>
        {/* <Text style={styles.healthTip}>
          🌿 Health Tip: Sea Moss is packed with 92 essential minerals that can support overall wellness, improve skin health, and boost your immune system. Add it to your smoothies or meals for a natural health boost!
        </Text> */}
      </View>

      <Carousel />

      <View style={{ paddingTop: 40 }} />
    </ScrollView>
  );
};

export default HomeDesignTwo;
