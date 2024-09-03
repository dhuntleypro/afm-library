
// Buttons
export  { MyButton } from './components/buttons/MyButton'

// Cards
export { ProductCardView } from "./components/card/ProductCardView"
export { OrderCrudCard } from "./components/card/OrderCrudCard"
export { ProductCrudCard } from "./components/card/ProductCrudCard"
export { ProductCardV2 } from "./components/card/ProductCardV2"
// export { TalentCard } from "./components/card/TalentCard"

// Banner
export { BannerVOne } from "./components/banner/BannerVOne"
// export { PromoBannerCard } from "./components/banner/PromoBannerCard"


export { default as TextFieldVOne} from "./components/textfield/TextFieldVOne"
export { default as DeleteSectionView} from "./components/delete/DeleteSectionView"
export { default as Divider} from "./components/divider/Divider"
export { default as ProductListItem} from "./components/products/ProductListItem"

export {default as RegisterComponentTwo} from "./components/pages/register/RegisterComponentTwo"
export {default as LoginComponentTwo} from "./components/pages/login/LoginComponentTwo"

// Demos
export * from "./model-sample-data/sample-order"
export * from "./model-sample-data/sample-product"





// Layout
export * from './layouts/RootLayout'
export * from './layouts/CoreLayout'
export * from './layouts/TabLayout'
export * from './layouts/AuthLayout'


// Context
// export  { ClientStoreProvider, useClientStore } from './contexts/AppUserContext'
export  { AuthProvider , useAuth } from './contexts/AuthContext'
export  { CartProvider , CartContext } from './contexts/CartContext'
export  { ClientProductProvider, useClientProduct } from './contexts/ClientProductContext'
export  { ClientStoreProvider, useClientStore } from './contexts/ClientStoreContext'
export  { CollectionProvider, useClientCollection } from './contexts/CollectionContext'
export  { MankindProductProvider, useMankindProduct } from './contexts/MankindProductContext'
export  { MankindStoreProvider, useMankindStore } from './contexts/MankindStoreContext'
export  { OrderProvider, useClientOrder } from './contexts/OrderContext'

export  { ThemeProvider, useTheme } from './contexts/ThemeContext'

// export  { ClientStoreProvider, useClientStore } from './contexts/ThemeContext'
// export  { ClientStoreProvider, useClientStore } from './contexts/Themed'
// export  { ClientStoreProvider, useClientStore } from './contexts/UserFavoriteContext'
 


// api
export  * from './api/authorization'
export  * from './api/collectionsApi'
export  * from './api/couponApi'
export  * from './api/inboxApi'
export  * from './api/mankindProductApi'
export  * from './api/mankindStoreApi'
export  * from './api/ordersApi'
export  * from './api/paymentApi'
export  * from './api/productsApi'
export  * from './api/storeApi'



// // Utils
export  * from './utils/api'
export  * from './utils/constants'
export  * from './utils/pages'
export  * from './utils/Routes'
export  * from './utils/storage'
export  * from './utils/theme'


// // Hook 
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




export { default as EditScreenInfo } from './components/EditScreenInfo';


// Pages
export { CollectionPageVTwo } from "./components/pages/collections/CollectionPageVTwo"
export { SettingsPage } from "./components/pages/settings/SettingsPage"
export { WelcomePageTwo } from "./components/pages/welcome/WelcomePageTwo"
export { default as ClientOrderCard } from "./components/pages/client-order/ClientOrderCard"
export {CartPageVOne } from "./components/pages/cart/CartPageVOne"
export {ProductDetailsPageVThree } from "./components/pages/product-details/ProductDetailsPageVThree"

// export { CollectionPageVTwo } from "./components/pages/collections/CollectionPageVTwo"
// export { CollectionPageVTwo } from "./components/pages/collections/CollectionPageVTwo"
// export { CollectionPageVTwo } from "./components/pages/collections/CollectionPageVTwo"




// Component 
export { HomeDesignOne } from "./components/home/HomeDesignOne"
export { ProductSearchScreen } from "./components/products/ProductSearchScreen"






// export { HomeDesignTwo } from "./components/home/HomeDesignTwo"


// export * from  './components/EditScreenInfo'; 
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




// export  { useClientStore } from './contexts/ClientStoreContext'


// Provider
// export  { ClientProductProvider } from './providers/ClientProductProvider';



// export  { OrderProvider , useClientOrder} from './contexts/OrderContext';
// export  { CollectionProvider , useClientCollection} from './contexts/CollectionContext';
// export  { MankindProductProvider , useMankindProduct} from './contexts/MankindProductContext';
// export  { MankindStoreProvider , useMankindStore} from './contexts/MankindStoreContext';
// export  {  useClientProduct} from './contexts/ClientProductContext';

