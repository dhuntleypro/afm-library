import { useTheme } from '@/contexts/ThemeContext';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';

// Placeholder for fetching the policy content (you can replace it with an API call)
const fetchPrivacyPolicy = async (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`
        **Privacy Policy**

        Welcome to our privacy policy page! This Privacy Policy explains how we collect, use, and protect your information when you use our services.

        **1. Information We Collect:**
        - Personal information you provide directly to us.
        - Usage data collected automatically as you use our services.

        **2. How We Use Your Information:**
        - To provide and maintain our service.
        - To communicate with you about your account.

        **3. Data Security:**
        We implement reasonable security measures to protect your data.

        **4. Contact Us:**
        If you have any questions about this Privacy Policy, please contact us at support@example.com.
      `);
    }, 2000); // Simulate a delay to mimic API call
  });
};

export default function PrivacyPolicyPage() {
  const { colors } = useTheme(); // Access theme colors
  const [policyContent, setPolicyContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch privacy policy content on component mount
  useEffect(() => {
    const loadPolicy = async () => {
      try {
        const content = await fetchPrivacyPolicy();
        setPolicyContent(content);
      } catch (error) {
        Alert.alert('Error', 'Failed to load privacy policy. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadPolicy();
  }, []);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>Privacy Policy</Text>
      <Text style={[styles.content, { color: colors.text }]}>{policyContent}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});
