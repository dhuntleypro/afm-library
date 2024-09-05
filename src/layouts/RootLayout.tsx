import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import CoreLayout from './CoreLayout';
import { CartProvider } from '@/contexts/CartContext';
import { ClientStoreProvider } from '@/contexts/ClientStoreContext';
import { ClientCollectionProvider } from '@/contexts/CollectionContext';
import { ClientProductProvider } from '@/contexts/ClientProductContext';
import { OrderProvider } from '@/contexts/OrderContext';

 const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <CartProvider>
        <ClientStoreProvider>
          <ClientCollectionProvider>
            <ClientProductProvider>
              <OrderProvider>
                {children}
              </OrderProvider>
            </ClientProductProvider>
          </ClientCollectionProvider>
        </ClientStoreProvider>
      </CartProvider>
    </AuthProvider>
  );
};


export const RootLayout = () => {
  // const { authState } = useAuth(); // DO NOT ADD HERE

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;


  return (
    <AppProviders>
      <ThemeProvider value={theme}>
        <CoreLayout />
      </ThemeProvider>
    </AppProviders>
  );
}


export default RootLayout;
