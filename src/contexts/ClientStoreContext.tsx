
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { StoreModelProps } from "../models/StoreModelProps";
import { getStore } from "../api/storeApi";
import { CONSTANTS } from "../utils/constants";

interface ClientStoreContextProps {
  store: StoreModelProps | null;
  addStore: (store: StoreModelProps) => void;
  removeStore: (storeId: string) => void;
  getClientStore: () => void;
  selectedStore: StoreModelProps | null;
  selectStore: (store: StoreModelProps) => void;
  isLoading: boolean;
  error: string | null;
}

export const ClientStoreContext = createContext<ClientStoreContextProps | undefined>(undefined);

export const useClientStore = () => {
  const context = useContext(ClientStoreContext);
  if (!context) {
    throw new Error("useClientStore must be used within a ClientStoreProvider");
  }
  return context;
};

export const ClientStoreProvider = ({ children }: { children: ReactNode }) => {
  const { authState } = useAuth();
  const [store, setStore] = useState<StoreModelProps | null>(null);
  const [selectedStore, setSelectedStore] = useState<StoreModelProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   if (authState?.token) {
  //     getClientStore(); // Initial load of the store
  //     console.log("Auth:::::::")
  //     console.log(authState?.token)
  //   }
  // }, [authState?.token]);


  useEffect(() => {
    // if (authState?.token) {
    console.log("Getting store ...")
    getClientStore(); // Initial load of products
    // }
  }, []);


  const addStore = (newStore: StoreModelProps) => {
    setStore(newStore);
  };

  const removeStore = () => {
    setStore(null);
  };

  const getClientStore = async () => {
    // if (!authState) return;

    setIsLoading(true);
    setError(null);
    try {
      const store_owner_id = CONSTANTS.store_id //  authState?.user?.store_owner_id || '';
      const response = await getStore(store_owner_id);
     // const fetchedStore = response?.data ; // Assuming the API returns a single store object
      setStore(response);
    } catch (error: any) {
      console.error("Failed to fetch client store:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Failed to fetch store. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const selectStore = (store: StoreModelProps) => {
    setSelectedStore(store);
  };

  return (
    <ClientStoreContext.Provider 
      value={{ 
        store, 
        addStore, 
        removeStore, 
        getClientStore, 
        selectedStore, 
        selectStore, 
        isLoading, 
        error 
      }}
    >
      {children}
    </ClientStoreContext.Provider>
  );
};










// import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
// // import { StoreProps } from "@/models/StoreModelProps";
// // import { getStores } from "../api/storesApi";
// import { CONSTANTS } from "@/utils/constants";
// import { useAuth } from "./AuthContext";
// import { StoreModelProps } from "../models/StoreModelProps";
// import { getStore } from "../api/storeApi";

// interface StoreContextProps {
//   stores: StoreModelProps[];
//   addStore: (store: StoreModelProps) => void;
//   removeStore: (storeId: string) => void;
//   getClientStore: () => void;
//   selectedStore: StoreModelProps | null;
//   selectStore: (store: StoreModelProps) => void;
//   isLoading: boolean;
//   error: string | null;
// }

// const StoreContext = createContext<StoreContextProps | undefined>(undefined);

// export const useClientStore = () => {
//   const context = useContext(StoreContext);
//   if (!context) {
//     throw new Error("useClientStore must be used within an StoreProvider");
//   }
//   return context;
// };

// export const StoreProvider = ({ children }: { children: ReactNode }) => {
//   const { authState } = useAuth(); // Access authState from the AuthContext
//   const [stores, setStores] = useState<StoreModelProps[]>([]);
//   const [selectedStore, setSelectedStore] = useState<StoreModelProps | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (authState?.token) {
//       getClientStore(); // Initial load of stores
//     }
//   }, [authState?.token]);

//   const addStore = (store: StoreModelProps) => {
//     setStores((prevStores) => [...prevStores, store]);
//   };

//   const removeStore = (storeId: string) => {
//     setStores((prevStores) => prevStores.filter(store => store.id !== storeId));
//   };

//   const getClientStore = async () => {
//     if (!authState) return;
  
//     setIsLoading(true);
//     setError(null);
//     try {
//       const store_owner_id = authState?.user?.store_owner_id || '';
  
//       console.log(`store_owner_id : ${store_owner_id}`);
//       const response = await getStore(store_owner_id);
  
//       // Ensure the response and data are valid before setting state
//       const fetchedStores = response?.data || []; 
//       setStores(Array.isArray(fetchedStores) ? fetchedStores : [fetchedStores]);
//     } catch (error: any) {
//       console.error("Failed to fetch stores:", error.response?.data?.message || error.message);
//       setError(error.response?.data?.message || "Failed to fetch stores. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   const selectStore = (store: StoreModelProps) => {
//     setSelectedStore(store);
//   };

//   return (
//     <StoreContext.Provider 
//       value={{ 
//         stores, 
//         addStore, 
//         removeStore, 
//         getClientStore, 
//         selectedStore, 
//         selectStore, 
//         isLoading, 
//         error 
//       }}
//     >
//       {children}
//     </StoreContext.Provider>
//   );
// };
