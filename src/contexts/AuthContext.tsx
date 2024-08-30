import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';
import { BASE_URL } from "../utils/api";
import { CONSTANTS } from "../utils/constants";
import { UserProps } from "../models/UserProps";

interface AuthState {
  user: UserProps | null;
  token: string | null;
  authenticated: boolean;
}

interface AuthContextType {
  authState: AuthState;
  onRegister: (user: UserProps) => Promise<any>;
  onLogin: (email: string, password: string) => Promise<any>;
  onLogout: () => Promise<void>;
  updateUserProfile: (updatedUser: Partial<UserProps>) => Promise<void>;
  addToFavorites: (itemId: string) => Promise<void>;
  removeFromFavorites: (itemId: string) => Promise<void>;
  isFavorite: (itemId: string) => boolean;
}

export const TOKEN_KEY = 'your_token_key_here';
const USER_KEY = 'your_user_key_here';
const AUTHENTICATED_KEY = 'authenticated_key_here';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    authenticated: false,
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        const userString = await SecureStore.getItemAsync(USER_KEY);
        const authenticated = await SecureStore.getItemAsync(AUTHENTICATED_KEY);

        if (token && userString && authenticated === 'true') {
          const user = JSON.parse(userString);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setAuthState({
            user,
            token,
            authenticated: true,
          });
        } else {
          setAuthState({
            user: null,
            token: null,
            authenticated: false,
          });
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        setAuthState({
          user: null,
          token: null,
          authenticated: false,
        });
      }
    };

    loadUserData();
  }, []);

  const onRegister = async (userData: UserProps): Promise<any> => {
    userData.id = uuid.v4().toString();

    try {
      const result = await axios.post(
        `${BASE_URL}/register?store_id=${CONSTANTS.store_id}&tableName=prof-website-user-table`,
        userData
      );
      return result;
    } catch (error: any) {
      console.error("Registration error:", error.data);
      throw new Error(
        error.response?.data?.msg || "Registration failed. Please try again."
      );
    }
  };

  const onLogin = async (email: string, password: string): Promise<any> => {
    try {
      const result = await axios.post(
        `${BASE_URL}/login?store_id=${CONSTANTS.store_id}&tableName=prof-website-user-table`,
        { email, password }
      );

      const { user, token } = result.data;
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
      await SecureStore.setItemAsync(AUTHENTICATED_KEY, 'true');

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setAuthState({
        user,
        token,
        authenticated: true,
      });

      return result;
    } catch (error: any) {
      console.error("Login error:", error);
      throw new Error(
        error.response?.data?.msg || "Login failed. Please try again."
      );
    }
  };

  const onLogout = async (): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);
      await SecureStore.deleteItemAsync(AUTHENTICATED_KEY);
      axios.defaults.headers.common['Authorization'] = '';
      setAuthState({
        user: null,
        token: null,
        authenticated: false,
      });
      await AsyncStorage.removeItem("carts");
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Error logging out:", error);
      throw new Error("Logout failed. Please try again.");
    }
  };

  const updateUserProfile = async (updatedUser: Partial<UserProps>) => {
    try {
      if (!authState.user) throw new Error("No user to update");

      const result = await axios.put(
        `${BASE_URL}/users/${authState.user.id}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );

      const updatedUserData = { ...(authState.user as UserProps), ...updatedUser };
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(updatedUserData));

      setAuthState({
        ...authState,
        user: updatedUserData,
      });

      console.log("User profile updated successfully:", updatedUserData);
    } catch (error: any) {
      console.error("Failed to update user profile:", error);
      throw new Error(
        error.response?.data?.msg || "Failed to update user profile."
      );
    }
  };

  // Favorites Management
  const addToFavorites = async (itemId: string) => {
    try {
      if (!authState.user) throw new Error("No user to update");
      
      const updatedFavorites = [...(authState.user.favoriteItems || []), itemId];
      await updateUserProfile({ favoriteItems: updatedFavorites });
    } catch (error) {
      console.error("Failed to add to favorites:", error);
      throw new Error("Failed to add to favorites.");
    }
  };

  const removeFromFavorites = async (itemId: string) => {
    try {
      if (!authState.user) throw new Error("No user to update");
      
      const updatedFavorites = (authState.user.favoriteItems || []).filter(fav => fav !== itemId);
      await updateUserProfile({ favoriteItems: updatedFavorites });
    } catch (error) {
      console.error("Failed to remove from favorites:", error);
      throw new Error("Failed to remove from favorites.");
    }
  };

  const isFavorite = (itemId: string): boolean => {
    return authState.user?.favoriteItems?.includes(itemId) || false;
  };

  return (
    <AuthContext.Provider
      value={{ 
        authState, 
        onRegister, 
        onLogin, 
        onLogout, 
        updateUserProfile, 
        addToFavorites, 
        removeFromFavorites, 
        isFavorite 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};








// Working...
// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import * as SecureStore from 'expo-secure-store';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import uuid from 'react-native-uuid';
// import { BASE_URL } from "../utils/api";
// import { CONSTANTS } from "../utils/constants";
// import { UserProps } from "../models/UserProps";

// interface AuthState {
//   user: UserProps | null;
//   token: string | null;
//   authenticated: boolean;
// }

// interface AuthContextType {
//   authState: AuthState;
//   onRegister: (user: UserProps) => Promise<any>;
//   onLogin: (email: string, password: string) => Promise<any>;
//   onLogout: () => Promise<void>;
//   updateUserProfile: (updatedUser: Partial<UserProps>) => Promise<void>;
// }

// export const TOKEN_KEY = 'your_token_key_here';
// const USER_KEY = 'your_user_key_here';
// const AUTHENTICATED_KEY = 'authenticated_key_here';

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [authState, setAuthState] = useState<AuthState>({
//     user: null,
//     token: null,
//     authenticated: false,
//   });

//   useEffect(() => {
//     const loadUserData = async () => {
//       try {
//         const token = await SecureStore.getItemAsync(TOKEN_KEY);
//         const userString = await SecureStore.getItemAsync(USER_KEY);
//         const authenticated = await SecureStore.getItemAsync(AUTHENTICATED_KEY);

//         if (token && userString && authenticated === 'true') {
//           const user = JSON.parse(userString);
//           axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//           setAuthState({
//             user,
//             token,
//             authenticated: true,
//           });
//         } else {
//           setAuthState({
//             user: null,
//             token: null,
//             authenticated: false,
//           });
//         }
//       } catch (error) {
//         console.error("Error loading user data:", error);
//         setAuthState({
//           user: null,
//           token: null,
//           authenticated: false,
//         });
//       }
//     };

//     loadUserData();
//   }, []);

//   const onRegister = async (userData: UserProps): Promise<any> => {
//     userData.id = uuid.v4().toString();

//     try {
//       const result = await axios.post(
//         `${BASE_URL}/register?store_id=${CONSTANTS.store_id}&tableName=prof-website-user-table`,
//         userData
//       );
//       return result;
//     } catch (error: any) {
//       console.error("Registration error:", error.data);
//       throw new Error(
//         error.response?.data?.msg || "Registration failed. Please try again."
//       );
//     }
//   };

//   const onLogin = async (email: string, password: string): Promise<any> => {
//     try {
//       const result = await axios.post(
//         `${BASE_URL}/login?store_id=${CONSTANTS.store_id}&tableName=prof-website-user-table`,
//         { email, password }
//       );

//       const { user, token } = result.data;
//       await SecureStore.setItemAsync(TOKEN_KEY, token);
//       await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
//       await SecureStore.setItemAsync(AUTHENTICATED_KEY, 'true');

//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       setAuthState({
//         user,
//         token,
//         authenticated: true,
//       });

//       return result;
//     } catch (error: any) {
//       console.error("Login error:", error);
//       throw new Error(
//         error.response?.data?.msg || "Login failed. Please try again."
//       );
//     }
//   };

//   const onLogout = async (): Promise<void> => {
//     try {
//       await SecureStore.deleteItemAsync(TOKEN_KEY);
//       await SecureStore.deleteItemAsync(USER_KEY);
//       await SecureStore.deleteItemAsync(AUTHENTICATED_KEY);
//       axios.defaults.headers.common['Authorization'] = '';
//       setAuthState({
//         user: null,
//         token: null,
//         authenticated: false,
//       });
//       await AsyncStorage.removeItem("carts");
//       console.log("User logged out successfully.");
//     } catch (error) {
//       console.error("Error logging out:", error);
//       throw new Error("Logout failed. Please try again.");
//     }
//   };

//   const updateUserProfile = async (updatedUser: Partial<UserProps>) => {
//     try {
//       if (!authState.user) throw new Error("No user to update");

//       const result = await axios.put(
//         `${BASE_URL}/users/${authState.user.id}`,
//         updatedUser,
//         {
//           headers: {
//             Authorization: `Bearer ${authState.token}`,
//           },
//         }
//       );

//       const updatedUserData = { ...(authState.user as UserProps), ...updatedUser };
//       await SecureStore.setItemAsync(USER_KEY, JSON.stringify(updatedUserData));

//       setAuthState({
//         ...authState,
//         user: updatedUserData,
//       });

//       console.log("User profile updated successfully:", updatedUserData);
//     } catch (error: any) {
//       console.error("Failed to update user profile:", error);
//       throw new Error(
//         error.response?.data?.msg || "Failed to update user profile."
//       );
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{ authState, onRegister, onLogin, onLogout, updateUserProfile }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
