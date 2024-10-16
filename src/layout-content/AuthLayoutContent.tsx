import { TabBarIconWithBadge } from "@/components/tab-bar/TabBarIconWithBadge";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useClientProduct } from "@/contexts/ClientProductContext";
import { useClientStore } from "@/contexts/ClientStoreContext";
import { useClientCollection } from "@/contexts/CollectionContext";
import { useTheme } from "@/contexts/ThemeContext";
import { FontAwesome } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function AuthLayoutContent(store_id: string) {
    const { colors } = useTheme(); // Using the theme for colors
    const { authState } = useAuth();
    const { getClientProducts } = useClientProduct();
    const { getClientStore } = useClientStore();
    const { getClientCollections } = useClientCollection();
    const { quantity } = useCart(); // Pull cart quantity from useCart hook
  
    const [isMounted, setIsMounted] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
    // Check user authentication and fetch data accordingly
    useEffect(() => {
      if (!isMounted) return;
  
      const checkAuthStatus = async () => {
        setIsCheckingAuth(true);
        if (authState?.authenticated) {
          console.log('User authenticated, fetching data...');
          await getClientProducts(store_id);
          await getClientStore(store_id);
          await getClientCollections(store_id);
        } else {
          await getClientStore(store_id);
          router.replace('/welcome'); // Redirect to welcome if not authenticated
        }
        setIsCheckingAuth(false);
      };
  
      checkAuthStatus();
    }, [isMounted, authState]);
  
    // Set component as mounted on initial render
    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    // Show loading indicator while checking authentication
    if (isCheckingAuth) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }
  
    return (
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            const iconColor = focused ? colors.tabIconSelected : colors.tabIconDefault;
            let iconName: React.ComponentProps<typeof FontAwesome>['name'] = 'question-circle';
  
            switch (route.name) {
              case '(home)':
                iconName = 'home';
                break;
              case 'collections':
                iconName = 'gift';
                break;
              case 'cart':
                iconName = 'shopping-cart';
                break;
              case '(settings)':
                iconName = 'gear';
                break;
            }
  
            return (
              <TabBarIconWithBadge 
                name={iconName} 
                color={iconColor} 
                quantity={route.name === 'cart' ? quantity : undefined} 
              />
            );
          },
          tabBarActiveTintColor: colors.tabIconSelected,
          tabBarInactiveTintColor: colors.tabIconDefault,
          tabBarStyle: { backgroundColor: colors.background },
          headerShown: false,
        })}
      >
        <Tabs.Screen name="(home)" options={{ title: 'Home' }} />
        <Tabs.Screen name="collections" options={{ title: 'Collections' }} />
        <Tabs.Screen name="cart" options={{ title: 'Cart', headerShown: true }} />
        <Tabs.Screen name="(settings)" options={{ title: 'Settings' }} />
      </Tabs>
    );
  }