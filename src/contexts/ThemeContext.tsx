
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';

// Define the Theme Mode types including 'system' and 'custom'
type ThemeMode = 'light' | 'dark' | 'system' | 'custom';

// Define the structure of the theme context
interface ThemeContextProps {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode, customColors?: any) => void;
  isDarkMode: boolean;
  colors: any; // Holds the colors object from the theme
}

interface ThemeProviderProps {
  children: ReactNode;
  storage: any; // Allow any storage mechanism to be passed in
  storageKey: string; // Key used to store the theme
  customLightTheme?: any; // Custom colors for light theme
  customDarkTheme?: any;  // Custom colors for dark theme
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

// Custom ThemeProvider component that accepts storage, storageKey, and optional custom themes
export const ThemeProvider = ({ children, storage, storageKey, customLightTheme, customDarkTheme }: ThemeProviderProps) => {
  const systemColorScheme = useColorScheme(); // Detect system theme
  const [theme, setThemeState] = useState<ThemeMode>('system'); // Default to system theme
  const [isDarkMode, setIsDarkMode] = useState<boolean>(systemColorScheme === 'dark'); // Check if dark mode is active
  const [customColors, setCustomColors] = useState<any>(null); // State for custom colors

  // Load theme from storage on component mount
  useEffect(() => {
    const loadStoredTheme = async () => {
      try {
        const storedTheme = await storage.getItem(storageKey);
        if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system' || storedTheme === 'custom')) {
          setThemeState(storedTheme as ThemeMode); // Set stored theme if available
        }
        const storedCustomColors = await storage.getItem(`${storageKey}_customColors`);
        if (storedCustomColors) {
          setCustomColors(JSON.parse(storedCustomColors));
        }
      } catch (error) {
        console.error('Failed to load stored theme:', error);
      }
    };

    loadStoredTheme();
  }, [storage, storageKey]);

  // Save theme and custom colors to storage whenever it changes
  useEffect(() => {
    const saveTheme = async (newTheme: ThemeMode, newCustomColors?: any) => {
      try {
        await storage.setItem(storageKey, newTheme);
        if (newCustomColors) {
          await storage.setItem(`${storageKey}_customColors`, JSON.stringify(newCustomColors));
        }
      } catch (error) {
        console.error('Failed to save theme:', error);
      }
    };

    if (theme === 'custom' && customColors) {
      saveTheme(theme, customColors);
    } else {
      saveTheme(theme);
    }
  }, [theme, customColors, storage, storageKey]);

  // Handle theme updates based on system preferences or manually set theme
  useEffect(() => {
    const darkMode = theme === 'system' ? systemColorScheme === 'dark' : theme === 'dark';
    setIsDarkMode(darkMode);
  }, [theme, systemColorScheme]);

  // Extend default themes with custom colors
  const extendedDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      ...customDarkTheme,
    },
  };

  const extendedLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...customLightTheme,
    },
  };

  const currentTheme = theme === 'custom' && customColors
    ? { ...DefaultTheme, colors: { ...customColors } } // Use custom colors for custom theme
    : isDarkMode
    ? extendedDarkTheme
    : extendedLightTheme;

  // Update the theme and custom colors and save to storage
  const setTheme = (newTheme: ThemeMode, newCustomColors?: any) => {
    setThemeState(newTheme);
    if (newCustomColors) {
      setCustomColors(newCustomColors);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDarkMode, colors: currentTheme.colors }}>
      <NavigationThemeProvider value={currentTheme}>
        {children}
      </NavigationThemeProvider>
    </ThemeContext.Provider>
  );
};









// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { useColorScheme } from 'react-native';
// import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';

// // Define the Theme Mode types including 'system'
// type ThemeMode = 'light' | 'dark' | 'system';

// // Define the structure of the theme context
// interface ThemeContextProps {
//   theme: ThemeMode;
//   setTheme: (mode: ThemeMode) => void;
//   isDarkMode: boolean;
//   colors: any; // Holds the colors object from the theme
// }

// interface ThemeProviderProps {
//   children: ReactNode;
//   storage: any; // Allow any storage mechanism to be passed in
//   storageKey: string; // Key used to store the theme
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

// // Custom ThemeProvider component that accepts storage and storageKey as props
// export const ThemeProvider = ({ children, storage, storageKey }: ThemeProviderProps) => {
//   const systemColorScheme = useColorScheme(); // Detect system theme
//   const [theme, setThemeState] = useState<ThemeMode>('system'); // Default to system theme
//   const [isDarkMode, setIsDarkMode] = useState<boolean>(systemColorScheme === 'dark'); // Check if dark mode is active

//   // Load theme from storage on component mount
//   useEffect(() => {
//     const loadStoredTheme = async () => {
//       try {
//         const storedTheme = await storage.getItem(storageKey);
//         if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system')) {
//           setThemeState(storedTheme as ThemeMode); // Set stored theme if available
//         }
//       } catch (error) {
//         console.error('Failed to load stored theme:', error);
//       }
//     };

//     loadStoredTheme();
//   }, [storage, storageKey]);

//   // Save theme to storage whenever it changes
//   useEffect(() => {
//     const saveTheme = async (newTheme: ThemeMode) => {
//       try {
//         await storage.setItem(storageKey, newTheme);
//       } catch (error) {
//         console.error('Failed to save theme:', error);
//       }
//     };

//     saveTheme(theme);
//   }, [theme, storage, storageKey]);

//   // Handle theme updates based on system preferences or manually set theme
//   useEffect(() => {
//     const darkMode = theme === 'system' ? systemColorScheme === 'dark' : theme === 'dark';
//     setIsDarkMode(darkMode);
//   }, [theme, systemColorScheme]);

//   // Set the current theme based on dark mode or light mode
//   const currentTheme = isDarkMode ? DarkTheme : DefaultTheme;

//   // Update the theme and save to storage
//   const setTheme = (newTheme: ThemeMode) => {
//     setThemeState(newTheme);
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme, isDarkMode, colors: currentTheme.colors }}>
//       <NavigationThemeProvider value={currentTheme}>
//         {children}
//       </NavigationThemeProvider>
//     </ThemeContext.Provider>
//   );
// };


// not broken
// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { useColorScheme } from 'react-native';
// import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';

// // Define the Theme Mode types including 'system'
// type ThemeMode = 'light' | 'dark' | 'system';

// // Define the structure of the theme context
// interface ThemeContextProps {
//   theme: ThemeMode;
//   setTheme: (mode: ThemeMode) => void;
//   isDarkMode: boolean;
//   colors: any; // Holds the colors object from the theme
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

// // Custom ThemeProvider component
// export const ThemeProvider = ({ children }: { children: ReactNode }) => {
//   const systemColorScheme = useColorScheme(); // Detect system theme
//   const [theme, setTheme] = useState<ThemeMode>('system'); // Default to system theme
//   const [isDarkMode, setIsDarkMode] = useState<boolean>(systemColorScheme === 'dark'); // Check if dark mode is active

//   // Handle theme updates based on system preferences or manually set theme
//   useEffect(() => {
//     const darkMode = theme === 'system' ? systemColorScheme === 'dark' : theme === 'dark';
//     setIsDarkMode(darkMode);
//   }, [theme, systemColorScheme]);

//   // Set the current theme based on dark mode or light mode
//   const currentTheme = isDarkMode ? DarkTheme : DefaultTheme;

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme, isDarkMode, colors: currentTheme.colors }}>
//       <NavigationThemeProvider value={currentTheme}>
//         {children}
//       </NavigationThemeProvider>
//     </ThemeContext.Provider>
//   );
// };











// import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import { useColorScheme } from 'react-native';

// type ThemeMode = 'light' | 'dark' | 'system'; // Include 'system'

// interface ThemeContextProps {
//   theme: ThemeMode;
//   setTheme: (mode: ThemeMode) => void;
//   isDarkMode: boolean;
//   toggleTheme: () => void;
//   themeValue: any; // The actual theme values for light, dark, and system modes
// }

// interface ThemeProviderProps {
//   children: ReactNode;
//   value: any; // The current theme values (light, dark theme objects)
//   storage: {
//     getItem: (key: string) => Promise<string | null>;
//     setItem: (key: string, value: string) => Promise<void>;
//   }; // Storage mechanism (e.g., AsyncStorage)
//   storageKey: string;
// }

// const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };

// export const ThemeProvider = ({ children, value, storage, storageKey }: ThemeProviderProps) => {
//   const systemColorScheme = useColorScheme(); // Get system color scheme (light/dark)
//   const [theme, setTheme] = useState<ThemeMode>('light'); // Default to light theme
//   const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

//   // Function to update theme and persist in storage
//   const updateTheme = (mode: ThemeMode) => {
//     setTheme(mode);
//     storage.setItem(storageKey, mode); // Save to storage
//   };

//   // Load the saved theme from storage on mount
//   useEffect(() => {
//     const loadTheme = async () => {
//       const savedTheme = await storage.getItem(storageKey);
//       if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
//         setTheme(savedTheme as ThemeMode);
//       }
//     };
//     loadTheme();
//   }, [storage, storageKey]);

//   // Automatically switch to system theme if 'system' is selected
//   useEffect(() => {
//     const applySystemTheme = theme === 'system' ? systemColorScheme === 'dark' : theme === 'dark';
//     setIsDarkMode(applySystemTheme);
//   }, [theme, systemColorScheme]);

//   return (
//     <ThemeContext.Provider
//       value={{ theme, setTheme: updateTheme, isDarkMode, toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'), themeValue: value }}
//     >
//       {children}
//     </ThemeContext.Provider>
//   );
// };


// import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import { useColorScheme } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// type ThemeMode = 'light' | 'dark' | 'system';

// interface ThemeContextProps {
//   theme: ThemeMode;
//   setTheme: (mode: ThemeMode) => void;
//   isDarkMode: boolean;
//   toggleTheme: () => void;
//   themeValue: any; // Add the themeValue to the context
// }

// interface ThemeProviderProps {
//   children: ReactNode;
//   value: any; // Actual theme value (dark or light theme)
//   storage: typeof AsyncStorage; // Pass storage (AsyncStorage)
//   storageKey: string; // Pass the key for storing the theme
// }

// export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };

// export const ThemeProvider = ({ children, value, storage, storageKey }: ThemeProviderProps) => {
//   const systemColorScheme = useColorScheme();
//   const [theme, setTheme] = useState<ThemeMode>('system');
//   const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

//   // Toggle between light and dark themes
//   const toggleTheme = () => {
//     setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
//   };

//   // Load theme from AsyncStorage
//   const loadSavedTheme = async () => {
//     try {
//       const savedTheme = await storage.getItem(storageKey); // Load theme from AsyncStorage
//       if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
//         setTheme(savedTheme as ThemeMode);
//       }
//     } catch (error) {
//       console.error('Failed to load saved theme:', error);
//     }
//   };

//   // Save theme to AsyncStorage
//   const saveTheme = async (newTheme: ThemeMode) => {
//     try {
//       await storage.setItem(storageKey, newTheme); // Save theme to AsyncStorage
//     } catch (error) {
//       console.error('Failed to save theme:', error);
//     }
//   };

//   // Load saved theme when component mounts
//   useEffect(() => {
//     loadSavedTheme();
//   }, []);

//   // Handle theme changes and saving them
//   useEffect(() => {
//     const isSystemDarkMode = systemColorScheme === 'dark';
//     const darkMode = theme === 'system' ? isSystemDarkMode : theme === 'dark';
//     setIsDarkMode(darkMode);
//     saveTheme(theme); // Save theme changes to storage
//   }, [theme, systemColorScheme]);

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme, isDarkMode, toggleTheme, themeValue: value }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };











// import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import { useColorScheme } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// type ThemeMode = 'light' | 'dark' | 'system';

// interface ThemeContextProps {
//   theme: ThemeMode;
//   setTheme: (mode: ThemeMode) => void;
//   isDarkMode: boolean;
//   toggleTheme: () => void;
//   themeValue: any;
// }

// interface ThemeProviderProps {
//   children: ReactNode;
//   value: any;
//   storage: typeof AsyncStorage; // Pass storage (AsyncStorage)
//   storageKey: string; // Pass the key for storing the theme
// }

// export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };

// export const ThemeProvider = ({ children, value, storage, storageKey }: ThemeProviderProps) => {
//   const systemColorScheme = useColorScheme();
//   const [theme, setTheme] = useState<ThemeMode>('system');
//   const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

//   // Function to toggle between light and dark themes
//   const toggleTheme = () => {
//     setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
//   };

//   // Function to load the saved theme from storage
//   const loadSavedTheme = async () => {
//     try {
//       const savedTheme = await storage.getItem(storageKey); // Load theme from AsyncStorage
//       if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
//         setTheme(savedTheme as ThemeMode);
//       }
//     } catch (error) {
//       console.error('Failed to load saved theme:', error);
//     }
//   };

//   // Function to save the theme to storage
//   const saveTheme = async (newTheme: ThemeMode) => {
//     try {
//       await storage.setItem(storageKey, newTheme); // Save theme to AsyncStorage
//     } catch (error) {
//       console.error('Failed to save theme:', error);
//     }
//   };

//   useEffect(() => {
//     loadSavedTheme(); // Load theme on component mount
//   }, []);

//   useEffect(() => {
//     const isSystemDarkMode = systemColorScheme === 'dark';
//     const darkMode = theme === 'system' ? isSystemDarkMode : theme === 'dark';
//     setIsDarkMode(darkMode);
//     saveTheme(theme); // Save the selected theme whenever it changes
//   }, [theme, systemColorScheme]);

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme, isDarkMode, toggleTheme, themeValue: value }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };























// import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import { useColorScheme } from 'react-native';
// import * as SecureStore from 'expo-secure-store';

// type ThemeMode = 'light' | 'dark' | 'system';

// interface ThemeContextProps {
//   theme: ThemeMode;
//   setTheme: (mode: ThemeMode) => void;
//   isDarkMode: boolean;
//   toggleTheme: () => void;
//   themeValue: any; // Add the themeValue to the context
// }

// export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };

// export const ThemeProvider = ({ children, value }: { children: ReactNode; value: any }) => {
//   const systemColorScheme = useColorScheme();
//   const [theme, setTheme] = useState<ThemeMode>('system');
//   const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
//   };

//   const loadSavedTheme = async () => {
//     try {
//       const savedTheme = await SecureStore.getItemAsync('app-theme');
//       if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
//         setTheme(savedTheme as ThemeMode);
//       }
//     } catch (error) {
//       console.error('Failed to load saved theme:', error);
//     }
//   };

//   const saveTheme = async (newTheme: ThemeMode) => {
//     try {
//       await SecureStore.setItemAsync('app-theme', newTheme);
//     } catch (error) {
//       console.error('Failed to save theme:', error);
//     }
//   };

//   useEffect(() => {
//     loadSavedTheme();
//   }, []);

//   useEffect(() => {
//     const isSystemDarkMode = systemColorScheme === 'dark';
//     const darkMode = theme === 'system' ? isSystemDarkMode : theme === 'dark';
//     setIsDarkMode(darkMode);
//     saveTheme(theme);
//   }, [theme, systemColorScheme]);

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme, isDarkMode, toggleTheme, themeValue: value }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
