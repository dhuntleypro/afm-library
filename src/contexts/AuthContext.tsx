// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   useCallback,
// } from "react";
// import * as SecureStore from "expo-secure-store";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import uuid from "react-native-uuid";
// import { BASE_URL } from "../utils/api";
// import { CONSTANTS } from "../utils/constants";
// import { UserProps } from "../models/UserProps";
// import { createFetchClient } from "@/utils/createFetchClient";
// import { authApi } from "@/api/authorization";

// // Define the AuthState and Context types
// interface AuthState {
//   user: UserProps | null;
//   token: string | null;
//   authenticated: boolean;
// }

// interface AuthContextType {
//   authState: AuthState;
//   onRegister: (storeID: string, user: UserProps) => Promise<any>;
//   onLogin: (storeID: string, email: string, password: string) => Promise<any>;
//   onLogout: () => Promise<void>;
//   updateUserProfile: (updatedUser: Partial<UserProps>) => Promise<void>;
//   addToFavorites: (itemId: string) => Promise<void>;
//   removeFromFavorites: (itemId: string) => Promise<void>;
//   isFavorite: (itemId: string) => boolean;
// }

// // Define constants for SecureStore keys
// export const TOKEN_KEY = "your_token_key_here";
// const USER_KEY = "your_user_key_here";
// const AUTHENTICATED_KEY = "authenticated_key_here";

// // Create AuthContext
// export const AuthContext = createContext<AuthContextType | undefined>(
//   undefined
// );

// // Hook to use AuthContext
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// // Initialize the fetch client for auth API
// // const authApi = createFetchClient(BASE_URL, {
// //   store_id: CONSTANTS.store_id,
// //   tableName: ""

// // },
// // { 'Content-Type': 'application/json' });

// // AuthProvider component
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

//         if (token && userString && authenticated === "true") {
//           const user: UserProps = JSON.parse(userString);
//           setAuthState({ user, token, authenticated: true });
//           console.log(`token:::: ${token}`);
//         } else {
//           setAuthState({ user: null, token: null, authenticated: false });
//         }
//       } catch (error) {
//         console.error("Error loading user data:", error);
//         setAuthState({ user: null, token: null, authenticated: false });
//       }
//     };

//     loadUserData();
//   }, []);

//   // Register a new user
//   const onRegister = useCallback(
//     async (storeID: string, userData: UserProps): Promise<any> => {
//       try {
//         console.log("Registering user:", JSON.stringify(userData)); // Log the user data being sent as JSON

//         const result = await authApi.post("/register", userData, {
//           params: { store_id: storeID },
//         });

//         console.log("Registration API result:", result); // Log the response from the API
//         return result;
//       } catch (error: any) {
//         console.error("(41) Registration error:", error);
//         console.error(
//           "(4) Registration error response data:",
//           error.response?.data
//         );
//         throw new Error(
//           error.response?.data?.msg || "Registration failed. Please try again."
//         );
//       }
//     },
//     []
//   );

//   // User login function
//   // const onLogin = useCallback(
//   //   async (storeID: string, email: string, password: string): Promise<any> => {
//   //     try {
//   //       const result = await authApi.post(
//   //         "/login",
//   //         { email, password },
//   //         {
//   //           params: { store_id: storeID },
//   //         }
//   //       );

//   //       const { user, token } = result.data;
//   //       await SecureStore.setItemAsync(TOKEN_KEY, token);
//   //       await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
//   //       await SecureStore.setItemAsync(AUTHENTICATED_KEY, "true");

//   //       setAuthState({ user, token, authenticated: true });
//   //       return result.data;
//   //     } catch (error: any) {
//   //       console.error("(8) Login error:", error.message);
//   //       throw new Error(
//   //         error.response?.data?.msg || "Login failed. Please try again."
//   //       );
//   //     }
//   //   },
//   //   []
//   // );

//   // User login function
// // User login function
// const onLogin = useCallback(
//   async (storeID: string, email: string, password: string): Promise<any> => {
//     try {
//       // Make the API request to login
//       const result = await authApi.post(
//         "/login",
//         { email, password },
//         {
//           params: { store_id: storeID },
//         }
//       );

//       // Log the full API response for debugging
//       console.log("Full API response:", result);

//       // Check if the response contains the user and token
//       // const { user, token } = result?.data || {};

//       // Log user and token to see what values (if any) are being returned
//       console.log("User from API:", user);
//       console.log("Token from API:", token);

//       // Handle missing data
//       if (!user || !token) {
//         throw new Error("Invalid response: missing user or token.");
//       }

//       // Store token and user information securely
//       await SecureStore.setItemAsync(TOKEN_KEY, token);
//       await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
//       await SecureStore.setItemAsync(AUTHENTICATED_KEY, "true");

//       // Update authentication state
//       setAuthState({ user, token, authenticated: true });

//       return result.data;
//     } catch (error: any) {
//       // Log the error and the error message for better debugging
//       console.error("(8) Login error:", error.message);
//       console.error("Full error object:", error);

//       // Throw a more user-friendly error message
//       throw new Error(
//         error.response?.data?.msg || "Login failed. Please try again."
//       );
//     }
//   },
//   []
// );


//   // Logout function
//   const onLogout = useCallback(async (): Promise<void> => {
//     try {
//       console.log("Removing token from SecureStore...");
//       await SecureStore.deleteItemAsync(TOKEN_KEY);
//       console.log("Removing user from SecureStore...");
//       await SecureStore.deleteItemAsync(USER_KEY);
//       console.log("Removing authenticated status from SecureStore...");
//       await SecureStore.deleteItemAsync(AUTHENTICATED_KEY);
//       console.log("Removing carts from AsyncStorage...");
//       await AsyncStorage.removeItem("carts");

//       console.log("Successfully logged out.");
//       setAuthState({ user: null, token: null, authenticated: false });
//     } catch (error) {
//       console.error("Error logging out:", error);
//       throw new Error("Logout failed. Please try again.");
//     }
//   }, []);

//   // Update user profile
//   const updateUserProfile = useCallback(
//     async (updatedUser: Partial<UserProps>) => {
//       if (!authState.user) throw new Error("No user to update");

//       try {
//         const result = await authApi.put(
//           `/users/${authState.user.id}`,
//           updatedUser
//         );
//         const updatedUserData = { ...authState.user, ...updatedUser };

//         await SecureStore.setItemAsync(
//           USER_KEY,
//           JSON.stringify(updatedUserData)
//         );
//         setAuthState({ ...authState, user: updatedUserData });

//         console.log("User profile updated successfully:", updatedUserData);
//       } catch (error: any) {
//         console.error("Failed to update user profile:", error);
//         throw new Error(
//           error.response?.data?.msg || "Failed to update user profile."
//         );
//       }
//     },
//     [authState.user]
//   );

//   // Add item to favorites
//   const addToFavorites = useCallback(
//     async (itemId: string) => {
//       if (!authState.user) throw new Error("No user to update");

//       try {
//         const updatedFavorites = [
//           ...(authState.user.favoriteItems || []),
//           itemId,
//         ];
//         await updateUserProfile({ favoriteItems: updatedFavorites });
//       } catch (error) {
//         console.error("Failed to add to favorites:", error);
//         throw new Error("Failed to add to favorites.");
//       }
//     },
//     [authState.user, updateUserProfile]
//   );

//   // Remove item from favorites
//   const removeFromFavorites = useCallback(
//     async (itemId: string) => {
//       if (!authState.user) throw new Error("No user to update");

//       try {
//         const updatedFavorites = (authState.user.favoriteItems || []).filter(
//           (fav) => fav !== itemId
//         );
//         await updateUserProfile({ favoriteItems: updatedFavorites });
//       } catch (error) {
//         console.error("Failed to remove from favorites:", error);
//         throw new Error("Failed to remove from favorites.");
//       }
//     },
//     [authState.user, updateUserProfile]
//   );

//   // Check if item is favorite
//   const isFavorite = useCallback(
//     (itemId: string): boolean => {
//       return authState.user?.favoriteItems?.includes(itemId) || false;
//     },
//     [authState.user]
//   );

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
//         isFavorite,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
// import * as SecureStore from 'expo-secure-store';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import uuid from 'react-native-uuid';
// import { BASE_URL } from "../utils/api";
// import { CONSTANTS } from "../utils/constants";
// import { UserProps } from "../models/UserProps";
// import { createFetchClient } from "@/utils/createFetchClient";

// // Define the AuthState and Context types
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

// // Define constants for SecureStore keys
// export const TOKEN_KEY = 'your_token_key_here';
// const USER_KEY = 'your_user_key_here';
// const AUTHENTICATED_KEY = 'authenticated_key_here';

// // Create AuthContext
// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Hook to use AuthContext
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// // Initialize the fetch client for auth API
// const authApi = createFetchClient(BASE_URL, { store_id: CONSTANTS.store_id }, { 'Content-Type': 'application/json' });

// // AuthProvider component
// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [authState, setAuthState] = useState<AuthState>({
//     user: null,
//     token: null,
//     authenticated: false,
//   });

//   // Load user data from SecureStore on component mount
//   // useEffect(() => {
//   //   const loadUserData = async () => {
//   //     try {
//   //       const token = await SecureStore.getItemAsync(TOKEN_KEY);
//   //       const userString = await SecureStore.getItemAsync(USER_KEY);
//   //       const authenticated = await SecureStore.getItemAsync(AUTHENTICATED_KEY);

//   //       if (token && userString && authenticated === 'true') {
//   //         const user: UserProps = JSON.parse(userString);
//   //         setAuthState({ user, token, authenticated: true });
//   //         console.log(`token:::: ${token}`)
//   //       } else {
//   //         setAuthState({ user: null, token: null, authenticated: false });
//   //       }
//   //     } catch (error) {
//   //       console.error("Error loading user data:", error);
//   //       setAuthState({ user: null, token: null, authenticated: false });
//   //     }
//   //   };

//   //   loadUserData();
//   // }, []);

//   useEffect(() => {
//     const loadUserData = async () => {
//       try {
//         const token = await SecureStore.getItemAsync(TOKEN_KEY);
//         const userString = await SecureStore.getItemAsync(USER_KEY);
//         const authenticated = await SecureStore.getItemAsync(AUTHENTICATED_KEY);

//         if (token && userString && authenticated === 'true') {
//           const user: UserProps = JSON.parse(userString);
//           setAuthState({ user, token, authenticated: true });
//           console.log(`token:::: ${token}`);
//         } else {
//           setAuthState({ user: null, token: null, authenticated: false });
//         }
//       } catch (error) {
//         console.error("Error loading user data:", error);
//         setAuthState({ user: null, token: null, authenticated: false });
//       }
//     };

//     loadUserData();
//   }, []);

//   // Register a new user
//   const onRegister = useCallback(async (userData: UserProps): Promise<any> => {
//     userData.id = uuid.v4().toString();
//     try {
//       const result = await authApi.post('/register', userData, {
//         params: { store_id: CONSTANTS.store_id },
//       });
//       return result.data;
//     } catch (error: any) {
//       console.error("Registration error:", error);
//       throw new Error(error.response?.data?.msg || "Registration failed. Please try again.");
//     }
//   }, []);

//   // User login function
//   const onLogin = useCallback(async (email: string, password: string): Promise<any> => {
//     try {
//       const result = await authApi.post('/login', { email, password }, {
//         params: { store_id: CONSTANTS.store_id },
//       });

//       const { user, token } = result.data;
//       await SecureStore.setItemAsync(TOKEN_KEY, token);
//       await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
//       await SecureStore.setItemAsync(AUTHENTICATED_KEY, 'true');

//       setAuthState({ user, token, authenticated: true });
//       return result.data;
//     } catch (error: any) {
//       console.error("Login error:", error);
//       throw new Error(error.response?.data?.msg || "Login failed. Please try again.");
//     }
//   }, []);

//   // Logout function
//   const onLogout = useCallback(async (): Promise<void> => {
//     try {
//       console.log('Removing token from SecureStore...');
//       await SecureStore.deleteItemAsync(TOKEN_KEY);
//       console.log('Removing user from SecureStore...');
//       await SecureStore.deleteItemAsync(USER_KEY);
//       console.log('Removing authenticated status from SecureStore...');
//       await SecureStore.deleteItemAsync(AUTHENTICATED_KEY);
//       console.log('Removing carts from AsyncStorage...');
//       await AsyncStorage.removeItem("carts");

//       console.log("Successfully logged out.");
//       setAuthState({ user: null, token: null, authenticated: false });
//     } catch (error) {
//       console.error("Error logging out:", error);
//       throw new Error("Logout failed. Please try again.");
//     }
//   }, []);

//   // Update user profile
//   const updateUserProfile = useCallback(async (updatedUser: Partial<UserProps>) => {
//     if (!authState.user) throw new Error("No user to update");

//     try {
//       const result = await authApi.put(`/users/${authState.user.id}`, updatedUser);
//       const updatedUserData = { ...authState.user, ...updatedUser };

//       await SecureStore.setItemAsync(USER_KEY, JSON.stringify(updatedUserData));
//       setAuthState({ ...authState, user: updatedUserData });

//       console.log("User profile updated successfully:", updatedUserData);
//     } catch (error: any) {
//       console.error("Failed to update user profile:", error);
//       throw new Error(error.response?.data?.msg || "Failed to update user profile.");
//     }
//   }, [authState.user]);

//   // Add item to favorites
//   const addToFavorites = useCallback(async (itemId: string) => {
//     if (!authState.user) throw new Error("No user to update");

//     try {
//       const updatedFavorites = [...(authState.user.favoriteItems || []), itemId];
//       await updateUserProfile({ favoriteItems: updatedFavorites });
//     } catch (error) {
//       console.error("Failed to add to favorites:", error);
//       throw new Error("Failed to add to favorites.");
//     }
//   }, [authState.user, updateUserProfile]);

//   // Remove item from favorites
//   const removeFromFavorites = useCallback(async (itemId: string) => {
//     if (!authState.user) throw new Error("No user to update");

//     try {
//       const updatedFavorites = (authState.user.favoriteItems || []).filter(fav => fav !== itemId);
//       await updateUserProfile({ favoriteItems: updatedFavorites });
//     } catch (error) {
//       console.error("Failed to remove from favorites:", error);
//       throw new Error("Failed to remove from favorites.");
//     }
//   }, [authState.user, updateUserProfile]);

//   // Check if item is favorite
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
//         isFavorite,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

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
  onRegister: (storeID: string, user: UserProps) => Promise<any>;
  onLogin: (storeID: string, email: string, password: string) => Promise<any>;
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
  // const onRegister = useCallback(async (storeID: string, userData: UserProps): Promise<any> => {
  //   userData.id = uuid.v4().toString();
  //   try {
  //     const result = await authApi.post('/register', userData, {
  //       params: { store_id: storeID },
  //     });
  //     return result;
  //   } catch (error: any) {
  //     console.error("Registration error:", error);
  //     throw new Error(error.response?.data?.msg || "Registration failed. Please try again.");
  //   }
  // }, []);

    const onRegister = useCallback(
    async (storeID: string, userData: UserProps): Promise<any> => {
      try {
        console.log("Registering user:", JSON.stringify(userData)); // Log the user data being sent as JSON

        const result = await authApi.post("/register", userData, {
          params: { store_id: storeID },
        });

        console.log("Registration API result:", result); // Log the response from the API
        return result;
      } catch (error: any) {
        console.error("(41) Registration error:", error);
        console.error(
          "(4) Registration error response data:",
          error.response?.data
        );
        throw new Error(
          error.response?.data?.msg || "Registration failed. Please try again."
        );
      }
    },
    []
  );

  // User login function
  const onLogin = useCallback(async (storeID: string, email: string, password: string): Promise<any> => {
    try {
      const result = await authApi.post('/login', { email, password }, {
        params: { store_id: storeID },
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
