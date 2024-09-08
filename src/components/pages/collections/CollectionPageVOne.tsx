import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useClientCollection } from '@/contexts/ClientCollectionContext';
import { CollectionModelProps } from '@/models/CollectionModelProps'; // Adjust the import path as necessary

const CollectionPageVOne: React.FC = () => {

  const { collections } = useClientCollection();

  const renderItem = ({ item }: { item: CollectionModelProps }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardArtist}>{item.description}</Text>
        <Text style={styles.cardPrice}>{item.amount} ETH</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
     
      <Text style={styles.title}>TOP COLLECTIONS</Text>

      <FlatList
        data={collections}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.collectionsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CollectionPageVOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0D1D',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 24,
  },
  collectionsList: {
    marginTop: 16,
  },
  card: {
    backgroundColor: '#1C1D2F',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardDetails: {
    padding: 16,
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardArtist: {
    color: '#8E8E93',
    marginTop: 4,
  },
  cardPrice: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
});
