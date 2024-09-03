// Context
export  { AuthProvider , useAuth } from './contexts/AuthContext'
export  { ClientStoreProvider, useClientStore } from './contexts/ClientStoreContext'

// export  { useClientStore } from './contexts/ClientStoreContext'


// Provider
// export  { ClientProductProvider } from './providers/ClientProductProvider';



// export  { OrderProvider , useClientOrder} from './contexts/OrderContext';
// export  { CollectionProvider , useClientCollection} from './contexts/CollectionContext';
// export  { MankindProductProvider , useMankindProduct} from './contexts/MankindProductContext';
// export  { MankindStoreProvider , useMankindStore} from './contexts/MankindStoreContext';
// export  {  useClientProduct} from './contexts/ClientProductContext';



// // Hook 
export { convertToCurrency } from './hooks/convertToCurrency';
export { formatPhoneNumber } from './hooks/formatPhoneNumber';
export { ExternalLink } from './hooks/ExternalLink';
export { generateUUID } from './hooks/generateUUID';
export { stripeConverter } from './hooks/stripeConverter';
export { useClientOnlyValue } from './hooks/useClientOnlyValue';
export { useColorScheme } from './hooks/useColorScheme';



// // Model Exports (types)
export type { CollectionModelProps } from './models/CollectionModelProps';
export type { CouponModelProps } from './models/CouponModelProps';
export type { InboxModelProps } from './models/InboxModelProps';
export type { OrderModelProps } from './models/OrderModelProps';
export type { ProductModelProps } from './models/ProductModelProps';
export type { StoreModelProps } from './models/StoreModelProps';
export type { UserProps } from './models/UserProps';


// export * from  './components/EditScreenInfo'; 
export { default as EditScreenInfo } from './components/EditScreenInfo';
// export { default as HomeDesignTwo } from './components/home/HomeDesignTwo';
// export { default as HomeDesignThree } from './components/home/HomeDesignThree';

// export { default as SomeComponent } from './components/home/SomeComponent';
// export * from './components/home/SimpleProvider';

// no error - not wokring
// export * from '@/contexts/AuthContext'
// export type { AuthContext } from './contexts/AuthContext'
// export  { useClientStore } from './contexts/ClientStoreContext';
// export  { ClientStoreProvider } from './providers/ClientStoreProvider'

// export  { CartProvider } from './contexts/CartContext';

