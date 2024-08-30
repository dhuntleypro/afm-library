
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



// COMPONENTS BELOW
// COMPONENTS BELOW
// COMPONENTS BELOW
// COMPONENTS BELOW
// COMPONENTS BELOW
// COMPONENTS BELOW
// COMPONENTS BELOW
// COMPONENTS BELOW
// COMPONENTS BELOW
// COMPONENTS BELOW
// COMPONENTS BELOW
// COMPONENTS BELOW




// Banner Components
export { default as BannerVOne } from './components/banner/BannerVOne';
export { default as PromoBannerCard } from './components/banner/PromoBannerCard';

// Button Components
export { default as MyPressable } from './components/buttons/MyPressable';
export { default as WhiteButton } from './components/buttons/WhiteButton';

// Card Components
export { default as ProductCardV2 } from './components/card/ProductCardV2';
export { default as ProductCardView } from './components/card/ProductCardView';
export { default as TalentCard } from './components/card/TalentCard';

// Delete Components
export { default as DeleteSectionView } from './components/delete/DeleteSectionView';

// Divider Components
export { default as Divider } from './components/divider/Divider';

// Extract Components
export { default as ExtractSetting } from './components/extract/ExtractSetting';

// Home Components
export { default as HomeDesignOne } from './components/home/HomeDesignOne';
export { default as HomeDesignTwo } from './components/home/HomeDesignTwo';
export { default as TopHomeSeaction } from './components/home/TopHomeSeaction';

// Interfaces
// export  FormImport from './components/interfaces/FormImport';
export { default as MyAlert } from './components/interfaces/MyAlert';
// export { default as MyButtonProps } from './components/interfaces/MyButtonProps';


// Layout Components
export { default as AuthLayout } from './components/layouts/AuthLayout';
export { default as CoreLayout } from './components/layouts/CoreLayout';
export { default as RootLayout } from './components/layouts/RootLayout';
export { default as TabLayout } from './components/layouts/TabLayout';

// Link Components
export { default as SettingsItemLink } from './components/link/SettingsItemLink';

// Pages - Cart Components
export { default as CartPageVOne } from './components/pages/cart/CartPageVOne';
export { default as PaymentPayScreen } from './components/pages/cart/PaymentPayScreen';

// Pages - Client Order Components
export { default as ClientNoOrdersView } from './components/pages/client-order/ClientNoOrdersView';
export { default as ClientOrderCard } from './components/pages/client-order/ClientOrderCard';
export { default as ClientOrderDetails } from './components/pages/client-order/ClientOrderDetails';
export { default as ClientOrdersView } from './components/pages/client-order/ClientOrdersView';
export { default as CreateClientOrderView } from './components/pages/client-order/CreateClientOrderView';

// Pages - Client Product Components
export { default as ClientProductCard } from './components/pages/client-product/ClientProductCard';
export { default as ClientProductDetails } from './components/pages/client-product/ClientProductDetails';
export { default as ClientProductsView } from './components/pages/client-product/ClientProductsView';
export { default as CreateClientProductView } from './components/pages/client-product/CreateClientProductView';


// Pages - Collections Components
export { default as CollectionPageVOne } from './components/pages/collections/CollectionPageVOne';
export { default as CollectionPageVTwo } from './components/pages/collections/CollectionPageVTwo';

// Pages - Home Components
export { default as Carousel } from './components/pages/home/Carousel';
export { default as Headings } from './components/pages/home/Headings';
// export { default as Sidebar } from './components/pages/home/Sidebar';
// export { default as TopSectionHeader } from './components/pages/home/TopSectionHeader';

// Pages - Login Components
export { default as LoginComponentOne } from './components/pages/login/LoginComponentOne';
export { default as LoginComponentTwo } from './components/pages/login/LoginComponentTwo';

// Pages - Onboarding Components
export { default as OnboardingPageThree } from './components/pages/onboarding/OnboardingPageThree';
export { default as OnboardingPageTwo } from './components/pages/onboarding/OnboardingPageTwo';
export { default as OnboardingScreen } from './components/pages/onboarding/OnboardingScreen';

// Pages - Product Details Components
export { default as ProductDetailsPageVOne } from './components/pages/product-details/ProductDetailsPageVOne';
export { default as ProductDetailsPageVThree } from './components/pages/product-details/ProductDetailsPageVThree';
export { default as ProductDetailsPageVTwo } from './components/pages/product-details/ProductDetailsPageVTwo';

// Pages - Register Components
export { default as RegisterComponentTwo } from './components/pages/register/RegisterComponentTwo';

// Pages - Settings Components
export { default as SettingsPage } from './components/pages/settings/SettingsPage';
export { default as SettingsPageWeb } from './components/pages/settings/SettingsPage.web';

// Pages - Welcome Components
export { default as WelcomePageOne } from './components/pages/welcome/WelcomePageOne';
export { default as WelcomePageTwo } from './components/pages/welcome/WelcomePageTwo';
// export { default as ChildishView } from './components/pages/welcome/ChildishView';
// export { default as SplashScreenView } from './components/pages/welcome/SplashScreenView';

// // Pages - Search Components
// export { default as SearchBar } from './components/pages/search/SearchBar';
// export { default as SearchBarVOne } from './components/pages/search/SearchBarVOne';
// export { default as SearchBarVOneButton } from './components/pages/search/SearchBarVOneButton';
// export { default as SearchBarVOneButtonFliter } from './components/pages/search/SearchBarVOneButtonFliter';
// export { default as SearchBarVOneWList } from './components/pages/search/SearchBarVOneWList';

// // Pages - TestViews Components
// export { default as AccountPage } from './components/pages/TestViews/AccountPage';

// Pages - Textfield Components
// export { default as TextFieldVOne } from './components/pages/textfield/TextFieldVOne';

