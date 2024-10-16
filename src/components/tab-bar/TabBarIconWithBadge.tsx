import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '@/contexts/ThemeContext';

interface TabBarIconProps {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  quantity?: number;
}

// Component to render a tab bar icon with an optional badge
export function TabBarIconWithBadge({ name, color, quantity }: TabBarIconProps) {
  const { colors } = useTheme(); // Access theme colors dynamically

  const styles = StyleSheet.create({
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    badgeContainer: {
      position: 'absolute',
      right: -6,
      top: -3,
      backgroundColor: colors.primary, // Use primary color from theme
      borderRadius: 8,
      width: 16,
      height: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    badgeText: {
      color: 'white',
      fontSize: 10,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.iconContainer}>
      <FontAwesome name={name} size={28} color={color} style={{ marginBottom: -3 }} />
      {quantity && quantity > 0 ? (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{quantity}</Text>
        </View>
      ) : null}
    </View>
  );
}
