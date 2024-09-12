import React, { useState } from 'react'
import { COLORS, SIZES } from '@/utils/theme'
import { StyleSheet, Text, View , TouchableOpacity, TextInput, FlatList} from 'react-native'
import { Feather, Ionicons } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native'
import { Link } from 'expo-router'

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
    {/* Container */}

    <View style={styles.searchContainer}>
        <TouchableOpacity>
            <Feather name='search' size={24} style={styles.searchIcon} />
        </TouchableOpacity>

        <View style={styles.searchWrapper}>
            <Link href={"/search" as never} asChild>
                <TouchableOpacity style={styles.searchInput}>
                    <Text style={styles.searchInputText}>What are you looking for 3</Text>
                </TouchableOpacity>
            </Link>   
        </View>

        <View>
        <Link href={"/search" as never} asChild>
            <TouchableOpacity style={styles.searchBtn}>

            {/* <Ionicons name='camera-outline' size={SIZES.xLarge} color={COLORS.offwhite} /> */}
            <Feather name='search' size={24} color={COLORS.offwhite}/>
            </TouchableOpacity>
            </Link>

        </View>
    </View>
</View>

  )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    welcomeTxtStyle: {
        fontFamily: "bold",
        fontSize: SIZES.xxLarge - 7,
        marginTop: 0,
        color: '#000',
        marginHorizontal: 12,
    },
    searchContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: SIZES.small,
        backgroundColor: COLORS.black,
        borderRadius: SIZES.medium,
        marginVertical: SIZES.medium,
        height: 50,
    },
    searchIcon: {
        marginHorizontal: 10,
        color: COLORS.gray,
    },
    searchWrapper: { 
        flex: 1,
        backgroundColor: COLORS.black,
        marginRight: SIZES.small,
        borderRadius: SIZES.small,
        justifyContent: 'center', // Ensures children are centered vertically
    },
    searchInput: {
        width: "100%",
        height: "100%",
        paddingHorizontal: SIZES.small,
        justifyContent: 'center', // Ensures text inside is centered vertically
  },
    searchInputText: {
        fontFamily: "regular",
        color: COLORS.gray,
        textAlignVertical: "center", // Ensures text inside the TouchableOpacity is vertically centered
    },
    searchBtn: {
        width: 50,
        height: "100%",
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.primary,
    },
});
