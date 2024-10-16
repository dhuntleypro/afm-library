import { useTheme } from '@/contexts/ThemeContext';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Alert, Button } from 'react-native';

interface CookieSettings {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookiesPage() {
  const { colors } = useTheme(); // Access theme colors
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    essential: true, // Always enabled
    analytics: false,
    marketing: false,
  });

  // Update cookie settings state
  const toggleSetting = (key: keyof CookieSettings) => {
    if (key === 'essential') return; // Essential cookies can't be disabled
    setCookieSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const saveSettings = () => {
    Alert.alert('Settings Saved', 'Your cookie preferences have been saved.');
  };

  useEffect(() => {
    // Fetch and set saved cookie preferences from AsyncStorage or API here, if necessary
    console.log('Fetching saved cookie settings...');
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>Manage Cookies</Text>

      <View style={styles.cookieRow}>
        <Text style={[styles.cookieLabel, { color: colors.text }]}>Essential Cookies</Text>
        <Switch
          value={cookieSettings.essential}
          onValueChange={() => toggleSetting('essential')}
          disabled={true} // Essential cookies can't be toggled
        />
      </View>

      <View style={styles.cookieRow}>
        <Text style={[styles.cookieLabel, { color: colors.text }]}>Analytics Cookies</Text>
        <Switch
          value={cookieSettings.analytics}
          onValueChange={() => toggleSetting('analytics')}
        />
      </View>

      <View style={styles.cookieRow}>
        <Text style={[styles.cookieLabel, { color: colors.text }]}>Marketing Cookies</Text>
        <Switch
          value={cookieSettings.marketing}
          onValueChange={() => toggleSetting('marketing')}
        />
      </View>

      <Button title="Save Preferences" color={colors.primary} onPress={saveSettings} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cookieRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  cookieLabel: {
    fontSize: 18,
  },
});
