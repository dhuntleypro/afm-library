import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useClientStore } from '@/contexts/ClientStoreContext';
import { useClientCollection } from '@/contexts/CollectionContext';
import { useClientProduct } from '@/contexts/ClientProductContext';

export function LoadingScreen({ onLoaded }: { onLoaded: () => void }) {
  const { getClientStore } = useClientStore(); // Assumes fetchStoreData is a method that fetches the store data
  const { getClientCollections } = useClientCollection(); // Assumes fetchStoreData is a method that fetches the store data
  const { getClientProducts } = useClientProduct(); // Assumes fetchStoreData is a method that fetches the store data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {

        // Get Store
        // await getClientStore();

        //  Get Store Collections
        // await getClientCollections()

        // Get Store Products
      /// - in context  await getClientProducts()

        
        setLoading(false);
        onLoaded();
      } catch (error) {
        console.error("Error fetching store data:", error);
        setLoading(false);
        onLoaded(); // Call even on error to avoid being stuck
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.text}>Loading Store Data...</Text>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#000',
  },
});
