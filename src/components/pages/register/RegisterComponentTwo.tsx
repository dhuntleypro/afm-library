import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { COLORS } from "@/utils/theme";
import UserLoginTextFields from "@/components/views/UserLoginTextFields";
import UserRegisterTextFields from "@/components/views/UserRegisterTextFields";
import { useClientStore } from "@/contexts/ClientStoreContext";

const { width } = Dimensions.get("window");

const RegisterComponentTwo = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedpassword, setConfirmedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [activeTabIsLogin, setActiveTabIsLogin] = useState(false);
  // const { data: store } = useFetchObject<StoreModelProps>(() =>
  //   getStore(CONSTANTS.store_id)
  // );

  const { store } = useClientStore()


  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://appsformankind-assets.s3.amazonaws.com/Store/Apps_For_Mankind/logo.png",
        }}
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>
        Welcome to {store?.store_name ?? ""}
      </Text>
      <Text style={styles.descriptionText}>
        Sign up or login below to manage your project, task, and productivity
      </Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTabIsLogin && styles.activeTab]}
          onPress={() => setActiveTabIsLogin(true)}
        >
          <Text
            style={[styles.tabText, activeTabIsLogin && styles.activeTabText]}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, !activeTabIsLogin && styles.activeTab]}
          onPress={() => setActiveTabIsLogin(false)}
        >
          <Text
            style={[styles.tabText, !activeTabIsLogin && styles.activeTabText]}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      {activeTabIsLogin ? (
       <UserLoginTextFields />
      ) : (
       <UserRegisterTextFields />
      )}
    </View>
  );
};

export default RegisterComponentTwo;

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
