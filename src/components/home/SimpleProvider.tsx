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













// import React, { createContext, useContext, useState, ReactNode } from 'react';

// interface SimpleContextProps {
//   value: number;
//   setValue: React.Dispatch<React.SetStateAction<number>>;
// }



// const SimpleContext = createContext<SimpleContextProps | undefined>(undefined);

// const SimpleProvider = ({ children }: { children: ReactNode }) => {
//   const [value, setValue] = useState(0);

//   return (
//     <SimpleContext.Provider value={{ value, setValue }}>
//       {children}
//     </SimpleContext.Provider>
//   );
// };

// const useSimpleContext = () => {
//   const context = useContext(SimpleContext);
//   if (!context) {
//     throw new Error('useSimpleContext must be used within a SimpleProvider');
//   }
//   return context;
// };

// export { SimpleProvider, useSimpleContext };
