import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getStoreApi } from '@/api/storeApi';
import { StoreModelProps } from '@/models/StoreModelProps';
import { CONSTANTS } from '@/utils/constants';

// error make sure to use client / mankind / customer ... store etc/


interface ClientStoreContextProps {
  store: StoreModelProps | null;
  getClientStore: () => void;
  addStore: (store: StoreModelProps) => void;
  removeStore: () => void;
  selectedStore: StoreModelProps | null;
  selectStore: (store: StoreModelProps) => void;
  error: string | null;
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

  const addStore = (newStore: StoreModelProps) => setStore(newStore);

  const removeStore = () => setStore(null);

  const selectStore = (store: StoreModelProps) => setSelectedStore(store);

  const getClientStore = async () => {
    try {
      const store_owner_id = CONSTANTS.store_id;
      const response = await getStoreApi(store_owner_id);
      setStore(response);
    } catch (error: any) {
      setError(error.message || "Failed to fetch store. Please try again later.");
    }
  };

  useEffect(() => {
    getClientStore();
  }, []);

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
      }}
    >
      {children}
    </ClientStoreContext.Provider>
  );
};




















// import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import { getClientStoreApi } from '@/api/storeApi';
// import { StoreModelProps } from '@/models/StoreModelProps';
// import { CONSTANTS } from '@/utils/constants';

// interface ClientStoreContextProps {
//   store: StoreModelProps | null;
//   getClientStore: (store_owner_id?: string) => Promise<void>; // Returns a void promise since it's setting state
//   addStore: (store: StoreModelProps) => void;
//   removeStore: () => void;
//   selectedStore: StoreModelProps | null;
//   selectStore: (store: StoreModelProps) => void;
//   error: string | null;
// }

// const ClientStoreContext = createContext<ClientStoreContextProps | undefined>(undefined);

// export const useClientStore = () => {
//   const context = useContext(ClientStoreContext);
//   if (!context) {
//     throw new Error('useClientStore must be used within a ClientStoreProvider');
//   }
//   return context;
// };

// export const ClientStoreProvider = ({ children }: { children: ReactNode }) => {
//   const [store, setStore] = useState<StoreModelProps | null>(null);
//   const [selectedStore, setSelectedStore] = useState<StoreModelProps | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch the store data when the provider mounts
//   useEffect(() => {
//     fetchStore();
//   }, []);

//   const fetchStore = async (store_owner_id: string = CONSTANTS.store_id) => {
//     try {
//       const response = await getClientStoreApi(store_owner_id);
//       if (response) {
//         setStore(response);
//       } else {
//         throw new Error('No store data returned');
//       }
//     } catch (error: any) {
//       console.error("Failed to fetch client store:", error.message || "An unknown error occurred");
//       setError(error.message || "Failed to fetch store. Please try again later.");
//     }
//   };

//   const addStore = (newStore: StoreModelProps) => setStore(newStore);

//   const removeStore = () => setStore(null);

//   const selectStore = (store: StoreModelProps) => setSelectedStore(store);

//   const getClientStore = async (store_owner_id: string = CONSTANTS.store_id) => {
//     await fetchStore(store_owner_id); // Re-use fetchStore logic
//   };

//   return (
//     <ClientStoreContext.Provider
//       value={{
//         store,
//         getClientStore,
//         addStore,
//         removeStore,
//         selectedStore,
//         selectStore,
//         error,
//       }}
//     >
//       {children}
//     </ClientStoreContext.Provider>
//   );
// };

// // export { ClientStoreProvider, useClientStore };





// import { getClientStoreApi } from '@/api/storeApi';
// import { StoreModelProps } from '@/models/StoreModelProps';
// import { CONSTANTS } from '@/utils/constants';
// import React, { createContext, useContext, useState, ReactNode } from 'react';

// // Interface defining the structure of the context's value
// interface ClientStoreContextProps {
//   store: StoreModelProps | null;
//   getClientStore: () => Promise<void>;
//   addStore: (store: StoreModelProps) => void;
//   removeStore: () => void;
//   selectedStore: StoreModelProps | null;
//   selectStore: (store: StoreModelProps) => void;
//   error: string | null; // Include error state in the context
// }

// const ClientStoreContext = createContext<ClientStoreContextProps | undefined>(undefined);

// const ClientStoreProvider = ({ children }: { children: ReactNode }) => {
//   const [store, setStore] = useState<StoreModelProps | null>(null);
//   const [selectedStore, setSelectedStore] = useState<StoreModelProps | null>(null);
//   const [error, setError] = useState<string | null>(null); // Error state

//   const addStore = (newStore: StoreModelProps) => {
//     setStore(newStore);
//     console.log("Store added:", newStore);
//   };

//   const removeStore = () => {
//     setStore(null);
//     console.log("Store removed");
//   };

//   const selectStore = (store: StoreModelProps) => {
//     setSelectedStore(store);
//     console.log("Store selected:", store);
//   };

//   const getClientStore = async () => {
//     console.log("getClientStore called");
//     try {
//       const store_owner_id = CONSTANTS.store_id; // Replace this with your actual logic
//       console.log("Fetching store for owner ID:", store_owner_id);

//       const response = await getClientStoreApi(store_owner_id);
//       console.log("API Response:", response);

//       if (response) {
//         setStore(response);
//         console.log("Store set successfully:", response);
//       } else {
//         throw new Error('No store data returned');
//       }
//     } catch (error: any) {
//       console.error("Failed to fetch client store:", error.message || "An unknown error occurred");
//       setError(error.message || "Failed to fetch store. Please try again later.");
//     }
//   };

//   return (
//     <ClientStoreContext.Provider
//       value={{
//         store,
//         getClientStore,
//         addStore,
//         removeStore,
//         selectedStore,
//         selectStore,
//         error, // Expose error state to the context
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










// import { StoreModelProps } from '@/models/StoreModelProps';
// import React, { createContext, useContext, useState, ReactNode } from 'react';

// // Interface defining the structure of the context's value
// interface ClientStoreContextProps {
//   store: StoreModelProps | null;
//   addStore: (store: StoreModelProps) => void;
//   removeStore: () => void;
//   selectedStore: StoreModelProps | null;
//   selectStore: (store: StoreModelProps) => void;
// }

// const ClientStoreContext = createContext<ClientStoreContextProps | undefined>(undefined);

// const ClientStoreProvider = ({ children }: { children: ReactNode }) => {
//   const [store, setStore] = useState<StoreModelProps | null>(null);
//   const [selectedStore, setSelectedStore] = useState<StoreModelProps | null>(null);

//   const addStore = (newStore: StoreModelProps) => setStore(newStore);

//   const removeStore = () => setStore(null);

//   const selectStore = (store: StoreModelProps) => setSelectedStore(store);

  
//   return (
//     <ClientStoreContext.Provider value={{ store, addStore, removeStore, selectedStore, selectStore }}>
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

