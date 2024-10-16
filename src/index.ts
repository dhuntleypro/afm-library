
// Buttons
export  { MyButton } from './components/buttons/MyButton'

// Cards
export {default as ProductCardView } from "./components/card/ProductCardView"
export {default as OrderCrudCard } from "./components/card/OrderCrudCard"
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

export {default as RegisterComponentTwo} from "./pages/register/RegisterComponentTwo"
export {default as LoginComponentTwo} from "./pages/login/LoginComponentTwo"

// Demos
export * from "./model-sample-data/sample-order"
export {SAMPLE_PRODUCT} from "./model-sample-data/sample-product"



export  {  default as TermsOfUsePage } from './pages/terms-of-use/TermsOfUsePage'
export  {  default as PrivacyPolicyPage } from './pages/privacy-policy/PrivacyPolicyPage'
export  {  default as CookiesPage } from './pages/cookies/CookiesPage'




// Layout DO NOT WORK -- NOT COMPATABLE 
// export { RootLayout} from './layouts/RootLayout'
// export { CoreLayout}  from './layouts/CoreLayout'
// export { TabLayout}  from './layouts/TabLayout'
// export { AuthLayout}  from './layouts/AuthLayout'


// Context
// export  { ClientStoreProvider, useClientStore } from './contexts/AppUserContext'
export  { AuthProvider , useAuth } from './contexts/AuthContext'
// export  { CartProvider , CartContext } from './contexts/CartContext'
export  { CartProvider , useCart } from './contexts/CartContext'
export  { ClientProductProvider, useClientProduct } from './contexts/ClientProductContext'
export  { ClientStoreProvider, useClientStore } from './contexts/ClientStoreContext'
export  { ClientCollectionProvider, useClientCollection } from './contexts/CollectionContext'
export  { MankindProductProvider, useMankindProduct } from './contexts/MankindProductContext'
export  { MankindStoreProvider, useMankindStore } from './contexts/MankindStoreContext'
export  { OrderProvider, useClientOrder } from './contexts/OrderContext'

// export  { ThemeProvider } from './contexts/ThemeContext'

export  { ThemeProvider, useTheme } from './contexts/ThemeContext'
// export  { T, useTheme } from './contexts/Themed'
// export  { ClientStoreProvider, useClientStore } from './contexts/UserFavoriteContext'
 


// api
export  * from './api/authorization'
export  * from './api/collectionApi'
export  * from './api/couponApi'
export  * from './api/inboxApi'
export  * from './api/mankindProductApi'
export  * from './api/mankindStoreApi'
export  * from './api/ordersApi'
export  * from './api/paymentApi'
export  * from './api/productApi'
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
export { default as CollectionPageVTwo } from "./pages/collections/CollectionPageVTwo"
export { default as SettingsPage } from "./pages/settings/SettingsPage"
export { default as WelcomePageTwo } from "./pages/welcome/WelcomePageTwo"
export { default as ClientOrderCard } from "./pages/client-order/ClientOrderCard"
export { default as CartPageVOne } from "./pages/cart/CartPageVOne"
export { default as ProductDetailsPageVThree } from "./pages/product-details/ProductDetailsPageVThree"
// export { default as ProductDetailsPageVFour } from "./components/pages/product-details/ProductDetailsPageVFour"
export { default as ProductDetailsPageVFour } from "./pages/product-details/ProductDetailsPageVFour"




// Component 
export { default as HomeDesignOne } from "./components/home/HomeDesignOne"
export { default as HomeDesignTwo } from "./components/home/HomeDesignTwo"

export { default as ProductSearchScreen } from "./components/products/ProductSearchScreen"
export { default as CollectionProductSearchScreen } from "./components/products/CollectionProductSearchScreen"


