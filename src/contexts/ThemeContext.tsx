import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import * as SecureStore from 'expo-secure-store';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextProps {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  themeValue: any; // Add the themeValue to the context
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children, value }: { children: ReactNode; value: any }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeMode>('system');
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const loadSavedTheme = async () => {
    try {
      const savedTheme = await SecureStore.getItemAsync('app-theme');
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
        setTheme(savedTheme as ThemeMode);
      }
    } catch (error) {
      console.error('Failed to load saved theme:', error);
    }
  };

  const saveTheme = async (newTheme: ThemeMode) => {
    try {
      await SecureStore.setItemAsync('app-theme', newTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  useEffect(() => {
    loadSavedTheme();
  }, []);

  useEffect(() => {
    const isSystemDarkMode = systemColorScheme === 'dark';
    const darkMode = theme === 'system' ? isSystemDarkMode : theme === 'dark';
    setIsDarkMode(darkMode);
    saveTheme(theme);
  }, [theme, systemColorScheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDarkMode, toggleTheme, themeValue: value }}>
      {children}
    </ThemeContext.Provider>
  );
};
