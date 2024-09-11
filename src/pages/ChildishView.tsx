import { AWS_BASE_IMAGE } from '@/utils/api';
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const TourPage = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.tourTitle}>CHILDISH GAMBINO</Text>
          <Text style={styles.tourSubtitle}>THE NEW WORLD TOUR</Text>
          <Text style={styles.tourDates}>August 11 - February 11, 2024</Text>
          <Text style={styles.eventCount}>58 Events</Text>
       

        {/* Tour Details Section */}
          <Image
            source={{ uri: AWS_BASE_IMAGE }} // Replace with actual image URL
            style={styles.tourImage}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Date: August 11, 2024</Text>
            <Text style={styles.infoText}>Location: Oklahoma, USA</Text>
            <Text style={styles.infoText}>Price From: $55.00</Text>
          </View>
          <Text style={styles.detailsButton}>DETAILS</Text>
          <Image
            source={{ uri: 'https://example.com/tour-poster-url' }} // Replace with actual image URL
            style={styles.tourImage}
          />
        </View>

        {/* Promotion Section */}
        <View style={styles.promoSection}>
          <Image
            source={{ uri: 'https://example.com/illustration-url' }} // Replace with actual image URL
            style={styles.promoImage}
          />
          <Text style={styles.promoTextHeader}>
            STILL WASTING TIME LOOKING FOR TICKETS?
          </Text>
          <Text style={styles.promoTextSubheader}>
            Simply relax and download our app; we'll take care of the rest.
          </Text>
          <TouchableOpacity style={styles.downloadButton}>
            <Text style={styles.downloadButtonText}>GET THE APP FOR FREE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default TourPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
    padding: 10, // Space around the inner content
  },
  scrollViewContent: {
    paddingVertical: 20,
  },
  header: {
    backgroundColor: '#FFF0E1', // Adjust according to the image background
    padding: 20,
    alignItems: 'center',
    borderRadius: 20, // Rounded corners
    marginBottom: 20, // Space between the sections
  },
  tourTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  tourSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  tourDates: {
    fontSize: 14,
    color: '#000',
  },
  eventCount: {
    fontSize: 14,
    color: '#000',
  },
  detailsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF0E1',
    borderRadius: 20, // Rounded corners
    marginBottom: 20, // Space between the sections
  },
  tourImage: {
    width: 60,
    height: 90,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
  detailsButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  promoSection: {
    backgroundColor: '#D0E8E6', // Adjust according to the image background
    alignItems: 'center',
    padding: 30,
    borderRadius: 20, // Rounded corners
  },
  promoImage: {
    width: 200,
    height: 150,
    marginBottom: 20,
  },
  promoTextHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  promoTextSubheader: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  downloadButton: {
    backgroundColor: '#FFF0E1',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  downloadButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});
