// ----------------------------------
// 1. Layouts
// ----------------------------------

export  { default as HomeLayoutContent}  from './layouts/HomeLayoutContent'
export  { default as AuthLayoutContent}  from './layouts/AuthLayoutContent'
// export  { default as TabLayoutContent}  from './layouts/TabLayoutContent'






// ----------------------------------
// 1. Components
// ----------------------------------

// Banners
export { BannerVOne } from './components/banner/BannerVOne';

// Buttons
export { MyButton } from './components/buttons/MyButton';

// Cards
export { default as OrderCrudCard } from './components/card/order/OrderCrudCard';
export { default as ClientOrderCard } from './pages/tabs/client-order/ClientOrderCard';
export { ProductCardV2 } from './components/card/product/ProductCardV2';
export { default as ProductGridCardVOne  } from './components/card/product/ProductGridCardVOne';
export { ProductHScrollCardVOne } from './components/card/product/ProductHScrollCardVOne';
export type { ProductCardProps } from './components/card/product/ProductGridCardVOne'
export { default as ProductCrudCard } from './components/card/product/ProductCrudCard';
// export { FavoritrCard } from './components/card/fovorite/FavoritrCard'

// Miscellaneous Components
export { default as DeleteSectionView } from './components/delete/DeleteSectionView';
export { default as Divider } from './components/divider/Divider';
export { default as EditScreenInfo } from './components/EditScreenInfo';
export { default as ProductListItem } from './components/products/ProductListItem';
export { default as TextFieldVOne } from './components/textfield/TextFieldVOne';


// ICONs
export { default as CartIcon } from "./components/icons/cartIcon" 

// Pages
export { default as CartPageVOne } from './pages/tabs/cart/CartPageVOne';
export { default as CollectionPageVTwo } from './pages/tabs/collections/CollectionPageVTwo';
export { default as LoginComponentTwo } from './pages/auth/login/LoginComponentTwo';
export { default as ProductDetailsPageVThree  } from './pages/tabs/product-details/ProductDetailsPageVThree';
export type { ProductDetailsPageVThreeProps } from './pages/tabs/product-details/ProductDetailsPageVThree';
export { default as ProductDetailsPageVFour } from './pages/tabs/product-details/ProductDetailsPageVFour';
export { default as RegisterComponentTwo } from './pages/auth/register/RegisterComponentTwo';
export { default as SettingsPage } from './pages/(settings)/settings/SettingsPage';
export { default as WelcomePageTwo } from './pages/auth/welcome/WelcomePageTwo';
export { default as TermsOfUsePage } from './pages/aux/terms-of-use/TermsOfUsePage'
export { default as PrivacyPolicyPage } from './pages/aux/privacy-policy/PrivacyPolicyPage'
export { default as CookiesPage } from './pages/aux/cookies/CookiesPage'
export { default as AppearanceSelection } from './pages/(settings)/appearance/AppearanceSelection'
export { default as FAQPage } from './pages/(settings)/faq/FAQPage'
export { default as FavoritesPageVOne } from './pages/(settings)/favorites/FavoritesPageVOne'
export { default as ProfilePage } from './pages/(settings)/profile/ProfilePage'





// Product Search
export { default as CollectionProductSearchScreen } from './components/products/CollectionProductSearchScreen';
export { default as ProductSearchScreen } from './components/products/ProductSearchScreen';

// Home Designs
export { default as HomeDesignOne } from './components/home/HomeDesignOne';
export { default as HomeDesignTwo } from './components/home/HomeDesignTwo';






// ----------------------------------
// 2. Contexts
// ----------------------------------

export { AuthProvider, useAuth } from './contexts/AuthContext';
export { CartProvider, useCart } from './contexts/CartContext';
export { ClientCollectionProvider, useClientCollection } from './contexts/ClientCollectionContext';
export { ClientOrderProvider, useClientOrder } from './contexts/ClientOrderContext';
export { ClientProductProvider, useClientProduct } from './contexts/ClientProductContext';
export { ClientStoreProvider, useClientStore } from './contexts/ClientStoreContext';
export { FavoriteProvider, useFavorite } from './contexts/FavoriteContext';
export { MankindProductProvider, useMankindProduct } from './contexts/MankindProductContext';
export { MankindStoreProvider, useMankindStore } from './contexts/MankindStoreContext';
export { ThemeProvider, useTheme , StoreTheme} from './contexts/ThemeContext';











// ----------------------------------
// 3. APIs
// ----------------------------------

export * from './api/authentication';
export * from './api/collectionApi';
export * from './api/couponApi';
export * from './api/inboxApi';
export * from './api/mankindProductApi';
export * from './api/mankindStoreApi';
export * from './api/ordersApi';
export * from './api/paymentApi';
export * from './api/productApi';
export * from './api/storeApi';






// ----------------------------------
// 4. Hooks
// ----------------------------------

export { convertToCurrency } from './hooks/convertToCurrency';
export { ExternalLink } from './hooks/ExternalLink';
export { formatPhoneNumber } from './hooks/formatPhoneNumber';
export { generateUUID } from './hooks/generateUUID';
export { stripeConverter } from './hooks/stripeConverter';
export { useClientOnlyValue } from './hooks/useClientOnlyValue';
export { useColorScheme } from './hooks/useColorScheme';






// ----------------------------------
// 5. Models (Types)
// ----------------------------------

export type { CollectionModelProps } from './models/CollectionModelProps';
export type { CouponModelProps } from './models/CouponModelProps';
export type { InboxModelProps } from './models/InboxModelProps';
export type { OrderModelProps } from './models/OrderModelProps';
export type { ProductModelProps } from './models/ProductModelProps';
export type { StoreModelProps } from './models/StoreModelProps';
export type { UserProps } from './models/UserProps';






// ----------------------------------
// 6. Sample Data (Demos)
// ----------------------------------

export * from './model-sample-data/sample-order';
export { SAMPLE_PRODUCT } from './model-sample-data/sample-product';






// ----------------------------------
// 7. Utilities
// ----------------------------------

export * from './utils/api';
export * from './utils/constants';
export * from './utils/pages';
export * from './utils/Routes';
export * from './utils/storage';
export * from './utils/theme';
