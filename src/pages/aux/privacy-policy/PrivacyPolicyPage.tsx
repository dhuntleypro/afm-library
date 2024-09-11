import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { COLORS, SIZES } from '@/utils/theme';
import { useClientStore } from '@/contexts/ClientStoreContext';

const PrivacyPolicyPage = () => {
  const { store } = useClientStore();
  const storeName = store?.store_name || 'Your Store Name';

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.heading}>Privacy Policy</Text> */}
      <Text style={styles.paragraph}>
        At {storeName}, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information.
      </Text>

      <Text style={styles.subheading}>1. Information Collection</Text>
      <Text style={styles.paragraph}>
        We collect information that you provide to us when you register on our site, place an order, subscribe to our newsletter, or fill out a form. This may include your name, email address, mailing address, phone number, and payment information.
      </Text>

      <Text style={styles.subheading}>2. Use of Information</Text>
      <Text style={styles.paragraph}>
        The information we collect may be used in the following ways:
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>• To personalize your experience and respond to your individual needs.</Text>
        <Text style={styles.listItem}>• To improve our website based on the information and feedback we receive from you.</Text>
        <Text style={styles.listItem}>• To process transactions efficiently.</Text>
        <Text style={styles.listItem}>• To send periodic emails related to your order or other products and services.</Text>
      </View>

      <Text style={styles.subheading}>3. Sharing of Information</Text>
      <Text style={styles.paragraph}>
        We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties, except to trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
      </Text>

      <Text style={styles.subheading}>4. Security</Text>
      <Text style={styles.paragraph}>
        We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.
      </Text>

      <Text style={styles.subheading}>5. User Rights</Text>
      <Text style={styles.paragraph}>
        You have the right to access, update, or delete your personal information at any time. You may also opt-out of receiving future communications from us by following the unsubscribe instructions included in each email.
      </Text>

      <Text style={styles.subheading}>6. Cookies</Text>
      <Text style={styles.paragraph}>
        We use cookies to enhance your experience, gather general visitor information, and track visits to our website. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies via your browser settings.
      </Text>

      <Text style={styles.subheading}>7. Changes to this Policy</Text>
      <Text style={styles.paragraph}>
        {storeName} reserves the right to update this Privacy Policy at any time. We will notify you of any significant changes by updating the date at the top of this document or via email if you have an account with us.
      </Text>

      <Text style={styles.subheading}>8. Contact Us</Text>
      <Text style={styles.paragraph}>
        If you have any questions about this Privacy Policy, please contact us at [Your Contact Information].
      </Text>
    </ScrollView>
  );
};

export default PrivacyPolicyPage;

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