
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import {AsyncStorage} from "react-native";
import uuid from 'react-native-uuid';
import { BASE_URL } from "../utils/api";
import { CONSTANTS } from "../utils/constants";
import { UserProps } from "../models/UserProps";
import { createFetchClient } from "@/utils/createFetchClient";

// Define the AuthState and Context types
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

// Define constants for SecureStore keys
export const TOKEN_KEY = 'your_token_key_here';
const USER_KEY = 'your_user_key_here';
const AUTHENTICATED_KEY = 'authenticated_key_here';

// Create AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Initialize the fetch client for auth API
const authApi = createFetchClient(
  BASE_URL,
  { tableName: 'prof-website-user-table', showFilteredItems: 'true' },
  { 'Content-Type': 'application/json' }
);

// AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    authenticated: false,
  });

  // Load user data from SecureStore on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        const userString = await SecureStore.getItemAsync(USER_KEY);
        const authenticated = await SecureStore.getItemAsync(AUTHENTICATED_KEY);

        if (token && userString && authenticated === 'true') {
          const user = JSON.parse(userString);
          setAuthState({ user, token, authenticated: true });
        } else {
          setAuthState({ user: null, token: null, authenticated: false });
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        setAuthState({ user: null, token: null, authenticated: false });
      }
    };

    loadUserData();
  }, []);

  // Register a new user
  const onRegister = useCallback(async (userData: UserProps): Promise<any> => {
    userData.id = uuid.v4().toString();
    try {
      const result = await authApi.post('/register', userData, {
        params: { store_id: CONSTANTS.store_id },
      });
      return result;
    } catch (error: any) {
      console.error("Registration error:", error);
      throw new Error(error.response?.data?.msg || "Registration failed. Please try again.");
    }
  }, []);

  // User login function
  const onLogin = useCallback(async (email: string, password: string): Promise<any> => {
    try {
      const result = await authApi.post('/login', { email, password }, {
        params: { store_id: CONSTANTS.store_id },
      });

      const { user, token } = result;
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
      await SecureStore.setItemAsync(AUTHENTICATED_KEY, 'true');

      setAuthState({ user, token, authenticated: true });
      return result;
    } catch (error: any) {
      console.error("Login error:", error);
      throw new Error(error.response?.data?.msg || "Login failed. Please try again.");
    }
  }, []);

  // Logout function
  const onLogout = useCallback(async (): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);
      await SecureStore.deleteItemAsync(AUTHENTICATED_KEY);
      setAuthState({ user: null, token: null, authenticated: false });
      await AsyncStorage.removeItem("carts");
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Error logging out:", error);
      throw new Error("Logout failed. Please try again.");
    }
  }, []);

  // Update user profile
  const updateUserProfile = useCallback(async (updatedUser: Partial<UserProps>) => {
    if (!authState.user) throw new Error("No user to update");

    try {
      const result = await authApi.put(`/users/${authState.user.id}`, updatedUser);
      const updatedUserData = { ...authState.user, ...updatedUser };

      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(updatedUserData));
      setAuthState({ ...authState, user: updatedUserData });

      console.log("User profile updated successfully:", updatedUserData);
    } catch (error: any) {
      console.error("Failed to update user profile:", error);
      throw new Error(error.response?.data?.msg || "Failed to update user profile.");
    }
  }, [authState.user]);

  // Add item to favorites
  const addToFavorites = useCallback(async (itemId: string) => {
    if (!authState.user) throw new Error("No user to update");

    try {
      const updatedFavorites = [...(authState.user.favoriteItems || []), itemId];
      await updateUserProfile({ favoriteItems: updatedFavorites });
    } catch (error) {
      console.error("Failed to add to favorites:", error);
      throw new Error("Failed to add to favorites.");
    }
  }, [authState.user, updateUserProfile]);

  // Remove item from favorites
  const removeFromFavorites = useCallback(async (itemId: string) => {
    if (!authState.user) throw new Error("No user to update");

    try {
      const updatedFavorites = (authState.user.favoriteItems || []).filter(fav => fav !== itemId);
      await updateUserProfile({ favoriteItems: updatedFavorites });
    } catch (error) {
      console.error("Failed to remove from favorites:", error);
      throw new Error("Failed to remove from favorites.");
    }
  }, [authState.user, updateUserProfile]);

  // Check if item is favorite
  const isFavorite = useCallback((itemId: string): boolean => {
    return authState.user?.favoriteItems?.includes(itemId) || false;
  }, [authState.user]);

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
        isFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};















// import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
// import * as SecureStore from 'expo-secure-store';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import uuid from 'react-native-uuid';
// import { BASE_URL } from "../utils/api";
// import { CONSTANTS } from "../utils/constants";
// import { UserProps } from "../models/UserProps";
// import {createFetchClient} from "@/utils/createFetchClient";

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
//   addToFavorites: (itemId: string) => Promise<void>;
//   removeFromFavorites: (itemId: string) => Promise<void>;
//   isFavorite: (itemId: string) => boolean;
// }

// export const TOKEN_KEY = 'your_token_key_here';
// const USER_KEY = 'your_user_key_here';
// const AUTHENTICATED_KEY = 'authenticated_key_here';

// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// // Create the fetch client instance
// const authApi = createFetchClient(
//   BASE_URL,
//   {
//     tableName: 'prof-website-user-table',
//     showFilteredItems: 'true',
//   },
//   {
//     'Content-Type': 'application/json',
//   }
// );

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
//           console.log("Token and user data loaded:", { token, user });

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

//   const onRegister = useCallback(async (userData: UserProps): Promise<any> => {
//     userData.id = uuid.v4();

//     try {
//       const result = await authApi.post(
//         '/register',
//         userData,
//         {
//           params: { store_id: CONSTANTS.store_id },
//         }
//       );
//       return result;
//     } catch (error: any) {
//       console.error("Registration error:", error.data);
//       throw new Error(error.response?.data?.msg || "Registration failed. Please try again.");
//     }
//   }, []);

//   const onLogin = useCallback(async (email: string, password: string): Promise<any> => {
//     try {
//       const result = await authApi.post(
//         '/login',
//         { email, password },
//         {
//           params: { store_id: CONSTANTS.store_id },
//         }
//       );

//       const { user, token } = result;
//       await SecureStore.setItemAsync(TOKEN_KEY, token);
//       await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
//       await SecureStore.setItemAsync(AUTHENTICATED_KEY, 'true');

//       setAuthState({
//         user,
//         token,
//         authenticated: true,
//       });

//       return result;
//     } catch (error: any) {
//       console.error("Login error:", error);
//       throw new Error(error.response?.data?.msg || "Login failed. Please try again.");
//     }
//   }, []);

//   const onLogout = useCallback(async (): Promise<void> => {
//     try {
//       await SecureStore.deleteItemAsync(TOKEN_KEY);
//       await SecureStore.deleteItemAsync(USER_KEY);
//       await SecureStore.deleteItemAsync(AUTHENTICATED_KEY);

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
//   }, []);

//   const updateUserProfile = useCallback(async (updatedUser: Partial<UserProps>) => {
//     try {
//       if (!authState.user) throw new Error("No user to update");

//       const result = await authApi.put(`/users/${authState.user.id}`, updatedUser);

//       const updatedUserData = { ...(authState.user as UserProps), ...updatedUser };
//       await SecureStore.setItemAsync(USER_KEY, JSON.stringify(updatedUserData));

//       setAuthState({
//         ...authState,
//         user: updatedUserData,
//       });

//       console.log("User profile updated successfully:", updatedUserData);
//     } catch (error: any) {
//       console.error("Failed to update user profile:", error);
//       throw new Error(error.response?.data?.msg || "Failed to update user profile.");
//     }
//   }, [authState.user, authState.token]);

//   const addToFavorites = useCallback(async (itemId: string) => {
//     try {
//       if (!authState.user) throw new Error("No user to update");

//       const updatedFavorites = [...(authState.user.favoriteItems || []), itemId];
//       await updateUserProfile({ favoriteItems: updatedFavorites });
//     } catch (error) {
//       console.error("Failed to add to favorites:", error);
//       throw new Error("Failed to add to favorites.");
//     }
//   }, [authState.user, updateUserProfile]);

//   const removeFromFavorites = useCallback(async (itemId: string) => {
//     try {
//       if (!authState.user) throw new Error("No user to update");

//       const updatedFavorites = (authState.user.favoriteItems || []).filter(fav => fav !== itemId);
//       await updateUserProfile({ favoriteItems: updatedFavorites });
//     } catch (error) {
//       console.error("Failed to remove from favorites:", error);
//       throw new Error("Failed to remove from favorites.");
//     }
//   }, [authState.user, updateUserProfile]);

//   const isFavorite = useCallback((itemId: string): boolean => {
//     return authState.user?.favoriteItems?.includes(itemId) || false;
//   }, [authState.user]);

//   return (
//     <AuthContext.Provider
//       value={{ 
//         authState, 
//         onRegister, 
//         onLogin, 
//         onLogout, 
//         updateUserProfile, 
//         addToFavorites, 
//         removeFromFavorites, 
//         isFavorite 
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

