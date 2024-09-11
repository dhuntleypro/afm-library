import React, { FC, useState } from "react";
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
import { useAuth } from "@/contexts/AuthContext";
import { UserProps } from "@/models/UserProps";
import { generateUUID } from "@/hooks/generateUUID";
import { router } from "expo-router";
import { COLORS } from "@/utils/theme";
import UserLoginTextFields from "@/components/views/UserLoginTextFields";
import UserRegisterTextFields from "@/components/views/UserRegisterTextFields";
import { useClientStore } from "@/contexts/ClientStoreContext";

const { width , height } = Dimensions.get("window");


const LoginComponentTwo = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedpassword, setConfirmedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [activeTabIsLogin, setActiveTabIsLogin] = useState(true);
  const { onLogin, onRegister, onLogout, authState } = useAuth();
  // const { data: store } = useFetchObject<StoreModelProps>(() =>
  //   getStore(CONSTANTS.store_id)
  // );

  const { store } = useClientStore()


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
    } catch (error) {
      console.error("Login error:", error);
      showAlert("Login failed. Please try again.");
    }
  };

  const registerAction = async () => {
    const user: UserProps = {
      id: generateUUID(8),
      name,
      email,
      password,
      store_ids: [],
      store_owner_id: "",
      onboardingQ1: "",
      onboardingQ2: "",
      onboardingQ3: "",
      onboardingQ4: "",
      orders: [],
      favoriteItems: [],
      cart: [],
      affiliate_link: "",
      active: false,
      role: "",
      birthday: "",
      todo_completed: false,
      tableName: "",
      username: "",
      phone_number: "",
      gender: "",
      profile_image: "",
      address_city: "",
      address_state: "",
      location_history: [],
      current_notification: "",
      notifications: [],
      payment_due: 0,
      payment_due_date: "",
      payment_due_day: "",
      payment_monthly_amount: 0,
      device_id: "",
      device_os_version: "",
      device_model: "",
      device_ip_address: "",
      device_battery_level: "",
      device_battery_statue: "",
      device_network_connectio_type: "",
      loyalty_date: "",
      payment_history_total: 0,
      subscription_id: "",
      paid_subscriber: false,
      newsletter_subscriber: false,
      notification_subscriber: false,
      left_review: false,
      review_stars: [],
      reviews: [],
      testimonials: [],
      notify_arn: "",
      owner_notify_arn: "",
    };

    try {
      const result = await onRegister!(store?.id ?? "", user);
      if (result.error) {
        showAlert(result);
        return;
      } else {
        console.log("Registration successful");
        loginAction();
      }
    } catch (error) {
      console.error("(2) Registration error:", error);
      showAlert("Registration failed. Please try again.");
    }
  };

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

export default LoginComponentTwo;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: COLORS.white,
    alignItems: "center",
    height: height
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












// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Dimensions,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo
// import { useAuth } from "@/contexts/AuthContext";
// import { UserProps } from "@/models/UserProps";
// import { generateUUID } from "@/hooks/generateUUID";
// import { router } from "expo-router";
// import { COLORS } from "@/utils/theme";
// import { CONSTANTS } from "@/utils/constants";
// import useFetchObject from "@/hooks/useFetchObject";
// import { StoreModelProps } from "@/models/StoreModelProps";
// import { getStore } from "@/api/storeApi";

// const { width } = Dimensions.get("window");

// const LoginComponentTwo = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmedpassword, setConfirmedPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [activeTabIsLogin, setActiveTabIsLogin] = useState(true);
//   const { onLogin, onRegister, onLogout, authState } = useAuth();
//   const { data: store } = useFetchObject<StoreModelProps>(() =>
//     getStore(CONSTANTS.store_id)
//   );

//   const showAlert = (message: string) =>
//     Alert.alert("Error", message, [{ text: "OK" }]);

//   const loginAction = async () => {
//     try {
//       const result = await onLogin!(email, password);
//       if (result.error) {
//         showAlert(result.msg);
//       } else {
//         console.log("Login successful");
//         try {
//           router.replace("/home");
//         } catch (navError) {
//           console.error("Navigation error:", navError);
//         }
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       showAlert("Login failed. Please try again.");
//     }
//   };

//   const registerAction = async () => {
//     const user: UserProps = {
//       id: generateUUID(8),
//       name,
//       email,
//       password,
//       store_ids: [],
//       store_owner_id: "",
//       onboardingQ1: "",
//       onboardingQ2: "",
//       onboardingQ3: "",
//       onboardingQ4: "",
//       orders: [],
//       favoriteItems: [],
//       cart: [],
//       affiliate_link: "",
//       active: false,
//       role: "",
//       birthday: "",
//       todo_completed: false,
//       tableName: "",
//       username: "",
//       phone_number: "",
//       gender: "",
//       profile_image: "",
//       address_city: "",
//       address_state: "",
//       location_history: [],
//       current_notification: "",
//       notifications: [],
//       payment_due: 0,
//       payment_due_date: "",
//       payment_due_day: "",
//       payment_monthly_amount: 0,
//       device_id: "",
//       device_os_version: "",
//       device_model: "",
//       device_ip_address: "",
//       device_battery_level: "",
//       device_battery_statue: "",
//       device_network_connectio_type: "",
//       loyalty_date: "",
//       payment_history_total: 0,
//       subscription_id: "",
//       paid_subscriber: false,
//       newsletter_subscriber: false,
//       notification_subscriber: false,
//       left_review: false,
//       review_stars: [],
//       reviews: [],
//       testimonials: [],
//       notify_arn: "",
//       owner_notify_arn: "",
//     };

//     try {
//       const result = await onRegister!(user);
//       if (result.error) {
//         showAlert(result);
//         return;
//       } else {
//         console.log("Registration successful");
//         loginAction();
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
//       showAlert("Registration failed. Please try again.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         source={{
//           uri: "https://appsformankind-assets.s3.amazonaws.com/Store/Apps_For_Mankind/logo.png",
//         }}
//         style={styles.logo}
//       />
//       <Text style={styles.welcomeText}>
//         Welcome to {store?.store_name ?? ""}
//       </Text>
//       <Text style={styles.descriptionText}>
//         Sign up or login below to manage your project, task, and productivity
//       </Text>

//       <View style={styles.tabContainer}>
//         <TouchableOpacity
//           style={[styles.tab, activeTabIsLogin && styles.activeTab]}
//           onPress={() => setActiveTabIsLogin(true)}
//         >
//           <Text
//             style={[styles.tabText, activeTabIsLogin && styles.activeTabText]}
//           >
//             Login
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.tab, !activeTabIsLogin && styles.activeTab]}
//           onPress={() => setActiveTabIsLogin(false)}
//         >
//           <Text
//             style={[styles.tabText, !activeTabIsLogin && styles.activeTabText]}
//           >
//             Sign Up
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {activeTabIsLogin ? (
//         <View>
//           <View style={styles.inputContainer}>
//             <Ionicons name="mail-outline" size={20} color={COLORS.darkGray} />
//             <TextInput
//               placeholder="Enter your email"
//               //placeholderTextColor={COLORS.darkGray}
//               onChangeText={setEmail}
//               value={email}
//               style={styles.input}
//               keyboardType="email-address"
//               autoCapitalize="none"
//               autoComplete="email"
//               secureTextEntry={false} // Ensure this is set to false
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Ionicons
//               name="lock-closed-outline"
//               size={20}
//               color={COLORS.darkGray}
//             />
//             <TextInput
//               placeholder="Enter your password"
//               //placeholderTextColor={COLORS.darkGray}
//               onChangeText={setPassword}
//               value={password}
//               style={styles.input}
//               secureTextEntry={!showPassword} // Ensure this is set to false
//             />
//             <Ionicons name="eye-outline" size={20} color={COLORS.darkGray} />
//           </View>

//           <TouchableOpacity>
//             <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.loginButton} onPress={loginAction}>
//             <Text style={styles.loginButtonText}>Login</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <View>
//           <View style={styles.inputContainer}>
//             <Ionicons name="person-outline" size={20} color={COLORS.darkGray} />
//             <TextInput
//               placeholder="Your name"
//               //placeholderTextColor={COLORS.darkGray}
//               onChangeText={setName}
//               value={name}
//               style={styles.input}
//               secureTextEntry={false} // Ensure this is set to false
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Ionicons name="mail-outline" size={20} color={COLORS.darkGray} />
//             <TextInput
//               placeholder="Enter your email"
//               //placeholderTextColor={COLORS.darkGray}
//               onChangeText={setEmail}
//               value={email}
//               style={styles.input}
//               keyboardType="email-address"
//               autoCapitalize="none"
//               autoComplete="email"
//               secureTextEntry={false} // Ensure this is set to false
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Ionicons
//               name="lock-closed-outline"
//               size={20}
//               color={COLORS.darkGray}
//             />
//             <TextInput
//               placeholder="Enter your password"
//               //placeholderTextColor={COLORS.darkGray}
//               onChangeText={setPassword}
//               value={password}
//               style={styles.input}
//               secureTextEntry={!showPassword}
//             />
//             <TouchableOpacity
//               onPress={() => setShowPassword((prevState) => !prevState)}
//             >
//               <Ionicons
//                 name={showPassword ? "eye-off-outline" : "eye-outline"}
//                 size={20}
//                 color={COLORS.darkGray}
//               />
//             </TouchableOpacity>
//           </View>

//           <View style={styles.inputContainer}>
//             <Ionicons
//               name="lock-closed-outline"
//               size={20}
//               color={COLORS.darkGray}
//             />
//             <TextInput
//               placeholder="Confirm your password"
//               onChangeText={setConfirmedPassword}
//               value={confirmedpassword}
//               style={styles.input}
//               secureTextEntry={!showConfirmPassword} // Ensure this is set to false
//             />

//             <TouchableOpacity
//               onPress={() => setShowConfirmPassword((prevState) => !prevState)}
//             >
//               <Ionicons
//                 name={showPassword ? "eye-off-outline" : "eye-outline"}
//                 size={20}
//                 color={COLORS.darkGray}
//               />
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.passwordCriteria}>
//             <Ionicons name="checkmark-outline" size={16} color={COLORS.green} />{" "}
//             At least 8 characters
//           </Text>
//           <Text style={styles.passwordCriteria}>
//             <Ionicons name="checkmark-outline" size={16} color={COLORS.green} />{" "}
//             At least 1 number
//           </Text>
//           <Text style={styles.passwordCriteria}>
//             <Ionicons name="checkmark-outline" size={16} color={COLORS.green} />{" "}
//             Both upper and lower case letters
//           </Text>

//           <TouchableOpacity
//             style={styles.signupButton}
//             onPress={registerAction}
//           >
//             <Text style={styles.loginButtonText}>Sign Up</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// export default LoginComponentTwo;

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     backgroundColor: COLORS.white,
//     alignItems: "center",
//   },
//   logo: {
//     width: 80,
//     height: 80,
//     marginTop: 50,
//     borderRadius: 13,
//   },
//   appName: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: COLORS.primary,
//     marginTop: 10,
//   },
//   welcomeText: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: COLORS.darkGray,
//     marginTop: 20,
//   },
//   descriptionText: {
//     fontSize: 14,
//     color: COLORS.darkGray,
//     textAlign: "center",
//     marginVertical: 10,
//   },
//   tabContainer: {
//     flexDirection: "row",
//     marginVertical: 20,
//   },
//   tab: {
//     flex: 1,
//     paddingBottom: 5,
//     alignItems: "center",
//   },
//   activeTab: {
//     borderBottomWidth: 2,
//     borderBottomColor: COLORS.primary,
//   },
//   tabText: {
//     fontSize: 16,
//     color: COLORS.darkGray,
//   },
//   activeTabText: {
//     color: COLORS.primary,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: COLORS.lightGray,
//     padding: 15,
//     borderRadius: 5,
//     marginVertical: 10,
//     width: width - 40,
//   },
//   input: {
//     flex: 1,
//     marginLeft: 10,
//     color: COLORS.darkGray,
//   },
//   forgotPasswordText: {
//     alignSelf: "flex-end",
//     color: COLORS.primary,
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   loginButton: {
//     backgroundColor: COLORS.primary,
//     padding: 15,
//     borderRadius: 5,
//     width: width - 40,
//     alignItems: "center",
//   },
//   signupButton: {
//     backgroundColor: COLORS.primary,
//     padding: 15,
//     borderRadius: 5,
//     width: width - 40,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   loginButtonText: {
//     fontSize: 18,
//     color: COLORS.white,
//     fontWeight: "bold",
//   },
//   termsText: {
//     fontSize: 12,
//     color: COLORS.darkGray,
//     textAlign: "left",
//     marginLeft: 10,
//     marginRight: 20,
//   },
//   checkboxContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   passwordCriteria: {
//     color: COLORS.darkGray,
//     fontSize: 14,
//     marginTop: 5,
//     flexDirection: "row",
//     alignItems: "center",
//   },
// });
