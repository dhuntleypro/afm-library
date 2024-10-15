import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AWS_HOLDER_IMAGE } from "@/utils/api";
// import Colors from "@/constants/Colors";
// import { COLORS } from "@/utils/theme";
// import { useAuth } from "@/contexts/AuthContext";

const SearchBarVOne = () => {
  return (
    <View>
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search keywords"
          placeholderTextColor="#A0A0A0"
        />
      </View>

      <View style={styles.filterSection}>
        <TouchableOpacity>
          <Ionicons
            name="options-outline"
            size={24}
            color="black"
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </View>

      </View>
    </View>
  );
};

export default SearchBarVOne;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },

  talentCount: {
    fontSize: 14,
    color: "#A0A0A0",
    marginBottom: 20,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    // backgroundColor: "#transparent",
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
    // marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 15,
    // backgroundColor: "#FFFFFF",
    // backgroundColor: "#transparent",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  filterIcon: {
    paddingLeft: 3,
    paddingRight: 3,
    // marginLeft: 10,
    // flexDirection: "row",
    // alignItems: "center",
    // marginBottom: 20,
    // backgroundColor: "#FFFFFF",
    // borderRadius: 10,
    // paddingHorizontal: 10,
    // paddingVertical: 12,
  },

  arrow: {
    marginLeft: 10,
    marginTop: 3,
  },
});
