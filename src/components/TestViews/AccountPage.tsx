
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/contexts/AuthContext';

const AccountPage = () => {
  const {authState } = useAuth()
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Account</Text>
        <Ionicons name="qr-code-outline" size={24} color="black" />
      </View>

      <View style={styles.profileSection}>
        <Image
          source={{ uri: authState?.user?.profile_image ?? 'https://example.com/profile-picture-url' }} // replace with actual image URL
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Ali Husni ✨</Text>
      </View>

      <View style={styles.spendingOverview}>
        <Text style={styles.spendingTitle}>Spending Overview</Text>
        <Text style={styles.spendingAmount}>$12,521.10</Text>
        <Text style={styles.spendingGoal}>From $20,000.00</Text>

        <View style={styles.progressBar}>
          <View style={styles.progressSubscription} />
          <View style={styles.progressFamily} />
        </View>

        <View style={styles.spendingDetails}>
          <View style={styles.spendingRow}>
            <View style={styles.dot} />
            <Text>Subscription</Text>
            <Text style={styles.spendingAmountDetail}>$8,221.00</Text>
          </View>
          <View style={styles.spendingRow}>
            <View style={styles.dot} />
            <Text>Friend & Family</Text>
            <Text style={styles.spendingAmountDetail}>$4,300.10</Text>
          </View>
        </View>
      </View>

      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.inviteFriends}
      >
        <Text style={styles.inviteText}>Invite Friends</Text>
        <Text style={styles.inviteDescription}>
          Invite your friends to managing their finances and get $100 each.
        </Text>
        <Ionicons name="person-add-outline" size={24} color="white" />
      </LinearGradient>

      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="person-outline" size={24} color="black" />
          <Text style={styles.menuText}>My Account</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="document-text-outline" size={24} color="black" />
          <Text style={styles.menuText}>Transaction History</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="lock-closed-outline" size={24} color="black" />
          <Text style={styles.menuText}>Security Settings</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="settings-outline" size={24} color="black" />
          <Text style={styles.menuText}>General Settings</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AccountPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  spendingOverview: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
  },
  spendingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  spendingAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
  },
  spendingGoal: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  progressBar: {
    flexDirection: 'row',
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginBottom: 10,
  },
  progressSubscription: {
    flex: 2,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  progressFamily: {
    flex: 1,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  spendingDetails: {
    marginTop: 10,
  },
  spendingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    marginRight: 10,
  },
  spendingAmountDetail: {
    fontWeight: 'bold',
  },
  inviteFriends: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
  },
  inviteText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  inviteDescription: {
    color: 'white',
    flex: 1,
    marginHorizontal: 10,
  },
  menuSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    // paddingVertical: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
});









// import React, { useState } from 'react';
// import { View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView, Alert, Linking } from 'react-native';
// import { COLORS, SIZES } from '@/utils/theme';
// import { Ionicons } from '@expo/vector-icons';
// import { useColorScheme } from '@/hooks/useColorScheme';

// const SettingsPage = () => {
//   const colorScheme = useColorScheme();
//   const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//     // Add logic here to save the dark mode preference, such as storing in async storage or updating global state
//   };

//   const openPrivacyPolicy = () => {
//     const url = 'https://your-privacy-policy-url.com';
//     Linking.openURL(url).catch(() => {
//       Alert.alert('Error', 'Failed to open the privacy policy.');
//     });
//   };

//   // to give isDark access just bring this above the return
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       // backgroundColor: COLORS.lightGray,
//       padding: SIZES.medium,
//     },
//     darkContainer: {
//       backgroundColor: COLORS.gray,
//     },
//     header: {
//       fontSize: SIZES.large,
//       fontWeight: 'bold',
//       marginBottom: SIZES.large,
//       color: COLORS.primary,
//     },
//     darkText: {
//       color: COLORS.white,
//     },
//     settingItem: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       backgroundColor: COLORS.white,
//       padding: SIZES.medium,
//       borderRadius: SIZES.small,
//       marginBottom: SIZES.small,
//       shadowColor: COLORS.black,
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.1,
//       shadowRadius: 4,
//       elevation: 5,
//     },
//     settingText: {
//       fontSize: SIZES.medium,
//       color:  isDarkMode ? COLORS.primary : COLORS.secondary,
//     },
//   });
  
//   return (
//     // <ScrollView style={[styles.container, isDarkMode && styles.darkContainer]}>
//     <ScrollView style={styles.container}>
//     <Text style={styles.header}>Settings</Text>

//       <View style={styles.settingItem}>
//         <Text style={styles.settingText}>Dark Mode</Text>
//         <Switch
//           value={isDarkMode}
//           onValueChange={toggleDarkMode}
//           thumbColor={isDarkMode ? COLORS.white : COLORS.gray}
//           trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
//         />
//       </View>

//       <TouchableOpacity style={styles.settingItem} onPress={openPrivacyPolicy}>
//         <Text style={styles.settingText}>Privacy Policy</Text>
//         <Ionicons name="earth" size={20} color={isDarkMode ? COLORS.white : COLORS.primary} />
//       </TouchableOpacity>

//       {/* Add more settings items here */}
//       <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert('Terms of Use', 'Terms of Use')}>
//         <Text style={styles.settingText}>Terms of Use</Text>
//         <Ionicons name="earth" size={20} color={isDarkMode ? COLORS.white : COLORS.primary} />
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert('About', 'About this app')}>
//         <Text style={styles.settingText}>About</Text>
//         <Ionicons name="earth" size={20} color={isDarkMode ? COLORS.white : COLORS.primary} />
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };



// export default SettingsPage;














// import { Button, StyleSheet, Text, View } from 'react-native'
// import React, { useContext } from 'react'
// import CustomLink from '../../CustomLink'
// import { useAuth } from '@/contexts/AuthContext'
// import { CartContext } from '@/contexts/CartContext'
// import { router } from 'expo-router'

// const SettingsPage = () => {
//   const { carts, totalSum, totalShipping, totalTax, grandTotal, quantity, deleteItemFromCart, clearData, decreaseFromCart } = useContext(CartContext);

//   const {authState , onLogout } = useAuth()


//   const handleLogout = async () => {
//     console.log("User Logged out 1");
//     if (onLogout) {
//       console.log("User Logged out");
//       await onLogout();
//       clearData;
//       router.replace('/login')
//       // navigation.navigate('LoginScreen'); // Navigate to login or another screen after logout
//     } else {
//       console.log("User Logged out else");
//       await onLogout;
//     }
//   };

//   console.log(authState?.user?.store_owner_id)
//   return (
//     <View>
//       <Text>SettingsView</Text>
//       <Text>{authState?.user?.name}</Text>
//       <Text>{authState?.user?.store_owner_id}</Text>

//       <CustomLink url={'/login'} title={'sign out'} replace />

      
//       <Button onPress={handleLogout} title="Sign out" />  
//     </View>
//   )
// }

// export default SettingsPage

// const styles = StyleSheet.create({})