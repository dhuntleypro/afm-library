import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useClientProduct } from '@/contexts/ClientProductContext';
import { COLORS, SIZES } from '@/utils/theme';
import { ProductModelProps } from '@/models/ProductModelProps';
import { generateUUID } from '@/hooks/generateUUID';
import { useAuth } from '@/contexts/AuthContext';
import { FormInput } from '@/components/interfaces/FormImport';

const CreateClientProductView = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [note, setNote] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sku, setSku] = useState('');

  const { addProduct } = useClientProduct();
  const { authState } = useAuth();

  const handleSubmit = () => {
    // if (!title || !price || !brand || !category) {
    //   Alert.alert('Validation Error', 'Please fill in all required fields.');
    //   return;
    // }

    if (!/^\d+(\.\d{1,2})?$/.test(price)) {
      Alert.alert('Validation Error', 'Please enter a valid price.');
      return;
    }

    const newProduct: ProductModelProps = {
      id: generateUUID(8),
      store_id: authState?.user?.store_owner_id ?? '',
      index: 0,
      createdOn: '',
      active: false,
      name: title,
      image: '',
      price: parseFloat(price),
      on_sale: false,
      sale_price: 0,
      slug: '',
      quantity: parseInt(quantity) || 0,
      description: note,
      icon_name: '',
      category: category,
      images: [],
      included: [],
      materials: [],
      tags: [],
      brand: brand,
      views: 0,
      likes: 0,
      isLiked: false,
      gender: '',
      color: '',
      color_code: '',
      condition: '',
      features: [],
      sku: sku,
      variant_type: false,
      variant_selected: {},
      variants: [],
      last_updated: '',
      item_type: '',
      ingredients: [],
      inventory: 0,
      reviews: [],
      rating: [],
      size: '',
      sizes: [],
      weight: 0,
      year_made: 0
    };

    addProduct(newProduct);
    
    // Alert.alert('Product Created', `Product titled "${title}" has been created!`);
  };

  return (
    <ScrollView style={styles.formContainer}>
      <Text style={styles.header}>Create New Product</Text>
      <FormInput label="Product Title" value={title} onChangeText={setTitle} placeholder="Enter product title" />
      <FormInput label="Brand" value={brand} onChangeText={setBrand} placeholder="Enter brand name" />
      <FormInput label="Category" value={category} onChangeText={setCategory} placeholder="Enter category" />
      <FormInput
        label="Price"
        value={price}
        onChangeText={setPrice}
        placeholder="Enter price"
        keyboardType="numeric"
      />
      <FormInput
        label="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Enter quantity"
        keyboardType="numeric"
      />
      <FormInput label="SKU" value={sku} onChangeText={setSku} placeholder="Enter SKU" />
      <FormInput
        label="Description/Notes"
        value={note}
        onChangeText={setNote}
        placeholder="Add a description or note (optional)"
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Ionicons name="checkmark-done-outline" size={24} color={COLORS.white} />
        <Text style={styles.submitButtonText}>Create Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateClientProductView;

const styles = StyleSheet.create({
  formContainer: {
    padding: SIZES.medium,
  },
  header: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: SIZES.large,
    textAlign: 'center',
  },
  input: {
    backgroundColor: COLORS.white,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    fontFamily: 'regular',
    marginBottom: SIZES.medium,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: SIZES.medium,
    borderRadius: SIZES.medium,
    marginTop: SIZES.large,
  },
  submitButtonText: {
    fontFamily: 'bold',
    color: COLORS.white,
    fontSize: SIZES.medium,
    marginLeft: SIZES.small,
  },
});
