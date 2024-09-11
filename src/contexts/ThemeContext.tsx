import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';

// Define the Theme Mode types
type ThemeMode = 'light' | 'dark' | 'system';

export interface StoreTheme {
  light: {
    pageBackground: string;
    pageText: string;
    buttonBackground: string;
    buttonText: string;
    buttonShadow: string;
    tint: string;
    tabIconDefault: string;
    tabIconSelected: string;
    cardBackground: string;
    cardText: string;
    cardSecondaryText: string;
    cardPrice: string;
    cardBorder: string;
    background: string;
    title: string;
    subtitle: string; 
    border: string;
    card: string;
    primary: string;
    secondary: string;
  };
  dark: {
    pageBackground: string;
    pageText: string;
    buttonBackground: string;
    buttonText: string;
    buttonShadow: string;
    tint: string;
    tabIconDefault: string;
    tabIconSelected: string;
    cardBackground: string;
    cardText: string;
    cardSecondaryText: string;
    cardPrice: string;
    cardBorder: string;
    background: string;
    title: string;
    subtitle: string
    border: string;
    card: string;
    primary: string;
    secondary: string;
  };
}

// Define the structure of the theme context
interface ThemeContextProps {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  isDarkMode: boolean;
  colors: StoreTheme['light'] | StoreTheme['dark']; // Dynamically chooses based on the current mode
}

interface ThemeProviderProps {
  children: ReactNode;
  storeTheme: StoreTheme; // Store theme overrides
  storage: any; // Allow any storage mechanism to be passed in
  storageKey: string; // Key used to store the theme
}

// Create the ThemeContext
export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Hook to easily use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Custom ThemeProvider component that accepts storeTheme, storage, and storageKey as props
export const ThemeProvider = ({ children, storeTheme, storage, storageKey }: ThemeProviderProps) => {
  const systemColorScheme = useColorScheme(); // Detect system theme
  const [theme, setThemeState] = useState<ThemeMode>('system'); // Default to system theme
  const [isDarkMode, setIsDarkMode] = useState<boolean>(systemColorScheme === 'dark'); // Check if dark mode is active

  // Load theme from storage on component mount
  useEffect(() => {
    const loadStoredTheme = async () => {
      try {
        const storedTheme = await storage.getItem(storageKey);
        if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system')) {
          setThemeState(storedTheme as ThemeMode); // Set stored theme if available
        }
      } catch (error) {
        console.error('Failed to load stored theme:', error);
      }
    };

    loadStoredTheme();
  }, [storage, storageKey]);

  // Save theme to storage whenever it changes
  useEffect(() => {
    const saveTheme = async (newTheme: ThemeMode) => {
      try {
        await storage.setItem(storageKey, newTheme);
      } catch (error) {
        console.error('Failed to save theme:', error);
      }
    };

    saveTheme(theme);
  }, [theme, storage, storageKey]);

  // Handle theme updates based on system preferences or manually set theme
  useEffect(() => {
    const darkMode = theme === 'system' ? systemColorScheme === 'dark' : theme === 'dark';
    setIsDarkMode(darkMode);
  }, [theme, systemColorScheme]);

  // Merge store-specific theme with default theme
  const currentTheme = isDarkMode
    ? { ...DarkTheme, colors: { ...DarkTheme.colors, ...storeTheme.dark } }
    : { ...DefaultTheme, colors: { ...DefaultTheme.colors, ...storeTheme.light } };

  // Update the theme and save to storage
  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDarkMode, colors: currentTheme.colors }}>
      <NavigationThemeProvider value={currentTheme}>
        {children}
      </NavigationThemeProvider>
    </ThemeContext.Provider>
  );
};







// working but no custom colors
// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { useColorScheme } from 'react-native';
// import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';

// // Define the Theme Mode types including 'system' and 'custom'
// type ThemeMode = 'light' | 'dark' | 'system' | 'custom';

// // Define the structure of the theme context
// interface ThemeContextProps {
//   theme: ThemeMode;
//   setTheme: (mode: ThemeMode, customColors?: any) => void;
//   isDarkMode: boolean;
//   colors: any; // Holds the colors object from the theme
// }

// interface ThemeProviderProps {
//   children: ReactNode;
//   storage: any; // Allow any storage mechanism to be passed in
//   storageKey: string; // Key used to store the theme
//   customLightTheme?: any; // Custom colors for light theme
//   customDarkTheme?: any;  // Custom colors for dark theme
// }

// // Create the ThemeContext
// export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// // Hook to easily use the theme context
// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };

// // Custom ThemeProvider component that accepts storage, storageKey, and optional custom themes
// export const ThemeProvider = ({ children, storage, storageKey, customLightTheme, customDarkTheme }: ThemeProviderProps) => {
//   const systemColorScheme = useColorScheme(); // Detect system theme
//   const [theme, setThemeState] = useState<ThemeMode>('system'); // Default to system theme
//   const [isDarkMode, setIsDarkMode] = useState<boolean>(systemColorScheme === 'dark'); // Check if dark mode is active
//   const [customColors, setCustomColors] = useState<any>(null); // State for custom colors

//   // Load theme from storage on component mount
//   useEffect(() => {
//     const loadStoredTheme = async () => {
//       try {
//         const storedTheme = await storage.getItem(storageKey);
//         if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system' || storedTheme === 'custom')) {
//           setThemeState(storedTheme as ThemeMode); // Set stored theme if available
//         }
//         const storedCustomColors = await storage.getItem(`${storageKey}_customColors`);
//         if (storedCustomColors) {
//           setCustomColors(JSON.parse(storedCustomColors));
//         }
//       } catch (error) {
//         console.error('Failed to load stored theme:', error);
//       }
//     };

//     loadStoredTheme();
//   }, [storage, storageKey]);

//   // Save theme and custom colors to storage whenever it changes
//   useEffect(() => {
//     const saveTheme = async (newTheme: ThemeMode, newCustomColors?: any) => {
//       try {
//         await storage.setItem(storageKey, newTheme);
//         if (newCustomColors) {
//           await storage.setItem(`${storageKey}_customColors`, JSON.stringify(newCustomColors));
//         }
//       } catch (error) {
//         console.error('Failed to save theme:', error);
//       }
//     };

//     if (theme === 'custom' && customColors) {
//       saveTheme(theme, customColors);
//     } else {
//       saveTheme(theme);
//     }
//   }, [theme, customColors, storage, storageKey]);

//   // Handle theme updates based on system preferences or manually set theme
//   useEffect(() => {
//     const darkMode = theme === 'system' ? systemColorScheme === 'dark' : theme === 'dark';
//     setIsDarkMode(darkMode);
//   }, [theme, systemColorScheme]);

//   // Extend default themes with custom colors
//   const extendedDarkTheme = {
//     ...DarkTheme,
//     colors: {
//       ...DarkTheme.colors,
//       ...customDarkTheme,
//     },
//   };

//   const extendedLightTheme = {
//     ...DefaultTheme,
//     colors: {
//       ...DefaultTheme.colors,
//       ...customLightTheme,
//     },
//   };

//   const currentTheme = theme === 'custom' && customColors
//     ? { ...DefaultTheme, colors: { ...customColors } } // Use custom colors for custom theme
//     : isDarkMode
//     ? extendedDarkTheme
//     : extendedLightTheme;

//   // Update the theme and custom colors and save to storage
//   const setTheme = (newTheme: ThemeMode, newCustomColors?: any) => {
//     setThemeState(newTheme);
//     if (newCustomColors) {
//       setCustomColors(newCustomColors);
//     }
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme, isDarkMode, colors: currentTheme.colors }}>
//       <NavigationThemeProvider value={currentTheme}>
//         {children}
//       </NavigationThemeProvider>
//     </ThemeContext.Provider>
//   );
// };



