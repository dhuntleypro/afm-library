import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { getClientCollectionApi, getClientCollectionsApi } from '@/api/collectionApi';
import { CollectionModelProps } from '@/models/CollectionModelProps';

interface ClientCollectionContextProps {
  collection: CollectionModelProps | null;
  collections: CollectionModelProps[];
  getClientCollections: (store_id: string) => Promise<void>;
  getClientCollection: (collection_owner_id: string) => Promise<void>;
  addCollection: (collection: CollectionModelProps) => void;
  removeCollection: () => void;
  selectedCollection: CollectionModelProps | null;
  selectCollection: (collection: CollectionModelProps) => void;
  error: string | null;
  isLoading: boolean;
}

const ClientCollectionContext = createContext<ClientCollectionContextProps | undefined>(undefined);

export const useClientCollection = (): ClientCollectionContextProps => {
  const context = useContext(ClientCollectionContext);
  if (!context) {
    throw new Error('useClientCollection must be used within a ClientCollectionProvider');
  }
  return context;
};     

export const ClientCollectionProvider = ({ children }: { children: ReactNode }) => {
  const [collection, setCollection] = useState<CollectionModelProps | null>(null);
  const [collections, setCollections] = useState<CollectionModelProps[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<CollectionModelProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Add collection to the state
  const addCollection = useCallback((newCollection: CollectionModelProps) => {
    setCollection(newCollection);
  }, []);

  // Remove the collection from the state
  const removeCollection = useCallback(() => {
    setCollection(null);
  }, []);

  // Select a collection as active
  const selectCollection = useCallback((collection: CollectionModelProps) => {
    setSelectedCollection(collection);
  }, []);

  // Fetch a single collection
  const getClientCollection = useCallback(async (collection_owner_id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getClientCollectionApi(collection_owner_id);
      setCollection(response.data);
      console.log(`Fetched client collection Successfully`);
      // console.log(`Fetched client collection: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error: any) {
      console.error("Error fetching collection:", error.message);
      setError(error.message || "Failed to fetch collection. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch multiple collections
  const getClientCollections = useCallback(async (store_id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response: CollectionModelProps[] = await getClientCollectionsApi(store_id, true);
      // console.log("Full API response:", JSON.stringify(response, null, 2));
      if (!response || response.length === 0) {
        throw new Error('No data returned from the API');
      }

      const validCollections = response.filter(collection => collection && collection.id);
      setCollections(validCollections);
      // console.log(`Fetched client collections: ${JSON.stringify(validCollections, null, 2)}`);
      console.log(`Fetched client collections Successfully`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching collections:", error.message);
        setError(error.message || "Failed to fetch collections. Please try again later.");
      } else {
        console.error("Unknown error fetching collections");
        setError("Failed to fetch collections. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ClientCollectionContext.Provider
      value={{
        collection,
        collections,
        getClientCollection,
        getClientCollections,
        addCollection,
        removeCollection,
        selectedCollection,
        selectCollection,
        error,
        isLoading,
      }}
    >
      {children}
    </ClientCollectionContext.Provider>
  );
};













// import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
// import { CollectionModelProps } from "../models/CollectionModelProps";
// import { getClientCollectionsApi, postClientCollectionApi, updateClientCollectionApi, deleteClientCollectionApi } from "../api/collectionsApi";
// import { useAuth } from "./AuthContext";
// import { Alert } from "react-native";
// import { router } from "expo-router";
// // import MyAlert from "@/components/interfaces/MyAlert";

// interface CollectionContextProps {
//   collections: CollectionModelProps[];
//   addCollection: (collection: CollectionModelProps) => Promise<void>;
//   removeCollection: (collectionId: string) => Promise<void>;
//   updateCollection: (collection: CollectionModelProps) => Promise<void>;
//   getClientCollections: () => void;
//   selectedCollection: CollectionModelProps | null;
//   selectCollection: (collection: CollectionModelProps) => void;
//   isLoading: boolean;
//   error: string | null;
// }

// export const ClientCollectionContext = createContext<CollectionContextProps | undefined>(undefined);

// export const useClientCollection = () => {
//   const context = useContext(ClientCollectionContext);
//   if (!context) {
//     throw new Error("useClientCollection must be used within an CollectionProvider");
//   }
//   return context;
// };


// export const CollectionProvider = ({ children }: { children: ReactNode }) => {
//   const { authState } = useAuth();
//   const [collections, setCollections] = useState<CollectionModelProps[]>([]);
//   const [selectedCollection, setSelectedCollection] = useState<CollectionModelProps | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);


//   const addCollection = async (collection: CollectionModelProps) => {
//     if (!authState?.user) return;

//     const storeID = authState.user.store_owner_id || '';
//     const email = authState.user.email || '';
//     const token = authState?.token || ""

//     setIsLoading(true);
//     try {
//       await postClientCollectionApi(collection, storeID, email, token );
//       setCollections((prevCollections) => [...prevCollections, collection]);
//       console.log("collection added", collection );

//       // change fix
//       router.push('/')

//     } catch (error: any) {
//       console.error("Failed to add collection:", error.response?.data );
      

//       // <MyAlert
//       // title="Collection not Created"
//       // message="You are missing information. Please update your store."
//       // onCancelPress={() => console.log("Cancel Pressed")}
//       // onUpdatePress={() => router.push('/store')}
//       // />   
//       setError(error.response?.data || "Failed to add collection. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const removeCollection = async (collectionId: string) => {
//     setIsLoading(true);
//     try {
//       await deleteClientCollectionApi( collectionId);
//       setCollections((prevCollections) => prevCollections.filter(collection => collection.id !== collectionId));
//     } catch (error: any) {
//       console.error("Failed to remove collection:", error.response?.data?.message || error.message);
//       setError(error.response?.data?.message || "Failed to remove collection. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const updateCollection = async (collection: CollectionModelProps) => {
//     setIsLoading(true);
//     try {
//       await updateCollection(collection);
//       setCollections((prevCollections) => prevCollections.map(o => o.id === collection.id ? collection : o));
//     } catch (error: any) {
//       console.error("Failed to update collection:", error.response?.data?.message || error.message);
//       setError(error.response?.data?.message || "Failed to update collection. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getClientCollections = async () => {
//     if (!authState?.user) return;

//     setIsLoading(true);
//     setError(null);
//     try {
//       const email = authState.user.email || '';
//       const store_owner_id = authState.user.store_owner_id || '';

//       const response = await getClientCollectionsApi(store_owner_id, email);
//       const fetchedCollections = response.data;
//       setCollections(fetchedCollections);
//     } catch (error: any) {
//       console.error("Failed to fetch client collections:", error.response?.data?.message || error.message);
//       setError(error.response?.data?.message || "Failed to fetch collections. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const selectCollection = (collection: CollectionModelProps) => {
//     setSelectedCollection(collection);
//   };

//   return (
//     <ClientCollectionContext.Provider 
//       value={{ 
//         collections, 
//         addCollection, 
//         removeCollection, 
//         updateCollection, 
//         getClientCollections, 
//         selectedCollection, 
//         selectCollection, 
//         isLoading, 
//         error 
//       }}
//     >
//       {children}
//     </ClientCollectionContext.Provider>
//   );
// };


