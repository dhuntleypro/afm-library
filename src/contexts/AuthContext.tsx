import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProps } from "../models/UserProps";
import { authApi, deleteUserApi } from "@/api/authentication";
import { getAuthToken } from "@/utils/getAuthToken";

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
  // updateUserItems: (updates: Partial<UserProps>) => Promise<void>;
  updateSingleUserItem: (
    updateKey: keyof UserProps,
    updateValue: any
  ) => Promise<void>;
  addToFavorites: (itemId: string) => Promise<void>;
  removeFromFavorites: (itemId: string) => Promise<void>;
  isFavorite: (itemId: string) => boolean;
  deleteUser: (email: string) => Promise<void>;  // Add this line

}

// Define constants for SecureStore keys
export const TOKEN_KEY = "your_token_key_here";
const USER_KEY = "your_user_key_here";
const AUTHENTICATED_KEY = "authenticated_key_here";

// Create AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Hook to use AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    authenticated: false,
  });

  const [loading, setLoading] = useState(true);

  // Load user data from SecureStore on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        const userString = await SecureStore.getItemAsync(USER_KEY);
        const authenticated = await SecureStore.getItemAsync(AUTHENTICATED_KEY);

        if (token && userString && authenticated === "true") {
          const user = JSON.parse(userString);
          setAuthState({ user, token, authenticated: true });
        } else {
          setAuthState({ user: null, token: null, authenticated: false });
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        setAuthState({ user: null, token: null, authenticated: false });
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Register function
  const onRegister = useCallback(
    async (storeID: string, userData: UserProps): Promise<any> => {
      try {
        const result = await authApi.post("/register", userData, {
          params: { store_id: storeID },
        });
        return result;
      } catch (error: any) {
        console.error("Registration error:", error);
        throw new Error(
          error.response?.data?.msg || "Registration failed. Please try again."
        );
      }
    },
    []
  );

  // Login function
  const onLogin = useCallback(
    async (storeID: string, email: string, password: string): Promise<any> => {
      try {
        const result = await authApi.post(
          "/login",
          { email, password },
          {
            params: { store_id: storeID },
          }
        );

        const { user, token } = result;
        await SecureStore.setItemAsync(TOKEN_KEY, token);
        await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
        await SecureStore.setItemAsync(AUTHENTICATED_KEY, "true");

        setAuthState({ user, token, authenticated: true });
        return result;
      } catch (error: any) {
        console.error("Login error:", error);
        throw new Error(
          error.response?.data?.msg || "Login failed. Please try again."
        );
      }
    },
    []
  );

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

  

  const updateSingleUserItem = useCallback(
    async (updateKey: keyof UserProps, updateValue: any) => {
      if (!authState.user) throw new Error("No user to update");
    
      try {
        const body = {
          email: authState?.user.email ?? "",
          tableName: "prof-website-user-table",
          updateKey: updateKey as string,
          updateValue: updateValue,
        };
  
        const token = await getAuthToken();
        console.log(`token: ${token}`);
        
        const result = await authApi.patch(`/user`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        console.log("User profile updated successfully:", body);
    
        // Dynamically update the key in authState.user
        const updatedUser = {
          ...authState.user,
          [updateKey]: updateValue, // Dynamic key update
        };
    
        await SecureStore.setItemAsync(USER_KEY, JSON.stringify(updatedUser));
        setAuthState((prevState) => ({ ...prevState, user: updatedUser }));
      } catch (error: any) {
        console.error("Failed to update user profile:", error);
        throw new Error(
          error.response?.data?.msg || "Failed to update user profile."
        );
      }
    },
    [authState.user]
  );
  

  // Add item to favorites
  const addToFavorites = useCallback(
    async (itemId: string) => {
      if (!authState.user) throw new Error("No user to update");

      try {
        const updatedFavorites = [
          ...(authState.user.favoriteItems || []),
          itemId,
        ];

        // Update the user’s favoriteItems on the server
        await updateSingleUserItem("favoriteItems", updatedFavorites);

        // Update the local state and SecureStore
        const updatedUser = {
          ...authState.user,
          favoriteItems: updatedFavorites,
        };
        await SecureStore.setItemAsync(USER_KEY, JSON.stringify(updatedUser));
        setAuthState((prevState) => ({ ...prevState, user: updatedUser }));

        console.log("Added item to favorites:", itemId);
      } catch (error) {
        console.error("Failed to add to favorites:", error);
        throw new Error("Failed to add to favorites.");
      }
    },
    [authState.user, updateSingleUserItem]
  );

  // Remove item from favorites
  const removeFromFavorites = useCallback(
    async (itemId: string) => {
      if (!authState.user) throw new Error("No user to update");

      try {
        const updatedFavorites = (authState.user.favoriteItems || []).filter(
          (fav) => fav !== itemId
        );

        // Update the user’s favoriteItems on the server
        await updateSingleUserItem("favoriteItems", updatedFavorites);

        // Update the local state and SecureStore
        const updatedUser = {
          ...authState.user,
          favoriteItems: updatedFavorites,
        };
        await SecureStore.setItemAsync(USER_KEY, JSON.stringify(updatedUser));
        setAuthState((prevState) => ({ ...prevState, user: updatedUser }));

        console.log("Removed item from favorites:", itemId);
      } catch (error) {
        console.error("Failed to remove from favorites:", error);
        throw new Error("Failed to remove from favorites.");
      }
    },
    [authState.user, updateSingleUserItem]
  );

  // Check if item is favorite
  const isFavorite = useCallback(
    (itemId: string): boolean => {
      return authState.user?.favoriteItems?.includes(itemId) || false;
    },
    [authState.user]
  );

  const deleteUser = useCallback(async (email: string) => {
    if (!authState.user) console.log("No user to delete") //  throw new Error("No user to delete");
  
    try {
      // 
      await deleteUserApi({ email });
      
      // Remove the user from local state and storage
      await SecureStore.deleteItemAsync(USER_KEY);
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(AUTHENTICATED_KEY);
      
      setAuthState({ user: null, token: null, authenticated: false });
      
      console.log("User deleted successfully:", email);
    } catch (error) {
      console.error("Failed to delete user:", error);
      throw new Error("Failed to delete user.");
    }
  }, [authState.user]);
  

  if (loading) {
    return null; // Or show a loading spinner
  }

  return (
    <AuthContext.Provider
      value={{
        authState,
        onRegister,
        onLogin,
        onLogout,
        // updateUserItems,
        updateSingleUserItem,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        deleteUser,  // Add deleteUser to the context

      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// before mutiple updates
// import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
// import * as SecureStore from 'expo-secure-store';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { UserProps } from "../models/UserProps";
// import { authApi } from "@/api/Authentication";
// import { getAuthToken } from "@/utils/getAuthToken";

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
//   updateUserItems: (updateKey: keyof UserProps, updateValue: any) => Promise<void>;
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

// // AuthProvider component
// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [authState, setAuthState] = useState<AuthState>({
//     user: null,
//     token: null,
//     authenticated: false,
//   });

//   const [loading, setLoading] = useState(true);

//   // Load user data from SecureStore on component mount
//   useEffect(() => {
//     const loadUserData = async () => {
//       try {
//         setLoading(true);
//         const token = await SecureStore.getItemAsync(TOKEN_KEY);
//         const userString = await SecureStore.getItemAsync(USER_KEY);
//         const authenticated = await SecureStore.getItemAsync(AUTHENTICATED_KEY);

//         if (token && userString && authenticated === 'true') {
//           const user = JSON.parse(userString);
//           setAuthState({ user, token, authenticated: true });
//         } else {
//           setAuthState({ user: null, token: null, authenticated: false });
//         }
//       } catch (error) {
//         console.error("Error loading user data:", error);
//         setAuthState({ user: null, token: null, authenticated: false });
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadUserData();
//   }, []);

//   // Register function
//   const onRegister = useCallback(async (storeID: string, userData: UserProps): Promise<any> => {
//     try {
//       const result = await authApi.post("/register", userData, {
//         params: { store_id: storeID },
//       });
//       return result;
//     } catch (error: any) {
//       console.error("Registration error:", error);
//       throw new Error(error.response?.data?.msg || "Registration failed. Please try again.");
//     }
//   }, []);

//   // Login function
//   const onLogin = useCallback(async (storeID: string, email: string, password: string): Promise<any> => {
//     try {
//       const result = await authApi.post('/login', { email, password }, {
//         params: { store_id: storeID },
//       });

//       const { user, token } = result;
//       await SecureStore.setItemAsync(TOKEN_KEY, token);
//       await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
//       await SecureStore.setItemAsync(AUTHENTICATED_KEY, 'true');

//       setAuthState({ user, token, authenticated: true });
//       return result;
//     } catch (error: any) {
//       console.error("Login error:", error);
//       throw new Error(error.response?.data?.msg || "Login failed. Please try again.");
//     }
//   }, []);

//   // Logout function
//   const onLogout = useCallback(async (): Promise<void> => {
//     try {
//       await SecureStore.deleteItemAsync(TOKEN_KEY);
//       await SecureStore.deleteItemAsync(USER_KEY);
//       await SecureStore.deleteItemAsync(AUTHENTICATED_KEY);
//       setAuthState({ user: null, token: null, authenticated: false });
//       await AsyncStorage.removeItem("carts");
//       console.log("User logged out successfully.");
//     } catch (error) {
//       console.error("Error logging out:", error);
//       throw new Error("Logout failed. Please try again.");
//     }
//   }, []);

//   // // Update user profile function - ( works for single updates)
//   // const updateUserItems = useCallback(
//   //   async (updateKey: keyof UserProps, updateValue: any) => {
//   //     if (!authState.user) throw new Error("No user to update");

//   //     try {
//   //       const body = {
//   //         email: authState.user.email,
//   //         tableName: "prof-website-user-table",
//   //         updateKey: updateKey as string,
//   //         updateValue: updateValue,
//   //       };

//   //       const token = await getAuthToken();

//   //       const result = await authApi.put(`/user?id=${authState.user.id}`, body, {
//   //         headers: {
//   //           Authentication: `${token}`,
//   //         },
//   //       });

//   //       const updatedUserData = { ...authState.user, [updateKey]: updateValue };

//   //       await SecureStore.setItemAsync(USER_KEY, JSON.stringify(updatedUserData));

//   //       setAuthState({ ...authState, user: updatedUserData });

//   //       console.log("User profile updated successfully:", updatedUserData);
//   //     } catch (error: any) {
//   //       console.error("Failed to update user profile:", error);
//   //       throw new Error(error.response?.data?.msg || "Failed to update user profile.");
//   //     }
//   //   },
//   //   [authState.user]
//   // );

//   // Update user profile function
// const updateUserItems = useCallback(
//   async (updates: Partial<UserProps>) => {
//     if (!authState.user) throw new Error("No user to update");

//     try {
//       const body = {
//         email: authState.user.email,
//         tableName: "prof-website-user-table",
//         ...updates, // Spread the updates object to include all updated fields
//       };

//       const token = await getAuthToken();

//       const result = await authApi.put(`/user?id=${authState.user.id}`, body, {
//         headers: {
//           Authentication: `${token}`,
//         },
//       });

//       // Merge the updated fields into the existing user data
//       const updatedUserData = { ...authState.user, ...updates };

//       // Store the updated user data in SecureStore
//       await SecureStore.setItemAsync(USER_KEY, JSON.stringify(updatedUserData));

//       // Update the auth state with the new user data
//       setAuthState({ ...authState, user: updatedUserData });

//       console.log("User profile updated successfully:", updatedUserData);
//     } catch (error: any) {
//       console.error("Failed to update user profile:", error);
//       throw new Error(error.response?.data?.msg || "Failed to update user profile.");
//     }
//   },
//   [authState.user]
// );

//   // Add item to favorites
//   const addToFavorites = useCallback(
//     async (itemId: string) => {
//       if (!authState.user) throw new Error("No user to update");

//       try {
//         const updatedFavorites = [...(authState.user.favoriteItems || []), itemId];
//         await updateUserItems("favoriteItems", updatedFavorites);
//         console.log("Added item to favorites:", itemId);
//       } catch (error) {
//         console.error("Failed to add to favorites:", error);
//         throw new Error("Failed to add to favorites.");
//       }
//     },
//     [authState.user, updateUserItems]
//   );

//   // Remove item from favorites
//   const removeFromFavorites = useCallback(async (itemId: string) => {
//     if (!authState.user) throw new Error("No user to update");

//     try {
//       const updatedFavorites = (authState.user.favoriteItems || []).filter(fav => fav !== itemId);
//       await updateUserItems("favoriteItems", updatedFavorites);
//     } catch (error) {
//       console.error("Failed to remove from favorites:", error);
//       throw new Error("Failed to remove from favorites.");
//     }
//   }, [authState.user, updateUserItems]);

//   // Check if item is favorite
//   const isFavorite = useCallback((itemId: string): boolean => {
//     return authState.user?.favoriteItems?.includes(itemId) || false;
//   }, [authState.user]);

//   if (loading) {
//     return null; // Or show a loading spinner
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         authState,
//         onRegister,
//         onLogin,
//         onLogout,
//         updateUserItems,
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
// // import {AsyncStorage} from "react-native";
// import uuid from 'react-native-uuid';
// import { BASE_URL } from "../utils/api";
// import { CONSTANTS } from "../utils/constants";
// import { UserProps } from "../models/UserProps";
// import { createFetchClient } from "@/utils/createFetchClient";
// import { authApi } from "@/api/Authentication";

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
//   updateUserItems: (updatedUser: Partial<UserProps>) => Promise<void>;
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
// // const authApi = createFetchClient(
// //   BASE_URL,
// //   { tableName: 'prof-website-user-table', showFilteredItems: 'true' },
// //   { 'Content-Type': 'application/json' }
// // );

// // AuthProvider component
// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [authState, setAuthState] = useState<AuthState>({
//     user: null,
//     token: null,
//     authenticated: false,
//   });

//   // Load user data from SecureStore on component mount
//   useEffect(() => {
//     const loadUserData = async () => {
//       try {
//         const token = await SecureStore.getItemAsync(TOKEN_KEY);
//         const userString = await SecureStore.getItemAsync(USER_KEY);
//         const authenticated = await SecureStore.getItemAsync(AUTHENTICATED_KEY);

//         if (token && userString && authenticated === 'true') {
//           const user = JSON.parse(userString);
//           setAuthState({ user, token, authenticated: true });
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

//     const onRegister = useCallback(
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
//   const onLogin = useCallback(async (storeID: string, email: string, password: string): Promise<any> => {
//     try {
//       const result = await authApi.post('/login', { email, password }, {
//         params: { store_id: storeID },
//       });

//       const { user, token } = result;
//       await SecureStore.setItemAsync(TOKEN_KEY, token);
//       await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
//       await SecureStore.setItemAsync(AUTHENTICATED_KEY, 'true');

//       setAuthState({ user, token, authenticated: true });
//       return result;
//     } catch (error: any) {
//       console.error("Login error:", error);
//       throw new Error(error.response?.data?.msg || "Login failed. Please try again.");
//     }
//   }, []);

//   // Logout function
//   const onLogout = useCallback(async (): Promise<void> => {
//     try {
//       await SecureStore.deleteItemAsync(TOKEN_KEY);
//       await SecureStore.deleteItemAsync(USER_KEY);
//       await SecureStore.deleteItemAsync(AUTHENTICATED_KEY);
//       setAuthState({ user: null, token: null, authenticated: false });
//       await AsyncStorage.removeItem("carts");
//       console.log("User logged out successfully.");
//     } catch (error) {
//       console.error("Error logging out:", error);
//       throw new Error("Logout failed. Please try again.");
//     }
//   }, []);

//   // Update user profile
//   const updateUserItems = useCallback(async (updatedUser: Partial<UserProps>) => {
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
//       await updateUserItems({ favoriteItems: updatedFavorites });
//     } catch (error) {
//       console.error("Failed to add to favorites:", error);
//       throw new Error("Failed to add to favorites.");
//     }
//   }, [authState.user, updateUserItems]);

//   // Remove item from favorites
//   const removeFromFavorites = useCallback(async (itemId: string) => {
//     if (!authState.user) throw new Error("No user to update");

//     try {
//       const updatedFavorites = (authState.user.favoriteItems || []).filter(fav => fav !== itemId);
//       await updateUserItems({ favoriteItems: updatedFavorites });
//     } catch (error) {
//       console.error("Failed to remove from favorites:", error);
//       throw new Error("Failed to remove from favorites.");
//     }
//   }, [authState.user, updateUserItems]);

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
//         updateUserItems,
//         addToFavorites,
//         removeFromFavorites,
//         isFavorite,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
