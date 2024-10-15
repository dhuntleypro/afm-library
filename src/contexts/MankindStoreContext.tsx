import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { StoreModelProps } from "../models/StoreModelProps";
import { getMankindStoreApi } from "@/api/mankindStoreApi";

interface MankindStoreContextProps {
  store: StoreModelProps | null;
  addStore: (store: StoreModelProps) => void;
  removeStore: (storeId: string) => void;
  getMankindStore: () => void;
  selectedStore: StoreModelProps | null;
  selectStore: (store: StoreModelProps) => void;
  isLoading: boolean;
  error: string | null;
}

const MankindStoreContext = createContext<MankindStoreContextProps | undefined>(undefined);

export const useMankindStore = () => {
  const context = useContext(MankindStoreContext);
  if (!context) {
    throw new Error("useMankindStore must be used within a MankindStoreProvider");
  }
  return context;
};

export const MankindStoreProvider = ({ children }: { children: ReactNode }) => {
  const { authState } = useAuth();
  const [store, setStore] = useState<StoreModelProps | null>(null);
  const [selectedStore, setSelectedStore] = useState<StoreModelProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   if (authState?.token) {
  //     getMankindStore(); // Initial load of the store
  //   }
  // }, [authState?.token]);

  const addStore = (newStore: StoreModelProps) => {
    setStore(newStore);
  };

  const removeStore = () => {
    setStore(null);
  };

  const getMankindStore = async () => {
   // if (!authState) return;

    setIsLoading(true);
    setError(null);
    try {
      const store_owner_id = authState?.user?.store_owner_id || '';
      const response = await getMankindStoreApi(store_owner_id);
     // const fetchedStore = response?.data ; // Assuming the API returns a single store object
      setStore(response);
    } catch (error: any) {
      console.error("Failed to fetch mankind store:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Failed to fetch store. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const selectStore = (store: StoreModelProps) => {
    setSelectedStore(store);
  };

  return (
    <MankindStoreContext.Provider 
      value={{ 
        store, 
        addStore, 
        removeStore, 
        getMankindStore, 
        selectedStore, 
        selectStore, 
        isLoading, 
        error 
      }}
    >
      {children}
    </MankindStoreContext.Provider>
  );
};
