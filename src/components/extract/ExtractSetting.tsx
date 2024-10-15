import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AWS_HOLDER_IMAGE } from '@/utils/api';
// import Colors from '@/constants/Colors';
import { COLORS } from '@/utils/theme';
import { useAuth } from '@/contexts/AuthContext';
import SearchBarVOne from '@/components/search/SearchBarVOne';
import BannerVOne from '../banner/BannerVOne';
import TalentCard from '../card/TalentCard';

const ExtractSettings = () => {

  const {authState} = useAuth()
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>        
        {/* Banner Section */}
        <BannerVOne />

        {/* Search Section */}
        <SearchBarVOne />
    
        {/* Talent Card */}
        <TalentCard />

      </ScrollView>
    </View>
  );
};

export default ExtractSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  scrollViewContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
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
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  filterIcon: {
    marginLeft: 10,
  },

  arrow : {
    marginLeft: 10,
    marginTop: 3,

  },
  talentCount: {
    fontSize: 14,
    color: '#A0A0A0',
    marginBottom: 20,
  },
  talentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  talentInfo: {
    marginBottom: 20,
  },
  talentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  talentTitle: {
    fontSize: 14,
    color: '#A0A0A0',
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  socialIcon: {
    marginRight: 10,
  },
  recommendation: {
    fontSize: 14,
    color: '#A0A0A0',
    marginBottom: 20,
  },
  experienceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  experienceLabel: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  experienceValue: {
    fontSize: 14,
    color: '#000',
  },
  openToSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  openToLabel: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  openToValue: {
    fontSize: 14,
    color: '#000',
  },
  skillsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  skill: {
    fontSize: 14,
    color: '#4A90E2',
    backgroundColor: '#EAF4FE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  chatButton: {
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  chatButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
