
// providers
export { ClientProductProvider } from './contexts/ClientProductContext';
export { AuthProvider } from './contexts/AuthContext';
export { CartProvider } from './contexts/CartContext';
export { OrderProvider } from './contexts/OrderContext';
export { MankindProductProvider } from './contexts/MankindProductContext';
export { CollectionProvider } from './contexts/CollectionContext';
export { ClientStoreProvider } from './contexts/ClientStoreContext';

// use
export { useClientProduct } from './contexts/ClientProductContext';


// API Exports
export { authApi } from './api/authorization';


// Context 
export { ClientProductContext } from './contexts/ClientProductContext';
export { CartContext } from './contexts/CartContext';
export { AppUserContext } from './contexts/AppUserContext';
export { AuthContext } from './contexts/AuthContext';
export { ClientStoreContext } from './contexts/ClientStoreContext';
export { CollectionContext } from './contexts/CollectionContext';
export { MankindProductContext } from './contexts/MankindProductContext';
export { OrderContext } from './contexts/OrderContext';
export { ThemeContext } from './contexts/ThemeContext';


// Enum Exports
export type { AccountType } from './enum/AccountType';
export type { StoreType } from './enum/StoreType';


// Hook 
export { convertToCurrency } from './hooks/convertToCurrency';
export { formatPhoneNumber } from './hooks/formatPhoneNumber';
export { ExternalLink } from './hooks/ExternalLink';
export { generateUUID } from './hooks/generateUUID';
export { stripeConverter } from './hooks/stripeConverter';
export { useClientOnlyValue } from './hooks/useClientOnlyValue';
export { useColorScheme } from './hooks/useColorScheme';



// Model Exports (types)
export type { CollectionModelProps } from './models/CollectionModelProps';
export type { CouponModelProps } from './models/CouponModelProps';
export type { InboxModelProps } from './models/InboxModelProps';
export type { OrderModelProps } from './models/OrderModelProps';
export type { ProductModelProps } from './models/ProductModelProps';
export type { StoreModelProps } from './models/StoreModelProps';
export type { UserProps } from './models/UserProps';

// // Utility Exports
// export { api } from './utils/api';
export { CONSTANTS } from './utils/constants';
export { ROUTES } from './utils/Routes';
export {COLORS, SIZES , SHADOWS } from './utils/theme'
// export { storage } from './utils/storage';
// export { theme } from './utils/theme';

