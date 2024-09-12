import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '@/utils/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons, Feather } from '@expo/vector-icons';

interface SearchProp {
  searchTerm: string;
  handleSearch: (text: string) => void; // Correct type for the search handler function
}

const SearchBarVTwo: React.FC<SearchProp> = ({ searchTerm, handleSearch }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: SIZES.medium,
      backgroundColor: colors.background,
    },
    searchIcon: {
      marginRight: SIZES.small,
      color: colors.title,
    },
    searchWrapper: {
      flex: 1,
      backgroundColor: colors.cardBackground,
      borderRadius: SIZES.medium,
      marginRight: SIZES.small,
      height: 40,
      justifyContent: 'center',
    },
    searchInput: {
      paddingLeft: SIZES.small,
      color: colors.title,
    },
    searchBtn: {
      backgroundColor: COLORS.primary,
      padding: SIZES.small,
      borderRadius: SIZES.medium,
    },
  });

  return (
    <View style={styles.searchContainer}>
      <TouchableOpacity>
        <Ionicons name="search" size={SIZES.xLarge} style={styles.searchIcon} />
      </TouchableOpacity>

      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={handleSearch} // Call handleSearch on input change
          placeholder="What are you looking for"
          placeholderTextColor={colors.subtitle}
        />
      </View>

      <View>
        <TouchableOpacity style={styles.searchBtn} onPress={() => handleSearch(searchTerm)}>
          <Feather name="search" size={24} color={COLORS.offwhite} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBarVTwo;
