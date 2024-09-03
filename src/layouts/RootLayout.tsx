import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import CoreLayout from './CoreLayout';

 const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      {/* <CartProvider>
        <ClientStoreProvider>
          <CollectionProvider>
            <ClientProductProvider>
              <OrderProvider> */}
                {children}
              {/* </OrderProvider>
            </ClientProductProvider>
          </CollectionProvider>
        </ClientStoreProvider>
      </CartProvider> */}
    </AuthProvider>
  );
};


export function RootLayout() {
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


