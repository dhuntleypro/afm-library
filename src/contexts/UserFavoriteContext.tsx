// import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
// import { FavoriteModelProps } from "../models/FavoriteModelProps";
// import { getFavorites, postFavorite, deleteFavorite } from "../api/favoritesApi";
// import { useAuth } from "./AuthContext";
// import { Alert } from "react-native";
// import { router } from "expo-router";
// import MyAlert from "@/components/interfaces/MyAlert";
// import { CONSTANTS } from "@/utils/constants";

// interface FavoriteContextProps {
//   favorites: FavoriteModelProps[];
//   addClientFavorite: (favorite: FavoriteModelProps) => Promise<void>;
//   removeClientFavorite: (favoriteId: string) => Promise<void>;
//   updateClientFavorite: (favorite: FavoriteModelProps) => Promise<void>;
//   getClientFavorites: () => void;
//   selectedFavorite: FavoriteModelProps | null;
//   selectFavorite: (favorite: FavoriteModelProps) => void;
//   isLoading: boolean;
//   error: string | null;
// }

// const ClientFavoriteContext = createContext<FavoriteContextProps | undefined>(undefined);

// export const useClientFavorite = () => {
//   const context = useContext(ClientFavoriteContext);
//   if (!context) {
//     throw new Error("useClientFavorite must be used within an ClientFavoriteProvider");
//   }
//   return context;
// }

// export const ClientFavoriteProvider = ({ children }: { children: ReactNode }) => {
//   const { authState } = useAuth();
//   const [favorites, setFavorites] = useState<FavoriteModelProps[]>([]);
//   const [selectedFavorite, setSelectedFavorite] = useState<FavoriteModelProps | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     // if (authState?.token) {
//     console.log("Getting store favorites...")
//       getClientFavorites(); // Initial load of favorites
//     // }
//   }, []);

//   const addClientFavorite = async (favorite: FavoriteModelProps) => {
//     if (!authState?.user) return;

//     const storeID = authState.user.store_owner_id || '';
//     const email = authState.user.email || '';
//     const token = authState?.token || ""

//     setIsLoading(true);
//     try {
//       await postFavorite(favorite, storeID, email, token );
//       setFavorites((prevFavorites) => [...prevFavorites, favorite]);
//       console.log("favorite added", favorite );

//       // change fix
//       router.push('/')

//     } catch (error: any) {
//       console.error("Failed to add favorite:", error.response?.data );
      

//       <MyAlert
//       title="Favorite not Created"
//       message="You are missing information. Please update your store."
//       onCancelPress={() => console.log("Cancel Pressed")}
//       onUpdatePress={() => router.push('/store')}
//       />   
//       setError(error.response?.data || "Failed to add favorite. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const removeClientFavorite = async (favoriteId: string) => {
//     setIsLoading(true);
//     try {
//       await deleteFavorite({ id: favoriteId });
//       setFavorites((prevFavorites) => prevFavorites.filter(favorite => favorite.id !== favoriteId));
//     } catch (error: any) {
//       console.error("Failed to remove favorite:", error.response?.data?.message || error.message);
//       setError(error.response?.data?.message || "Failed to remove favorite. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const updateClientFavorite = async (favorite: FavoriteModelProps) => {
//     setIsLoading(true);
//     try {
//       await updateClientFavorite(favorite);
//       setFavorites((prevFavorites) => prevFavorites.map(o => o.id === favorite.id ? favorite : o));
//     } catch (error: any) {
//       console.error("Failed to update favorite:", error.response?.data?.message || error.message);
//       setError(error.response?.data?.message || "Failed to update favorite. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getClientFavorites = async () => {
//     // if (!authState?.user) return;

//     setIsLoading(true);
//     setError(null);
//     try {
//       const email = '';
//       const store_owner_id = CONSTANTS.store_id // authState.user.store_owner_id || '';

//       const response = await getFavorites(store_owner_id, email);
//       const fetchedFavorites = response.data;
//       setFavorites(fetchedFavorites);
//       console.log("Favorites Fetched !!")
//     } catch (error: any) {
//       console.error("Failed to fetch favorites:", error.response?.data?.message || error.message);
//       setError(error.response?.data?.message || "Failed to fetch favorites. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const selectFavorite = (favorite: FavoriteModelProps) => {
//     setSelectedFavorite(favorite);
//   };

//   return (
//     <ClientFavoriteContext.Provider 
//       value={{ 
//         favorites, 
//         addClientFavorite, 
//         removeClientFavorite, 
//         updateClientFavorite, 
//         getClientFavorites, 
//         selectedFavorite, 
//         selectFavorite, 
//         isLoading, 
//         error 
//       }}
//     >
//       {children}
//     </ClientFavoriteContext.Provider>
//   );
// };

