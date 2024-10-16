import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  NavigationContainer, 
  DarkTheme as NavigationDarkTheme, 
  DefaultTheme as NavigationDefaultTheme 
} from '@react-navigation/native';

// Define possible theme modes
type ThemeMode = 'light' | 'dark' | 'system';

// Theme context interface to centralize theme-related logic
interface ThemeContextProps {
  theme: ThemeMode; // Current theme mode
  setTheme: (mode: ThemeMode) => void; // Function to set the theme
  toggleTheme: () => void; // Function to toggle theme
  isDarkMode: boolean; // Boolean indicating dark mode status
  colors: { [key: string]: string }; // Dynamic colors based on the current theme
}

// Create the ThemeContext
export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Hook to use the ThemeContext in components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// ThemeProvider to manage and provide theme state
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeMode>('system');
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  // Define colors dynamically based on the theme mode
  const colors = isDarkMode
    ? {
        background: '#000000',
        primary: '#1e90ff',
        tabIconDefault: '#888888',
        tabIconSelected: '#1e90ff',
        text: '#ffffff',
      }
    : {
        background: '#ffffff',
        primary: '#4caf50',
        tabIconDefault: '#999999',
        tabIconSelected: '#4caf50',
        text: '#000000',
      };

  // Toggle theme between light and dark
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    saveTheme(newTheme);
  }, [theme]);

  // Load saved theme mode from AsyncStorage on initial render
  const loadSavedTheme = async () => {
    const savedTheme = await AsyncStorage.getItem('app-theme');
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setTheme(savedTheme as ThemeMode);
    }
  };

  // Save the current theme to AsyncStorage
  const saveTheme = async (newTheme: ThemeMode) => {
    await AsyncStorage.setItem('app-theme', newTheme);
  };

  // Load saved theme on component mount
  useEffect(() => {
    loadSavedTheme();
  }, []);

  // Update dark mode state when the system preference or user choice changes
  useEffect(() => {
    const systemIsDark = systemColorScheme === 'dark';
    const useDarkMode = theme === 'system' ? systemIsDark : theme === 'dark';
    setIsDarkMode(useDarkMode);
  }, [theme, systemColorScheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDarkMode, colors }}>
      <NavigationContainer theme={isDarkMode ? NavigationDarkTheme : NavigationDefaultTheme}>
        {children}
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};







// import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import { useColorScheme } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
// import { StoreTheme } from '@/interfaces/StoreTheme';

// type ThemeMode = 'light' | 'dark' | 'system';


// interface ThemeContextProps {
//   theme: ThemeMode;
//   setTheme: (mode: ThemeMode) => void;
//   isDarkMode: boolean;
//   // colors: StoreTheme['light'] | StoreTheme['dark'];
// }

// export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };

// export const ThemeProvider = ({ children }: { children: ReactNode }) => {
//   const systemColorScheme = useColorScheme();
//   const [theme, setTheme] = useState<ThemeMode>('system');
//   const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

//   // Function to toggle between light and dark theme
//   const toggleTheme = () => {
//     setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
//   };

//   // Load saved theme mode from storage (persist the user's choice)
//   const loadSavedTheme = async () => {
//     const savedTheme = await AsyncStorage.getItem('app-theme');
//     if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
//       setTheme(savedTheme as ThemeMode);
//     }
//   };

//   // Save theme to AsyncStorage whenever it changes
//   const saveTheme = async (newTheme: ThemeMode) => {
//     await AsyncStorage.setItem('app-theme', newTheme);
//   };

//   // Set theme based on system preferences or user choice
//   useEffect(() => {
//     loadSavedTheme();
//   }, []);

//   useEffect(() => {
//     const isSystemDarkMode = systemColorScheme === 'dark';
//     const darkMode = theme === 'system' ? isSystemDarkMode : theme === 'dark';
//     setIsDarkMode(darkMode);

//     // Save theme choice to AsyncStorage
//     saveTheme(theme);
//   }, [theme, systemColorScheme]);

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme, isDarkMode, toggleTheme }}>
//       {/* Wrap NavigationContainer with the correct theme */}
//       <NavigationContainer theme={isDarkMode ? NavigationDarkTheme : NavigationDefaultTheme}>
//         {children}
//       </NavigationContainer>
//     </ThemeContext.Provider>
//   );
// };
