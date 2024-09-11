import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { COLORS, SIZES } from '@/utils/theme';
import { useClientStore } from '@/contexts/ClientStoreContext';
// import { useClientStore,  COLORS, SIZES } from "@dhuntleypro/afm-library"

const TermsOfUsePage = () => {
  const { store } = useClientStore();
  const storeName = store?.store_name || 'Your Store Name';

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.heading}>Terms of Use</Text> */}
      <Text style={styles.paragraph}>
        Welcome to {storeName}. By accessing or using our website or app, you agree to be bound by the following terms and conditions.
      </Text>

      <Text style={styles.subheading}>1. Acceptance of Terms</Text>
      <Text style={styles.paragraph}>
        By accessing our website, you agree to these Terms of Use. If you do not agree, you must not use our site.
      </Text>

      <Text style={styles.subheading}>2. Changes to Terms</Text>
      <Text style={styles.paragraph}>
        {storeName} reserves the right to update or modify these terms at any time without prior notice. Your continued use of the site constitutes your acceptance of the new terms.
      </Text>

      <Text style={styles.subheading}>3. Use of the Site</Text>
      <Text style={styles.paragraph}>
        You agree to use our site for lawful purposes only. Prohibited activities include, but are not limited to:
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>• Violating any laws or regulations.</Text>
        <Text style={styles.listItem}>• Infringing upon our intellectual property rights or the rights of others.</Text>
        <Text style={styles.listItem}>• Transmitting harmful or malicious software.</Text>
      </View>

      <Text style={styles.subheading}>4. Account Information</Text>
      <Text style={styles.paragraph}>
        When you create an account, you agree to provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password.
      </Text>

      <Text style={styles.subheading}>5. Product Information</Text>
      <Text style={styles.paragraph}>
        We strive to display accurate product descriptions and pricing. However, {storeName} does not guarantee that these details are error-free.
      </Text>

      <Text style={styles.subheading}>6. Intellectual Property</Text>
      <Text style={styles.paragraph}>
        All content on this site, including text, graphics, logos, and images, is the property of {storeName} and is protected by copyright laws.
      </Text>

      <Text style={styles.subheading}>7. Termination</Text>
      <Text style={styles.paragraph}>
        We reserve the right to terminate your access to the site at any time, without notice, for any reason, including violation of these terms.
      </Text>

      <Text style={styles.subheading}>8. Limitation of Liability</Text>
      <Text style={styles.paragraph}>
        {storeName} is not liable for any damages arising from the use of our site or products. This includes, but is not limited to, direct, indirect, incidental, or punitive damages.
      </Text>

      <Text style={styles.subheading}>9. Governing Law</Text>
      <Text style={styles.paragraph}>
        These terms are governed by the laws of [Your Jurisdiction]. Any disputes arising from these terms or your use of the site will be resolved in the courts of [Your Jurisdiction].
      </Text>
    </ScrollView>
  );
};

export default TermsOfUsePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.lightWhite,
  },
  heading: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subheading: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: SIZES.small,
    lineHeight: 22,
    color: COLORS.darkGray,
  },
  list: {
    paddingLeft: 20,
    marginBottom: 10,
  },
  listItem: {
    fontSize: SIZES.small,
    lineHeight: 22,
    color: COLORS.darkGray,
  },
});