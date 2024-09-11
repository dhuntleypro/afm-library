import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Modal,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LoginComponentOne from "../login/LoginComponentOne";
import { CONSTANTS } from "@/utils/constants";
import {
  ClientStoreProvider,
  useClientStore,
} from "@/contexts/ClientStoreContext";
import { router } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

const { width, height } = Dimensions.get("screen");

// export default function WelcomePageTwo() {
const WelcomePageTwo = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const { store } = useClientStore();
  const { authState } = useAuth();

  // const welcomeImage = store?.images?.welcome_image ?? "";

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <ImageBackground
        source={{
          uri: "https://appsformankind-assets.s3.amazonaws.com/Store/Jays_Sea_Moss/waterfall.jpg",
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.header}>
            <Text style={styles.logoText}>{store?.store_name}</Text>
            <Text style={styles.tagline}>
              Nature's Superfood, Your Ultimate Wellness Companion.
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonPrimary}
              onPress={() => {
                console.log(authState?.authenticated);
                router.push("/login" as never);
              }}
            >
              <Ionicons name="log-in-outline" size={20} color="black" />
              <Text style={styles.buttonPrimaryText}>Proceed to Login</Text>
              <Ionicons name="arrow-forward" size={20} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={() => router.push("/register" as never)}
            >
              <Ionicons name="person-add-outline" size={20} color="white" />
              <Text style={styles.buttonSecondaryText}>New User? Sign Up</Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/* Modal for Login */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close-outline" size={24} color="black" />
            </TouchableOpacity>
            <LoginComponentOne />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default WelcomePageTwo




const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Dark overlay for text visibility
    paddingTop: 60,
    paddingBottom: 40,
    width: width,
  },
  header: {
    alignItems: "center",
  },
  logoText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  tagline: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  buttonPrimary: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: "90%",
    justifyContent: "space-between",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonPrimaryText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonSecondary: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: "90%",
    justifyContent: "space-between",
  },
  buttonSecondaryText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  noImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    fontSize: 16,
    color: "gray",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
});

// import React from 'react';
// import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useClientStore } from '@/contexts/ClientStoreContext';

// const { width, height } = Dimensions.get("screen");

// export default function WelcomePageTwo() {

//   const { store } = useClientStore();

//   const welcomeImage = store?.images?.welcome_image ?? "";

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

//       {welcomeImage ? (
//         <ImageBackground
//           source={{ uri: welcomeImage }}
//           style={styles.backgroundImage}
//           resizeMode="cover"
//         >
//           <View style={styles.overlay}>
//             <View style={styles.header}>
//               <Text style={styles.logoText}>{store?.store_name}</Text>
//               <Text style={styles.tagline}>Nature's Superfood, Your Ultimate Wellness Companion.</Text>
//             </View>

//             <View style={styles.buttonContainer}>
//               <TouchableOpacity style={styles.buttonPrimary} onPress={() => {}}>
//                 <Ionicons name="log-in-outline" size={20} color="black" />
//                 <Text style={styles.buttonPrimaryText}>Proceed to Login</Text>
//                 <Ionicons name="arrow-forward" size={20} color="black" />
//               </TouchableOpacity>

//               <TouchableOpacity style={styles.buttonSecondary} onPress={() => {}}>
//                 <Ionicons name="person-add-outline" size={20} color="white" />
//                 <Text style={styles.buttonSecondaryText}>New User? Sign Up</Text>
//                 <Ionicons name="arrow-forward" size={20} color="white" />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ImageBackground>
//       ) : (
//         <View style={styles.noImageContainer}>
//           <Text style={styles.noImageText}>No image available</Text>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5F5F5',
//   },
//   backgroundImage: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   overlay: {
//     flex: 1,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark overlay for text visibility
//     paddingTop: 60,
//     paddingBottom: 40,
//     width: width
//   },
//   header: {
//     alignItems: 'center',
//   },
//   logoText: {
//     fontSize: 40,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   tagline: {
//     fontSize: 16,
//     color: 'white',
//     textAlign: 'center',
//     paddingHorizontal: 20,
//     marginTop: 10,
//   },
//   buttonContainer: {
//     width: '100%',
//     alignItems: 'center',
//   },
//   buttonPrimary: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 30,
//     width: '90%',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   buttonPrimaryText: {
//     color: 'black',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   buttonSecondary: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'black',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 30,
//     width: '90%',
//     justifyContent: 'space-between',
//   },
//   buttonSecondaryText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   noImageContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   noImageText: {
//     fontSize: 16,
//     color: 'gray',
//   },
// });
