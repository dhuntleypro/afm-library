import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
// import { COLORS } from '@/utils/theme'
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { COLORS } from '@/utils/theme';

{/* Banner Section */}

export const BannerVOne = () => {
  return (
    <View style={styles.container}>
        <View style={styles.bannerSection}>
          <Text style={styles.bannerTitle}>Customize Your Experience</Text>
          <Text style={styles.bannerSubtitle}>
          Manage your preferences, update account settings, and explore options to tailor your experience to your needs, even things like dark mode.
          </Text>
          <TouchableOpacity style={{ flexDirection: 'row',}} onPress={() => router.push('/appearance' as never)}>
          <Text style={styles.editPreferences}>Dark Mode</Text>
          <Ionicons name="arrow-forward" size={15} color="white" style={styles.arrow} />
          </TouchableOpacity>
        </View>
        </View>
  )
}

export default BannerVOne

const styles = StyleSheet.create({
    container: {
        // padding:16
    },
    bannerSection: {
      backgroundColor: '#1C1C1E',
      borderRadius: 15,
      padding: 20,
      marginBottom: 20,
    },
    bannerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 10,
    },
  
    bannerSubtitle: {
      fontSize: 14,
      color: COLORS.gray3,
      marginBottom: 20,
    },
  
    editPreferences: {
      fontSize: 14,
      color: COLORS.white,
      fontWeight: 'bold',
    },
    
    arrow : {
      marginLeft: 10,
      marginTop: 3,
    },
  });
