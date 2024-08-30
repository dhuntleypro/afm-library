import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { CollectionModelProps } from "../models/CollectionModelProps";
import { getCollections, postCollection, updateCollection, deleteCollection } from "../api/collectionsApi";
import { useAuth } from "./AuthContext";
import { Alert } from "react-native";
import { router } from "expo-router";
// import MyAlert from "@/components/interfaces/MyAlert";

interface CollectionContextProps {
  collections: CollectionModelProps[];
  addCollection: (collection: CollectionModelProps) => Promise<void>;
  removeCollection: (collectionId: string) => Promise<void>;
  updateCollection: (collection: CollectionModelProps) => Promise<void>;
  getClientCollections: () => void;
  selectedCollection: CollectionModelProps | null;
  selectCollection: (collection: CollectionModelProps) => void;
  isLoading: boolean;
  error: string | null;
}

export const CollectionContext = createContext<CollectionContextProps | undefined>(undefined);

export const useClientCollection = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error("useClientCollection must be used within an CollectionProvider");
  }
  return context;
};


export const CollectionProvider = ({ children }: { children: ReactNode }) => {
  const { authState } = useAuth();
  const [collections, setCollections] = useState<CollectionModelProps[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<CollectionModelProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const addCollection = async (collection: CollectionModelProps) => {
    if (!authState?.user) return;

    const storeID = authState.user.store_owner_id || '';
    const email = authState.user.email || '';
    const token = authState?.token || ""

    setIsLoading(true);
    try {
      await postCollection(collection, storeID, email, token );
      setCollections((prevCollections) => [...prevCollections, collection]);
      console.log("collection added", collection );

      // change fix
      router.push('/')

    } catch (error: any) {
      console.error("Failed to add collection:", error.response?.data );
      

      // <MyAlert
      // title="Collection not Created"
      // message="You are missing information. Please update your store."
      // onCancelPress={() => console.log("Cancel Pressed")}
      // onUpdatePress={() => router.push('/store')}
      // />   
      setError(error.response?.data || "Failed to add collection. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const removeCollection = async (collectionId: string) => {
    setIsLoading(true);
    try {
      await deleteCollection({ id: collectionId });
      setCollections((prevCollections) => prevCollections.filter(collection => collection.id !== collectionId));
    } catch (error: any) {
      console.error("Failed to remove collection:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Failed to remove collection. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateCollection = async (collection: CollectionModelProps) => {
    setIsLoading(true);
    try {
      await updateCollection(collection);
      setCollections((prevCollections) => prevCollections.map(o => o.id === collection.id ? collection : o));
    } catch (error: any) {
      console.error("Failed to update collection:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Failed to update collection. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const getClientCollections = async () => {
    if (!authState?.user) return;

    setIsLoading(true);
    setError(null);
    try {
      const email = authState.user.email || '';
      const store_owner_id = authState.user.store_owner_id || '';

      const response = await getCollections(store_owner_id, email);
      const fetchedCollections = response.data;
      setCollections(fetchedCollections);
    } catch (error: any) {
      console.error("Failed to fetch client collections:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Failed to fetch collections. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const selectCollection = (collection: CollectionModelProps) => {
    setSelectedCollection(collection);
  };

  return (
    <CollectionContext.Provider 
      value={{ 
        collections, 
        addCollection, 
        removeCollection, 
        updateCollection, 
        getClientCollections, 
        selectedCollection, 
        selectCollection, 
        isLoading, 
        error 
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};


