import React, { FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ColorOptionsProps {
  colors: string[];
  selectedColor: string | null;
  onColorSelect: (color: string) => void;
}

const ProductColorPickerView: FC<ColorOptionsProps> = ({ colors, selectedColor, onColorSelect }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Color</Text>
      <View style={styles.colorOptions}>
        {colors.map((color) => (
          <TouchableOpacity
            key={color}
            onPress={() => onColorSelect(color)}
            style={[
              styles.colorCircle,
              { backgroundColor: color },
              selectedColor === color && styles.selectedColorCircle,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default ProductColorPickerView;

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
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows colors to wrap to the next line if they don't fit in one row
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedColorCircle: {
    borderWidth: 2,
    borderColor: '#000000',
  },
});
