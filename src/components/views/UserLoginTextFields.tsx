import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo
import { COLORS } from "@/utils/theme";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { useClientStore } from "@/contexts/ClientStoreContext";

const { width , height} = Dimensions.get("window");


const UserLoginTextFields = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedpassword, setConfirmedPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {store} = useClientStore() 

  const [activeTabIsLogin, setActiveTabIsLogin] = useState(true);
  const { onLogin, onRegister, onLogout, authState } = useAuth();
  // const { data: store } = useFetchObject<StoreModelProps>(() => getStore(CONSTANTS.store_id))

  const showAlert = (message: string) =>
    Alert.alert("Error", message, [{ text: "OK" }]);


  const loginAction = async () => {
    try {
      const result = await onLogin!(store?.id ?? "", email, password);
      if (result.error) {
        showAlert(result.msg);
      } else {
        console.log("Login successful");
        try {
          router.replace("/home" as never);
        } catch (navError) {
          console.error("Navigation error:", navError);
        }
      }
    } catch (error: any) {
      console.error("(6) Login error:", error.message);
      showAlert("Login failed. Please try again.");
    }
  };
    
  return (
    <View style={{height: height}}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color={COLORS.darkGray} />
            <TextInput
              placeholder="Enter your email"
              //placeholderTextColor={COLORS.darkGray}
              onChangeText={setEmail}
              value={email}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              secureTextEntry={false} // Ensure this is set to false
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={COLORS.darkGray}
            />
            <TextInput
              placeholder="Enter your password"
              //placeholderTextColor={COLORS.darkGray}
              onChangeText={setPassword}
              value={password}
              style={styles.input}
              secureTextEntry={!showPassword} // Ensure this is set to false
            />
            <Ionicons name="eye-outline" size={20} color={COLORS.darkGray} />
          </View>

          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={loginAction}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
  )
}

export default UserLoginTextFields


const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingTop: 20,
      backgroundColor: COLORS.white,
      alignItems: "center",
    },
    logo: {
      width: 80,
      height: 80,
      marginTop: 50,
      borderRadius: 13,
    },
    appName: {
      fontSize: 24,
      fontWeight: "bold",
      color: COLORS.primary,
      marginTop: 10,
    },
    welcomeText: {
      fontSize: 20,
      fontWeight: "bold",
      color: COLORS.darkGray,
      marginTop: 20,
    },
    descriptionText: {
      fontSize: 14,
      color: COLORS.darkGray,
      textAlign: "center",
      marginVertical: 10,
    },
    tabContainer: {
      flexDirection: "row",
      marginVertical: 20,
    },
    tab: {
      flex: 1,
      paddingBottom: 5,
      alignItems: "center",
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: COLORS.primary,
    },
    tabText: {
      fontSize: 16,
      color: COLORS.darkGray,
    },
    activeTabText: {
      color: COLORS.primary,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLORS.lightGray,
      padding: 15,
      borderRadius: 5,
      marginVertical: 10,
      width: width - 40,
    },
    input: {
      flex: 1,
      marginLeft: 10,
      color: COLORS.darkGray,
    },
    forgotPasswordText: {
      alignSelf: "flex-end",
      color: COLORS.primary,
      marginTop: 10,
      marginBottom: 20,
    },
    loginButton: {
      backgroundColor: COLORS.primary,
      padding: 15,
      borderRadius: 5,
      width: width - 40,
      alignItems: "center",
    },
    signupButton: {
      backgroundColor: COLORS.primary,
      padding: 15,
      borderRadius: 5,
      width: width - 40,
      alignItems: "center",
      marginTop: 20,
    },
    loginButtonText: {
      fontSize: 18,
      color: COLORS.white,
      fontWeight: "bold",
    },
    termsText: {
      fontSize: 12,
      color: COLORS.darkGray,
      textAlign: "left",
      marginLeft: 10,
      marginRight: 20,
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 10,
    },
    passwordCriteria: {
      color: COLORS.darkGray,
      fontSize: 14,
      marginTop: 5,
      flexDirection: "row",
      alignItems: "center",
    },
  });
  
