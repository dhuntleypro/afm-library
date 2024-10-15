import React, { FC } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "@/utils/theme";
import { useRouter, Href } from "expo-router";

interface SearchBarVOneButtonProps {
  path: Href;  // Update the type to Href
}

const SearchBarVOneButton: FC<SearchBarVOneButtonProps> = ({ path }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => { router.push(path); }}  // Use the correctly typed path
        style={styles.searchSection}
      >
        <View style={styles.searchInput}>
          <Text style={{ color: COLORS.gray }}>Search keywords</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.filterSection}>
        <TouchableOpacity onPress={() => { router.push("/search" as never); }}>
          <Feather name="search" size={24} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBarVOneButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  searchIcon: {
    marginHorizontal: 10,
    color: COLORS.gray,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    width: "80%",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  filterSection: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
});
