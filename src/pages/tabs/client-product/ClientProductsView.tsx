import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { COLORS, SIZES } from '@/utils/theme';
import { useClientProduct } from '@/contexts/ClientProductContext';
// import ProductCard from '@/components/ProductCard';  // Adjust the import path as necessary
import { Link, Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
// import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ProductModelProps } from '@/models/ProductModelProps';
import ClientProductCard from '@/pages/tabs/client-product/ClientProductCard';

const ClientProductsView = () => {
  const { authState } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<ProductModelProps[]>([]);

  const { products, selectProduct } = useClientProduct();
  
  const colorScheme = useColorScheme();

  const handleProductSelect = (product: ProductModelProps) => {
    selectProduct(product);
  };

  const handleSearch = (text: string) => {
    try {
      setSearchTerm(text);
      const results = products.filter((product: ProductModelProps) =>
        product.name.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(results);
    } catch (error) {
      console.log("Failed to get products", error);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerRight: () => (
            <Link href={"(tabs)/client-products/(create)/create-client-product" as never} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus"
                    size={30}
                    color={COLORS[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      {/* Search */}
{/* 
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons 
            name='camera-outline' 
            size={SIZES.xLarge} 
            style={styles.searchIcon}
          />
        </TouchableOpacity>

        <View style={styles.searchWrapper}>
          <TextInput 
            style={styles.searchInput} 
            value={searchTerm}
            onChangeText={handleSearch}
            placeholder='What are you looking for'
          />
        </View>

        <View>
          <TouchableOpacity style={styles.searchBtn} onPress={() => handleSearch(searchTerm)}>
            <Feather name='search' size={24} color={COLORS.offwhite}/>
          </TouchableOpacity>
        </View>
      </View> */}

      <FlatList
        keyExtractor={(item: ProductModelProps) => item.id}
        // data={searchTerm === '' ? products : searchResults.length === 0 ? products : searchResults}
        data={products}
        // renderItem={({ item }) => <ClientProductCard product={item} onPress={() => console.log('Product selected', item)} />}
        renderItem={({ item }) =>  (
          <TouchableOpacity onPress={() => handleProductSelect(item)}>
            <ClientProductCard product={item}/>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default ClientProductsView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    // backgroundColor: COLORS.gray2,
  },
  detailsLink: {
    marginHorizontal: SIZES.medium,
    marginBottom: SIZES.medium,
  },
  detailsLinkText: {
    fontFamily: 'regular',
    fontSize: SIZES.medium,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: SIZES.small,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    height: 50,
  },
  searchIcon: {
    marginHorizontal: 10,
    color: COLORS.gray,
    marginTop: SIZES.small,
  },
  searchWrapper:{ 
    flex: 1,
    backgroundColor: COLORS.secondary,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
  searchInput: {
    fontFamily: "regular",
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.small,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  list: {
    paddingHorizontal: SIZES.medium,
    paddingBottom: SIZES.large,
  },
});