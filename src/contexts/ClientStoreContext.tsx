import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getClientStoreApi } from '@/api/storeApi';
import { StoreModelProps } from '@/models/StoreModelProps';
import { CONSTANTS } from '@/utils/constants';

// error make sure to use client / mankind / customer ... store etc/


interface ClientStoreContextProps { 
  store: StoreModelProps | null;
  getClientStore: (store_id: string) => void;
  addStore: (store: StoreModelProps) => void;
  removeStore: () => void;
  selectedStore: StoreModelProps | null;
  selectStore: (store: StoreModelProps) => void;
  error: string | null;
  isLoading: boolean;

}

const ClientStoreContext = createContext<ClientStoreContextProps | undefined>(undefined);

export const useClientStore = (): ClientStoreContextProps => {
  const context = useContext(ClientStoreContext);
  if (!context) {
    throw new Error('useClientStore must be used within a ClientStoreProvider');
  }
  return context;
};

export const ClientStoreProvider = ({ children }: { children: ReactNode }) => {
  const [store, setStore] = useState<StoreModelProps | null>(null);
  const [selectedStore, setSelectedStore] = useState<StoreModelProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addStore = (newStore: StoreModelProps) => setStore(newStore);

  const removeStore = () => setStore(null);

  const selectStore = (store: StoreModelProps) => setSelectedStore(store);

  const getClientStore = async (store_owner_id: string) => {
    setIsLoading(true); // Start loading state
    setError(null); // Reset previous errors
    try {
      const response = await getClientStoreApi(store_owner_id);
      setStore(response);
      // console.log(`Fetched client store: ${JSON.stringify(response)}`);
    } catch (error: any) {
      console.error("Error fetching store:", error.message);
      setError(error.message || "Failed to fetch store. Please try again later.");
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  return (
    <ClientStoreContext.Provider
      value={{
        store,
        getClientStore,
        addStore,
        removeStore,
        selectedStore,
        selectStore,
        error,
        isLoading
      }}
    >
      {children}
    </ClientStoreContext.Provider>
  );
};
