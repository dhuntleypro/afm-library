import React, { FC, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface SizesViewProps {
  sizes: string[];
  selectedSize: string | null;
  onSizeSelect: (size: string) => void;
}

const SizesView: FC<SizesViewProps> = ({ sizes, selectedSize, onSizeSelect }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Size</Text>
      <View style={styles.sizeOptions}>
        {sizes.map((size) => (
          <TouchableOpacity
            key={size}
            onPress={() => onSizeSelect(size)}
            style={[
              styles.sizeButton,
              selectedSize === size && styles.selectedSizeButton,
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                selectedSize === size && styles.selectedSizeText,
              ]}
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SizesView;

const styles = StyleSheet.create({
  section: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  sizeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sizeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
  },
  selectedSizeButton: {
    backgroundColor: '#000000',
  },
  sizeText: {
    fontSize: 14,
    color: '#000000',
  },
  selectedSizeText: {
    color: '#FFFFFF',
  },
});
