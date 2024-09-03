import { getClientStoreApi } from '@/api/storeApi';
import { StoreModelProps } from '@/models/StoreModelProps';
import { CONSTANTS } from '@/utils/constants';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Interface defining the structure of the context's value
interface ClientStoreContextProps {
  store: StoreModelProps | null;
  getClientStore: () => void
  addStore: (store: StoreModelProps) => void;
  removeStore: () => void;
  selectedStore: StoreModelProps | null;
  selectStore: (store: StoreModelProps) => void;
}

const ClientStoreContext = createContext<ClientStoreContextProps | undefined>(undefined);

const ClientStoreProvider = ({ children }: { children: ReactNode }) => {
  const [store, setStore] = useState<StoreModelProps | null>(null);
  const [selectedStore, setSelectedStore] = useState<StoreModelProps | null>(null);

  const addStore = (newStore: StoreModelProps) => setStore(newStore);

  const removeStore = () => setStore(null);

  const selectStore = (store: StoreModelProps) => setSelectedStore(store);

  
  const getClientStore = async () => {
    // setIsLoading(true);
    // setError(null);
    try {
      const store_owner_id = CONSTANTS.store_id; // Adjust this based on your logic
      const response = await getClientStoreApi(store_owner_id);
      setStore(response);
    } catch (error: any) {
      console.error("Failed to fetch client store:", error.response?.data?.message || error.message);
      // setError(error.response?.data?.message || "Failed to fetch store. Please try again later.");
    } finally {
      // setIsLoading(false);
    }
  };



  return (
    <ClientStoreContext.Provider value={{ store, addStore, removeStore, selectedStore, selectStore , getClientStore }}>
      {children}
    </ClientStoreContext.Provider>
  );
};

const useClientStore = () => {
  const context = useContext(ClientStoreContext);
  if (!context) {
    throw new Error('useClientStore must be used within a ClientStoreProvider');
  }
  return context;
};

export { ClientStoreProvider, useClientStore };




// import { getClientStoreApi } from '@/api/storeApi';
// import { StoreModelProps } from '@/models/StoreModelProps';
// import { CONSTANTS } from '@/utils/constants';
// import React, { createContext, useContext, useState, ReactNode } from 'react';

// // Interface defining the structure of the context's value
// interface ClientStoreContextProps {
//   store: StoreModelProps | null;
//   getClientStore: () => void;
//   addStore: (store: StoreModelProps) => void;
//   removeStore: () => void;
//   selectedStore: StoreModelProps | null;
//   selectStore: (store: StoreModelProps) => void;
//   isLoading: boolean;
//   error: string | null;
// }

// const ClientStoreContext = createContext<ClientStoreContextProps | undefined>(undefined);

// const ClientStoreProvider = ({ children }: { children: ReactNode }) => {
//   const [store, setStore] = useState<StoreModelProps | null>(null);
//   const [selectedStore, setSelectedStore] = useState<StoreModelProps | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const addStore = (newStore: StoreModelProps) => setStore(newStore);

//   const removeStore = () => setStore(null);

//   const selectStore = (store: StoreModelProps) => setSelectedStore(store);

//   const getClientStore = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const store_owner_id = CONSTANTS.store_id; // Adjust this based on your logic
//       const response = await getClientStoreApi(store_owner_id);
//       setStore(response);
//     } catch (error: any) {
//       console.error("Failed to fetch client store:", error.response?.data?.message || error.message);
//       setError(error.response?.data?.message || "Failed to fetch store. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <ClientStoreContext.Provider 
//       value={{ 
//         store, 
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
//     </ClientStoreContext.Provider>
//   );
// };

// const useClientStore = () => {
//   const context = useContext(ClientStoreContext);
//   if (!context) {
//     throw new Error('useClientStore must be used within a ClientStoreProvider');
//   }
//   return context;
// };

// export { ClientStoreProvider, useClientStore };



























// import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
// import { StoreModelProps } from "../models/StoreModelProps";
// import { getClientStoreApi } from "../api/storeApi"; // Replace with your actual API function
// import { CONSTANTS } from "../utils/constants"; // Replace with your actual constants

// // Interface defining the structure of the context's value
// interface ClientStoreContextProps {
//   store: StoreModelProps | null;
//   addStore: (store: StoreModelProps) => void;
//   removeStore: () => void;
//   getClientStore: () => void;
//   selectedStore: StoreModelProps | null;
//   selectStore: (store: StoreModelProps) => void;
//   isLoading: boolean;
//   error: string | null;
// }

// // Create the context with an undefined initial value
// const ClientStoreContext = createContext<ClientStoreContextProps | undefined>(undefined);

// // Custom hook for easy context access
// export const useClientStore = (): ClientStoreContextProps => {
//   const context = useContext(ClientStoreContext);
//   if (!context) {
//     throw new Error("useClientStore must be used within a ClientStoreProvider");
//   }
//   return context;
// };

// // Provider component
// export const ClientStoreProvider = ({ children }: { children: ReactNode }) => {
//   const [store, setStore] = useState<StoreModelProps | null>(null);
//   const [selectedStore, setSelectedStore] = useState<StoreModelProps | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch the store when the component mounts
//   useEffect(() => {
//     getClientStore();
//   }, []);

//   const addStore = (newStore: StoreModelProps) => {
//     setStore(newStore);
//   };

//   const removeStore = () => {
//     setStore(null);
//   };

//   const getClientStore = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const store_owner_id = CONSTANTS.store_id; // Adjust this based on your logic
//       const response = await getClientStoreApi(store_owner_id);
//       setStore(response);
//     } catch (error: any) {
//       console.error("Failed to fetch client store:", error.response?.data?.message || error.message);
//       setError(error.response?.data?.message || "Failed to fetch store. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const selectStore = (store: StoreModelProps) => {
//     setSelectedStore(store);
//   };

//   return (
//     <ClientStoreContext.Provider 
//       value={{ 
//         store, 
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
//     </ClientStoreContext.Provider>
//   );
// };

// export default ClientStoreProvider;










// import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
// import { StoreModelProps } from "../models/StoreModelProps"; // Ensure the model is correct
// import { getClientStoreApi } from "../api/storeApi"; // Replace with your actual API function
// import { CONSTANTS } from "../utils/constants"; // Replace with your actual constants

// // Interface defining the structure of the context's value
// interface ClientStoreContextProps {
//   store: StoreModelProps | null;
//   addStore: (store: StoreModelProps) => void;
//   removeStore: () => void;
//   getClientStore: (store_owner_id: string) => void;
//   selectedStore: StoreModelProps | null;
//   selectStore: (store: StoreModelProps) => void;
//   isLoading: boolean;
//   error: string | null;
// }

// // Create the context with an undefined initial value
// const ClientStoreContext = createContext<ClientStoreContextProps | undefined>(undefined);

// // Custom hook for easy context access
// export const useClientStore = (): ClientStoreContextProps => {
//   const context = useContext(ClientStoreContext);
//   if (!context) {
//     throw new Error("useClientStore must be used within a ClientStoreProvider");
//   }
//   return context;
// };

// // Provider component
// export const ClientStoreProvider = ({ children }: { children: ReactNode }) => {
//   const [store, setStore] = useState<StoreModelProps | null>(null);
//   const [selectedStore, setSelectedStore] = useState<StoreModelProps | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch the store when the component mounts, only if authenticated
//   // useEffect(() => {
//   //   if (clientStore?.token) { 
//   //     getClientStore();
//   //   }
//   // }, [clientStore?.token]);

//   const addStore = (newStore: StoreModelProps) => {
//     setStore(newStore);
//   };

//   const removeStore = () => {
//     setStore(null);
//   };

//   const getClientStore = async (store_owner_id: string) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await getClientStoreApi(store_owner_id); // clientStore?.user?.store_owner_id
//       setStore(response);
//     } catch (error: any) {
//       console.error("Failed to fetch client store:", error.response?.data?.message || error.message);
//       setError(error.response?.data?.message || "Failed to fetch store. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const selectStore = (store: StoreModelProps) => {
//     setSelectedStore(store);
//   };

//   return (
//     <ClientStoreContext.Provider 
//       value={{ 
//         store, 
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
//     </ClientStoreContext.Provider>
//   );
// };

// export default ClientStoreProvider;

