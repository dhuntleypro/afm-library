import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextProps {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeMode>('system');
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  // Function to toggle between light and dark theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Load saved theme mode from storage (persist the user's choice)
  const loadSavedTheme = async () => {
    const savedTheme = await AsyncStorage.getItem('app-theme');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
      setTheme(savedTheme as ThemeMode);
    }
  };

  // Save theme to AsyncStorage whenever it changes
  const saveTheme = async (newTheme: ThemeMode) => {
    await AsyncStorage.setItem('app-theme', newTheme);
  };

  // Set theme based on system preferences or user choice
  useEffect(() => {
    loadSavedTheme();
  }, []);

  useEffect(() => {
    const isSystemDarkMode = systemColorScheme === 'dark';
    const darkMode = theme === 'system' ? isSystemDarkMode : theme === 'dark';
    setIsDarkMode(darkMode);

    // Save theme choice to AsyncStorage
    saveTheme(theme);
  }, [theme, systemColorScheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDarkMode, toggleTheme }}>
      {/* Wrap NavigationContainer with the correct theme */}
      <NavigationContainer theme={isDarkMode ? NavigationDarkTheme : NavigationDefaultTheme}>
        {children}
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};
